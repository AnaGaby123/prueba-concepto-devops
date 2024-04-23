import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProcessPurchaseListComponent} from './process-purchase-list.component';

describe('ProcessPurchaseListComponent', () => {
  let component: ProcessPurchaseListComponent;
  let fixture: ComponentFixture<ProcessPurchaseListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProcessPurchaseListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPurchaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
