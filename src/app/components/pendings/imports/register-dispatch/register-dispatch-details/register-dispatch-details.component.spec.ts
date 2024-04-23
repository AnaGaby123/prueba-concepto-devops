import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegisterDispatchDetailsComponent} from './register-dispatch-details.component';

describe('RegisterDispatchDetailsComponent', () => {
  let component: RegisterDispatchDetailsComponent;
  let fixture: ComponentFixture<RegisterDispatchDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterDispatchDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDispatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
