import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHocSinhMainComponent } from './list-hoc-sinh-main.component';

describe('ListHocSinhMainComponent', () => {
  let component: ListHocSinhMainComponent;
  let fixture: ComponentFixture<ListHocSinhMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHocSinhMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHocSinhMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
