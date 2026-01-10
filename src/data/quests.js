export const QUESTS = [
    {
        id: 'q1',
        title: 'Data Structure Sprint',
        type: 'Sprint Quest',
        description: 'Solve 3 Array problems together in 45 mins.',
        xp: 500,
        difficulty: 'Medium',
        tags: ['DSA', 'Arrays'],
        questions: [
            { id: 1, text: "Find the missing number in an array of 1 to N." },
            { id: 2, text: "Rotate an array by K positions." }
        ]
    },
    {
        id: 'q2',
        title: 'Explain: React Hooks',
        type: 'Explain Quest',
        description: 'One member explains useEffect to the squad.',
        xp: 300,
        difficulty: 'Easy',
        tags: ['Web Dev', 'React'],
        role: 'Teacher' // Dynamic
    },
    {
        id: 'q3',
        title: 'Bug Battle Royale',
        type: 'Battle Quest',
        description: 'Who can fix the API bug fastest?',
        xp: 700,
        difficulty: 'Hard',
        tags: ['Debugging', 'Node.js']
    },
    {
        id: 'q4',
        title: 'Fix-a-Friend: Pointer Confusion',
        type: 'Fix-a-Friend',
        description: 'Help Amit understand C++ pointers.',
        xp: 400,
        difficulty: 'Medium',
        tags: ['C++', 'Pointers', 'Mentorship']
    }
];
