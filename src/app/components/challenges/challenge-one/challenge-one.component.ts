import { Component, Input, OnInit } from "@angular/core";
import { ChallengeRepo } from "../../../challenge-data/challenge-repo.constant";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getChallengeOutput } from '../challenges.functions';
import { ChallengeAttemptService, SolutionRecord, IndividualTestData } from '../../../challenge-attempt.service';
import { BehaviorSubject, tap } from 'rxjs';
import { IChallengeComponent, IChallengeJson, IChallengeTest } from 'src/app/challenge-data/challenge.interface';

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
