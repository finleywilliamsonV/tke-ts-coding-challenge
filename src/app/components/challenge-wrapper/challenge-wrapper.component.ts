import { AfterContentInit, Component, OnInit } from "@angular/core";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ChallengeAttemptService, SubmissionRecord } from '../../challenge-attempt.service';
import { combineLatestWith, switchMap, tap, zip } from 'rxjs';
import { IChallengeInfo } from '../../challenge-data/challenge.interface';

@Component({
    selector: "app-challenge-wrapper",
    templateUrl: "./challenge-wrapper.component.html",
    styleUrls: ["./challenge-wrapper.component.scss"]
})
export class ChallengeWrapperComponent implements OnInit {

    // icons
    faX = faX;
    faCheck = faCheck;

    // whether the challenge is solved
    solved: boolean = true;

    constructor(private challengeAttemptService: ChallengeAttemptService) { }

    ngOnInit(): void {
        find me
        // this.challengeAttemptService.submissionStatus$
        //     .pipe(
        //         switchMap(() => )
        //     )
        this.challengeAttemptService.currentChallenge$
            .pipe(
                tap((currentChallenge: IChallengeInfo) => {
                    this.solved = this.challengeAttemptService.isChallengeSolved(currentChallenge.challengeIndex)
                    console.log('this.solved:', this.solved)
                })
            )
            .subscribe()
    }
}
