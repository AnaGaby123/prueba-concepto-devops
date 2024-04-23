import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShippingConsoleComponent} from './shipping-console.component';

describe('ShippingConsoleComponent', () => {
  let component: ShippingConsoleComponent;
  let fixture: ComponentFixture<ShippingConsoleComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ShippingConsoleComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
