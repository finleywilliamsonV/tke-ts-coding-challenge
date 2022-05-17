import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChallengeRepo } from './challenge-data/challenge-repo.constant';
import { IChallengeInfo, IChallengeTest } from './challenge-data/challenge.interface';

type TestRecord = {
    testId: number;
    input: any[];
    output: any;
    userSubmission: any;
}

export type SubmissionRecord = Record<number, TestRecord[]>

@Injectable({
    providedIn: 'root'
})
export class ChallengeAttemptService {

    private challengeRepo: IChallengeInfo[] = ChallengeRepo
    private submissionTracker: SubmissionRecord = {}

    public submissionStatus$: BehaviorSubject<SubmissionRecord>

    constructor() {
        for (let i = 0; i < this.challengeRepo.length; i++) {
            const currentChallenge = this.challengeRepo[i]
            this.submissionTracker[currentChallenge.challengeIndex] = []

            for (let j = 0; j < currentChallenge.tests.length; j++) {
                const currentTest = currentChallenge.tests[j]
                this.submissionTracker[currentChallenge.challengeIndex].push({
                    testId: currentTest.testId,
                    input: currentTest.input,
                    output: currentTest.output,
                    userSubmission: null
                })
            }
        }

        this.submissionStatus$ = new BehaviorSubject(this.submissionTracker)
        console.log('this.submissionTracker:', this.submissionTracker)
    }

    public getChallenge(challengeIndex: number): IChallengeInfo {
        return this.challengeRepo.find(challenge => challenge.challengeIndex === challengeIndex) ?? this.challengeRepo[0]
    }

    public getChallengeTests(challengeIndex: number): IChallengeTest[] {
        return this.getChallenge(challengeIndex).tests
    }

    public setChallenge(challengeIndex: number, testId: number, userSubmission: any) {
        this.submissionTracker[challengeIndex][testId].userSubmission = userSubmission
    }

    /** */
    public isTestPassed(challengeIndex: number, testId: number): boolean {
        return this.submissionTracker[challengeIndex][testId].userSubmission === this.submissionTracker[challengeIndex][testId].output
    }

    /**
     * Returns whether a given challenge has been solved
     * @param challengeIndex The challenge number to get the test results for
     */
    public isChallengeSolved(challengeIndex: number): boolean {
        return this.submissionTracker[challengeIndex].every(test => test.userSubmission === test.output)
    }
}
