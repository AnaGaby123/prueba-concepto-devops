import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeliveryTimeComponent} from './delivery-time.component';

describe('DeliveryTimeComponent', () => {
  let component: DeliveryTimeComponent;
  let fixture: ComponentFixture<DeliveryTimeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeliveryTimeComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
