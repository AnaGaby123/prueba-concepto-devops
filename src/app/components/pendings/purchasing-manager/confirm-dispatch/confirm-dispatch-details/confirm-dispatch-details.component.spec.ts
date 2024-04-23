import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ConfirmDispatchDetailsComponent} from './confirm-dispatch-details.component';

describe('ConfirmDispatchDetailsComponent', () => {
  let component: ConfirmDispatchDetailsComponent;
  let fixture: ComponentFixture<ConfirmDispatchDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfirmDispatchDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDispatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
