import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegisterArrivalComponent} from './register-arrival.component';

describe('RegisterArrivalComponent', () => {
  let component: RegisterArrivalComponent;
  let fixture: ComponentFixture<RegisterArrivalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterArrivalComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
