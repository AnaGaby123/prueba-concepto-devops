import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {controlMaterialDeliveryDetailsSelectors} from '@appSelectors/pendings/imports-phs/control-material-delivery';
import {IDispatchOrder} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-details/control-material-delivery-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {controlMaterialDeliveryDetailsActions} from '@appActions/pendings/imports-phs/control-material-delivery';
import {debounce} from 'lodash-es';

import {ICustomAgent} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.models';
import {IUploadFile} from '@appModels/UploadFile/UploadFile';
import {convertPDFFileFromURLToBase64} from '@appUtil/files';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-control-material-delivery-details',
  templateUrl: './control-material-delivery-details.component.html',
  styleUrls: ['./control-material-delivery-details.component.scss'],
})
export class ControlMaterialDeliveryDetailsComponent {
  dispatchOrders$: Observable<Array<IDispatchOrder>> = this.store.select(
    controlMaterialDeliveryDetailsSelectors.selectListOrder,
  );
  dataFilterOrder$: Observable<Array<DropListOption>> = this.store.select(
    controlMaterialDeliveryDetailsSelectors.selectDataOrder,
  );
  paramOrder$: Observable<DropListOption> = this.store.select(
    controlMaterialDeliveryDetailsSelectors.selectParamOrder,
  );
  isLoading$: Observable<boolean> = this.store.select(
    controlMaterialDeliveryDetailsSelectors.selectIsLoadingStatus,
  );
  selectedOrder$: Observable<IDispatchOrder> = this.store.select(
    controlMaterialDeliveryDetailsSelectors.selectDispatchOrder,
  );
  agent$: Observable<ICustomAgent> = this.store.select(
    controlMaterialDeliveryDetailsSelectors.selectAgent,
  );
  base64$: Observable<string> = this.store.select(
    controlMaterialDeliveryDetailsSelectors.selectBase64File,
  );
  statusFile$: Observable<boolean> = this.store.select(
    controlMaterialDeliveryDetailsSelectors.selectApiStatusLoadingApi,
  );
  ordersScroller: Array<IDispatchOrder> = [];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  isShowFile = true;
  activeCheck = false;

  constructor(private store: Store) {}

  setParamOrder(param: DropListOption): void {
    this.store.dispatch(controlMaterialDeliveryDetailsActions.SET_PARAM_ORDER_LIST({param}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(controlMaterialDeliveryDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  setSelectedOrder(order: IDispatchOrder): void {
    this.isShowFile = false;
    setTimeout(() => {
      this.isShowFile = true;
    }, 200);
    this.store.dispatch(controlMaterialDeliveryDetailsActions.SELECTED_ORDER({order}));
  }

  async setUploadFile(file: IUploadFile): Promise<void> {
    const base64 = await convertPDFFileFromURLToBase64(file.path);

    this.store.dispatch(controlMaterialDeliveryDetailsActions.SET_FILE_UPLOAD({file, base64}));
  }

  setNumberPackages(value: string): void {
    this.store.dispatch(
      controlMaterialDeliveryDetailsActions.SET_NUMBER_OF_PACKAGES({
        numberOfPackages: +value,
      }),
    );
  }

  savePending(): void {
    this.store.dispatch(controlMaterialDeliveryDetailsActions.SAVE_LOAD());
  }
}
