import { ChallengeAttemptService, IndividualTestData } from '../../../challenge-attempt.service'
import { Component, OnInit } from '@angular/core'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getChallengeOutput } from '../challenges.functions'
import { IChallengeComponent } from 'src/app/challenge-data/challenge.interface'
import { IChallengeJson } from '../../../challenge-data/challenge.interface'
import { tap } from 'rxjs'

@Component({
    selector: 'app-challenge-two',
    templateUrl: './challenge-two.component.html',
    styleUrls: ['./challenge-two.component.scss']
})
export class ChallengeTwoComponent implements OnInit, IChallengeComponent {

    /**
     * Returns the letter score for a given letter accounting for upper/lowercase.
     * NOTE: Should we give this to applicants?
     * @param letter - letter to be checked
     * @returns - the score of the letter
     */
    private getLetterScore(letter: string): number {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const letterIndex = alphabet.indexOf(letter.toLocaleLowerCase());
        return letterIndex + 1;
    }

    /**
     * Given an array of words, find the highest scoring word.
     * - Each letter of a word scores points according to its position in the alphabet (a = 1, b = 2, ...)
     * - If two words score the same amount, return the first word in the array.
     * - You are given the 'getLetterScore()' function above.
     */
    public testFunction = (input: string[]) => {
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
