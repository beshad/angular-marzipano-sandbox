import { TestBed } from '@angular/core/testing';

import { TransitionService } from './transition.service';

describe('TransitionService', () => {
  let service: TransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
