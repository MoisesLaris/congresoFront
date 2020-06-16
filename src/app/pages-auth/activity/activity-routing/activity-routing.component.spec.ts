import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRoutingComponent } from './activity-routing.component';

describe('ActivityRoutingComponent', () => {
  let component: ActivityRoutingComponent;
  let fixture: ComponentFixture<ActivityRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
