import { TestBed } from '@angular/core/testing';

import { CurrentlyViewingService } from './currently-viewing.service';

describe('CurrentlyViewingService', () => {
  let service: CurrentlyViewingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentlyViewingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
