import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DiscountFreightComponent} from './discount-freight.component';

describe('DiscountFreightComponent', () => {
  let component: DiscountFreightComponent;
  let fixture: ComponentFixture<DiscountFreightComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DiscountFreightComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountFreightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
