import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChiTietGiaoOfComponent } from './list-chi-tiet-giao-of.component';

describe('ListChiTietGiaoOfComponent', () => {
  let component: ListChiTietGiaoOfComponent;
  let fixture: ComponentFixture<ListChiTietGiaoOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChiTietGiaoOfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChiTietGiaoOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
