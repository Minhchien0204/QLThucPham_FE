import { TestBed } from '@angular/core/testing';

import { PhieuBanGiaoService } from './phieu-ban-giao.service';

describe('PhieuBanGiaoService', () => {
  let service: PhieuBanGiaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieuBanGiaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
