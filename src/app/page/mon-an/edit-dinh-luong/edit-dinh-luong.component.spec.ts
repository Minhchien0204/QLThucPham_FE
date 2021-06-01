import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDinhLuongComponent } from './edit-dinh-luong.component';

describe('EditDinhLuongComponent', () => {
  let component: EditDinhLuongComponent;
  let fixture: ComponentFixture<EditDinhLuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDinhLuongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDinhLuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
