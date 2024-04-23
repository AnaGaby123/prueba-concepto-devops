import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
/*Selectors Imports*/
import {manageBackOrderDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/manage-back-order';
/*Models Import*/
import {ITabOption} from '@appModels/botonera/botonera-option';
import {ICard} from '@appModels/card/card';
import {manageBackOrderDetailsActions} from '@appActions/pendings/purchasing-manager/manage-back-order';
import {
  IItems,
  IOrdersBackOrder,
  IProduct,
  ITotalsList,
} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';

@Component({
  selector: 'app-manage-back-order-details',
  templateUrl: './manage-back-order-details.component.html',
  styleUrls: ['./manage-back-order-details.component.scss'],
})
export class ManageBackOrderDetailsComponent {
  optionsTabs$: Observable<Array<ITabOption>> = this.store.select(
    manageBackOrderDetailsSelectors.selectOptionsFilter,
  );
  selectedTab$: Observable<ITabOption> = this.store.select(
    manageBackOrderDetailsSelectors.selectSelectedTab,
  );
  cardFamilies$: Observable<Array<ICard>> = this.store.select(
    manageBackOrderDetailsSelectors.selectCardFamilies,
  );
  list$: Observable<Array<IOrdersBackOrder | IProduct>> = this.store.select(
    manageBackOrderDetailsSelectors.selectListPrincipal,
  );
  selectedOrder$: Observable<IOrdersBackOrder> = this.store.select(
    manageBackOrderDetailsSelectors.selectOrder,
  );
  selectedProduct$: Observable<IProduct> = this.store.select(
    manageBackOrderDetailsSelectors.selectProduct,
  );
  listItems$: Observable<Array<IItems>> = this.store.select(
    manageBackOrderDetailsSelectors.selectListItems,
  );
  activeRegister$: Observable<boolean> = this.store.select(
    manageBackOrderDetailsSelectors.selectActiveRegister,
  );
  statusList$: Observable<Array<DropListOption>> = this.store.select(
    manageBackOrderDetailsSelectors.selectStatusList,
  );
  selectedStatus$: Observable<DropListOption> = this.store.select(
    manageBackOrderDetailsSelectors.selectStatus,
  );
  showPopUp$: Observable<boolean> = this.store.select(
    manageBackOrderDetailsSelectors.selectActivePop,
  );
  statusApiItems$: Observable<boolean> = this.store.select(
    manageBackOrderDetailsSelectors.selectStatusApiItems,
  );
  totalsList$: Observable<ITotalsList> = this.store.select(
    manageBackOrderDetailsSelectors.selectTotalsList,
  );
  totalsItems$: Observable<ITotalsList> = this.store.select(
    manageBackOrderDetailsSelectors.selectTotalsItem,
  );
  providerContactSelected$: Observable<IProviderContact> = this.store.select(
    manageBackOrderDetailsSelectors.selectedProviderContact,
  );
  selectContactsProvidersDropList$: Observable<Array<DropListOption>> = this.store.select(
    manageBackOrderDetailsSelectors.selectContactsProviderDropList,
  );

  listItem: Array<IItems> = [];
  list: Array<IOrdersBackOrder | IProduct> = [];
  showPopRecord = false;

  constructor(private store: Store) {}

  selectedFamily(card: ICard): void {
    this.store.dispatch(manageBackOrderDetailsActions.SELECTED_FAMILY({idFamily: card.value}));
  }

  setFilter(filter: ITabOption): void {
    this.store.dispatch(manageBackOrderDetailsActions.SET_FILTER_TYPE({filter}));
  }

  sendStatus(value: boolean, type: string, IdOcPartidaEdicionBackOrder: string): void {
    this.store.dispatch(
      manageBackOrderDetailsActions.SET_STATUS_ITEM({
        param: type,
        IdOcPartidaEdicionBackOrder,
      }),
    );
  }

  setStatus(option: DropListOption): void {
    this.store.dispatch(manageBackOrderDetailsActions.SET_STATUS_PRODUCT({option}));
  }

  showPopUp(status: boolean): void {
    this.store.dispatch(manageBackOrderDetailsActions.SHOW_POP_UP({status}));
  }

  saveCancel(): void {
    this.store.dispatch(manageBackOrderDetailsActions.SAVE_ITEMS_CANCEL_LOAD());
  }

  selectedOrder(purchaseOrder: IOrdersBackOrder): void {
    this.store.dispatch(
      manageBackOrderDetailsActions.SELECTED_PURCHASE_ORDER({
        oc: purchaseOrder,
      }),
    );
  }

  selectedProduct(product: IProduct): void {
    this.store.dispatch(manageBackOrderDetailsActions.SELECTED_PRODUCT({product}));
  }

  showRecord(value) {
    this.showPopRecord = value;
  }

  setContactSelectedProvider(contactSelected: DropListOption) {
    this.store.dispatch(
      manageBackOrderDetailsActions.SET_SELECTED_CONTACT_PROVIDER({
        contactSelected,
      }),
    );
  }
}
