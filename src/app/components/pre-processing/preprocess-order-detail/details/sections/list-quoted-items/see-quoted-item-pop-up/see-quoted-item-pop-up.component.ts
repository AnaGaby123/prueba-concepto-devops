import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {preProcessOrderDetailsSelectors} from '@appSelectors/pre-processing';
import {Store} from '@ngrx/store';
import {IDetailsTEE} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {preProcessDetailsActions} from '@appActions/pre-processing';
import {IPpPartidaPedidoDetallePretamitar} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';
import {CalendarDay} from '@appModels/calendario/calendar';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {RestriccionTemporalDatosFacturacion} from 'api-logistica';
import {
  SeeItemDetailsPopBottom,
  SeeItemDetailsPopTop,
} from '@appModels/see-details-item-pop/see-item-details-pop.models';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {AppState} from '@appCore/core.state';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-see-quoted-item-pop-up',
  templateUrl: './see-quoted-item-pop-up.component.html',
  styleUrls: ['./see-quoted-item-pop-up.component.scss'],
})
export class SeeQuotedItemPopUpComponent {
  selectValidationBtnPopTEE$: Observable<boolean> = this.store.select(
    preProcessOrderDetailsSelectors.selectValidationBtnButton,
  );
  selectRequieredAddendum$: Observable<boolean> = this.store.select(
    preProcessOrderDetailsSelectors.selectRequieredAddendum,
  );
  selectInfoDetails$: Observable<IDetailsTEE> = this.store.select(
    preProcessOrderDetailsSelectors.selectDetailsItemPopTEE,
  );
  selectInfoDetailsTop$: Observable<SeeItemDetailsPopTop> = this.store.select(
    preProcessOrderDetailsSelectors.selectDetailsItemPopTop,
  );
  selectDetailsItemPopBottom$: Observable<SeeItemDetailsPopBottom> = this.store.select(
    preProcessOrderDetailsSelectors.selectDetailsItemPopBottom,
  );
  selectFirstTemporalRestriction$: Observable<
    RestriccionTemporalDatosFacturacion
  > = this.store.select(preProcessOrderDetailsSelectors.selectFirstTemporalRestriction);
  selectedItemOrder$: Observable<IPpPartidaPedidoDetallePretamitar> = this.store.select(
    preProcessOrderDetailsSelectors.selectedItemOrder,
  );
  unitList$: Observable<DropListOption[]> = this.store.select(
    preProcessOrderDetailsSelectors.selectUnitListForDropdown,
  );
  selectNonAvailableDays$: Observable<CalendarDay[]> = this.store.select(
    preProcessOrderDetailsSelectors.selectUnavailableDatesCalendarDay,
  );
  selectFechaEstimadaEntregaItemSelected$: Observable<Date> = this.store.select(
    preProcessOrderDetailsSelectors.selectFechaEstimadaEntregaPartida,
  );
  addendaOrderLine$: Observable<string> = this.store.select(
    preProcessOrderDetailsSelectors.selectAddendaOrderLine,
  );
  addendaUnitOfMeasurement$: Observable<DropListOption> = this.store.select(
    preProcessOrderDetailsSelectors.selectAddendaUnitOfMeasurement,
  );
  rangeStart$: Observable<Date> = this.store.select(
    preProcessOrderDetailsSelectors.selectFeeRangeStart,
  );
  selectFEERangeEnd$: Observable<Date> = this.store.select(
    preProcessOrderDetailsSelectors.selectFEERangeEnd,
  );
  selectFEE$: Observable<Date> = this.store.select(preProcessOrderDetailsSelectors.selectFEE);

  readonly inputValidators = InputValidators;

  /*  DOCS: AL MOMENTO DE HACER EL CAMBIO DE MODAL A MATDIALOG, NO SE RECIBEN PARÁMETROS,
    EN CASO DE QUE SE REQUIERA RECIBIR DATA AGREGAR LA SIGUIENTE PROPIEDAD AL CONSTRUCTOR
  @Inject(MAT_DIALOG_DATA) public data: any*/
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<SeeQuotedItemPopUpComponent>,
  ) {}

  handleCheckBox(value: boolean): void {
    this.store.dispatch(preProcessDetailsActions.SET_VALUE_CHECK_BOX_POP_UP_TEE({value}));
    if (!value) {
      this.store.dispatch(
        preProcessDetailsActions.SET_POP_ITEM_DATE_ESTIMATED_FEE({dateString: null, date: null}),
      );
    }
  }

  handleTextNotesTEE(notes: string): void {
    this.store.dispatch(preProcessDetailsActions.SET_TEXT_NOTES({notes}));
  }

  handleDate(value): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const dateString = date.toISOString();
    this.store.dispatch(
      preProcessDetailsActions.SET_POP_ITEM_DATE_ESTIMATED_FEE({
        date,
        dateString,
      }),
    );
  }

  handleAddendaData(key: string, item: string | DropListOption): void {
    this.store.dispatch(
      preProcessDetailsActions.SET_ADDENDA_DATA({
        key,
        data: typeof item === 'string' ? item : item?.value,
      }),
    );
  }

  onClose(event: boolean): void {
    this.dialog.close(event);
  }
}
