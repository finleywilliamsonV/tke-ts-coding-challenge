import { Component } from '@angular/core';
import { ChallengeRepo } from './challenge-data/challenge-repo.constant';
import { IChallengeInfo } from './challenge-data/challenge.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    challenges: IChallengeInfo[] = ChallengeRepo;
    selectedChallenge: IChallengeInfo = this.challenges[0];
}
