import { TestBed } from '@angular/core/testing';

import { ChiTietKiemKeService } from './chi-tiet-kiem-ke.service';

describe('ChiTietKiemKeService', () => {
  let service: ChiTietKiemKeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiTietKiemKeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
