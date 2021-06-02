import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDinhLuong1Component } from './add-dinh-luong1.component';

describe('AddDinhLuong1Component', () => {
  let component: AddDinhLuong1Component;
  let fixture: ComponentFixture<AddDinhLuong1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDinhLuong1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDinhLuong1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
