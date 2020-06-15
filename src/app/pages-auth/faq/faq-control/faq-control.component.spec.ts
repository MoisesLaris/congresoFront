import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqControlComponent } from './faq-control.component';

describe('FaqControlComponent', () => {
  let component: FaqControlComponent;
  let fixture: ComponentFixture<FaqControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
