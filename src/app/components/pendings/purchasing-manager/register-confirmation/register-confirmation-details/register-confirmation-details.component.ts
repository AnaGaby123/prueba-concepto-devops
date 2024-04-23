import {Component, OnDestroy} from '@angular/core';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {ICard} from '@appModels/card/card';
import {
  registerConfirmationActions,
  registerConfirmationDetailsActions,
} from '@appActions/pendings/purchasing-manager/register-confirmation';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable} from 'rxjs';
import {registerConfirmationDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/register-confirmation';
import {
  IFamily,
  IItemsConfigTotals,
  IItemsFamily,
  IListTotals,
  IOrdersFamily,
  IRegisterConfirmationDetails,
  STATUS,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {debounce, isEmpty} from 'lodash-es';
import {take} from 'rxjs/operators';
import {
  selectCatMedioDePagoForDropDown,
  selectCatPaymentConditionsForDropDown,
} from '@appSelectors/catalogs/catalogs.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-register-confirmation-details',
  templateUrl: './register-confirmation-details.component.html',
  styleUrls: ['./register-confirmation-details.component.scss'],
})
export class RegisterConfirmationDetailsComponent implements OnDestroy {
  detailsNode$: Observable<IRegisterConfirmationDetails> = this.store.select(
    registerConfirmationDetailsSelectors.selectDetails,
  );
  paymentMedia$: Observable<Array<DropListOption>> = this.store.select(
    selectCatMedioDePagoForDropDown,
  );
  paymentConditions$: Observable<Array<DropListOption>> = this.store.select(
    selectCatPaymentConditionsForDropDown,
  );
  families$: Observable<Array<ICard>> = this.store.select(
    registerConfirmationDetailsSelectors.selectFamiliesForCards,
  );
  selectedFamily$: Observable<IFamily> = this.store.select(
    registerConfirmationDetailsSelectors.selectedFamily,
  );
  selectedOrder$: Observable<IOrdersFamily> = this.store.select(
    registerConfirmationDetailsSelectors.selectedOrder,
  );
  firstItem$: Observable<IItemsFamily> = this.store.select(
    registerConfirmationDetailsSelectors.selectFirstItem,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    registerConfirmationDetailsSelectors.selectTabOptions,
  );
  selectedTabOption$: Observable<ITabOption> = this.store.select(
    registerConfirmationDetailsSelectors.selectedTabOption,
  );
  listTotals$: Observable<IListTotals> = this.store.select(
    registerConfirmationDetailsSelectors.selectedListTotals,
  );
  configTotals$: Observable<IItemsConfigTotals> = this.store.select(
    registerConfirmationDetailsSelectors.selectItemsConfiguredTotals,
  );
  noItemsConfigured$: Observable<boolean> = this.store.select(
    registerConfirmationDetailsSelectors.selectAllItemsArentConfigured,
  );
  saveValidator$: Observable<boolean> = this.store.select(
    registerConfirmationDetailsSelectors.validatorForWithOutImpactSaveConfigButton,
  );
  registerValidator$: Observable<boolean> = this.store.select(
    registerConfirmationDetailsSelectors.validatorForRegisterButton,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  providerContactSelected$: Observable<IProviderContact> = this.store.select(
    registerConfirmationDetailsSelectors.selectedProviderContact,
  );
  selectContactsProvidersDropList$: Observable<Array<DropListOption>> = this.store.select(
    registerConfirmationDetailsSelectors.selectContactsProviderDropList,
  );
  readonly STATUS = STATUS;
  orders: Array<IOrdersFamily>;
  handleSearchTerm = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  modifiedItem: IItemsFamily = {} as IItemsFamily;
  mainIndex: number;
  popIsOpen = false;
  popWithoutImpactIsOpen = false;
  feaRangeEnd: Date;
  popAlertIsOpen = false;
  FechaEstimadaArriboDate = null;
  FechaEstimadaArribo = null;
  readonly inputValidators = InputValidators;
  newPrice = null;
  newDate = null;
  lodashIsEmpty = isEmpty;
  typesOfConfig = TYPES_OF_CONFIG;
  status = STATUS;

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(
      registerConfirmationActions.SET_IS_DETAILS({
        detailsMode: false,
      }),
    );
    this.store.dispatch(
      registerConfirmationActions.SET_ALLOW_TO_DETAILS({
        allowToDetails: false,
      }),
    );
    this.store.dispatch(registerConfirmationDetailsActions.CLEAN_ALL_DETAILS_STATE());
  }

  handleTrackBy(index: number, item: IOrdersFamily): string {
    return item.IdOcOrdenDeCompra;
  }

  selectFamily(item: ICard): void {
    if (item) {
      this.store.dispatch(
        registerConfirmationDetailsActions.SET_SELECTED_FAMILY({
          familyId: item.value,
        }),
      );
    }
  }

