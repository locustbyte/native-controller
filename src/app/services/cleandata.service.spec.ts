import { TestBed } from '@angular/core/testing';

import { CleandataService } from './cleandata.service';

describe('CleandataService', () => {
  let service: CleandataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CleandataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
