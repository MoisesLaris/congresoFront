import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCalendarAdminComponent } from './activity-calendar-admin.component';

describe('ActivityCalendarAdminComponent', () => {
  let component: ActivityCalendarAdminComponent;
  let fixture: ComponentFixture<ActivityCalendarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityCalendarAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCalendarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
