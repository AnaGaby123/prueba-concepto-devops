import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
/*Utils Imports*/
import {debounce} from 'lodash-es';

/*Actions Imports*/
import {orderModificationDetailsActions} from '@appActions/pendings/order-modification';
/*Selectors Imports*/
import {orderModificationDetailSelectors} from '@appSelectors/pendings/order-modification';
import {ICustomerResults} from '@appModels/store/pendings/order-modification/order-modification-list/order-modification-list.model';
import {
  IFreightProvider,
  IOrdersC,
  IPurchaseOrderDetails,
} from '@appModels/store/pendings/order-modification/order-modification-details/order-modification-details.models';
import {IFlete} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {TpPedido} from 'api-logistica';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-freight-configurator',
  templateUrl: './freight-configurator.component.html',
  styleUrls: ['./freight-configurator.component.scss'],
})
export class FreightConfiguratorComponent implements OnInit {
  @Output() emit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() activeBarActivities = true;
  width = '930px';
  height = '917px';
  activities: BarActivityOption[] = [
    {id: 1, label: 'FLETE EXPRESS', activeSubtitle: false},
    {id: 2, label: 'FLETE CONVENCIONAL', activeSubtitle: false},
  ];
  client$: Observable<ICustomerResults> = this.store.select(
    orderModificationDetailSelectors.selectCustomerSelected,
  );
  order$: Observable<IOrdersC> = this.store.select(
    orderModificationDetailSelectors.selectOrderSelected,
  );
  listFreightExpress$: Observable<Array<IFreightProvider>> = this.store.select(
    orderModificationDetailSelectors.selectFreightExpressList,
  );
  listFreightConventional$: Observable<Array<IFlete>> = this.store.select(
    orderModificationDetailSelectors.selectFreightList,
  );
  isEnd$: Observable<boolean> = this.store.select(
    orderModificationDetailSelectors.selectSaveFreight,
  );
  totalFreightExpress$ = this.store.select(
    orderModificationDetailSelectors.selectTotalFreightExpress,
  );
  totalFreightConventional$: Observable<number> = this.store.select(
    orderModificationDetailSelectors.selectTotalFreightConventional,
  );
  tpOrder$: Observable<TpPedido> = this.store.select(
    orderModificationDetailSelectors.selectTpOrder,
  );
  purchaseOrderDetails$: Observable<IPurchaseOrderDetails> = this.store.select(
    orderModificationDetailSelectors.selectPurchaseOrderDetails,
  );
  scrollItems: Array<IFreightProvider> = [];
  scrollItemConventional: Array<IFlete> = [];
  step = 0;
  clickArrowsIzq = false;
  allFreight = false;
  handleKeySearch = debounce((value) => this.setComment(value), DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(orderModificationDetailsActions.SET_BACKUP_FREIGHT());
    this.store.dispatch(orderModificationDetailsActions.GET_CAT_FREIGHT_LOAD());
    this.store.dispatch(orderModificationDetailsActions.GET_CAT_FREIGHT_EXPRESS_LOAD());
  }

  hadletrackByFn(index: any, item: any) {
    return index;
  }

  setStep(step: number): void {
    this.step = step;
    this.clickArrowsIzq = step === 1;
  }

  setBrokenDown(value: boolean): void {
    this.store.dispatch(orderModificationDetailsActions.SET_ITEMIZED_FREIGHT());
  }

  setSaveFreight(): void {
    this.store.dispatch(orderModificationDetailsActions.FINAL_SETUP_FREIGHT_EXPRESS());
  }

  selectedFreightExpress(freight: IFreightProvider): void {
    if (freight.isSelected) {
      this.store.dispatch(orderModificationDetailsActions.DELETE_FREIGHT_EXPRESS({freight})); // Eliminar
    } else {
      this.store.dispatch(orderModificationDetailsActions.ADD_FREIGHT_EXPRESS({freight}));
    }
  }

  setOptionFreightConventional(item: IFlete): void {
    if (!item.isSelected) {
      this.store.dispatch(orderModificationDetailsActions.SET_OPTION_FREIGHT_CONVENTIONAL({item}));
    }
  }

  setComment(comment: string): void {
    this.store.dispatch(orderModificationDetailsActions.SET_COMMENT_FREIGHT({comment}));
  }

  emitBtn(value: boolean): void {
    this.emit.emit(value);
  }
}
