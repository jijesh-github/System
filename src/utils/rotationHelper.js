// Rotation & Subject Helper for SYSTEM

export const SUBJECTS_CONFIG = {
  aptitude: {
    id: 'aptitude',
    name: 'Aptitude',
    code: 'APT',
    color: '#00f0ff', // Cyber Cyan
    glow: 'rgba(0, 240, 255, 0.4)',
    icon: 'Brain',
    unit: 'Questions',
    targets: {
      min: 10,
      standard: 20,
      mainFocus: 30,
    },
    defaultSecondaryTarget: 15,
  },
  sql: {
    id: 'sql',
    name: 'SQL',
    code: 'SQL',
    color: '#00ff9d', // Emerald Green
    glow: 'rgba(0, 255, 157, 0.4)',
    icon: 'Database',
    unit: 'Problems',
    targets: {
      min: 1,
      standard: 3,
      mainFocus: 5,
    },
    defaultSecondaryTarget: 2,
  },
  python: {
    id: 'python',
    name: 'Python',
    code: 'PY',
    color: '#ffb700', // Amber Gold
    glow: 'rgba(255, 183, 0, 0.4)',
    icon: 'Terminal',
    unit: 'Problems',
    targets: {
      min: 1,
      standard: 2,
      mainFocus: 3,
    },
    defaultSecondaryTarget: 2,
  },
  dsa: {
    id: 'dsa',
    name: 'Data Structures',
    code: 'DSA',
    color: '#a855f7', // Electric Violet
    glow: 'rgba(168, 85, 247, 0.4)',
    icon: 'Network',
    unit: 'Problems',
    targets: {
      min: 1,
      standard: 2,
      mainFocus: 3,
    },
    defaultSecondaryTarget: 1,
    optional: true,
  }
};

// Return rotation mapping for a given date (0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat)
export function getDailyRotation(date = new Date()) {
  const dayIndex = new Date(date).getDay();

  // Weekly schedule mapping
  const scheduleByDay = {
    0: { aptitude: 'secondary', sql: 'secondary', python: 'secondary', dsa: 'secondary' }, // Sunday - Review
    1: { aptitude: 'main', sql: 'secondary', python: 'rest', dsa: 'rest' },                  // Monday
    2: { aptitude: 'secondary', sql: 'rest', python: 'main', dsa: 'rest' },                  // Tuesday
    3: { aptitude: 'rest', sql: 'main', python: 'secondary', dsa: 'rest' },                  // Wednesday
    4: { aptitude: 'main', sql: 'rest', python: 'secondary', dsa: 'rest' },                  // Thursday
    5: { aptitude: 'rest', sql: 'main', python: 'secondary', dsa: 'secondary' },             // Friday
    6: { aptitude: 'secondary', sql: 'rest', python: 'main', dsa: 'main' },                  // Saturday
  };

  return scheduleByDay[dayIndex] || scheduleByDay[1];
}

// Calculate target requirements based on subject, role (main, secondary, rest), and custom targets
export function getQuestTarget(subjectId, role, customTargets = {}) {
  const config = SUBJECTS_CONFIG[subjectId];
  if (!config) return 0;

  const targets = customTargets[subjectId] || config.targets;

  if (role === 'main') {
    return targets.mainFocus || config.targets.mainFocus;
  }
  if (role === 'secondary') {
    return targets.standard || config.targets.standard || config.defaultSecondaryTarget;
  }
  return 0; // Rest role has 0 required
}

// Level calculation helpers
export function calculateLevelData(totalXP) {
  // 500 XP per level baseline
  const xpPerLevel = 500;
  const level = Math.floor(totalXP / xpPerLevel) + 1;
  const xpInCurrentLevel = totalXP % xpPerLevel;
  const xpNeededForNext = xpPerLevel;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNext) * 100));

  return {
    level,
    totalXP,
    xpInCurrentLevel,
    xpNeededForNext,
    progressPercent,
  };
}
