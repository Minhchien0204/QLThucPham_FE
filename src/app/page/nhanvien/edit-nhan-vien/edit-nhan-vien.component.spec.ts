import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNhanVienComponent } from './edit-nhan-vien.component';

describe('EditNhanVienComponent', () => {
  let component: EditNhanVienComponent;
  let fixture: ComponentFixture<EditNhanVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNhanVienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
