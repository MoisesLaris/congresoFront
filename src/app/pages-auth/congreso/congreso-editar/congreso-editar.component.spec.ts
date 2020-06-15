import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresoEditarComponent } from './congreso-editar.component';

describe('CongresoEditarComponent', () => {
  let component: CongresoEditarComponent;
  let fixture: ComponentFixture<CongresoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongresoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongresoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
