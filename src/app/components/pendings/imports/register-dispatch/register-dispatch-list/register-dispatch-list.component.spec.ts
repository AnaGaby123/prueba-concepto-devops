import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegisterDispatchListComponent} from './register-dispatch-list.component';

describe('RegisterDispatchListComponent', () => {
  let component: RegisterDispatchListComponent;
  let fixture: ComponentFixture<RegisterDispatchListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterDispatchListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDispatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
