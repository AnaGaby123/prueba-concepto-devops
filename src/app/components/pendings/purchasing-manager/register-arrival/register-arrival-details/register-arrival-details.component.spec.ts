import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegisterArrivalDetailsComponent} from './register-arrival-details.component';

describe('RegisterArrivalDetailsComponent', () => {
  let component: RegisterArrivalDetailsComponent;
  let fixture: ComponentFixture<RegisterArrivalDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterArrivalDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterArrivalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
