import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHocSinhComponent } from './list-hoc-sinh.component';

describe('ListHocSinhComponent', () => {
  let component: ListHocSinhComponent;
  let fixture: ComponentFixture<ListHocSinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHocSinhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHocSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
