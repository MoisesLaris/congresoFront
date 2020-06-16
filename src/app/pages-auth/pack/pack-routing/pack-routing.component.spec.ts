import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackRoutingComponent } from './pack-routing.component';

describe('PackRoutingComponent', () => {
  let component: PackRoutingComponent;
  let fixture: ComponentFixture<PackRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
