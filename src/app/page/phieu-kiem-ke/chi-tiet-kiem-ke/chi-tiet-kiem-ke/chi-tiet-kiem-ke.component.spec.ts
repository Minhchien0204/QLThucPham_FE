import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietKiemKeComponent } from './chi-tiet-kiem-ke.component';

describe('ChiTietKiemKeComponent', () => {
  let component: ChiTietKiemKeComponent;
  let fixture: ComponentFixture<ChiTietKiemKeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiTietKiemKeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietKiemKeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
