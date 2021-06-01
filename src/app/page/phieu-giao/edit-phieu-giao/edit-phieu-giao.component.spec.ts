import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhieuGiaoComponent } from './edit-phieu-giao.component';

describe('EditPhieuGiaoComponent', () => {
  let component: EditPhieuGiaoComponent;
  let fixture: ComponentFixture<EditPhieuGiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhieuGiaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhieuGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
