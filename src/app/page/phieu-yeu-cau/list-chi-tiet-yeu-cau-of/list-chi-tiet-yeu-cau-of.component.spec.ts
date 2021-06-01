import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChiTietYeuCauOfComponent } from './list-chi-tiet-yeu-cau-of.component';

describe('ListChiTietYeuCauOfComponent', () => {
  let component: ListChiTietYeuCauOfComponent;
  let fixture: ComponentFixture<ListChiTietYeuCauOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChiTietYeuCauOfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChiTietYeuCauOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
