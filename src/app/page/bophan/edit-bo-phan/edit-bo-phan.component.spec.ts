import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoPhanComponent } from './edit-bo-phan.component';

describe('EditBoPhanComponent', () => {
  let component: EditBoPhanComponent;
  let fixture: ComponentFixture<EditBoPhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBoPhanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
