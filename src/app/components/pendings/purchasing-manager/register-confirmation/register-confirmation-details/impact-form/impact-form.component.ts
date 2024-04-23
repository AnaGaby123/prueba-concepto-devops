/* Core Imports */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

/* Models Imports */
import {IItemsFamily} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {IItems} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.model';

/* Actions Imports */
import {registerConfirmationDetailsActions} from '@appActions/pendings/purchasing-manager/register-confirmation';
import {checkOcNotArrivedDetailsActions} from '@appActions/pendings/purchasing-manager/check-oc-not-arrived';

/* Common Imports */
import {CHECK_PURCHASE_ORDER, REGISTER_CONFIRMATION} from '@appUtil/common.protocols';
import {Observable} from 'rxjs';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {currentDateWithoutHoursUTCFormatDate, dateWithHoursFormatDate} from '@appUtil/dates';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-impact-form',
  templateUrl: './impact-form.component.html',
  styleUrls: ['./impact-form.component.scss'],
})
export class ImpactFormComponent implements OnInit {
  @Input() arrayLength: number;
  @Input() isTheLastIndex: boolean;
  @Input() item: IItemsFamily | IItems;
  @Input() mainIndex: number;
  @Input() saveValidator: boolean;
  @Input() viewType: string;
  @Input() nameComponent = REGISTER_CONFIRMATION;
  @Output() cancelPressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deletePressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() acceptPressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  feaRangeStartOriginal: Date;
  registerConfirmation = REGISTER_CONFIRMATION;
  feeRangeStart: Date;
  rangeStart: Date;
  readonly inputValidators = InputValidators;

  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const rangefeeStartDeclaration = dateWithHoursFormatDate(this.item?.FechaEstimadaEntregaPedido);
    rangefeeStartDeclaration.setDate(rangefeeStartDeclaration.getDate() + 1);
    this.feaRangeStartOriginal = rangefeeStartDeclaration;
    this.feeRangeStart = this.feaRangeStartOriginal;
    this.loadInitialRanks();
  }

  loadInitialRanks() {
    if (this.item?.ocPartidaEdicionConImpactoFEE.FechaEstimadaArriboDate) {
      const feeOriginalDate = currentDateWithoutHoursUTCFormatDate(
        dateWithHoursFormatDate(this.item?.ocPartidaEdicionConImpactoFEE.FechaEstimadaArribo),
      );
      feeOriginalDate.setDate(feeOriginalDate.getDate() + 1);
      this.feeRangeStart =
        feeOriginalDate > this.feaRangeStartOriginal ? feeOriginalDate : this.feaRangeStartOriginal;
    }

    if (this.nameComponent === CHECK_PURCHASE_ORDER) {
      const rangefeaStartDeclaration = currentDateWithoutHoursUTCFormatDate(
        dateWithHoursFormatDate(this.item?.FechaEstimadaDeArribo),
      );
      rangefeaStartDeclaration.setDate(rangefeaStartDeclaration.getDate() + 1);
      this.rangeStart = rangefeaStartDeclaration;
    } else {
      const rangeStartDeclaration = currentDateWithoutHoursUTCFormatDate();
      rangeStartDeclaration.setDate(rangeStartDeclaration.getDate() + 1);
      this.rangeStart = rangeStartDeclaration;
    }
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
    this.saveInputValue(`${field}Date`, date);
    this.saveInputValue(field, dateString);

    if (field === 'FechaEstimadaArribo') {
      const feeRangeData = new Date(year, month - 1, day);
      feeRangeData.setDate(feeRangeData.getDate() + 1);
      this.feeRangeStart =
        feeRangeData > this.feaRangeStartOriginal ? feeRangeData : this.feaRangeStartOriginal;
    }
  }

  saveInputValueRadio(field: string, value: boolean): void {
    if (this.nameComponent === REGISTER_CONFIRMATION) {
      this.store.dispatch(
        registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_RADIO_BUTTON_IMPACT({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    } else if (this.nameComponent === CHECK_PURCHASE_ORDER) {
      this.store.dispatch(
        checkOcNotArrivedDetailsActions.SET_ITEM_FIELD_VALUE_RADIO_BUTTON_IMPACT({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    }
  }

  saveInputValue(field: string, value: string | Date | File): void {
    if (this.nameComponent === REGISTER_CONFIRMATION) {
      this.store.dispatch(
        registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_IMPACT({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    } else if (this.nameComponent === CHECK_PURCHASE_ORDER) {
      this.store.dispatch(
        checkOcNotArrivedDetailsActions.SET_ITEM_FIELD_VALUE_IMPACT({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    }
  }
}
