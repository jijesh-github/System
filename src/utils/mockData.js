// Mock Data Seed for SYSTEM V2 - Modern Premium Progression Engine
import { format, subDays } from 'date-fns';
import { getDailyRotation, getQuestTarget } from './rotationHelper';

export function generateFreshState() {
  return {
    user: {
      name: 'Cyber Operator',
      bio: 'Discipline today, a better tomorrow.',
      avatar: '/avatar.jpg',
      equippedTitle: '',
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      perfectDays: 0,
      failedDays: 0,
      excusedDays: 0,
      resetTime: '23:59',
      soundEnabled: true,
      unlockedDSA: false,
    },
    notes: "// Class Scratchpad & Quick Notes\n\n- Master SQL CTEs & Window Functions\n- Review Binary Search Tree rotation algorithms\n- Complete daily aptitude quota before 10 PM!",
    recoveryQuests: [],
    achievements: [
      {
        id: 'FIRST_AWAKENING',
        title: 'FIRST AWAKENING',
        quote: 'The spark that sets the journey into motion.',
        category: 'Milestones',
        requirementText: 'Initialize SYSTEM and complete your first task.',
        progress: 0,
        total: 1,
        unlocked: false,
        xpReward: 100,
      },
      {
        id: 'QUERY_HUNTER',
        title: 'QUERY HUNTER',
        quote: 'The one who seeks answers within data.',
        category: 'Database',
        requirementText: 'Solve 100 SQL problems.',
        progress: 0,
        total: 100,
        unlocked: false,
        xpReward: 250,
      },
      {
        id: 'UNBROKEN_WILL',
        title: 'UNBROKEN WILL',
        quote: 'Consistency sustained through focus and resolve.',
        category: 'Discipline',
        requirementText: 'Maintain a 7-day streak.',
        progress: 0,
        total: 7,
        unlocked: false,
        xpReward: 200,
      },
      {
        id: 'IRON_DISCIPLINE',
        title: 'IRON DISCIPLINE',
        quote: 'A relentless commitment to daily progression.',
        category: 'Discipline',
        requirementText: 'Maintain a 30-day streak.',
        progress: 0,
        total: 30,
        unlocked: false,
        xpReward: 500,
      },
      {
        id: 'LOGIC_HUNTER',
        title: 'LOGIC HUNTER',
        quote: 'Dissecting complex problems with mathematical poise.',
        category: 'Aptitude',
        requirementText: 'Solve 500 Aptitude questions.',
        progress: 0,
        total: 500,
        unlocked: false,
        xpReward: 300,
      },
      {
        id: 'CODE_WIELDER',
        title: 'CODE WIELDER',
        quote: 'Commanding syntax to forge functional elegance.',
        category: 'Programming',
        requirementText: 'Solve 100 Python challenges.',
        progress: 0,
        total: 100,
        unlocked: false,
        xpReward: 250,
      },
      {
        id: 'DATABASE_SOVEREIGN',
        title: 'DATABASE SOVEREIGN',
        quote: 'Mastery over relational schemas and window functions.',
        category: 'Database',
        requirementText: 'Solve 250 SQL problems.',
        progress: 0,
        total: 250,
        unlocked: false,
        xpReward: 500,
      },
      {
        id: 'RELENTLESS',
        title: 'RELENTLESS',
        quote: 'Fourteen consecutive days without an unjustified miss.',
        category: 'Discipline',
        requirementText: 'Complete 14 consecutive active days.',
        progress: 0,
        total: 14,
        unlocked: false,
        xpReward: 300,
      },
      {
        id: 'CODE_ASCENDANT',
        title: 'CODE ASCENDANT',
        quote: 'Reaching higher algorithmic clarity.',
        category: 'Expansion',
        requirementText: 'Unlock Data Structures & Algorithms module.',
        progress: 0,
        total: 1,
        unlocked: false,
        xpReward: 400,
      },
    ],
    topicStats: {
      aptitude: {
        totalSolved: 0,
        correct: 0,
        accuracy: 0,
        avgDaily: 0,
        topics: [
          { name: 'Quantitative Aptitude', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Logical Reasoning', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Data Interpretation', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Verbal Ability', solved: 0, accuracy: 0, status: 'Not Started' },
        ],
      },
      sql: {
        totalSolved: 0,
        correct: 0,
        accuracy: 0,
        avgDaily: 0,
        topics: [
          { name: 'Basic Select & Where', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Joins & Inner/Outer', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Group By & Aggregates', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Subqueries & CTEs', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Window Functions', solved: 0, accuracy: 0, status: 'Not Started' },
        ],
      },
      python: {
        totalSolved: 0,
        correct: 0,
        accuracy: 0,
        avgDaily: 0,
        topics: [
          { name: 'Data Types & Control Flow', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Functions & Lambda', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'List Comprehensions', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'OOP & Classes', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Decorators & Generators', solved: 0, accuracy: 0, status: 'Not Started' },
        ],
      },
      dsa: {
        totalSolved: 0,
        correct: 0,
        accuracy: 0,
        avgDaily: 0,
        topics: [
          { name: 'Arrays & Strings', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Linked Lists', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Trees & Graphs', solved: 0, accuracy: 0, status: 'Not Started' },
          { name: 'Dynamic Programming', solved: 0, accuracy: 0, status: 'Not Started' },
        ],
      },
    },
    calendarHistory: {},
  };
}

export function generateInitialState() {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');

  const calendarHistory = {};
  const pastDaysCount = 30;

  for (let i = 1; i <= pastDaysCount; i++) {
    const dateObj = subDays(today, i);
    const dateStr = format(dateObj, 'yyyy-MM-dd');

    let status = 'Completed';
    let xpEarned = 120;

    if (i === 18) {
      status = 'Excused';
      xpEarned = 0;
    } else if (i === 24) {
      status = 'Missed';
      xpEarned = 0;
    } else if (i === 5 || i === 12 || i === 22) {
      status = 'Partial';
      xpEarned = 75;
    }

    const rotation = getDailyRotation(dateObj);
    const subjects = {};

    ['aptitude', 'sql', 'python'].forEach((subId) => {
      const role = rotation[subId] || 'rest';
      const target = getQuestTarget(subId, role);
      let solved = 0;
      if (status === 'Completed') {
        solved = target;
      } else if (status === 'Partial') {
        solved = role === 'main' ? Math.max(1, Math.floor(target * 0.7)) : target;
      }
      subjects[subId] = { solved, target, role };
    });

    calendarHistory[dateStr] = {
      date: dateStr,
      status,
      xpEarned,
      streak: Math.max(1, 14 - i + (i > 18 ? 1 : 0)),
      reason: status === 'Excused' ? 'College Examination' : status === 'Missed' ? 'Missed Daily Reset' : null,
      subjects,
    };
  }

  return {
    user: {
      name: 'Cyber Operator',
      bio: 'Discipline today, a better tomorrow.',
      avatar: '/avatar.jpg',
      equippedTitle: 'QUERY HUNTER',
      totalXP: 5890,
      currentStreak: 14,
      longestStreak: 21,
      perfectDays: 42,
      failedDays: 2,
      excusedDays: 3,
      resetTime: '23:59',
      soundEnabled: true,
      unlockedDSA: false,
    },
    notes: "// Class Scratchpad & Quick Notes\n\n- Master SQL CTEs & Window Functions\n- Review Binary Search Tree rotation algorithms\n- Complete daily aptitude quota before 10 PM!",
    recoveryQuests: [
      {
        id: 'rec-101',
        title: 'SQL RECOVERY TASK',
        description: 'Complete 2 additional SQL problems to restore full status.',
        subject: 'sql',
        additionalCount: 2,
        completed: false,
        xpReward: 30,
        assignedDate: format(subDays(today, 1), 'yyyy-MM-dd'),
      },
    ],
    achievements: [
      {
        id: 'FIRST_AWAKENING',
        title: 'FIRST AWAKENING',
        quote: 'The spark that sets the journey into motion.',
        category: 'Milestones',
        requirementText: 'Initialize SYSTEM and complete your first task.',
        progress: 1,
        total: 1,
        unlocked: true,
        unlockedAt: '2026-08-10',
        xpReward: 100,
      },
      {
        id: 'QUERY_HUNTER',
        title: 'QUERY HUNTER',
        quote: 'The one who seeks answers within data.',
        category: 'Database',
        requirementText: 'Solve 100 SQL problems.',
        progress: 100,
        total: 100,
        unlocked: true,
        unlockedAt: '2026-09-04',
        xpReward: 250,
      },
      {
        id: 'UNBROKEN_WILL',
        title: 'UNBROKEN WILL',
        quote: 'Consistency sustained through focus and resolve.',
        category: 'Discipline',
        requirementText: 'Maintain a 7-day streak.',
        progress: 7,
        total: 7,
        unlocked: true,
        unlockedAt: '2026-08-17',
        xpReward: 200,
      },
      {
        id: 'IRON_DISCIPLINE',
        title: 'IRON DISCIPLINE',
        quote: 'A relentless commitment to daily progression.',
        category: 'Discipline',
        requirementText: 'Maintain a 30-day streak.',
        progress: 14,
        total: 30,
        unlocked: false,
        xpReward: 500,
      },
      {
        id: 'LOGIC_HUNTER',
        title: 'LOGIC HUNTER',
        quote: 'Dissecting complex problems with mathematical poise.',
        category: 'Aptitude',
        requirementText: 'Solve 500 Aptitude questions.',
        progress: 540,
        total: 500,
        unlocked: true,
        unlockedAt: '2026-09-01',
        xpReward: 300,
      },
      {
        id: 'CODE_WIELDER',
        title: 'CODE WIELDER',
        quote: 'Commanding syntax to forge functional elegance.',
        category: 'Programming',
        requirementText: 'Solve 100 Python challenges.',
        progress: 78,
        total: 100,
        unlocked: false,
        xpReward: 250,
      },
      {
        id: 'DATABASE_SOVEREIGN',
        title: 'DATABASE SOVEREIGN',
        quote: 'Mastery over relational schemas and window functions.',
        category: 'Database',
        requirementText: 'Solve 250 SQL problems.',
        progress: 112,
        total: 250,
        unlocked: false,
        xpReward: 500,
      },
      {
        id: 'RELENTLESS',
        title: 'RELENTLESS',
        quote: 'Fourteen consecutive days without an unjustified miss.',
        category: 'Discipline',
        requirementText: 'Complete 14 consecutive active days.',
        progress: 14,
        total: 14,
        unlocked: true,
        unlockedAt: '2026-09-08',
        xpReward: 300,
      },
      {
        id: 'CODE_ASCENDANT',
        title: 'CODE ASCENDANT',
        quote: 'Reaching higher algorithmic clarity.',
        category: 'Expansion',
        requirementText: 'Unlock Data Structures & Algorithms module.',
        progress: 0,
        total: 1,
        unlocked: false,
        xpReward: 400,
      },
    ],
    topicStats: {
      aptitude: {
        totalSolved: 540,
        correct: 468,
        accuracy: 86.6,
        avgDaily: 24.5,
        topics: [
          { name: 'Quantitative Aptitude', solved: 210, accuracy: 88, status: 'Strong' },
          { name: 'Logical Reasoning', solved: 180, accuracy: 92, status: 'Mastered' },
          { name: 'Data Interpretation', solved: 90, accuracy: 82, status: 'Good' },
          { name: 'Verbal Ability', solved: 60, accuracy: 74, status: 'Needs Focus' },
        ],
      },
      sql: {
        totalSolved: 112,
        correct: 101,
        accuracy: 90.1,
        avgDaily: 4.2,
        topics: [
          { name: 'Basic Select & Where', solved: 35, accuracy: 96, status: 'Mastered' },
          { name: 'Joins & Inner/Outer', solved: 30, accuracy: 90, status: 'Strong' },
          { name: 'Group By & Aggregates', solved: 25, accuracy: 88, status: 'Good' },
          { name: 'Subqueries & CTEs', solved: 14, accuracy: 82, status: 'Good' },
          { name: 'Window Functions', solved: 8, accuracy: 64, status: 'Needs Focus' },
        ],
      },
      python: {
        totalSolved: 78,
        correct: 68,
        accuracy: 87.1,
        avgDaily: 2.8,
        topics: [
          { name: 'Data Types & Control Flow', solved: 30, accuracy: 96, status: 'Mastered' },
          { name: 'Functions & Lambda', solved: 22, accuracy: 91, status: 'Strong' },
          { name: 'List Comprehensions', solved: 14, accuracy: 85, status: 'Good' },
          { name: 'OOP & Classes', solved: 8, accuracy: 72, status: 'Needs Focus' },
          { name: 'Decorators & Generators', solved: 4, accuracy: 60, status: 'Needs Focus' },
        ],
      },
      dsa: {
        totalSolved: 0,
        correct: 0,
        accuracy: 0,
        avgDaily: 0,
        topics: [
          { name: 'Arrays & Strings', solved: 0, accuracy: 0, status: 'Locked' },
          { name: 'Linked Lists', solved: 0, accuracy: 0, status: 'Locked' },
          { name: 'Trees & Graphs', solved: 0, accuracy: 0, status: 'Locked' },
          { name: 'Dynamic Programming', solved: 0, accuracy: 0, status: 'Locked' },
        ],
      },
    },
    calendarHistory,
  };
}
