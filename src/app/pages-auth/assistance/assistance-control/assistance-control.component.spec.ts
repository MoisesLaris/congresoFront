import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceControlComponent } from './assistance-control.component';

describe('AssistanceControlComponent', () => {
  let component: AssistanceControlComponent;
  let fixture: ComponentFixture<AssistanceControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistanceControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
