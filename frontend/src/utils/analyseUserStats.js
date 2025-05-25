export const analyseUserStats = (data) => {
  const past_moods = data?.[0]?.past_moods || [];

  const moodOverTime = past_moods.map((entry) => {
    const date = new Date(entry.timestamp).toISOString().split("T")[0];
    return {
      date,
      mood: entry.mood,
    };
  });

  const moodData = [
    { mood: "happy", count: 0 },
    { mood: "sad", count: 0 },
    { mood: "angry", count: 0 },
    { mood: "neutral", count: 0 },
    { mood: "surprised", count: 0 },
    { mood: "fearful", count: 0 },
    { mood: "disgusted", count: 0 },
  ];

  past_moods.forEach((entry) => {
    const moodObj = moodData.find((m) => m.mood === entry.mood);
    if (moodObj) {
      moodObj.count++;
    }
  });

  return { moodOverTime, moodData };
};
