import { TestBed } from '@angular/core/testing';

import { ChiTietCungCapService } from './chi-tiet-cung-cap.service';

describe('ChiTietCungCapService', () => {
  let service: ChiTietCungCapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiTietCungCapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
