import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBophanComponent } from './list-bophan.component';

describe('ListBophanComponent', () => {
  let component: ListBophanComponent;
  let fixture: ComponentFixture<ListBophanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBophanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBophanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
