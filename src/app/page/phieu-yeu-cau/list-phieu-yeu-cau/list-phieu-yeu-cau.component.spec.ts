import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhieuYeuCauComponent } from './list-phieu-yeu-cau.component';

describe('ListPhieuYeuCauComponent', () => {
  let component: ListPhieuYeuCauComponent;
  let fixture: ComponentFixture<ListPhieuYeuCauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPhieuYeuCauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhieuYeuCauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
