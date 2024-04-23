import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegisterConfirmationDetailsComponent} from './register-confirmation-details.component';

describe('RegisterConfirmationDetailsComponent', () => {
  let component: RegisterConfirmationDetailsComponent;
  let fixture: ComponentFixture<RegisterConfirmationDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterConfirmationDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConfirmationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
