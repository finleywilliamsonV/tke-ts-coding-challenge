import { ChallengeAttemptService, IndividualTestData } from '../../../challenge-attempt.service';
import { Component, OnInit } from '@angular/core'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getChallengeOutput } from '../challenges.functions'
import { IChallengeComponent } from 'src/app/challenge-data/challenge.interface'
import { IChallengeJson } from '../../../challenge-data/challenge.interface'
import { tap } from 'rxjs'
import { isEqual } from 'lodash';

@Component({
    selector: 'app-challenge-three',
    templateUrl: './challenge-three.component.html',
    styleUrls: ['./challenge-three.component.scss']
})
export class ChallengeThreeComponent implements OnInit, IChallengeComponent {


    public testFunction(inputs: string[]): string | void {



        const testSet = new Set(inputs[0].toLowerCase().split(''))
        console.log('\ntestSet:', testSet)

        for (let i = 1; i < inputs.length; i++) {

            const newSet = new Set(inputs[i].toLowerCase().split(''))
            console.log('newSet:', newSet)

            if (!isEqual(testSet, newSet)) {
                console.log('inputs[i]:', inputs[i])
                return inputs[i]
            }

        }
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
