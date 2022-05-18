import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChallengeRepo } from './challenge-data/challenge-repo.constant';
import { IChallengeInfo, IChallengeTest } from './challenge-data/challenge.interface';

export interface TestRecord {
    testIndex: number;
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
    public currentChallenge$: BehaviorSubject<IChallengeInfo>
    

    /**
     * NEXT:
     * Do we have some way to synchronously access the current challenge? Does that make sense? Still trying to get the check/X to show correctly
     */

    constructor() {

        /**
         * Iterate over the challenge repo and construct the current submissionTracker
         */
        for (let i = 0; i < this.challengeRepo.length; i++) {
            const challenge = this.challengeRepo[i]
            this.submissionTracker[challenge.challengeIndex] = []

            for (let j = 0; j < challenge.tests.length; j++) {
                const currentTest = challenge.tests[j]
                this.submissionTracker[challenge.challengeIndex].push({
                    testIndex: currentTest.testIndex,
                    input: currentTest.input,
                    output: currentTest.output,
                    userSubmission: null
                })
            }
        }
        
        // initialize the submissionStatus$ subject
        this.submissionStatus$ = new BehaviorSubject(this.submissionTracker)

        // get the current challenge from local storage,
        // initialize the currentChallenge$ subject
        const currentChallengeIndex: string | null = localStorage.getItem('currentChallengeIndex');
        if (currentChallengeIndex) {
            this.currentChallenge$ = new BehaviorSubject<IChallengeInfo>(this.challengeRepo[parseInt(currentChallengeIndex, 10)])
        } else {
            this.currentChallenge$ = new BehaviorSubject<IChallengeInfo>(this.challengeRepo[0])
        }
    }

    public getChallenge(challengeIndex: number): IChallengeInfo {
        return this.challengeRepo.find(challenge => challenge.challengeIndex === challengeIndex) ?? this.challengeRepo[0]
    }

    public getChallengeTests(challengeIndex: number): IChallengeTest[] {
        return this.getChallenge(challengeIndex).tests
    }

    public setChallenge(challengeIndex: number, testIndex: number, userSubmission: any) {
        this.submissionTracker[challengeIndex][testIndex].userSubmission = userSubmission
    }

    /** */
    public isTestPassed(challengeIndex: number, testIndex: number): boolean {
        return this.submissionTracker[challengeIndex][testIndex].userSubmission === this.submissionTracker[challengeIndex][testIndex].output
    }

    /**
     * Returns whether a given challenge has been solved
     * @param challengeIndex The challenge number to get the test results for
     */
    public isChallengeSolved(challengeIndex: number): boolean {
        return this.submissionTracker[challengeIndex].every(test => test.userSubmission === test.output)
    }

    /**
     * Tests a given funciton against a given challenge
     * @param challengeIndex The challenge number to get the test results for
     * @param userSubmission The function to test
     */
    public submitSolution(challengeIndex: number, userSubmission: (input: any) => any) {
        const challengeTests = this.getChallengeTests(challengeIndex)
        for (let i = 0; i < challengeTests.length; i++) {
            const currentTest = challengeTests[i]
            const userTestResult = userSubmission(currentTest.input)
            this.setChallenge(challengeIndex, currentTest.testIndex, userTestResult)
        }
    }
}
