import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeliveryRoutesComponent} from './delivery-routes.component';

describe('DeliveryRoutesComponent', () => {
  let component: DeliveryRoutesComponent;
  let fixture: ComponentFixture<DeliveryRoutesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeliveryRoutesComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
