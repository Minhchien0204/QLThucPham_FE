import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDinhLuong1Component } from './list-dinh-luong1.component';

describe('ListDinhLuong1Component', () => {
  let component: ListDinhLuong1Component;
  let fixture: ComponentFixture<ListDinhLuong1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDinhLuong1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDinhLuong1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
