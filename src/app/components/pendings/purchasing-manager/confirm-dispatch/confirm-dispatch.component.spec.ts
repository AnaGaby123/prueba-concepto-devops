import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ConfirmDispatchComponent} from './confirm-dispatch.component';

describe('ConfirmDispatchComponent', () => {
  let component: ConfirmDispatchComponent;
  let fixture: ComponentFixture<ConfirmDispatchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfirmDispatchComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
