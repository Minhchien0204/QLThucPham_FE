import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNhaCungCapComponent } from './list-nha-cung-cap.component';

describe('ListNhaCungCapComponent', () => {
  let component: ListNhaCungCapComponent;
  let fixture: ComponentFixture<ListNhaCungCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNhaCungCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNhaCungCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
