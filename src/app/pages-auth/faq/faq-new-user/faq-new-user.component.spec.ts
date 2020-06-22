import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqNewUserComponent } from './faq-new-user.component';

describe('FaqNewUserComponent', () => {
  let component: FaqNewUserComponent;
  let fixture: ComponentFixture<FaqNewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqNewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
