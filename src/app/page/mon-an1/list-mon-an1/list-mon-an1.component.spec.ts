import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMonAn1Component } from './list-mon-an1.component';

describe('ListMonAn1Component', () => {
  let component: ListMonAn1Component;
  let fixture: ComponentFixture<ListMonAn1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMonAn1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMonAn1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
