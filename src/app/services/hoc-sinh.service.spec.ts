import { TestBed } from '@angular/core/testing';

import { HocSinhService } from './hoc-sinh.service';

describe('HocSinhService', () => {
  let service: HocSinhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HocSinhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
