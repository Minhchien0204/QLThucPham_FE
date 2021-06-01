import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChiTietGiaoComponent } from './add-chi-tiet-giao.component';

describe('AddChiTietGiaoComponent', () => {
  let component: AddChiTietGiaoComponent;
  let fixture: ComponentFixture<AddChiTietGiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChiTietGiaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChiTietGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
