export const QUESTS = [
    // DSA & Algorithms
    {
        id: 'dsa-1',
        title: 'Array & Matrix Conquest',
        type: 'Sprint Quest',
        description: 'Master non-linear traversal and boundary conditions in matrices and arrays.',
        xp: 600,
        difficulty: 'Medium',
        tags: ['DSA', 'Arrays', 'Matrices'],
        icebreaker: "What's the most annoying array bug you've ever faced?",
        questions: [
            { id: 1, text: "Rotate Image: Rotate an NxN matrix by 90 degrees in-place." },
            { id: 2, text: "Spiral Matrix: Given an m x n matrix, return all elements in spiral order." },
            { id: 3, text: "Product of Array Except Self: Solve in O(n) without using division." }
        ],
        reflection: "Which pattern (sliding window, two-pointer, or prefix sum) felt the most natural today?"
    },
    {
        id: 'dsa-2',
        title: 'Dynamic Programming Duel',
        type: 'Battle Quest',
        description: 'Who can optimize the space complexity of the Longest Common Subsequence problem fastest?',
        xp: 850,
        difficulty: 'Hard',
        tags: ['DSA', 'DP', 'Optimization'],
        icebreaker: "Top-down (Memoization) or Bottom-up (Tabulation)? Choose your side!",
        questions: [
            { id: 1, text: "LCS Optimization: Reduce space from O(m*n) to O(min(m,n))." },
            { id: 2, text: "Edit Distance: Calculate min operations to convert one string to another." }
        ],
        reflection: "Did the recursive thinking click, or do you prefer the iterative table approach?"
    },
    {
        id: 'dsa-3',
        title: 'Graph Theory: The Path Finder',
        type: 'Explain Quest',
        description: 'Explain the working of Dijkstra\'s Algorithm and when it fails (Negative edges).',
        xp: 450,
        difficulty: 'Medium',
        tags: ['DSA', 'Graphs', 'Algorithms'],
        icebreaker: "If your life was a graph, which node would be the most connected?",
        questions: [
            { id: 1, text: "Dijkstra's Intuition: Why use a priority queue?" },
            { id: 2, text: "Bellman-Ford: How does it handle negative cycles?" }
        ],
        reflection: "How well did you explain the 'Relaxation' step to your squad?"
    },

    // Web Development
    {
        id: 'web-1',
        title: 'React State Management Sprint',
        type: 'Sprint Quest',
        description: 'Build a production-ready shopping cart using Context API and useReducer.',
        xp: 550,
        difficulty: 'Medium',
        tags: ['Web Dev', 'React', 'State'],
        icebreaker: "Redux or Context API? Let the war begin.",
        questions: [
            { id: 1, text: "Implement an 'Add to Cart' action with quantity tracking." },
            { id: 2, text: "Prevent unnecessary re-renders in the cart list using useMemo/memo." }
        ],
        reflection: "Did you find useReducer cleaner than multiple useState hooks?"
    },
    {
        id: 'web-2',
        title: 'CSS Layout Masterclass',
        type: 'Fix-a-Friend',
        description: 'Help a squad mate debug a complex Grid layout that breaks on mobile.',
        xp: 400,
        difficulty: 'Easy',
        tags: ['Web Dev', 'CSS', 'UI/UX'],
        icebreaker: "What's your most used CSS property (excluding 'display')?",
        questions: [
            { id: 1, text: "Fix a Flexbox overflow issue where items shrink too much." },
            { id: 2, text: "Convert a float-based layout to CSS Grid." }
        ],
        reflection: "What's the one CSS property you always forget to set?"
    },

    // AI & Machine Learning
    {
        id: 'ai-1',
        title: 'Neural Network Intuition',
        type: 'Explain Quest',
        description: 'Explain how Backpropagation actually works using the Chain Rule.',
        xp: 900,
        difficulty: 'Hard',
        tags: ['AI', 'ML', 'Math'],
        icebreaker: "If you were a loss function, would you be Mean Squared Error or Cross Entropy?",
        questions: [
            { id: 1, text: "Partial Derivatives: Show the gradient of the loss with respect to weight." },
            { id: 2, text: "Vanishing Gradients: Why do they happen in deep Sigmoid networks?" }
        ],
        reflection: "Did the squad understand the concept of 'nudging' weights?"
    },

    // Computer Systems
    {
        id: 'sys-1',
        title: 'The OS Kernel Deep Dive',
        type: 'Sprint Quest',
        description: 'Simulate Process Scheduling algorithms (Round Robin vs Priority).',
        xp: 700,
        difficulty: 'Medium',
        tags: ['OS', 'CS Fundamentals'],
        icebreaker: "Windows, Linux, or macOS for dev work?",
        questions: [
            { id: 1, text: "Calculate the Average Waiting Time for a given set of processes." },
            { id: 2, text: "Implement a simple LRU Page Replacement simulation." }
        ],
        reflection: "Which scheduling algorithm felt the most 'fair'?"
    },

    // System Design
    {
        id: 'design-1',
        title: 'Scaling the Social Wall',
        type: 'Battle Quest',
        description: 'Design a system that handles 1M concurrent users posting updates.',
        xp: 1000,
        difficulty: 'Hard',
        tags: ['System Design', 'Scaling', 'Architecture'],
        icebreaker: "Centralized vs Decentralized systems? What's your vibe?",
        questions: [
            { id: 1, text: "Database Sharding: How would you partition user data?" },
            { id: 2, text: "Cache Invalidation: When should you clear the Redis cache?" }
        ],
        reflection: "What's the single biggest bottleneck in your proposed design?"
    },
    // Boss Raids
    {
        id: 'boss-1',
        title: 'The Monolith Reformation',
        type: 'Boss Raid',
        description: 'Lead a squad of 4 to refactor a massive legacy monolith into a scalable microservices architecture. High risk, legendary rewards.',
        xp: 2500,
        difficulty: 'Nightmare',
        tags: ['System Design', 'Architecture', 'Boss Raid'],
        icebreaker: "If you could delete one legacy technology from existence, what would it be?",
        questions: [
            { id: 1, text: "Identify the bounded contexts in the provided monolith schema." },
            { id: 2, text: "Design an event-driven communication strategy using Kafka." },
            { id: 3, text: "Implement a Circuit Breaker pattern to prevent cascading failures." }
        ],
        reflection: "Did your distributed transaction strategy hold up under load?"
    }
];
