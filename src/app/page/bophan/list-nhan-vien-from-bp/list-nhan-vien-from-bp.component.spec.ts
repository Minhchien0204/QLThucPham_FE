import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNhanVienFromBpComponent } from './list-nhan-vien-from-bp.component';

describe('ListNhanVienFromBpComponent', () => {
  let component: ListNhanVienFromBpComponent;
  let fixture: ComponentFixture<ListNhanVienFromBpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNhanVienFromBpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNhanVienFromBpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
