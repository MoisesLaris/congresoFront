import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresoNuevoComponent } from './congreso-nuevo.component';

describe('CongresoNuevoComponent', () => {
  let component: CongresoNuevoComponent;
  let fixture: ComponentFixture<CongresoNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongresoNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongresoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
