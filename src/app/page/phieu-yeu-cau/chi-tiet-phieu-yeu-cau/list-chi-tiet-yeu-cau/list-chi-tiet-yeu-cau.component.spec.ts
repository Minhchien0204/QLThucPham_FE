import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChiTietYeuCauComponent } from './list-chi-tiet-yeu-cau.component';

describe('ListChiTietYeuCauComponent', () => {
  let component: ListChiTietYeuCauComponent;
  let fixture: ComponentFixture<ListChiTietYeuCauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChiTietYeuCauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChiTietYeuCauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
