import { TestBed } from '@angular/core/testing';

import { PhieuYeuCauService } from './phieu-yeu-cau.service';

describe('PhieuYeuCauService', () => {
  let service: PhieuYeuCauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieuYeuCauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
