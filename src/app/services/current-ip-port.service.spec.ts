import { TestBed } from '@angular/core/testing';

import { CurrentIpPortService } from './current-ip-port.service';

describe('CurrentIpPortService', () => {
  let service: CurrentIpPortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentIpPortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
