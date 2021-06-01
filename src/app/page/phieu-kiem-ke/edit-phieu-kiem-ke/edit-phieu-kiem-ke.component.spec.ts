import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhieuKiemKeComponent } from './edit-phieu-kiem-ke.component';

describe('EditPhieuKiemKeComponent', () => {
  let component: EditPhieuKiemKeComponent;
  let fixture: ComponentFixture<EditPhieuKiemKeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhieuKiemKeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhieuKiemKeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
