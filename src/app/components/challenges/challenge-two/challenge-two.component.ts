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
     * Test function - WRTIE CODE HERE
     */
    public testFunction = (input: string[]): string => {

        let highestScoringWord: string = ''
        let highestScore: number = -1;

        const getWordScore = (word: string): number => {
            let wordScore = 0;
            for (let i = 0; i < word.length; i++) {
                wordScore += this.getLetterScore(word[i]);
            }
            return wordScore;
        }

        for (let i = 0; i < input.length; i++) {
            const word = input[i];
            const wordScore = getWordScore(word);
            if (wordScore > highestScore) {
                highestScoringWord = word;
                highestScore = wordScore;
            }
        }

        return highestScoringWord;
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
