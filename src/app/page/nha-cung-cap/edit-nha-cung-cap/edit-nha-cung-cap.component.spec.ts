import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNhaCungCapComponent } from './edit-nha-cung-cap.component';

describe('EditNhaCungCapComponent', () => {
  let component: EditNhaCungCapComponent;
  let fixture: ComponentFixture<EditNhaCungCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNhaCungCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNhaCungCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
