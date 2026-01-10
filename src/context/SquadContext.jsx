import React, { createContext, useState, useContext, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockUsers';

const SquadContext = createContext();

export const useSquad = () => useContext(SquadContext);

export const SquadProvider = ({ children }) => {
    const [squad, setSquad] = useState(null);
    const [loading, setLoading] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const savedSquad = localStorage.getItem('currentSquad');
        if (savedSquad) {
            setSquad(JSON.parse(savedSquad));
        }
    }, []);

    const findSquad = (user) => {
        setLoading(true);

        // Simulate API delay for "AI Matching"
        setTimeout(() => {
            // Simple matching algorithm
            // Filter potential matches: Year > Branch > Interests
            const matches = MOCK_USERS.filter(u =>
                u.id !== user.id && // Not self
                u.status === 'Looking for Squad' &&
                u.year === user.year // Prefer same year for now
            );

            // Sort by interest overlap
            matches.sort((a, b) => {
                const intersectionA = a.interests.filter(x => user.interests?.includes(x));
                const intersectionB = b.interests.filter(x => user.interests?.includes(x));
                return intersectionB.length - intersectionA.length;
            });

            // Take top 2-3 matches to form a squad
            const squadMembers = matches.slice(0, 3);

            const newSquad = {
                id: 'sq_' + Date.now(),
                name: 'Brainy Bunch', // Generic name generator could be here
                members: [...squadMembers, { ...user, id: 'current_user' }], // Add current user
                vibeScore: 5.0,
                xp: 0
            };

            setSquad(newSquad);
            localStorage.setItem('currentSquad', JSON.stringify(newSquad));
            setLoading(false);
        }, 2000);
    };

    const leaveSquad = () => {
        setSquad(null);
        localStorage.removeItem('currentSquad');
    };

    const value = {
        squad,
        findSquad,
        leaveSquad,
        loading
    };

    return (
        <SquadContext.Provider value={value}>
            {children}
        </SquadContext.Provider>
    );
};
