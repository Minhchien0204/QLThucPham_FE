import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChiTietCungCapComponent } from './add-chi-tiet-cung-cap.component';

describe('AddChiTietCungCapComponent', () => {
  let component: AddChiTietCungCapComponent;
  let fixture: ComponentFixture<AddChiTietCungCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChiTietCungCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChiTietCungCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
