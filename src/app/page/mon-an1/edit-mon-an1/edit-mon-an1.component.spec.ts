import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMonAn1Component } from './edit-mon-an1.component';

describe('EditMonAn1Component', () => {
  let component: EditMonAn1Component;
  let fixture: ComponentFixture<EditMonAn1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMonAn1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMonAn1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
