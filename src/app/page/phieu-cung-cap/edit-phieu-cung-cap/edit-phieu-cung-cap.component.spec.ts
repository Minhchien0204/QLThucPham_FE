import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhieuCungCapComponent } from './edit-phieu-cung-cap.component';

describe('EditPhieuCungCapComponent', () => {
  let component: EditPhieuCungCapComponent;
  let fixture: ComponentFixture<EditPhieuCungCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhieuCungCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhieuCungCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
