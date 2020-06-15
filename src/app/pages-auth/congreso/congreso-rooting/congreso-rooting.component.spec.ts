import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresoRootingComponent } from './congreso-rooting.component';

describe('CongresoRootingComponent', () => {
  let component: CongresoRootingComponent;
  let fixture: ComponentFixture<CongresoRootingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongresoRootingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongresoRootingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
