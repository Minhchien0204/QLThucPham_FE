import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadMenuBarComponent } from './head-menu-bar.component';

describe('HeadMenuBarComponent', () => {
  let component: HeadMenuBarComponent;
  let fixture: ComponentFixture<HeadMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadMenuBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
