import {Component, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {manageBackOrderDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/manage-back-order';
import {IProduct} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.models';

@Component({
  selector: 'app-pop-up-record',
  templateUrl: './pop-up-record.component.html',
  styleUrls: ['./pop-up-record.component.scss'],
})
export class PopUpRecordComponent {
  @Output() closePopR: EventEmitter<boolean> = new EventEmitter<boolean>();
  product$: Observable<IProduct> = this.store.select(manageBackOrderDetailsSelectors.selectProduct);

  constructor(private store: Store) {}

  closePop(value: boolean): void {
    this.closePopR.emit(false);
  }
}
