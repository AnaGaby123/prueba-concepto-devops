/* Core Imports */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/* Models Imports */
import {IItemsFamily} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {IItems} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.model';
import {IItem} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.models';
import {CalendarDay} from '@appModels/calendario/calendar';

/* Actions Imports */
import {registerConfirmationDetailsActions} from '@appActions/pendings/purchasing-manager/register-confirmation';
import {confirmDispatchDetailsActions} from '@appActions/pendings/purchasing-manager/confirm-dispatch';

/* Common Imports */
import {
  CHECK_PURCHASE_ORDER,
  CONFIRM_DISPATCH,
  REGISTER_CONFIRMATION,
} from '@appUtil/common.protocols';

/* Utils Imports */
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {currentDateWithoutHoursUTCFormatDate, dateWithHoursFormatDate} from '@appUtil/dates';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-back-order-form',
  templateUrl: './back-order-form.component.html',
  styleUrls: ['./back-order-form.component.scss'],
})
export class BackOrderFormComponent implements OnInit {
  @Input() arrayLength: number;
  @Input() isTheLastIndex: boolean;
  @Input() item: IItemsFamily | IItems | IItem;
  @Input() mainIndex: number;
  @Input() saveValidator: boolean;
  @Input() viewType: string;
  @Input() nameComponent = REGISTER_CONFIRMATION;
  @Output() cancelPressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deletePressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() acceptPressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly inputValidators = InputValidators;

  fdpDateSelected: Date;
  feaStartRankOriginal: Date;
  feaStartRank: Date;
  feaDateSelected: Date;
  feeNewStartRank: Date;
  newFeeSelected: Date;
  monitoringEndRank: Date;
  registerConfirmation = REGISTER_CONFIRMATION;
  fdpStartRank = currentDateWithoutHoursUTCFormatDate();
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadInitialSelectedDates();
  }

  cancelConfig(): void {
    this.cancelPressed.emit(true);
  }

  deleteConfig(): void {
    this.deletePressed.emit(true);
  }

  saveConfig(): void {
    this.acceptPressed.emit(true);
  }

  handleDate(field: string, value): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const dateString = date.toISOString();
    if (field === 'FechaEstimadaDisponibilidadProveedor') {
      this.saveInputValue(`${field}Date`, date);
      this.saveInputValue(field, dateString);
      this.fdpDateSelected = new Date(year, month - 1, day);
      this.fdpDateSelected.setDate(this.fdpDateSelected.getDate() + 1);
      this.initialRankDates();
    } else if (field === 'FechaEstimadaArribo') {
      this.saveInputValue(`${field}Date`, date);
      this.saveInputValue(field, dateString);
      this.feaDateSelected = new Date(year, month - 1, day);
      this.feaDateSelected.setDate(this.feaDateSelected.getDate() + 1);
      this.initialRankDates();
    } else if (field === 'FechaMonitoreo') {
      this.saveInputValue(`${field}Date`, date);
      this.saveInputValue(field, dateString);
    } else if (field === 'FechaEstimadaEntrega') {
      this.saveInputValue(`${field}Date`, date);
      this.saveInputValue(field, dateString);
      this.newFeeSelected = new Date(year, month - 1, day);
      this.newFeeSelected.setDate(this.newFeeSelected.getDate() - 1);
      this.finalRankDates();
    }
  }

  loadInitialSelectedDates(): void {
    if (this.item?.ocPartidaEdicionBackOrder?.FechaEstimadaDisponibilidadProveedor) {
      const fdpInitialDate = currentDateWithoutHoursUTCFormatDate(
        dateWithHoursFormatDate(
          this.item?.ocPartidaEdicionBackOrder?.FechaEstimadaDisponibilidadProveedor,
        ),
      );
      fdpInitialDate.setDate(fdpInitialDate.getDate() + 1);
      this.fdpDateSelected = fdpInitialDate;
    }
    if (this.item?.ocPartidaEdicionBackOrder?.FechaEstimadaArribo) {
      const feaInitialDate = currentDateWithoutHoursUTCFormatDate(
        dateWithHoursFormatDate(this.item?.ocPartidaEdicionBackOrder?.FechaEstimadaArribo),
      );
      feaInitialDate.setDate(feaInitialDate.getDate() + 1);
      this.feaDateSelected = feaInitialDate;
    }
    if (this.item?.ocPartidaEdicionBackOrder?.FechaEstimadaEntrega) {
      const newFeeInitialDate = currentDateWithoutHoursUTCFormatDate(
        dateWithHoursFormatDate(this.item?.ocPartidaEdicionBackOrder?.FechaEstimadaEntrega),
      );
      newFeeInitialDate.setDate(newFeeInitialDate.getDate() - 1);
      this.newFeeSelected = newFeeInitialDate;
    }

    this.initialRankDates();
    this.finalRankDates();
  }

  initialRankDates(): void {
    const feaStartRankAux = currentDateWithoutHoursUTCFormatDate(
      dateWithHoursFormatDate(this.item?.FechaEstimadaDeArribo),
    );

    feaStartRankAux.setDate(feaStartRankAux.getDate() + 1);
    this.feaStartRankOriginal = feaStartRankAux;

    const assignDatesInitial = {
      [CHECK_PURCHASE_ORDER]: () => {
        this.feaStartRank =
          this.feaStartRankOriginal > this.fdpDateSelected
            ? this.feaStartRankOriginal
            : this.fdpDateSelected;
        this.feeNewStartRank = this.feaDateSelected;
      },
      [REGISTER_CONFIRMATION]: () => {
        this.feaStartRank = this.fdpDateSelected;
        this.feeNewStartRank = this.feaDateSelected;
      },
      [CONFIRM_DISPATCH]: () => {
        this.feaStartRank = this.fdpDateSelected;
        this.feeNewStartRank = this.feaDateSelected;
      },
    };

    assignDatesInitial[this.nameComponent]();
  }

  finalRankDates(): void {
    const assignDatesFinal = {
      [CHECK_PURCHASE_ORDER]: () => {
        this.monitoringEndRank = this.newFeeSelected;
      },
      [REGISTER_CONFIRMATION]: () => {
        this.monitoringEndRank = this.newFeeSelected;
      },
      [CONFIRM_DISPATCH]: () => {
        this.monitoringEndRank = this.newFeeSelected;
      },
    };

    assignDatesFinal[this.nameComponent]();
  }

  saveInputValue(field: string, value: string | Date | File): void {
    if (this.nameComponent === REGISTER_CONFIRMATION) {
      this.store.dispatch(
        registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_BACK_ORDER({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    } /*else if (this.nameComponent === CHECK_PURCHASE_ORDER) {
      this.store.dispatch(
        checkOcNotArrivedDetailsActions.SET_ITEM_FIELD_VALUE_BACK_ORDER({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    }*/ else if (
      this.nameComponent === CONFIRM_DISPATCH
    ) {
      this.store.dispatch(
        confirmDispatchDetailsActions.SET_ITEM_FIELD_VALUE_BACK_ORDER({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    }
  }
}
