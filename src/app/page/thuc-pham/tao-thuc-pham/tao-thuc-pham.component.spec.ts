import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoThucPhamComponent } from './tao-thuc-pham.component';

describe('TaoThucPhamComponent', () => {
  let component: TaoThucPhamComponent;
  let fixture: ComponentFixture<TaoThucPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoThucPhamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoThucPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
