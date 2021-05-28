import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMonAnComponent } from './list-mon-an.component';

describe('ListMonAnComponent', () => {
  let component: ListMonAnComponent;
  let fixture: ComponentFixture<ListMonAnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMonAnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMonAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
