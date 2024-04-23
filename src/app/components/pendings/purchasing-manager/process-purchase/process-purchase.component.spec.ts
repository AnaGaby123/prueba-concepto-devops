import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProcessPurchaseComponent} from './process-purchase.component';

describe('ProcessPurchaseComponent', () => {
  let component: ProcessPurchaseComponent;
  let fixture: ComponentFixture<ProcessPurchaseComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProcessPurchaseComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
