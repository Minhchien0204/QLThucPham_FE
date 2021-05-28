import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoMonAnComponent } from './tao-mon-an.component';

describe('TaoMonAnComponent', () => {
  let component: TaoMonAnComponent;
  let fixture: ComponentFixture<TaoMonAnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoMonAnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoMonAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
