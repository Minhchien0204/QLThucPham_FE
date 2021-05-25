import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoLopComponent } from './tao-lop.component';

describe('TaoLopComponent', () => {
  let component: TaoLopComponent;
  let fixture: ComponentFixture<TaoLopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoLopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
