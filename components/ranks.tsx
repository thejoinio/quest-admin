export const ranks = [
  { name: "WATER", difficulty: "Very Easy", min_points: 0, max_points: 999, unlocked: false },
  { name: "EARTH", difficulty: "Easy", min_points: 1000, max_points: 4999, unlocked: true },
  { name: "AIR", difficulty: "Moderate", min_points: 5000, max_points: 9999, unlocked: true },
  { name: "FIRE", difficulty: "Moderately Hard", min_points: 10000, max_points: 29999, unlocked: true },
  { name: "METAL", difficulty: "Hard", min_points: 30000, max_points: 49999, unlocked: true },
  { name: "ICE", difficulty: "Very Hard", min_points: 50000, max_points: 99999, unlocked: true },
  { name: "LIGHTNING", difficulty: "Elite Tier", min_points: 100000, max_points: 199999, unlocked: true },
  { name: "SPIRIT", difficulty: "Legendary Tier", min_points: 200000, max_points: Infinity, unlocked: true },
];

export function getSingleRank(currentPoints: number) {
  // Find the rank where the current points are within the min and max range
  return ranks.find(rank => currentPoints >= rank.min_points && currentPoints <= rank.max_points) || null;
}

export function getRankDetails(currentPoints: number) {
  let currentRank = null;
  let nextRank = null;
  let nextLevelPoints = null;
  let progressToNext = 0;

  // Find the user's current rank by checking the point range
  currentRank = ranks.find(rank => currentPoints >= rank.min_points && currentPoints <= rank.max_points);

  if (currentRank) {
    const currentIndex = ranks.indexOf(currentRank);
    
    // Check if there is a next rank
    if (currentIndex < ranks.length - 1) {
      nextRank = ranks[currentIndex + 1];
      nextLevelPoints = nextRank.min_points;
      
      // Calculate progress
      const pointsEarnedInLevel = currentPoints - currentRank.min_points;
      const pointsNeededForNextRank = nextRank.min_points - currentRank.min_points;
      progressToNext = (pointsEarnedInLevel / pointsNeededForNextRank) * 100;
    } else {
      // User is at the final rank
      nextRank = null;
      nextLevelPoints = null;
      progressToNext = 100; // Progress is complete
    }
  } else {
    // User has not yet reached the first rank (e.g., has 0 points)
    nextRank = ranks[0];
    nextLevelPoints = nextRank.min_points;
    progressToNext = (currentPoints / nextRank.min_points) * 100;
  }

  return {
    currentRank: currentRank,
    nextRank: nextRank,
    difficulty: currentRank ? currentRank.difficulty : 'N/A',
    totalPointsForLevel: currentRank ? currentRank.min_points : 0,
    nextLevelPoints: nextLevelPoints,
    progressToNext: Math.min(100, progressToNext).toFixed(2),
  };
}

export function getDynamicRanks(currentPoints: number) {
  return ranks.map(rank => ({
    ...rank,
    // A rank is unlocked if the user's points are greater than or equal to its minimum point requirement
    locked: currentPoints < rank.min_points,
  }));
}