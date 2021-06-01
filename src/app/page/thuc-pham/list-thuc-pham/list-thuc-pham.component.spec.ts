import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListThucPhamComponent } from './list-thuc-pham.component';

describe('ListThucPhamComponent', () => {
  let component: ListThucPhamComponent;
  let fixture: ComponentFixture<ListThucPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListThucPhamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListThucPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
