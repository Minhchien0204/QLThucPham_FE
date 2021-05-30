import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNhaCungCapComponent } from './add-nha-cung-cap.component';

describe('AddNhaCungCapComponent', () => {
  let component: AddNhaCungCapComponent;
  let fixture: ComponentFixture<AddNhaCungCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNhaCungCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNhaCungCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
