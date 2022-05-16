import { TestBed } from '@angular/core/testing';

import { ChallengeAttemptService } from './challenge-attempt.service';

describe('ChallengeAttemptService', () => {
  let service: ChallengeAttemptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeAttemptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
