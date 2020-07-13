import { TestBed } from '@angular/core/testing';

import { FeedThroughService } from './feedthrough.service';

describe('FeedthroughService', () => {
  let service: FeedThroughService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedThroughService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
