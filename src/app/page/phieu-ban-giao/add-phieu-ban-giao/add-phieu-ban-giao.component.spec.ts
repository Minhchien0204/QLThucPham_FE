import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhieuBanGiaoComponent } from './add-phieu-ban-giao.component';

describe('AddPhieuBanGiaoComponent', () => {
  let component: AddPhieuBanGiaoComponent;
  let fixture: ComponentFixture<AddPhieuBanGiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhieuBanGiaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhieuBanGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
