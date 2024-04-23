import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IItemsFamily} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';
import {registerConfirmationDetailsActions} from '@appActions/pendings/purchasing-manager/register-confirmation';
import {Observable} from 'rxjs';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {currentDateWithoutHoursUTCFormatDate, dateWithHoursFormatDate} from '@appUtil/dates';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-without-impact-form',
  templateUrl: './without-impact-form.component.html',
  styleUrls: ['./without-impact-form.component.scss'],
})
export class WithoutImpactFormComponent implements OnInit {
  readonly inputValidators = InputValidators;
  @Input() arrayLength: number;
  @Input() isTheLastIndex: boolean;
  @Input() item: IItemsFamily;
  @Input() mainIndex: number;
  @Input() saveValidator: boolean;
  @Input() viewType: string;
  @Output() cancelPressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deletePressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() acceptPressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  feaRangeEnd: Date;

  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );

  constructor(private store: Store<AppState>) {}

  rangeStart = currentDateWithoutHoursUTCFormatDate();

  ngOnInit(): void {
    const rangefeaEndDeclaration = dateWithHoursFormatDate(this.item?.FechaEstimadaEntregaPedido);
    rangefeaEndDeclaration.setDate(rangefeaEndDeclaration.getDate() - 1);
    this.feaRangeEnd = rangefeaEndDeclaration;
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

  handleDate(value): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const dateString = date.toISOString();
    this.saveInputValue('FechaEstimadaArriboDate', date);
    this.saveInputValue('FechaEstimadaArribo', dateString);
  }

  saveInputValue(field: string, value: string | Date): void {
    this.store.dispatch(
      registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_WITHOUT_IMPACT({
        i: this.mainIndex,
        itemNumber: this.item.NumberToSave,
        field,
        value,
      }),
    );
  }
}
