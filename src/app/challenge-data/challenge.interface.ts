export interface IChallengeInfo {
    title: string;
    description: string;
    challengeNumber: number;
    tests: IChallengeTest[];
}

export interface IChallengeTest {
    testId: number;
    input: any[];
    output: any;
}