import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AssignMessengerDetailsComponent} from './assign-messenger-details.component';

describe('AssignMessengerDetailsComponent', () => {
  let component: AssignMessengerDetailsComponent;
  let fixture: ComponentFixture<AssignMessengerDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AssignMessengerDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignMessengerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
