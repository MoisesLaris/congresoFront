import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresoControlComponent } from './congreso-control.component';

describe('CongresoControlComponent', () => {
  let component: CongresoControlComponent;
  let fixture: ComponentFixture<CongresoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongresoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongresoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
