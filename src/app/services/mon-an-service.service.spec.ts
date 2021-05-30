import { TestBed } from '@angular/core/testing';

import { MonAnServiceService } from './mon-an-service.service';

describe('MonAnServiceService', () => {
  let service: MonAnServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonAnServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
