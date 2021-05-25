import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLopComponent } from './list-lop.component';

describe('ListLopComponent', () => {
  let component: ListLopComponent;
  let fixture: ComponentFixture<ListLopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
