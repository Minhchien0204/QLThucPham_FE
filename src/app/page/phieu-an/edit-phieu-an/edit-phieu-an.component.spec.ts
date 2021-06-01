import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhieuAnComponent } from './edit-phieu-an.component';

describe('EditPhieuAnComponent', () => {
  let component: EditPhieuAnComponent;
  let fixture: ComponentFixture<EditPhieuAnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhieuAnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhieuAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
