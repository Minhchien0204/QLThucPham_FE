import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhieuCungCapComponent } from './add-phieu-cung-cap.component';

describe('AddPhieuCungCapComponent', () => {
  let component: AddPhieuCungCapComponent;
  let fixture: ComponentFixture<AddPhieuCungCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhieuCungCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhieuCungCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
