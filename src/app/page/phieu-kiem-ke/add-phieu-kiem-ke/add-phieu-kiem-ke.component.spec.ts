import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhieuKiemKeComponent } from './add-phieu-kiem-ke.component';

describe('AddPhieuKiemKeComponent', () => {
  let component: AddPhieuKiemKeComponent;
  let fixture: ComponentFixture<AddPhieuKiemKeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhieuKiemKeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhieuKiemKeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
