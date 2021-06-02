import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonAn1Component } from './add-mon-an1.component';

describe('AddMonAn1Component', () => {
  let component: AddMonAn1Component;
  let fixture: ComponentFixture<AddMonAn1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMonAn1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMonAn1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
