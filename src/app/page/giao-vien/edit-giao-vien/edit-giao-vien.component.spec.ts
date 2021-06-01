import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGiaoVienComponent } from './edit-giao-vien.component';

describe('EditGiaoVienComponent', () => {
  let component: EditGiaoVienComponent;
  let fixture: ComponentFixture<EditGiaoVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGiaoVienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGiaoVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
