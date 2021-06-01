import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChiTietYeuCauComponent } from './add-chi-tiet-yeu-cau.component';

describe('AddChiTietYeuCauComponent', () => {
  let component: AddChiTietYeuCauComponent;
  let fixture: ComponentFixture<AddChiTietYeuCauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChiTietYeuCauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChiTietYeuCauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
