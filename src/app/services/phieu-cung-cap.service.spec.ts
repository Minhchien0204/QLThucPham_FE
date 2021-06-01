import { TestBed } from '@angular/core/testing';

import { PhieuCungCapService } from './phieu-cung-cap.service';

describe('PhieuCungCapService', () => {
  let service: PhieuCungCapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieuCungCapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
