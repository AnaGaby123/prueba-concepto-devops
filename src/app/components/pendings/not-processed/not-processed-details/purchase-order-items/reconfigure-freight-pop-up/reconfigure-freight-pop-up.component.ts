import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {selectNonWorkingDays, selectViewType} from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {notProcessedDetailActions} from '@appActions/pendings/not-processed';
import {IOrderNotProcessed} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';
import {notProcessedDetailsSelectors} from '@appSelectors/pendings/not-processed';
import {IClientContact} from '@appModels/shared/shared.models';
import {IPpPartidaPedidoObj} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';

import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {InternalSalesItem} from '@appModels/table/internal-sales-item';
import {currentDateWithoutHoursUTCFormatDate} from '@appUtil/dates';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';

@Component({
  selector: 'app-reconfigure-freight-pop-up',
  templateUrl: './reconfigure-freight-pop-up.component.html',
  styleUrls: ['./reconfigure-freight-pop-up.component.scss'],
})
export class ReconfigureFreightPopUpComponent implements OnInit {
  viewType$: Observable<string> = this.store.select(selectViewType);
  order$: Observable<IOrderNotProcessed> = this.store.select(
    notProcessedDetailsSelectors.selectOrderSelectedBackUp,
  );
  total$: Observable<number> = this.store.select(notProcessedDetailsSelectors.selectTotalsOrder);
  clientContactData$: Observable<IClientContact> = this.store.select(
    notProcessedDetailsSelectors.selectClientContactData,
  );
  items$: Observable<Array<IPpPartidaPedidoObj>> = this.store.select(
    notProcessedDetailsSelectors.selectItemsOrder,
  );
  apiStatus$: Observable<number> = this.store.select(notProcessedDetailsSelectors.selectApiStatus);
  orderTotalAmount$: Observable<ShoppingCartTotalsModel> = this.store.select(
    notProcessedDetailsSelectors.selectTotalAmount,
  );
  deliveryType$: Observable<DropListOption[]> = this.store.select(
    notProcessedDetailsSelectors.selectDeliveryType,
  );
  deliveryTypeSelected$: Observable<DropListOption> = this.store.select(
    notProcessedDetailsSelectors.selectDeliveryTypeSelected,
  );
  orderSelectedApplyExpressFlight$: Observable<boolean> = this.store.select(
    notProcessedDetailsSelectors.selectOrderSelectedApplyExpressFlight,
  );
  orderSelectedItemizedFreight$: Observable<boolean> = this.store.select(
    notProcessedDetailsSelectors.selectOrderSelectedItemizedFreight,
  );
  selectOrderSelected$: Observable<IOrderNotProcessed> = this.store.select(
    notProcessedDetailsSelectors.selectOrderSelected,
  );
  displayRowsConfig$: Observable<InternalSalesItem[]> = this.store.select(
    notProcessedDetailsSelectors.displayRowsConfigBackup,
  );
  displayRowsReconfigureFreight$: Observable<InternalSalesItem[]> = this.store.select(
    notProcessedDetailsSelectors.displayRowsConfigReconfigureFreight,
  );
  displayColumnsConfig$: Observable<InternalSalesItem> = this.store.select(
    notProcessedDetailsSelectors.displayColumnsConfig,
  );
  isValidQuotation$: Observable<boolean> = this.store.select(
    notProcessedDetailsSelectors.isValidQuotation,
  );
  currency$: Observable<string> = this.store.select(
    notProcessedDetailsSelectors.selectCurrencyLabel,
  );
  hasBeenReconfigureFreight$: Observable<boolean> = this.store.select(
    notProcessedDetailsSelectors.hasBeenReconfigureFreight,
  );
  selectNonWorkingDays$ = this.store.select(selectNonWorkingDays);
  estimatedAdjustmentDate$ = this.store.select(
    notProcessedDetailsSelectors.selectEstimatedAdjustmentDate,
  );

  readonly viewTypes = AppViewTypes;
  readonly inputTypes = InputValidators;
  readonly FIELD_CATALOG = 'Catalogo';
  readonly FIELD_DESCRIPTION = 'Descripcion';
  readonly FIELD_PRESENTATION = 'Presentacion';
  readonly FIELD_TRADEMARK = 'Marca';
  readonly FIELD_TEE = 'TiempoEstimadoEntrega';
  readonly FIELD_IVA = 'IVA';
  readonly FIELD_UNIT_PRICE = 'PrecioUnitario';
  readonly FIELD_COMMENTS = 'Comentarios';
  scrolledItems: InternalSalesItem[] = [];
  reconfiguredItems: InternalSalesItem[] = [];
  tooltip = false;
  targetPop: any;
  rangeStart = currentDateWithoutHoursUTCFormatDate();

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialogRef<ReconfigureFreightPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  handleTrackBy(index: number, entry: InternalSalesItem): string {
    return entry?.data?.IdCotPartidaCotizacion;
  }

  deleteItem(item: IPpPartidaPedidoObj): void {
    this.store.dispatch(notProcessedDetailActions.UPDATE_STATUS_ITEM_ORDER({item}));
  }

  setIncidenceValue(IdPPOrderItem: string, field: string, value: boolean | string): void {
    this.store.dispatch(
      notProcessedDetailActions.SET_INCIDENCE_VALUE({
        IdPPOrderItem,
        field,
        value,
      }),
    );
  }

  handleDeliveryType(deliveryType: DropListOption): void {
    this.store.dispatch(notProcessedDetailActions.SELECT_DELIVERY_TYPE({deliveryType}));
    this.setData('EntregaUnica', deliveryType.value === 'Unica');
  }

  setData(key: string, data: boolean | string): void {
    this.store.dispatch(notProcessedDetailActions.SET_GM_RECONFIGURE_FREIGHT_DATA({key, data}));
  }

  handleDate(value): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const dateString = date.toISOString();
    this.setData('FechaEstimadaAjuste', dateString);
  }

  onClose(event: boolean, isReconfigureFreight?: boolean): void {
    this.dialog.close({event, isReconfigureFreight});
  }
}
