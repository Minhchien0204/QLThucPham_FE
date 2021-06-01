import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhieuBanGiaoComponent } from './list-phieu-ban-giao.component';

describe('ListPhieuBanGiaoComponent', () => {
  let component: ListPhieuBanGiaoComponent;
  let fixture: ComponentFixture<ListPhieuBanGiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPhieuBanGiaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhieuBanGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
