import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhieuYeuCauComponent } from './edit-phieu-yeu-cau.component';

describe('EditPhieuYeuCauComponent', () => {
  let component: EditPhieuYeuCauComponent;
  let fixture: ComponentFixture<EditPhieuYeuCauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhieuYeuCauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhieuYeuCauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
