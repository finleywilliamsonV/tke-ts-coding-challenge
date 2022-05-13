import { Component, OnInit } from "@angular/core";
import { ChallengeRepo } from "../../../challenge-data/challenge-repo.constant";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-challenge-one",
  templateUrl: "./challenge-one.component.html",
  styleUrls: ["./challenge-one.component.scss"]
})
export class ChallengeOneComponent implements OnInit {
    public faArrowRight = faArrowRight;
    public tests: any;

    /**
     *
     * @param inputs
     */
    public testFunction(i: number[]): number {
        /**
         * Write code here!
         */
        const a = i.reduce(
            (acc, curr) => {
                if (curr > 0) {
                    acc += curr;
                }
                return acc;
            },
            0,
        );

        return a;
    }

    ngOnInit() {
        this.tests = ChallengeRepo[0].tests;
    }
}
