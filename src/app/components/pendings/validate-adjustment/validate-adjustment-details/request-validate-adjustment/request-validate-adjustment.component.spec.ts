import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RequestValidateAdjustmentComponent} from './request-validate-adjustment.component';

describe('RequestValidateAdjustmentComponent', () => {
  let component: RequestValidateAdjustmentComponent;
  let fixture: ComponentFixture<RequestValidateAdjustmentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RequestValidateAdjustmentComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestValidateAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
