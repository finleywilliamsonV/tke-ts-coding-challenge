import { IChallengeInfo } from "./challenge.interface";

export const ChallengeRepo: IChallengeInfo[] = [
    {
        challengeNumber: 1,
        title: "Challenge #1 - Array Manipulation Part I",
        description: "Given an array of numbers, find the sum of all positive integers.",
        tests: [
            { input: [-1, -2, -3, 4], output: 4 },
            { input: [-1, -2, -3, 6], output: 6 },
        ],
    },
    {
        challengeNumber: 2,
        title: "Challenge #1 - Array Manipulation Part II",
        description: "Do the thing part II",
        tests: [],
    },
];
