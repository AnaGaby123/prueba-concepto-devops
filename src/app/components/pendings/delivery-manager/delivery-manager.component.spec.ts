import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeliveryManagerComponent} from './delivery-manager.component';

describe('DeliveryManagerComponent', () => {
  let component: DeliveryManagerComponent;
  let fixture: ComponentFixture<DeliveryManagerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeliveryManagerComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
