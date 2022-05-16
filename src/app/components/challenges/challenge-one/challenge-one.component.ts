import { Component, OnInit } from "@angular/core";
import { ChallengeRepo } from "../../../challenge-data/challenge-repo.constant";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getChallengeOutput } from '../challenges.functions';
import { ChallengeAttemptService } from '../../../challenge-attempt.service';

@Component({
    selector: "app-challenge-one",
    templateUrl: "./challenge-one.component.html",
    styleUrls: ["./challenge-one.component.scss"]
})
export class ChallengeOneComponent implements OnInit {

    // member variables
    public faArrowRight = faArrowRight;
    public tests: any;
    public getChallengeOutput = getChallengeOutput

    constructor(private challengeAttemptService: ChallengeAttemptService) { }

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

    ngOnInit() {
        this.tests = ChallengeRepo[0].tests;
    }
}
