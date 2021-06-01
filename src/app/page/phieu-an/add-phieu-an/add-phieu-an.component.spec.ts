import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhieuAnComponent } from './add-phieu-an.component';

describe('AddPhieuAnComponent', () => {
  let component: AddPhieuAnComponent;
  let fixture: ComponentFixture<AddPhieuAnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhieuAnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhieuAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
