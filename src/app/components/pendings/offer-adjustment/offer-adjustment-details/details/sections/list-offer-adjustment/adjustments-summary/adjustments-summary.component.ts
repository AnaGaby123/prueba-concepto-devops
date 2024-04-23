/* Core Container */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/* Selectors Imports */
import {adjustmentDetailsDetailsSelectors} from '@appSelectors/pendings/offer-adjustment';
import {IConfigExpressFreight} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';
import {AjOfCondicionesdePagoCotizacion} from 'api-logistica';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-adjustments-summary',
  templateUrl: './adjustments-summary.component.html',
  styleUrls: ['./adjustments-summary.component.scss'],
})
export class AdjustmentsSummaryComponent {
  originalPaymentConditions$: Observable<DropListOption> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectPaymentConditionsFormQuotation,
  );
  updatedPaymentConditions$: Observable<DropListOption> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectedPaymentConditionFromObj,
  );
  paymentConditionsObj$: Observable<AjOfCondicionesdePagoCotizacion> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectPaymentConditionsObj,
  );
  expressFreightList$: Observable<Array<IConfigExpressFreight>> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectExpressFreightList,
  );
  mergeItemsQuotation$: Observable<Array<any>> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectAllItemsInConfigurations,
  );
  quotationCurrency$: Observable<string> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectedQuotationCurrency,
  );
  selectInternalSalesItemResumeAdjustment$: Observable<InternalSalesItem[]> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectInternalSalesItemResumeAdjustment,
  );
  selectHeaderInternalSalesItemResumeAdjustment$: Observable<InternalSalesItem> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectHeaderInternalSalesItemResumeAdjustment,
  );
  itemsQuotation: Array<InternalSalesItem> = [];
  constructor(private store: Store<AppState>, private appService: CoreContainerService) {}

  getAvailabilityImage(value: string): string {
    switch (value) {
      case 'Disponible':
        return 'assets/Images/labels/productos/disponible.svg';
        break;
      default:
        return '';
    }
  }

  handleAction(model: ModelEmitInternalSalesItem): void {
    switch (model.action) {
      case NameActionsInternalSalesItem.SeeNotesItemAction:
        this.store.dispatch(
          SET_POP_UP_NOTES_DATA({
            notes: model.dataInternal.columnNotes,
            modalIsOpen: model.value,
          }),
        );
        this.appService.setTarget(model.target);
        break;
    }
  }
}
