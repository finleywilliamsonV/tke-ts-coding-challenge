import { ChallengeAttemptService, IndividualTestData } from '../../../challenge-attempt.service'
import { Component, OnInit } from '@angular/core'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getChallengeOutput } from '../challenges.functions'
import { IChallengeComponent, IChallengeJson } from '../../../challenge-data/challenge.interface'
import { tap } from 'rxjs'

@Component({
    selector: 'app-challenge-three',
    templateUrl: './challenge-three.component.html',
    styleUrls: ['./challenge-three.component.scss']
})
export class ChallengeThreeComponent implements OnInit, IChallengeComponent {


    /**
     * Given an array of strings, find the string that is not an anagram of the others.
     * - A string is an anagram if it can be formed by rearranging the characters of another string.
     * - For example, the string 'abc' is an anagram of 'cba'.
     * - There will only be one string in the array that is not an anagram of the others.
     * - Solution should be case-insensitive.
     */
    public testFunction(input: string[]) {
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
