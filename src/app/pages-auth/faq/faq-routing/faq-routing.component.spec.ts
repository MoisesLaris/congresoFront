import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqRoutingComponent } from './faq-routing.component';

describe('FaqRoutingComponent', () => {
  let component: FaqRoutingComponent;
  let fixture: ComponentFixture<FaqRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
