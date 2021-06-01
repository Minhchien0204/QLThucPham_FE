import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChiTietBanGiaoOfComponent } from './list-chi-tiet-ban-giao-of.component';

describe('ListChiTietBanGiaoOfComponent', () => {
  let component: ListChiTietBanGiaoOfComponent;
  let fixture: ComponentFixture<ListChiTietBanGiaoOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChiTietBanGiaoOfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChiTietBanGiaoOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
