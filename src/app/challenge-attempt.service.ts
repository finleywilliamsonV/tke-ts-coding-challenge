import { Injectable } from '@angular/core';
import { ChallengeRepo } from './challenge-data/challenge-repo.constant';
import { IChallengeInfo, IChallengeTest } from './challenge-data/challenge.interface';

type TestRecord = {
    testId: number;
    input: any[];
    output: any;
    userSubmission: any;
}

type SubmissionRecord = Record<number, TestRecord[]>

@Injectable({
    providedIn: 'root'
})
export class ChallengeAttemptService {

    private challengeRepo: IChallengeInfo[] = ChallengeRepo
    private submissionTracker: SubmissionRecord = {}

    constructor() {
        console.log('here')
        for (let i = 0; i < this.challengeRepo.length; i++) {
            const currentChallenge = this.challengeRepo[i]
            this.submissionTracker[currentChallenge.challengeNumber] = []

            for (let j = 0; j < currentChallenge.tests.length; j++) {
                const currentTest = currentChallenge.tests[j]
                this.submissionTracker[currentChallenge.challengeNumber].push({
                    testId: currentTest.testId,
                    input: currentTest.input,
                    output: currentTest.output,
                    userSubmission: null
                })
            }
        }

        console.log('this.submissionTracker:', this.submissionTracker)
    }

    public getChallenge (challengeNumber: number): IChallengeInfo {
        return this.challengeRepo.find(challenge => challenge.challengeNumber === challengeNumber) ?? this.challengeRepo[0]
    }

    public getChallengeTests(challengeNumber: number): IChallengeTest[] {
        return this.getChallenge(challengeNumber).tests
    }

    /**
     * Returns whether a given challenge has been solved
     * @param challengeNumber The challenge number to get the test results for
     */
    public isSolved(challengeNumber: number): boolean {
        return this.submissionTracker[challengeNumber].every(test => test.userSubmission === test.output)
    }
}
