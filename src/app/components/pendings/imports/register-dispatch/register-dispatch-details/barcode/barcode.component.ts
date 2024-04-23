import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {registerDispatchDetailsActions} from '@appActions/pendings/imports/register-dispatch';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent implements AfterViewInit {
  @ViewChild('barcodeInput') public barcodeInput: ElementRef;
  barcode: string;

  constructor(private cdr: ChangeDetectorRef, private store: Store<AppState>) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.focusInput();
  }

  focusInput(): void {
    this.barcodeInput.nativeElement.focus();
  }

  goBack(): void {
    this.store.dispatch(registerDispatchDetailsActions.SET_ACTUAL_STEP({actualStep: 1}));
  }

  handleBarcode(event: {which: number; preventDefault: () => void}): void {
    if (event.which === 13) {
      this.store.dispatch(
        registerDispatchDetailsActions.READ_BARCODE_LOAD({
          barcode: this.barcode,
        }),
      );
      this.barcode = '';
      this.focusInput();
    }
  }
}
