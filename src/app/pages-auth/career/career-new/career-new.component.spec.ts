import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerNewComponent } from './career-new.component';

describe('CareerNewComponent', () => {
  let component: CareerNewComponent;
  let fixture: ComponentFixture<CareerNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
