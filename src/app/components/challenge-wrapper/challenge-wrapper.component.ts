import { AfterContentInit, Component, OnDestroy, OnInit } from "@angular/core";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ChallengeAttemptService, SubmissionRecord } from '../../challenge-attempt.service';
import { combineLatestWith, Subscription, switchMap, takeUntil, tap, zip } from 'rxjs';
import { IChallengeInfo } from '../../challenge-data/challenge.interface';

@Component({
    selector: "app-challenge-wrapper",
    templateUrl: "./challenge-wrapper.component.html",
    styleUrls: ["./challenge-wrapper.component.scss"]
})
export class ChallengeWrapperComponent implements OnInit, OnDestroy {

    // icons
    faX = faX;
    faCheck = faCheck;

    // whether the challenge is solved
    solved: boolean = true;

    // hold subscription for cleanup
    submissionSub!: Subscription

    constructor(private challengeAttemptService: ChallengeAttemptService) { }

    ngOnInit(): void {

        this.submissionSub = this.challengeAttemptService.currentChallenge$
            .pipe(
                combineLatestWith(this.challengeAttemptService.submissionStatus$),
                tap((combination: [IChallengeInfo, SubmissionRecord]) => {
                    this.solved = this.challengeAttemptService.isChallengeSolved(combination[0].challengeIndex)
                    console.log('this.solved:', this.solved)
                })
            )
            .subscribe()
    }

    ngOnDestroy(): void {
        this.submissionSub?.unsubscribe()
    }
}
