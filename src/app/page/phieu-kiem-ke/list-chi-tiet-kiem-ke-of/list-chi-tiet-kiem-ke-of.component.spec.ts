import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChiTietKiemKeOfComponent } from './list-chi-tiet-kiem-ke-of.component';

describe('ListChiTietKiemKeOfComponent', () => {
  let component: ListChiTietKiemKeOfComponent;
  let fixture: ComponentFixture<ListChiTietKiemKeOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChiTietKiemKeOfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChiTietKiemKeOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
