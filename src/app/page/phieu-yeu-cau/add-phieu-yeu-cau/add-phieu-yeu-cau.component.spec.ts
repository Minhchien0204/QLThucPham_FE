import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhieuYeuCauComponent } from './add-phieu-yeu-cau.component';

describe('AddPhieuYeuCauComponent', () => {
  let component: AddPhieuYeuCauComponent;
  let fixture: ComponentFixture<AddPhieuYeuCauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhieuYeuCauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhieuYeuCauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
