import { TestBed } from '@angular/core/testing';

import { ChiTietGiaoService } from './chi-tiet-giao.service';

describe('ChiTietGiaoService', () => {
  let service: ChiTietGiaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiTietGiaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
