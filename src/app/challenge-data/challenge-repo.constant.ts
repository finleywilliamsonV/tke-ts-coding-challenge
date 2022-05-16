import { IChallengeInfo } from "./challenge.interface";

export const ChallengeRepo: IChallengeInfo[] = [
    {
        challengeNumber: 1,
        title: "Challenge #1 - Array Manipulation Part I",
        description: "Given an array of numbers, find the sum of all positive integers.",
        tests: [
            { testId: 1, input: [-1, -2, -3, 6], output: 6 },
            { testId: 2, input: [5, -10, 34, -1, -5, 9, 0, 14], output: 62 },
            { testId: 3, input: [-2, 4, -6, 8], output: 12 },
            { testId: 4, input: [0, 0, 0, 0], output: 0 },
        ],
    },
    {
        challengeNumber: 2,
        title: "Challenge #2 - Highest Scoring Word",
        description: "Given an array of words, find the highest scoring word. Each letter of a word scores points according to its position in the alphabet (a = 1, b = 2, ...). If two words score the same amount, return the first word in the array.",
        tests: [
            { testId: 1, input: ["dog", "cat", "bird", "fish"], output: "fish" },
            { testId: 2, input: ["Maine", "New Hampshire", "Vermont", "New York"], output: "New Hampshire" },
            { testId: 3, input: ["red", "blue", "green", "yellow"], output: "yellow" },
            { testId: 4, input: ["Hot dog", "Burger", "Pizza", "Steak"], output: "Pizza" },
        ],
    },
    {
        challengeNumber: 3,
        title: "Challenge #3 - Anagram Hunter",
        description: "Given an array of strings, find the string that is not an anagram of the others. A string is an anagram if it can be formed by rearranging the characters of another string. For example, the string 'abc' is an anagram of 'cba'. There will only be one string in the array that is not an anagram of the others. Solution should be case-insensitive.",
        tests: [
            { testId: 1, input: ["cat", "crate", "act", "tac"], output: "crate" },
            { testId: 2, input: ["deal", "lead", "dale", "ale"], output: "ale" },
            { testId: 3, input: ["Bread", "beard", "Bard", "debar"], output: "bard" },
            { testId: 4, input: ["candy", "dandy", "cady", "day"], output: "cady" },
            { testId: 5, input: ["aACA", "acAaA", "CCAA", "ACAbA"], output: "ACAbA" },
        ],
    },
];
