import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhieuGiaoComponent } from './add-phieu-giao.component';

describe('AddPhieuGiaoComponent', () => {
  let component: AddPhieuGiaoComponent;
  let fixture: ComponentFixture<AddPhieuGiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhieuGiaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhieuGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
