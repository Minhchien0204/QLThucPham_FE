import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChiTietCungCapOfComponent } from './list-chi-tiet-cung-cap-of.component';

describe('ListChiTietCungCapOfComponent', () => {
  let component: ListChiTietCungCapOfComponent;
  let fixture: ComponentFixture<ListChiTietCungCapOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChiTietCungCapOfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChiTietCungCapOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
