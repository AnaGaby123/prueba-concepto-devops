import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ControlMaterialDeliveryComponent} from './control-material-delivery.component';

describe('ControlMaterialDeliveryComponent', () => {
  let component: ControlMaterialDeliveryComponent;
  let fixture: ComponentFixture<ControlMaterialDeliveryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ControlMaterialDeliveryComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMaterialDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
