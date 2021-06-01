import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhieuGiaoComponent } from './list-phieu-giao.component';

describe('ListPhieuGiaoComponent', () => {
  let component: ListPhieuGiaoComponent;
  let fixture: ComponentFixture<ListPhieuGiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPhieuGiaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhieuGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
