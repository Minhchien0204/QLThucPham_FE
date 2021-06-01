import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhieuCungCapComponent } from './list-phieu-cung-cap.component';

describe('ListPhieuCungCapComponent', () => {
  let component: ListPhieuCungCapComponent;
  let fixture: ComponentFixture<ListPhieuCungCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPhieuCungCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhieuCungCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
