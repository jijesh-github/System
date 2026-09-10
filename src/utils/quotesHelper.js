// Daily Motivational Quotes Collection & Rotation Engine

export const QUOTES_DATABASE = [
  {
    quote: "Discipline today, a better tomorrow.",
    author: "System Philosophy",
    category: "Mindset"
  },
  {
    quote: "Small steps every day lead to big results.",
    author: "Anonymous",
    category: "Consistency"
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    category: "Engineering"
  },
  {
    quote: "Consistency is what transforms average into excellence.",
    author: "Tony Dungy",
    category: "Discipline"
  },
  {
    quote: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    category: "Craftsmanship"
  },
  {
    quote: "Action is the foundational key to all success.",
    author: "Pablo Picasso",
    category: "Focus"
  },
  {
    quote: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
    category: "Engineering"
  },
  {
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    category: "Habits"
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    category: "Action"
  },
  {
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    category: "Perseverance"
  },
  {
    quote: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
    category: "Productivity"
  },
  {
    quote: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    category: "Craftsmanship"
  },
  {
    quote: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
    category: "Consistency"
  },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    category: "Growth"
  },
  {
    quote: "Don't count the days, make the days count.",
    author: "Muhammad Ali",
    category: "Mindset"
  },
  {
    quote: "Experience is simply the name we give our mistakes.",
    author: "Oscar Wilde",
    category: "Learning"
  },
  {
    quote: "One day or day one. You decide.",
    author: "Unknown",
    category: "Resolve"
  },
  {
    quote: "Clean code always looks like it was written by someone who cares.",
    author: "Robert C. Martin",
    category: "Engineering"
  },
  {
    quote: "Continuous improvement is better than delayed perfection.",
    author: "Mark Twain",
    category: "Growth"
  },
  {
    quote: "Mastery requires patience and relentless practice.",
    author: "System Philosophy",
    category: "Discipline"
  },
  {
    quote: "Your only limit is your mind.",
    author: "Anonymous",
    category: "Mindset"
  },
  {
    quote: "Great things are done by a series of small things brought together.",
    author: "Vincent Van Gogh",
    category: "Focus"
  },
  {
    quote: "Knowledge is power, but consistency is super-power.",
    author: "Anonymous",
    category: "Habits"
  },
  {
    quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
    category: "Craftsmanship"
  },
  {
    quote: "Quality is not an act, it is a habit.",
    author: "Aristotle",
    category: "Excellence"
  },
  {
    quote: "The struggle you are in today is developing the strength you need for tomorrow.",
    author: "Robert Tew",
    category: "Resilience"
  },
  {
    quote: "Do not wait; the time will never be 'just right'.",
    author: "Napoleon Hill",
    category: "Action"
  },
  {
    quote: "Software is a great combination between artistry and engineering.",
    author: "Bill Gates",
    category: "Engineering"
  },
  {
    quote: "Success isn't always about greatness. It's about consistency.",
    author: "Dwayne Johnson",
    category: "Discipline"
  },
  {
    quote: "Turn your obstacle into your algorithm for growth.",
    author: "System Philosophy",
    category: "Mindset"
  }
];

/**
 * Deterministically retrieves a daily quote based on the date.
 * @param {Date|string} dateInput
 * @returns {{quote: string, author: string, category: string}}
 */
export function getDailyQuote(dateInput) {
  let dateStr = '';
  if (dateInput instanceof Date) {
    const yyyy = dateInput.getFullYear();
    const mm = String(dateInput.getMonth() + 1).padStart(2, '0');
    const dd = String(dateInput.getDate()).padStart(2, '0');
    dateStr = `${yyyy}-${mm}-${dd}`;
  } else if (typeof dateInput === 'string') {
    dateStr = dateInput;
  } else {
    const now = new Date();
    dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  // Simple string hash for deterministic daily quote index
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  const positiveHash = Math.abs(hash);
  const index = positiveHash % QUOTES_DATABASE.length;
  return QUOTES_DATABASE[index];
}

/**
 * Gets a random quote from the database (useful for manual refresh).
 */
export function getRandomQuote(currentIndex = -1) {
  if (QUOTES_DATABASE.length <= 1) return QUOTES_DATABASE[0];
  let nextIndex = Math.floor(Math.random() * QUOTES_DATABASE.length);
  if (nextIndex === currentIndex) {
    nextIndex = (nextIndex + 1) % QUOTES_DATABASE.length;
  }
  return { ...QUOTES_DATABASE[nextIndex], index: nextIndex };
}
