import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhieuKiemKeComponent } from './list-phieu-kiem-ke.component';

describe('ListPhieuKiemKeComponent', () => {
  let component: ListPhieuKiemKeComponent;
  let fixture: ComponentFixture<ListPhieuKiemKeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPhieuKiemKeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhieuKiemKeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
