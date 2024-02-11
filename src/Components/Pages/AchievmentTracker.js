// AchievementTracker.js

// AchievementTracker.js
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function AchievementTracker({ cookies, autoClickers }) {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  const notifyAchievement = (achievement) => {
    toast.success(`Du låste upp: ${achievement}`, {
      position: "top-right",
      autoClose: 5000, // Dismiss after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const achievements = [];

    // Define achievement conditions
    if (cookies >= 100 && !unlockedAchievements.includes("Ölentusiast")) {
      achievements.push("Ölentusiast");
      notifyAchievement("Ölentusiast");
    }
    if (autoClickers >= 5 && !unlockedAchievements.includes("Autopilot")) {
      achievements.push("Autopilot");
      notifyAchievement("Autopilot");
    }

    // If new achievements are unlocked, update state
    if (achievements.length > 0) {
      setUnlockedAchievements([...unlockedAchievements, ...achievements]);
    }
  }, [cookies, autoClickers, unlockedAchievements]);

  return null; // This component does not render anything itself
}

export default AchievementTracker;