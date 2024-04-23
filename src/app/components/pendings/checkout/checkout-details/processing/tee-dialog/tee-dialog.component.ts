import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {checkoutDetailsSelectors} from '@appSelectors/pendings/checkout';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {
  RestriccionTemporalDatosFacturacion,
  TpPartidaPedidoAddendaSanofi,
  TpPedido,
  VTramitarPedidoPartidaDetalle,
} from 'api-logistica';
import {
  IOrdersC,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/checkout/checkout-details/checkout-details.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

import {CalendarDay} from '@appModels/calendario/calendar';
import {checkoutDetailsActions} from '@appActions/pendings/checkout';
import {
  SeeItemDetailsPopBottom,
  SeeItemDetailsPopTop,
} from '@appModels/see-details-item-pop/see-item-details-pop.models';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-tee-dialog',
  templateUrl: './tee-dialog.component.html',
  styleUrls: ['./tee-dialog.component.scss'],
})
export class TeeDialogComponent {
  @ViewChild('imageElement') imageElement: ElementRef;

  validateTeePop$: Observable<boolean> = this.store.select(checkoutDetailsSelectors.validateTEEPop);
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  entry$: Observable<VTramitarPedidoPartidaDetalle> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseOrderVTramitarPedidoPartida,
  );
  selectInfoDetailsTop$: Observable<SeeItemDetailsPopTop> = this.store.select(
    checkoutDetailsSelectors.selectDetailsItemPopTop,
  );

  selectDetailsItemPopBottom$: Observable<SeeItemDetailsPopBottom> = this.store.select(
    checkoutDetailsSelectors.selectDetailsItemPopBottom,
  );
  purchaseOrder$: Observable<IOrdersC> = this.store.select(
    checkoutDetailsSelectors.selectedPurchaseOrder,
  );
  tpPedido$: Observable<TpPedido> = this.store.select(checkoutDetailsSelectors.selectTpPedido);
  selectTpPartidaPedidoAddendaSanofi$: Observable<TpPartidaPedidoAddendaSanofi> = this.store.select(
    checkoutDetailsSelectors.selectTpPartidaPedidoAddendaSanofi,
  );
  selectListUnidadPqf$: Observable<DropListOption | null> = this.store.select(
    checkoutDetailsSelectors.selectListUnidadPqf,
  );
  selectListUnidad$: Observable<Array<DropListOption>> = this.store.select(
    checkoutDetailsSelectors.selectListUnidad,
  );
  selectFirstRestrictionTemporalFacturation$: Observable<
    RestriccionTemporalDatosFacturacion
  > = this.store.select(checkoutDetailsSelectors.selectFirstRestrictionTemporalFacturation);
  tpPartidaPedido$: Observable<IPurchaseOrderItem> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseTpPartidaPedido,
  );
  selectNonAvailableDays$: Observable<CalendarDay[]> = this.store.select(
    checkoutDetailsSelectors.selectUnavailableDatesCalendarDay,
  );
  selectedDate$: Observable<Date> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseSelectedDate,
  );
  rangeStart$: Observable<Date> = this.store.select(
    checkoutDetailsSelectors.selectFEEDateRangeStart,
  );
  selectFEERangeEnd$: Observable<Date> = this.store.select(
    checkoutDetailsSelectors.selectFEERangeEnd,
  );
  selectFEE$: Observable<Date> = this.store.select(checkoutDetailsSelectors.selectFEE);

  readonly TEE_POP = 'tee';
  readonly inputValidators = InputValidators;
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<TeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      emit?: boolean;
      item?: IPurchaseOrderItem;
    },
  ) {}

  selectUnidadMedida(event: DropListOption): void {
    this.setAddendaInfo(event?.value, 'IdCatUnidad');
  }

  setAddendaInfo(value: string, field: string): void {
    this.store.dispatch(
      checkoutDetailsActions.SET_SANOFI_VALUE({
        field,
        value: typeof value === 'string' ? value : value,
      }),
    );
  }

  handleDate(value): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const dateString = date.toISOString();
    this.store.dispatch(
      checkoutDetailsActions.SET_POP_ITEM_ESTIMATED_FEE({
        date,
        dateString,
      }),
    );
  }

  setPopItemStringValue(comments: string, node: string, isNumber = false): void {
    const comment: string | number = isNumber ? Number(comments) : comments;
    this.store.dispatch(
      checkoutDetailsActions.SET_POP_ITEM_STRING_VALUE({
        comments: comment,
        node,
      }),
    );
  }

  setPopItemScheduled(scheduled: boolean): void {
    this.store.dispatch(
      checkoutDetailsActions.SET_POP_ITEM_SCHEDULED({
        scheduled,
      }),
    );
  }

  onClose(
    pop: string,
    isOpen: boolean,
    target: any,
    emit?: boolean,
    item?: IPurchaseOrderItem,
  ): void {
    this.dialog.close({target, emit, item});
  }
}
