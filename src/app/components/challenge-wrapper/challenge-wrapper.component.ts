import { AfterContentInit, Component, OnInit } from "@angular/core";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ChallengeAttemptService, SubmissionRecord } from '../../challenge-attempt.service';
import { tap } from 'rxjs';

@Component({
  selector: "app-challenge-wrapper",
  templateUrl: "./challenge-wrapper.component.html",
  styleUrls: ["./challenge-wrapper.component.scss"]
})
export class ChallengeWrapperComponent implements OnInit {
    faX = faX;
    faCheck = faCheck;

    solved: boolean = true;

    constructor(private challengeAttemptService: ChallengeAttemptService) {}

    ngOnInit(): void {
        this.challengeAttemptService.submissionStatus$
            .pipe(
                tap((submissionRecord: SubmissionRecord) => {
                    
                })
            )
            .subscribe()
    }
}
