import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
/*Models Import*/
import {DropListOption} from '@appModels/drop-list/drop-list-option';
/*Actions Imports*/
import {uploadReceiptListActions} from '@appActions/pendings/imports-phs/upload-receipt';
import {uploadReceiptListSelectors} from '@appSelectors/pendings/imports-phs/upload-receipt';

@Component({
  selector: 'app-upload-receipt-list',
  templateUrl: './upload-receipt-list.component.html',
  styleUrls: ['./upload-receipt-list.component.scss'],
})
export class UploadReceiptListComponent {
  optionsOrder$: Observable<Array<DropListOption>> = this.store.select(
    uploadReceiptListSelectors.selectOptionsOrder,
  );
  selectedOrder$: Observable<DropListOption> = this.store.select(
    uploadReceiptListSelectors.selectOrderList,
  );

  constructor(private store: Store) {}

  setFilter(filter: DropListOption): void {
    this.store.dispatch(uploadReceiptListActions.SET_FILTER_ORDER({filter}));
  }
}
