import { TestBed } from '@angular/core/testing';

import { PhieuAnService } from './phieu-an.service';

describe('PhieuAnService', () => {
  let service: PhieuAnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieuAnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
