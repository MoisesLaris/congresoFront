import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceRoutingComponent } from './assistance-routing.component';

describe('AssistanceRoutingComponent', () => {
  let component: AssistanceRoutingComponent;
  let fixture: ComponentFixture<AssistanceRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistanceRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
