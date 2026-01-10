
import React, { createContext, useContext, useState, useEffect } from 'react';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }) => {
    // Initial State from LocalStorage or Defaults
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem('userStats');
        const defaultBadges = [
            { id: 'bug_slayer', name: 'Bug Slayer', icon: '🐞', unlocked: false, requirement: 'Complete 3 Battle Quests' },
            { id: 'explain_wizard', name: 'Explain Wizard', icon: '🧙‍♂️', unlocked: false, requirement: 'Complete 5 Explain Quests' },
            { id: 'squad_mvp', name: 'Squad MVP', icon: '👑', unlocked: false, requirement: 'Reach Level 5' }
        ];

        return saved ? JSON.parse(saved) : {
            xp: 0,
            level: 1,
            streak: 1,
            titles: ['Novice'],
            currentTitle: 'Novice',
            badges: defaultBadges
        };
    });

    const [soundEnabled, setSoundEnabled] = useState(true);
    const [rewardQueue, setRewardQueue] = useState([]); // For Micro-rewards
    const [dailyChallenge, setDailyChallenge] = useState({
        text: "Explain 'Recursion' in 1 sentence.",
        completed: false,
        reward: 50
    });

    // Persist stats
    useEffect(() => {
        localStorage.setItem('userStats', JSON.stringify(stats));
    }, [stats]);

    const playSound = (type) => {
        if (!soundEnabled) return;
        // Mock sound handling - in real app would play actual audio files
        // const audio = new Audio(`/sounds/${type}.mp3`);
        // audio.play();
        console.log(`🎵 Playing sound: ${type}`);
    };

    const completeDailyChallenge = () => {
        if (!dailyChallenge.completed) {
            setDailyChallenge(prev => ({ ...prev, completed: true }));
            awardXP(dailyChallenge.reward, "Daily Win");
            playSound('success'); // Assuming we have or will map this
        }
    };

    const awardXP = (amount, reason) => {
        let rewardsToAdd = []; // Collect rewards to add to queue

        setStats(prev => {
            const newXP = prev.xp + amount;
            const newLevel = 1 + Math.floor(newXP / 1000); // Simple linear leveling for now
            let newBadges = [...prev.badges];

            // Check Level Up
            if (newLevel > prev.level) {
                playSound('levelup');
                rewardsToAdd.push({ id: Date.now(), type: 'levelup', message: `Leveled Up to ${newLevel}!` });

                // Unlock Squad MVP at Level 5
                const squadMvpBadge = newBadges.find(b => b.id === 'squad_mvp');
                if (newLevel >= 5 && squadMvpBadge && !squadMvpBadge.unlocked) {
                    newBadges = newBadges.map(b => b.id === 'squad_mvp' ? { ...b, unlocked: true } : b);
                    rewardsToAdd.push({ id: Date.now() + 100, type: 'badge', message: 'Badge Unlocked: Squad MVP!' });
                }
            } else {
                playSound('xp_gain');
                rewardsToAdd.push({ id: Date.now(), type: 'xp', message: `+${amount} XP: ${reason}` });
            }

            return {
                ...prev,
                xp: newXP,
                level: newLevel,
                badges: newBadges
            };
        });

        // Update reward queue after stats are potentially updated
        setRewardQueue(q => [...q, ...rewardsToAdd]);
    };

    const toggleSound = () => setSoundEnabled(prev => !prev);

    const clearReward = (id) => {
        setRewardQueue(prev => prev.filter(r => r.id !== id));
    };

    return (
        <GamificationContext.Provider value={{
            stats,
            soundEnabled,
            toggleSound,
            awardXP,
            rewardQueue,
            clearReward,
            dailyChallenge,
            completeDailyChallenge
        }}>
            {children}
        </GamificationContext.Provider>
    );
};
