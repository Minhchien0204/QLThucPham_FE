import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoNhanVienComponent } from './tao-nhan-vien.component';

describe('TaoNhanVienComponent', () => {
  let component: TaoNhanVienComponent;
  let fixture: ComponentFixture<TaoNhanVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoNhanVienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoNhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
