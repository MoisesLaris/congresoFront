import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerControlComponent } from './career-control.component';

describe('CareerControlComponent', () => {
  let component: CareerControlComponent;
  let fixture: ComponentFixture<CareerControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
