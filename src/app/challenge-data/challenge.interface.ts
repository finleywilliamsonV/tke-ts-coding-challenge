import { Input } from '@angular/core';

export interface IChallengeJson {
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
    currentChallenge: IChallengeJson;
}