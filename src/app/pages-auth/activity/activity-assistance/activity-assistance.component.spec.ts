import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityAssistanceComponent } from './activity-assistance.component';

describe('ActivityAssistanceComponent', () => {
  let component: ActivityAssistanceComponent;
  let fixture: ComponentFixture<ActivityAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
