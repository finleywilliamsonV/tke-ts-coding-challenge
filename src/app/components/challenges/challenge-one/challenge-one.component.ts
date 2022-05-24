import { ChallengeAttemptService, IndividualTestData } from '../../../challenge-attempt.service'
import { Component, OnInit } from '@angular/core'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getChallengeOutput } from '../challenges.functions'
import { IChallengeComponent, IChallengeJson } from '../../../challenge-data/challenge.interface'
import { tap } from 'rxjs'

@Component({
    selector: "app-challenge-one",
    templateUrl: "./challenge-one.component.html",
    styleUrls: ["./challenge-one.component.scss"]
})
export class ChallengeOneComponent implements OnInit, IChallengeComponent {

    /**
     * Given an array of numbers, find the sum of all positive integers.
     */
    public testFunction(inputs: number[]) {
        /**
         * Write code here!
         */
    }


    /**
     * ------------------------ INTERNALS ------------------------ 
     */

    // Input variables
    public currentChallenge!: IChallengeJson;

    // member variables
    public faArrowRight = faArrowRight;
    public getChallengeOutput = getChallengeOutput
    public testRecord!: IndividualTestData[]

    constructor(private challengeAttemptService: ChallengeAttemptService) { }

    ngOnInit() {

        // subscribe to changes in current challenge
        this.challengeAttemptService.currentChallenge$
            .pipe(
                tap((currentChallenge: IChallengeJson) => this.currentChallenge = currentChallenge)
            )
            .subscribe()

        this.challengeAttemptService.submissionStatus$
            .pipe(
                tap(submissionStatus => this.testRecord = submissionStatus[this.currentChallenge.challengeIndex])
            )
            .subscribe()

        this.challengeAttemptService.submitSolution(this.currentChallenge.challengeIndex, this.testFunction)
    }
}
