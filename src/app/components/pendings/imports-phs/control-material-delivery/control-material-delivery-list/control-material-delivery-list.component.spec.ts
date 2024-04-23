import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ControlMaterialDeliveryListComponent} from './control-material-delivery-list.component';

describe('ControlMaterialDeliveryListComponent', () => {
  let component: ControlMaterialDeliveryListComponent;
  let fixture: ComponentFixture<ControlMaterialDeliveryListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ControlMaterialDeliveryListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMaterialDeliveryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
