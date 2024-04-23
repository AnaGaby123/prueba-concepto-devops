import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {Store} from '@ngrx/store';
import {selectTabsOptions} from '@appSelectors/pendings/payment-manager/plan-collection/plan-collection.selectors';
import {selectNonWorkingDays, selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {CalendarDay} from '@appModels/calendario/calendar';
import {planCollectionActions} from '@appActions/pendings/purchasing-manager/manage-back-order';

@Component({
  selector: 'app-plan-collection-order-details',
  templateUrl: './plan-collection-details.component.html',
  styleUrls: ['./plan-collection-details.component.scss'],
})
export class PlanCollectionDetailsComponent implements OnDestroy {
  options$: Observable<Array<ITabOption>> = this.store.select(selectTabsOptions);
  viewType$: Observable<string> = this.store.select(selectViewType);
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(selectNonWorkingDays);
  readonly appViewTypes = AppViewTypes;
  useDirection: boolean = false;

  constructor(private store: Store) {}

  popupTarget: HTMLElement;
  // variables estaticas - se cambiaran después
  popupIsOpen: boolean = false;
  NotSchedule: boolean = false;

  ngOnDestroy(): void {
    this.store.dispatch(planCollectionActions.SET_IS_DETAILS({isDetails: false}));
  }

  activateDirection(value: boolean): void {
    if (!this.useDirection) {
      this.useDirection = true;
    } else {
      this.useDirection = false;
    }
  }

  handleOpenPopup(value?): void {
    this.popupIsOpen = true;
    this.popupTarget = value;
  }

  activateSchedule(value: boolean): void {
    if (!this.NotSchedule) {
      this.NotSchedule = true;
    } else {
      this.NotSchedule = false;
    }
  }

  handleClosePopup(): void {
    this.popupIsOpen = false;
  }

  handleCloseContact(): void {
    this.useDirection = false;
  }
}
