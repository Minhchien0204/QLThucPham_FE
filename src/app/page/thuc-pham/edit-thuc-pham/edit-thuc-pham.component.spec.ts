import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThucPhamComponent } from './edit-thuc-pham.component';

describe('EditThucPhamComponent', () => {
  let component: EditThucPhamComponent;
  let fixture: ComponentFixture<EditThucPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditThucPhamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThucPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
