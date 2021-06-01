import { TestBed } from '@angular/core/testing';

import { ThucPhamService } from './thuc-pham.service';

describe('ThucPhamService', () => {
  let service: ThucPhamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThucPhamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
