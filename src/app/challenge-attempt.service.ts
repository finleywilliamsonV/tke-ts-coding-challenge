import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChallengeRepo } from './challenge-data/challenge-repo.constant';
import { IChallengeJson } from './challenge-data/challenge.interface';

export interface TestRecord {
    testIndex: number;
    testInput: any[];
    expectedOutput: any;
    userOutput: any;
}

export type SolutionRecord = Record<number, TestRecord[]>

@Injectable({
    providedIn: 'root'
})
export class ChallengeAttemptService {

    private challengeRepo: IChallengeJson[] = ChallengeRepo
    private submissionTracker: SolutionRecord = {}

    public submissionStatus$: BehaviorSubject<SolutionRecord>
    public currentChallenge$: BehaviorSubject<IChallengeJson>

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
                    testInput: currentTest.input,
                    expectedOutput: currentTest.output,
                    userOutput: null
                })
            }
        }
        
        // initialize the submissionStatus$ subject
        this.submissionStatus$ = new BehaviorSubject(this.submissionTracker)

        // get the current challenge from local storage,
        // initialize the currentChallenge$ subject
        const currentChallengeIndex: string | null = localStorage.getItem('currentChallengeIndex');
        if (currentChallengeIndex) {
            this.currentChallenge$ = new BehaviorSubject<IChallengeJson>(this.challengeRepo[parseInt(currentChallengeIndex, 10)])
        } else {
            this.currentChallenge$ = new BehaviorSubject<IChallengeJson>(this.challengeRepo[0])
        }
    }
    

    /**
     * Tests a given funciton against a given challenge
     * @param challengeIndex The challenge number to get the test results for
     * @param userFunction The function to test
     */
     public submitSolution(challengeIndex: number, userFunction: (input: any) => any) {
        const challengeTests = this.getChallenge(challengeIndex).tests
        for (let i = 0; i < challengeTests.length; i++) {
            const currentTest = challengeTests[i]
            const userTestResult = userFunction(currentTest.input)
            this.setChallenge(challengeIndex, currentTest.testIndex, userTestResult)
        }
        this.submissionStatus$.next(this.submissionTracker)
    }

    /**
     * Returns the challenge at the given index
     */
    private getChallenge(challengeIndex: number): IChallengeJson {
        return this.challengeRepo.find(challenge => challenge.challengeIndex === challengeIndex) ?? this.challengeRepo[0]
    }

    /**
     * Sets a 
     * @param challengeIndex 
     * @param testIndex 
     * @param userSubmission 
     */
    private setChallenge(challengeIndex: number, testIndex: number, userSubmission: any) {
        this.submissionTracker[challengeIndex][testIndex].userOutput = userSubmission
    }

    /**
     * Returns whether a given challenge has been solved
     * @param challengeIndex The challenge number to get the test results for
     */
    public isChallengeSolved(challengeIndex: number): boolean {
        return this.submissionTracker[challengeIndex].every(test => test.userOutput === test.expectedOutput)
    }
}
