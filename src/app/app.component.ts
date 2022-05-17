import { Component, OnInit } from '@angular/core';
import { ChallengeRepo } from './challenge-data/challenge-repo.constant';
import { IChallengeInfo } from './challenge-data/challenge.interface';
import { ChallengeAttemptService } from './challenge-attempt.service';
import { tap } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    // member variables
    public challenges: IChallengeInfo[] = ChallengeRepo;
    public currentChallenge: IChallengeInfo = this.challenges[0];

    /**
     * Constructor
     */
    constructor(private challengeAttemptService: ChallengeAttemptService) { }


    /**
     * On Init Lifecycle Hook.
     */
    public ngOnInit(): void {
        this.challengeAttemptService.currentChallenge$
            .pipe(
                tap((cc) => console.log('currentChallengeChanged to', cc.challengeIndex)),
                tap((currentChallenge: IChallengeInfo) => this.currentChallenge = currentChallenge),
                tap((currentChallenge: IChallengeInfo) => localStorage.setItem('currentChallengeIndex', String(currentChallenge.challengeIndex)))
            ).subscribe()
    }

    /**
     * Sets the current challenge on the observable and in local storage
     */
    public onCurrentChallengeChange(): void {
        this.challengeAttemptService.currentChallenge$
            .next(this.currentChallenge)
    }
}
