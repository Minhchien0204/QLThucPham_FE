import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMonAnComponent } from './edit-mon-an.component';

describe('EditMonAnComponent', () => {
  let component: EditMonAnComponent;
  let fixture: ComponentFixture<EditMonAnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMonAnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMonAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
