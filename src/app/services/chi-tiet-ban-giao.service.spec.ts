import { TestBed } from '@angular/core/testing';

import { ChiTietBanGiaoService } from './chi-tiet-ban-giao.service';

describe('ChiTietBanGiaoService', () => {
  let service: ChiTietBanGiaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiTietBanGiaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
