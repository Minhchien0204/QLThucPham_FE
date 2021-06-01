import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhieuAnComponent } from './list-phieu-an.component';

describe('ListPhieuAnComponent', () => {
  let component: ListPhieuAnComponent;
  let fixture: ComponentFixture<ListPhieuAnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPhieuAnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhieuAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
