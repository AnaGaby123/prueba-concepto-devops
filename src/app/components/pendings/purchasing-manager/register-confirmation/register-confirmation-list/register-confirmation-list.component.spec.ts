import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegisterConfirmationListComponent} from './register-confirmation-list.component';

describe('RegisterConfirmationListComponent', () => {
  let component: RegisterConfirmationListComponent;
  let fixture: ComponentFixture<RegisterConfirmationListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterConfirmationListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConfirmationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
