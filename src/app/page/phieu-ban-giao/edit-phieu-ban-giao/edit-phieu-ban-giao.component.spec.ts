import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhieuBanGiaoComponent } from './edit-phieu-ban-giao.component';

describe('EditPhieuBanGiaoComponent', () => {
  let component: EditPhieuBanGiaoComponent;
  let fixture: ComponentFixture<EditPhieuBanGiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhieuBanGiaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhieuBanGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
