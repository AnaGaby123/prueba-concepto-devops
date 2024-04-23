import {Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {
  IGMCotPartidasDetalle,
  QuotationItemCombined,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';

@Component({
  selector: 'app-item-saved-details-dialog',
  templateUrl: './item-saved-details-dialog.component.html',
  styleUrls: ['./item-saved-details-dialog.component.scss'],
})
export class ItemSavedDetailsDialogComponent {
  selectValidateBtn$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectValidateBtnPoPDetailsItem,
  );
  viewType$: Observable<string> = this.store.select(selectViewType);
  selectedProduct$: Observable<IGMCotPartidasDetalle> = this.store.select(
    quotationDetailsSelectors.selectSelectedProductDetail,
  );
  optionsProduct$: Observable<ITabOption[]> = this.store.select(
    quotationDetailsSelectors.selectOptions,
  );
  optionSelected$: Observable<ITabOption> = this.store.select(
    quotationDetailsSelectors.selectOptionSelected,
  );

  readonly viewTypes = AppViewTypes;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<ItemSavedDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      itemQuotation: QuotationItemCombined;
    },
  ) {}

  onClose(value: boolean): void {
    this.dialog.close(value);
  }
}
