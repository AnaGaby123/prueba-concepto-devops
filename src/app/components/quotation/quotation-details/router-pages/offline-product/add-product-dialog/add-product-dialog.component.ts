import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {VProducto} from 'api-catalogos';
import * as OPSelectors from '@appSelectors/quotation/quotation-details/details/sections/offline-product.selectors';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss'],
})
export class AddProductDialogComponent {
  productExisting$: Observable<VProducto> = this.store.select(OPSelectors.selectProductExisting);

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  setValueModal(value: boolean): void {
    this.dialog.close(value);
  }
}
