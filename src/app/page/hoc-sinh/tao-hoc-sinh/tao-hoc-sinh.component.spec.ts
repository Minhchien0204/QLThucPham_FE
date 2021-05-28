import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoHocSinhComponent } from './tao-hoc-sinh.component';

describe('TaoHocSinhComponent', () => {
  let component: TaoHocSinhComponent;
  let fixture: ComponentFixture<TaoHocSinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoHocSinhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoHocSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
