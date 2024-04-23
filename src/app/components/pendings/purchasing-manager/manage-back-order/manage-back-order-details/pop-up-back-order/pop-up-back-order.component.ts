import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
/*utils Imports*/
/*Selectors Imports*/
import {manageBackOrderDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/manage-back-order';
/*Actions Imports*/
import {manageBackOrderDetailsActions} from '@appActions/pendings/purchasing-manager/manage-back-order';

/*Models Imports*/
import {
  IBackOrder,
  initialIBackOrder,
  IOptionsIBackOrder,
  IProduct,
} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {dateFormatISO} from '@appUtil/dates';

export interface IAvailable {
  isNewOc: boolean;
  estimatedArrival: string;
  isOldOc: boolean;
}

@Component({
  selector: 'app-pop-up-back-order',
  templateUrl: './pop-up-back-order.component.html',
  styleUrls: ['./pop-up-back-order.component.scss'],
})
export class PopUpBackOrderComponent {
  product$: Observable<IProduct> = this.store.select(manageBackOrderDetailsSelectors.selectProduct);
  status$: Observable<DropListOption> = this.store.select(
    manageBackOrderDetailsSelectors.selectStatus,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  dataBackOrder: IBackOrder = initialIBackOrder();
  dataAvailable: IAvailable = {
    isNewOc: null,
    estimatedArrival: null,
    isOldOc: null,
  };
  justification: string;

  constructor(private store: Store) {}

  close(status: boolean): void {
    this.store.dispatch(manageBackOrderDetailsActions.SHOW_POP_UP({status}));
  }

  setJustification(value: string): void {
    this.justification = value;
  }

  setOption(value: boolean, isNew: boolean): void {
    if (isNew) {
      if (value && !this.dataAvailable.isNewOc) {
        this.dataAvailable.isNewOc = value;
        this.dataAvailable.isOldOc = false;
      }
    } else {
      if (value && !this.dataAvailable.isOldOc) {
        this.dataAvailable.isOldOc = value;
        this.dataAvailable.isNewOc = false;
      }
    }
  }

  handleDate(date: Date, param: string): void {
    this.dataBackOrder[param] = this.convertDate(date);
  }

  handleDateAvailable(date: Date): void {
    this.dataAvailable.estimatedArrival = this.convertDate(date);
  }

  convertDate(date: Date): string {
    return dateFormatISO(date);
  }

  save(e: MouseEvent): void {
    e.stopPropagation();
    const body: IOptionsIBackOrder = {
      backOrderContinue: this.dataBackOrder,
      dataAvailable: this.dataAvailable,
      justification: this.justification,
    };
    this.store.dispatch(
      manageBackOrderDetailsActions.SAVE_TO_MANAGE_LOAD({
        data: body,
      }),
    );
  }
}
