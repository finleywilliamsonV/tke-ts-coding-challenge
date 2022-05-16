import { IChallengeInfo } from "./challenge.interface";

export const ChallengeRepo: IChallengeInfo[] = [
    {
        challengeNumber: 1,
        title: "Challenge #1 - Array Manipulation Part I",
        description: "Given an array of numbers, find the sum of all positive integers.",
        tests: [
            { input: [-1, -2, -3, 6], output: 6 },
            { input: [5, -10, 34, -1, -5, 9, 0, 14], output: 62 },
            { input: [-2, 4, -6, 8], output: 12 },
            { input: [0, 0, 0, 0], output: 0 },
        ],
    },
    {
        challengeNumber: 2,
        title: "Challenge #2 - Highest Scoring Word",
        description: "Given an array of words, find the highest scoring word. Each letter of a word scores points according to its position in the alphabet (a = 1, b = 2, ...). If two words score the same amount, return the first word in the array.",
        tests: [
            { input: ["dog", "cat", "bird", "fish"], output: "fish" },
            { input: ["Maine", "New Hampshire", "Vermont", "New York"], output: "New Hampshire" },
            { input: ["red", "blue", "green", "yellow"], output: "yellow" },
            { input: ["Hot dog", "Burger", "Pizza", "Steak"], output: "Pizza" },
        ],
    },
];
