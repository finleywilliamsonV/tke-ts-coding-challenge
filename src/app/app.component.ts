import { Component, OnInit } from '@angular/core';
import { ChallengeRepo } from './challenge-data/challenge-repo.constant';
import { IChallengeInfo } from './challenge-data/challenge.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    // member variables
    challenges: IChallengeInfo[] = ChallengeRepo;
    selectedChallenge: IChallengeInfo = this.challenges[0];

    /**
     * On Init Lifecycle Hook.
     */
    ngOnInit(): void {
        const currentChallenge: string | null = localStorage.getItem('currentChallenge');
        if (currentChallenge) {
            this.selectedChallenge = this.challenges[parseInt(currentChallenge, 10)];
        } else {
            this.selectedChallenge = this.challenges[0];
            localStorage.setItem('currentChallenge', '0');
        }
    }

    /**
     * Stores the current challenge in local storage.
     */
    public storeCurrentChallenge(): void {
        localStorage.setItem('currentChallenge', String(this.selectedChallenge.challengeNumber - 1));
    }
}
