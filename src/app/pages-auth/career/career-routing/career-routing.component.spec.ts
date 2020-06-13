import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerRoutingComponent } from './career-routing.component';

describe('CareerRoutingComponent', () => {
  let component: CareerRoutingComponent;
  let fixture: ComponentFixture<CareerRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
