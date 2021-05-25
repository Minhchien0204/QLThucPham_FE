import { TestBed } from '@angular/core/testing';

import { GiaoVienService } from './giao-vien.service';

describe('GiaoVienService', () => {
  let service: GiaoVienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiaoVienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
