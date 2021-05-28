import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHocSinhComponent } from './edit-hoc-sinh.component';

describe('EditHocSinhComponent', () => {
  let component: EditHocSinhComponent;
  let fixture: ComponentFixture<EditHocSinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHocSinhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHocSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
