import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundUrlPageComponent } from './not-found-url-page.component';

describe('NotFoundUrlPageComponent', () => {
  let component: NotFoundUrlPageComponent;
  let fixture: ComponentFixture<NotFoundUrlPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundUrlPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundUrlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
