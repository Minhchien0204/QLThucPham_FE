import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoDinhLuongComponent } from './tao-dinh-luong.component';

describe('TaoDinhLuongComponent', () => {
  let component: TaoDinhLuongComponent;
  let fixture: ComponentFixture<TaoDinhLuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoDinhLuongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoDinhLuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