  selectTab(selectedTabOption: ITabOption): void {
    if (selectedTabOption) {
      this.store.dispatch(
        registerConfirmationDetailsActions.SET_SELECTED_TAB_OPTION({
          selectedTabOption,
        }),
      );
    }
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      registerConfirmationDetailsActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  async selectOrder(item: IOrdersFamily): Promise<void> {
    const selectedOrder = await lastValueFrom(
      this.store.pipe(select(registerConfirmationDetailsSelectors.selectedOrder), take(1)),
    );
    if (selectedOrder.IdOcOrdenDeCompra !== item.IdOcOrdenDeCompra) {
      this.store.dispatch(
        registerConfirmationDetailsActions.SET_SELECTED_ORDER({
          orderId: item.IdOcOrdenDeCompra,
        }),
      );
    }
  }

  setOrderFieldValue(field: string, value: string | DropListOption): void {
    this.store.dispatch(
      registerConfirmationDetailsActions.SET_SELECTED_ORDER_FIELD_VALUE({
        field,
        value,
      }),
    );
  }

  handleTrackByItem(index: number, item: IItemsFamily): string {
    return item.tempId;
  }

  handleTrackByArray(index: number): number {
    return index;
  }

  changeItemStatusActive(
    i: number,
    item: IItemsFamily,
    typeOfCheck: string,
    newStatus: string,
  ): void {
    if (
      (typeOfCheck === this.typesOfConfig.cancel && item.cancelStatus !== this.status.active) ||
      (typeOfCheck === this.typesOfConfig.backOrder &&
        item.backOrderStatus !== this.status.active) ||
      (typeOfCheck === this.typesOfConfig.impact && item.impactStatus !== this.status.active) ||
      (typeOfCheck === this.typesOfConfig.withoutImpact &&
        item.withoutImpactStatus !== this.status.active)
    ) {
      this.store.dispatch(
        registerConfirmationDetailsActions.SET_ITEM_CHECK_ACTIVE({
          i,
          item,
          typeOfCheck,
          newStatus,
        }),
      );
    }
  }

  changeItemStatusCancel(i: number, item: IItemsFamily, typeOfCheck: string): void {
    this.store.dispatch(
      registerConfirmationDetailsActions.SET_ITEM_CHECK_CANCEL({
        i,
        item,
        typeOfCheck,
      }),
    );
  }

  saveItemConfiguration(i: number, item: IItemsFamily, typeOfCheck: string): void {
    const disptachs = {
      [this.typesOfConfig.cancel]: () => {
        this.store.dispatch(
          registerConfirmationDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_CANCEL({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.backOrder]: () => {
        this.store.dispatch(
          registerConfirmationDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.impact]: () => {
        this.store.dispatch(
          registerConfirmationDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_IMPACT({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.withoutImpact]: () => {
        this.store.dispatch(
          registerConfirmationDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_WITHOUT_IMPACT({
            i,
            item,
          }),
        );
      },
    };
    disptachs[typeOfCheck]();
  }

  deleteItemConfiguration(i: number, item: IItemsFamily, typeOfCheck: string): void {
    const disptachs = {
      [this.typesOfConfig.cancel]: () => {
        this.store.dispatch(
          registerConfirmationDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_CANCEL({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.backOrder]: () => {
        this.store.dispatch(
          registerConfirmationDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.impact]: () => {
        this.store.dispatch(
          registerConfirmationDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_IMPACT({
            i,
            item,
          }),
        );
      },
      [this.typesOfConfig.withoutImpact]: () => {
        this.store.dispatch(
          registerConfirmationDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_WITHOUT_IMPACT({
            i,
            item,
          }),
        );
      },
    };

    disptachs[typeOfCheck]();
  }

  restoreConfig(mainIndex: number, secondIndex: number): void {
    this.store.dispatch(
      registerConfirmationDetailsActions.RESTORE_SOME_ITEMS({
        i: mainIndex,
        k: secondIndex - 1,
      }),
    );
  }

  handleAlertOpenPop(emit?: boolean): void {
    this.popAlertIsOpen = !this.popAlertIsOpen;
    if (emit) {
      this.store.dispatch(registerConfirmationDetailsActions.CONFIRM_ITEMS_LOAD());
    }
  }

  async handleOpenPop(pop: string, i?: number, item?: IItemsFamily): Promise<void> {
    if (pop === 'cost') {
      this.mainIndex = i;
      this.modifiedItem = item;
      this.popIsOpen = !this.popIsOpen;
    } else {
      const firstItem = await lastValueFrom(
        this.store.pipe(select(registerConfirmationDetailsSelectors.selectFirstItem), take(1)),
      );
      this.feaRangeEnd = new Date(firstItem.FechaEstimadaEntregaPedido);
      this.popWithoutImpactIsOpen = !this.popWithoutImpactIsOpen;
    }
  }

  handleClosePop(pop: string, emit: boolean): void {
    if (pop === 'cost') {
      this.popIsOpen = !this.popIsOpen;
      if (emit) {
        this.store.dispatch(
          registerConfirmationDetailsActions.MODIFIED_PRICE_ITEM({
            i: this.mainIndex,
            item: {
              ...this.modifiedItem,
              tempPrecioLista: this.newPrice,
              tempTotalPartida: this.newPrice * this.modifiedItem.NumeroDePiezas,
            },
          }),
        );
      }
    } else {
      this.popWithoutImpactIsOpen = !this.popWithoutImpactIsOpen;
      if (emit) {
        this.store.dispatch(
          registerConfirmationDetailsActions.CHECK_ALL_ITEMS({
            FechaEstimadaArriboDate: this.FechaEstimadaArriboDate,
            FechaEstimadaArribo: this.FechaEstimadaArribo,
          }),
        );
      } else {
        this.FechaEstimadaArriboDate = null;
        this.FechaEstimadaArribo = null;
      }
    }
  }

  handleDate(value): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const dateString = date.toISOString();
    this.FechaEstimadaArriboDate = date;
    this.FechaEstimadaArribo = dateString;
  }

  setContactSelectedProvider(contactSelected: DropListOption): void {
    this.store.dispatch(
      registerConfirmationDetailsActions.SET_SELECTED_CONTACT_PROVIDER({
        contactSelected,
      }),
    );
  }
}
