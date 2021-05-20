import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNhanVienComponent } from './list-nhan-vien.component';

describe('ListNhanVienComponent', () => {
  let component: ListNhanVienComponent;
  let fixture: ComponentFixture<ListNhanVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNhanVienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
