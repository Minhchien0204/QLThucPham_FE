import { TestBed } from '@angular/core/testing';

import { PhieuKiemKeService } from './phieu-kiem-ke.service';

describe('PhieuKiemKeService', () => {
  let service: PhieuKiemKeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieuKiemKeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
