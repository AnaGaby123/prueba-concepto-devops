import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrderModificationDetailsComponent} from './order-modification-details.component';

describe('OrderModificationDetailsComponent', () => {
  let component: OrderModificationDetailsComponent;
  let fixture: ComponentFixture<OrderModificationDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderModificationDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderModificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
