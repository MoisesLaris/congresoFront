import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityControlComponent } from './activity-control.component';

describe('ActivityControlComponent', () => {
  let component: ActivityControlComponent;
  let fixture: ComponentFixture<ActivityControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
