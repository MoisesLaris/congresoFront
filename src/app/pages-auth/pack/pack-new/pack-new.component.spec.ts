import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackNewComponent } from './pack-new.component';

describe('PackNewComponent', () => {
  let component: PackNewComponent;
  let fixture: ComponentFixture<PackNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
