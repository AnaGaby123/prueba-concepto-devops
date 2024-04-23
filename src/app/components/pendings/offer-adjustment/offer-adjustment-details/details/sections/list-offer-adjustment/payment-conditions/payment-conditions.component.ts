/* Core Container */
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Selectors Imports */
/* Actions Imports */
import {isEmpty} from 'lodash-es';

import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {Observable} from 'rxjs';
import {AjOfCondicionesdePagoCotizacion} from 'api-logistica';
import {adjustmentDetailsDetailsSelectors} from '@appSelectors/pendings/offer-adjustment';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {selectCatPaymentConditionsForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {offerAdjustmentDetailsActions} from '@appActions/pendings/offer-adjustment';

@Component({
  selector: 'app-payment-conditions',
  templateUrl: './payment-conditions.component.html',
  styleUrls: ['./payment-conditions.component.scss'],
})
export class PaymentConditionsComponent {
  paymentConditionsOBj$: Observable<AjOfCondicionesdePagoCotizacion> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectPaymentConditionsObj,
  );
  quotationPaymenCondition$: Observable<string> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectedQuotationPaymentCondition,
  );
  catPaymentConditions$: Observable<Array<DropListOption>> = this.store.select(
    selectCatPaymentConditionsForDropDown,
  );
  selectedPaymentCondition$: Observable<DropListOption> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectedPaymentConditionFromObj,
  );
  disableDays$: Observable<boolean> = this.store.select(
    adjustmentDetailsDetailsSelectors.disableAditionalDays,
  );
  lodashIsEmpty = isEmpty;
  readonly inputValidators = InputValidators;
  constructor(private store: Store<AppState>) {}
  setFormValue(field: string, value: any) {
    if (field === 'IdCatCondicionesDePago') {
      if (value.label.includes('Anticipo') || value.label.includes('entrega')) {
        this.store.dispatch(
          offerAdjustmentDetailsActions.SET_PAYMENT_CONDITIONS_FORM_VALUE({
            field: 'DiasAdicionales',
            value: 0,
          }),
        );
      }
      value = value.value;
    }
    value = field === 'DiasAdicionales' ? Number(value) : value;
    this.store.dispatch(
      offerAdjustmentDetailsActions.SET_PAYMENT_CONDITIONS_FORM_VALUE({field, value}),
    );
  }

  protected readonly Number = Number;
}
