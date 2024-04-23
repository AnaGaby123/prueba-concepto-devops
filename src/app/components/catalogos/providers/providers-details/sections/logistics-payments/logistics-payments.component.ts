import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
/// Actions
import * as logisticAction from '@appActions/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.actions';
/// Selectors
import * as providerSelectors from '@appSelectors/forms/providers';
import * as logisticSelectors from '@appSelectors/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.selectors';
/// State
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  CatMedioDePago,
  ConfiguracionPagos,
  ConfiguracionPagosDatosBancariosDetalle,
  Proveedor,
} from 'api-catalogos';
import {
  ICardMark,
  RutaEntrega,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import * as importUtils from '@appSelectors/utils/utils.selectors';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {filter, find, includes, isEmpty} from 'lodash-es';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {paymentMethods} from '@appUtil/common.protocols';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-logictics-payments',
  templateUrl: './logistics-payments.component.html',
  styleUrls: ['./logistics-payments.component.scss'],
})
export class LogisticsPaymentsComponent implements OnInit, OnDestroy {
  viewType$: Observable<string> = this.store.select(importUtils.selectViewType);
  enableEdit$: Observable<boolean> = this.store.select(
    providerSelectors.providerSelectors.selectEnableEdit,
  );
  logistic$: Observable<Proveedor> = this.store.select(logisticSelectors.selectLogistic);
  listBank$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatBancoForDropList,
  );
  listUnite$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatUnidadTiempoForDropDown,
  );
  listCondition$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectPaymentConditionsForDropDown,
  );
  selectedCondition$: Observable<DropListOption> = this.store.select(
    logisticSelectors.selectedPaymentConf,
  );
  catMedioDePago$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatMedioDePagoForDropDown,
  );
  paymentConfig$: Observable<ConfiguracionPagos> = this.store.select(
    logisticSelectors.selectPaymentconfig,
  );
  routeList$: Observable<Array<RutaEntrega>> = this.store.select(logisticSelectors.selectRouteList);
  paymentMethodForm$: Observable<CatMedioDePago> = this.store.select(
    logisticSelectors.selectMedioDePagoForm,
  );
  selectedPaymentMethod$: Observable<DropListOption> = this.store.select(
    logisticSelectors.selectedPaymentMethod,
  );
  selectedBank$: Observable<DropListOption> = this.store.select(logisticSelectors.selectedBank);
  addAccount$: Observable<boolean> = this.store.select(logisticSelectors.accountFormValidator);
  accountItem$: Observable<Array<ConfiguracionPagosDatosBancariosDetalle>> = this.store.select(
    logisticSelectors.selectAccounts,
  );
  isDisabledLineCredit$: Observable<boolean> = this.store.select(
    logisticSelectors.selectLineCreditIsDisabled,
  );
  accountForm$: Observable<ConfiguracionPagosDatosBancariosDetalle> = this.store.select(
    logisticSelectors.selectAccountsBankForm,
  );
  cardMarkList$: Observable<Array<ICardMark>> = this.store.select(
    logisticSelectors.selectCardMarkList,
  );
  cardsAdded$: Observable<Array<ConfiguracionPagosDatosBancariosDetalle>> = this.store.select(
    logisticSelectors.selectCardsAdded,
  );
  lodashIsEmpty = isEmpty;
  selectedAccountType;
  readonly inputValidators = InputValidators;
  readonly paymentsMethods = paymentMethods;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(logisticAction.NG_ON_INIT_COMPONENT_EFFECT());
  }

  ngOnDestroy(): void {
    this.store.dispatch(logisticAction.CLEAN_ALL_LOGISTIC_STATE());
  }

  async setFreightConfig(input: string, value: any): Promise<void> {
    const enableEdit = await this.store
      .pipe(select(providerSelectors.providerSelectors.selectEnableEdit), take(1))
      .toPromise();
    if (!enableEdit) {
      return;
    }
    if (input === 'PrecioFleteExpress') {
      if (!includes(value, '$')) {
        value = Number(value);
      } else {
        const newValue: Array<string> = value.split('$');
        value = Number(newValue[1]);
      }
    }
    if (input === 'TieneFleteExpress' && !value) {
      this.store.dispatch(logisticAction.CLEAN_LOGISTIC_CONFIG());
    } else {
      this.store.dispatch(logisticAction.SET_FREIGHT_CONFIG({input, value}));
    }
  }

  setDeliveryTime(data, value, index) {
    if (data !== 'idSelected' && !isEmpty(value)) {
      value = parseInt(value, 10);
    }
    this.store.dispatch(logisticAction.SAVE_DELIVERY_TIME({data, value, index}));
  }

  setLineCredit(value: string | number): void {
    this.store.dispatch(
      logisticAction.SET_CREDTI_LINE({
        value: value === '' ? null : Number(value),
      }),
    );
  }

  setConditionPayment(event: DropListOption): void {
    this.store.dispatch(logisticAction.SET_CONDITION_PAYMENT({event}));
  }

  findSelected(list: Array<DropListOption>, item: RutaEntrega) {
    return find(list, (o: DropListOption) => o.value === item.idSelected);
  }

  setPaymentMethod(value: DropListOption): void {
    this.selectedAccountType = value.labelKey;
    this.store.dispatch(logisticAction.SET_PAYMENT_METHOD({value}));
  }

  setBank(value: DropListOption): void {
    this.store.dispatch(logisticAction.SET_BANK_OPTION({value}));
  }

  setBankData(input: string, value: string): void {
    this.store.dispatch(logisticAction.SET_BANK_DATA({input, value}));
  }

  addAccount(): void {
    this.store.dispatch(logisticAction.ADD_ACCOUNT());
  }

  deleteAccount(account: ConfiguracionPagosDatosBancariosDetalle): void {
    this.store.dispatch(logisticAction.DELETE_SELECTED_ACCOUNT({account}));
  }

  handleTrackBy(index: number, item: RutaEntrega): string {
    return item.id;
  }

  setCheckedValue(cardId: string, value: boolean): void {
    this.store.dispatch(logisticAction.SET_CHECK_VALUE({idCheck: cardId, value}));
  }

  getCardName(
    list: Array<ICardMark> | null,
    item: ConfiguracionPagosDatosBancariosDetalle,
  ): string {
    const name = find(list, (o: ICardMark) => o.IdCatMarcaTarjeta === item.IdCatMarcaTarjeta);
    return name.Marca;
  }

  checkIfCardExist(
    card: ICardMark,
    existing: Array<ConfiguracionPagosDatosBancariosDetalle> | null,
  ): boolean {
    return (
      filter(
        existing,
        (o: ConfiguracionPagosDatosBancariosDetalle) =>
          o.IdCatMarcaTarjeta === card.IdCatMarcaTarjeta,
      ).length > 0
    );
  }
}
