import { Component, Input, OnInit } from "@angular/core";
import { ChallengeRepo } from "../../../challenge-data/challenge-repo.constant";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getChallengeOutput } from '../challenges.functions';
import { ChallengeAttemptService, SubmissionRecord } from '../../../challenge-attempt.service';
import { BehaviorSubject, tap } from 'rxjs';
import { IChallengeComponent, IChallengeInfo, IChallengeTest } from 'src/app/challenge-data/challenge.interface';

@Component({
    selector: "app-challenge-one",
    templateUrl: "./challenge-one.component.html",
    styleUrls: ["./challenge-one.component.scss"]
})
export class ChallengeOneComponent implements OnInit, IChallengeComponent {

    /**
     * 
     * @param inputs
     */
    public testFunction(i: number[]): number | null {
        /**
         * Write code here!
         */
        // const a = i.reduce(
        //     (acc, curr) => {
        //         if (curr > 0) {
        //             acc += curr;
        //         }
        //         return acc;
        //     },
        //     0,
        // );

        // return a;

        return null
    }


    /**
     * ------------------------ INTERNALS ------------------------ 
     */

    // Input variables
    @Input() currentChallenge!: IChallengeInfo;

    // member variables
    public faArrowRight = faArrowRight;
    public getChallengeOutput = getChallengeOutput
    public tests!: IChallengeTest[]
    public submissionStatus!: SubmissionRecord;

    constructor(private challengeAttemptService: ChallengeAttemptService) {
        this.challengeAttemptService.submissionStatus$
            .pipe(
                tap(submissionStatus => this.submissionStatus = submissionStatus)
            )
            .subscribe()
    }

    ngOnInit() {
        this.tests = this.currentChallenge.tests;
    }
}
