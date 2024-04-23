import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ControlledProductsConfirmationDialogComponent} from './controlled-products-confirmation-dialog.component';

describe('ControlledProductsConfirmationDialogComponent', () => {
  let component: ControlledProductsConfirmationDialogComponent;
  let fixture: ComponentFixture<ControlledProductsConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlledProductsConfirmationDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlledProductsConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
