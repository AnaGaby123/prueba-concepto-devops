import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegisterArrivalListComponent} from './register-arrival-list.component';

describe('RegisterArrivalListComponent', () => {
  let component: RegisterArrivalListComponent;
  let fixture: ComponentFixture<RegisterArrivalListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterArrivalListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterArrivalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
