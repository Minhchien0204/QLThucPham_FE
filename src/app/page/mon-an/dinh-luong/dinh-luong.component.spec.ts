import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhLuongComponent } from './dinh-luong.component';

describe('DinhLuongComponent', () => {
  let component: DinhLuongComponent;
  let fixture: ComponentFixture<DinhLuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinhLuongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhLuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
