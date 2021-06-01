import { TestBed } from '@angular/core/testing';

import { PhieuGiaoService } from './phieu-giao.service';

describe('PhieuGiaoService', () => {
  let service: PhieuGiaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieuGiaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
