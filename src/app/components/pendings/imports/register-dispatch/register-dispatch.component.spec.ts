import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegisterDispatchComponent} from './register-dispatch.component';

describe('RegisterDispatchComponent', () => {
  let component: RegisterDispatchComponent;
  let fixture: ComponentFixture<RegisterDispatchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterDispatchComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
