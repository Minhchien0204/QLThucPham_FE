import { TestBed } from '@angular/core/testing';

import { ChiTietYeuCauService } from './chi-tiet-yeu-cau.service';

describe('ChiTietYeuCauService', () => {
  let service: ChiTietYeuCauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiTietYeuCauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
