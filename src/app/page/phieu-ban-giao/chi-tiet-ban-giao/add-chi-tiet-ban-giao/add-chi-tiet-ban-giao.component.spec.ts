import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChiTietBanGiaoComponent } from './add-chi-tiet-ban-giao.component';

describe('AddChiTietBanGiaoComponent', () => {
  let component: AddChiTietBanGiaoComponent;
  let fixture: ComponentFixture<AddChiTietBanGiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChiTietBanGiaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChiTietBanGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
