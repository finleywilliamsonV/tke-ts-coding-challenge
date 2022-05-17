import { Input } from '@angular/core';

export interface IChallengeInfo {
    title: string;
    description: string;
    challengeIndex: number;
    tests: IChallengeTest[];
}

export interface IChallengeTest {
    testId: number;
    input: any[];
    output: any;
}

export interface IChallengeComponent {

    /**
     * Challenge info passed in by the parent component.
     */
    currentChallenge: IChallengeInfo;
}