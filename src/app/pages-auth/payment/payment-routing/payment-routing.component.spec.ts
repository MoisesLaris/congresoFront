import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRoutingComponent } from './payment-routing.component';

describe('PaymentRoutingComponent', () => {
  let component: PaymentRoutingComponent;
  let fixture: ComponentFixture<PaymentRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
