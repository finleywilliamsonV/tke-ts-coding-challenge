import { Input } from '@angular/core';

export interface IChallengeInfo {
    title: string;
    description: string;
    challengeIndex: number;
    tests: IChallengeTest[];
}

export interface IChallengeTest {
    testIndex: number;
    input: any[];
    output: any;
}

export interface IChallengeComponent {
    currentChallenge: IChallengeInfo;
}