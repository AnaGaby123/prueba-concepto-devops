import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShippingConsoleListComponent} from './shipping-console-list.component';

describe('ShippingConsoleListComponent', () => {
  let component: ShippingConsoleListComponent;
  let fixture: ComponentFixture<ShippingConsoleListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ShippingConsoleListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingConsoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
