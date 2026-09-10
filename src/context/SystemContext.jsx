import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import confetti from 'canvas-confetti';
import { generateInitialState, generateFreshState } from '../utils/mockData';
import { getDailyRotation, getQuestTarget, calculateLevelData, SUBJECTS_CONFIG } from '../utils/rotationHelper';
import { playSound } from '../utils/soundFX';

const SystemContext = createContext(null);
const STORAGE_KEY = 'SYSTEM_V2_PREMIUM_STATE';

export const SystemProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved state:', e);
    }
    return generateInitialState();
  });

  const [activeModal, setActiveModal] = useState(null); // 'exemption' | 'levelUp' | 'achievementUnlock'
  const [levelUpData, setLevelUpData] = useState(null);
  const [unlockedAchievementData, setUnlockedAchievementData] = useState(null);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);
  const [simulatedDateOffset, setSimulatedDateOffset] = useState(0);

  const currentDate = new Date(Date.now() + simulatedDateOffset * 86400000);
  const todayStr = format(currentDate, 'yyyy-MM-dd');
  const rotation = getDailyRotation(currentDate);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to persist state:', e);
    }
  }, [state]);

  const getTodayQuests = () => {
    const existing = state.calendarHistory[todayStr]?.subjects;
    const subjectsToInclude = ['aptitude', 'sql', 'python'];
    if (state.user.unlockedDSA) {
      subjectsToInclude.push('dsa');
    }

    const todayQuests = {};
    subjectsToInclude.forEach((subId) => {
      const role = rotation[subId] || 'rest';
      const target = getQuestTarget(subId, role);
      const prevData = existing?.[subId];

      todayQuests[subId] = {
        subjectId: subId,
        role,
        solved: prevData?.solved ?? 0,
        target,
        completed: prevData?.solved >= target && target > 0,
      };
    });

    return todayQuests;
  };

  const todayQuests = getTodayQuests();

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#a855f7', '#06b6d4', '#ffffff'],
      });
    } catch (e) {}
  };

  const addXP = (amount) => {
    setState((prev) => {
      const oldXP = prev.user.totalXP;
      const newXP = Math.max(0, oldXP + amount);

      const oldLevelData = calculateLevelData(oldXP);
      const newLevelData = calculateLevelData(newXP);

      if (newLevelData.level > oldLevelData.level) {
        playSound('levelup', prev.user.soundEnabled);
        triggerConfetti();
        setLevelUpData({
          oldLevel: oldLevelData.level,
          newLevel: newLevelData.level,
          newXP,
        });
        setActiveModal('levelUp');
      }

      return {
        ...prev,
        user: {
          ...prev.user,
          totalXP: newXP,
        },
      };
    });
  };

  const updateQuestProgress = (subjectId, countDelta) => {
    playSound('progress', state.user.soundEnabled);

    setState((prev) => {
      const dayEntry = prev.calendarHistory[todayStr] || {
        date: todayStr,
        status: 'Partial',
        xpEarned: 0,
        subjects: {},
      };

      const currentSolved = dayEntry.subjects[subjectId]?.solved || 0;
      const newSolved = Math.max(0, currentSolved + countDelta);
      const role = rotation[subjectId] || 'rest';
      const target = getQuestTarget(subjectId, role);

      const updatedSubjects = {
        ...dayEntry.subjects,
        [subjectId]: {
          solved: newSolved,
          target,
          role,
        },
      };

      let allRequiredDone = true;
      let anyProgress = false;

      Object.keys(rotation).forEach((sId) => {
        if (sId === 'dsa' && !prev.user.unlockedDSA) return;
        const r = rotation[sId];
        const t = getQuestTarget(sId, r);
        const s = sId === subjectId ? newSolved : updatedSubjects[sId]?.solved || 0;
        if (t > 0 && s < t) allRequiredDone = false;
        if (s > 0) anyProgress = true;
      });

      const newStatus = allRequiredDone ? 'Completed' : anyProgress ? 'Partial' : 'Missed';

      const updatedTopicStats = { ...prev.topicStats };
      if (countDelta > 0 && updatedTopicStats[subjectId]) {
        updatedTopicStats[subjectId].totalSolved += countDelta;
        updatedTopicStats[subjectId].correct += countDelta;
        updatedTopicStats[subjectId].accuracy = Math.round(
          (updatedTopicStats[subjectId].correct / updatedTopicStats[subjectId].totalSolved) * 100
        );
      }

      return {
        ...prev,
        topicStats: updatedTopicStats,
        calendarHistory: {
          ...prev.calendarHistory,
          [todayStr]: {
            ...dayEntry,
            status: newStatus,
            subjects: updatedSubjects,
          },
        },
      };
    });
  };

  const completeQuest = (subjectId) => {
    const q = todayQuests[subjectId];
    if (!q) return;

    const remaining = Math.max(1, q.target - q.solved);
    updateQuestProgress(subjectId, remaining);

    let xpAmount = q.role === 'main' ? 50 : q.role === 'secondary' ? 25 : 10;
    addXP(xpAmount);
    playSound('complete', state.user.soundEnabled);
  };

  const completeRecoveryQuest = (recoveryId) => {
    playSound('complete', state.user.soundEnabled);
    triggerConfetti();

    setState((prev) => {
      const rec = prev.recoveryQuests.find((r) => r.id === recoveryId);
      const xpReward = rec ? rec.xpReward : 30;

      return {
        ...prev,
        recoveryQuests: prev.recoveryQuests.filter((r) => r.id !== recoveryId),
        user: {
          ...prev.user,
          totalXP: prev.user.totalXP + xpReward,
        },
      };
    });
  };

  const submitExemption = (reasonCategory, customNote) => {
    playSound('click', state.user.soundEnabled);
    setState((prev) => ({
      ...prev,
      calendarHistory: {
        ...prev.calendarHistory,
        [todayStr]: {
          ...prev.calendarHistory[todayStr],
          status: 'Excused',
          reason: `${reasonCategory}: ${customNote || 'No extra notes.'}`,
        },
      },
      user: {
        ...prev.user,
        excusedDays: prev.user.excusedDays + 1,
      },
    }));
    setActiveModal(null);
  };

  const triggerPenalty = (missedSubjectName = 'Daily Practice') => {
    playSound('warning', state.user.soundEnabled);
    const penaltyXP = 50;

    setState((prev) => {
      const newXP = Math.max(0, prev.user.totalXP - penaltyXP);
      const newRecovery = {
        id: `rec-${Date.now()}`,
        title: `${missedSubjectName.toUpperCase()} RECOVERY TASK`,
        description: `Complete 2 additional ${missedSubjectName} problems to restore full status.`,
        subject: missedSubjectName.toLowerCase(),
        additionalCount: 2,
        completed: false,
        xpReward: 30,
        assignedDate: todayStr,
      };

      return {
        ...prev,
        user: {
          ...prev.user,
          totalXP: newXP,
          currentStreak: 0,
          failedDays: prev.user.failedDays + 1,
        },
        recoveryQuests: [newRecovery, ...prev.recoveryQuests],
        calendarHistory: {
          ...prev.calendarHistory,
          [todayStr]: {
            ...prev.calendarHistory[todayStr],
            status: 'Missed',
            reason: 'Unjustified Miss // Penalty Applied',
          },
        },
      };
    });
    setActiveModal(null);
  };

  // Equip title feature
  const equipTitle = (titleString) => {
    playSound('click', state.user.soundEnabled);
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        equippedTitle: titleString,
      },
    }));
  };

  const toggleSubjectDSA = () => {
    playSound('click', state.user.soundEnabled);
    setState((prev) => {
      const nextUnlocked = !prev.user.unlockedDSA;
      if (nextUnlocked) {
        triggerConfetti();
        playSound('achievement', prev.user.soundEnabled);
      }
      return {
        ...prev,
        user: {
          ...prev.user,
          unlockedDSA: nextUnlocked,
        },
      };
    });
  };

  const toggleAudio = () => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        soundEnabled: !prev.user.soundEnabled,
      },
    }));
  };

  const simulateNextDay = () => {
    playSound('click', state.user.soundEnabled);
    setSimulatedDateOffset((prev) => prev + 1);
  };

  const resetSystemData = (isFresh = true) => {
    const newState = isFresh ? generateFreshState() : generateInitialState();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {}
    setState(newState);
    setSimulatedDateOffset(0);
    playSound('click', true);
  };

  // Update User Profile (Name, Bio, Avatar)
  const updateUserProfile = (newProfileData) => {
    playSound('complete', state.user.soundEnabled);
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...newProfileData,
      },
    }));
  };

  // Update Notes / Scratchpad
  const updateNotes = (newNotesText) => {
    setState((prev) => ({
      ...prev,
      notes: newNotesText,
    }));
  };

  const levelData = calculateLevelData(state.user.totalXP);

  return (
    <SystemContext.Provider
      value={{
        user: state.user,
        notes: state.notes || '',
        recoveryQuests: state.recoveryQuests,
        achievements: state.achievements,
        topicStats: state.topicStats,
        calendarHistory: state.calendarHistory,
        todayStr,
        currentDate,
        rotation,
        todayQuests,
        levelData,
        activeModal,
        setActiveModal,
        levelUpData,
        unlockedAchievementData,
        selectedCalendarDay,
        setSelectedCalendarDay,
        updateQuestProgress,
        completeQuest,
        completeRecoveryQuest,
        submitExemption,
        triggerPenalty,
        equipTitle,
        updateUserProfile,
        updateNotes,
        toggleSubjectDSA,
        toggleAudio,
        simulateNextDay,
        resetSystemData,
        addXP,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within SystemProvider');
  }
  return context;
};
