import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackControlComponent } from './pack-control.component';

describe('PackControlComponent', () => {
  let component: PackControlComponent;
  let fixture: ComponentFixture<PackControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
