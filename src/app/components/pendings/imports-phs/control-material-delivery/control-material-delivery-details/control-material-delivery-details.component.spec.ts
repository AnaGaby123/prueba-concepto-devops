import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ControlMaterialDeliveryDetailsComponent} from './control-material-delivery-details.component';

describe('ControlMaterialDeliveryDetailsComponent', () => {
  let component: ControlMaterialDeliveryDetailsComponent;
  let fixture: ComponentFixture<ControlMaterialDeliveryDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ControlMaterialDeliveryDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMaterialDeliveryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
