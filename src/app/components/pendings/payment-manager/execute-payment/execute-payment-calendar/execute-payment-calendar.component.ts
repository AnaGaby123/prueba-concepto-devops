/* Core Imports */
import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

/* Models Imports */
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IChip} from '@appModels/chip/chip';

/* Selectors Imports */
import {paymentOrderSelectors} from '@appSelectors/pendings/payment-manager';

/* Actions Imports */
import {executePaymentListActions} from '@appActions/pendings/payment-manager';

/* Tools Imports */
import {debounce} from 'lodash-es';

import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-execute-payment-calendar',
  templateUrl: './execute-payment-calendar.component.html',
  styleUrls: ['./execute-payment-calendar.component.scss'],
})
export class ExecutePaymentCalendarComponent implements OnDestroy {
  searchTerm$: Observable<string> = this.store.select(paymentOrderSelectors.selectSearchTerm);
  tabsOptions$: Observable<Array<ITabOption>> = this.store.select(
    paymentOrderSelectors.selectTabOptions,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(paymentOrderSelectors.selectedTabOption);
  chipOptions$: Observable<Array<IChip>> = this.store.select(
    paymentOrderSelectors.selectChipOptions,
  );
  paymentOptions$: Observable<Array<DropListOption>> = this.store.select(
    paymentOrderSelectors.selectPaymentOptions,
  );
  selectedPaymentOption$: Observable<DropListOption> = this.store.select(
    paymentOrderSelectors.selectedPaymentOption,
  );

  providerFilters$: Observable<Array<DropListOption>> = this.store.select(
    paymentOrderSelectors.selectProviderOptions,
  );
  providerFilter$: Observable<DropListOption> = this.store.select(
    paymentOrderSelectors.selectedProviderOptions,
  );

  statusPaymentFilters$: Observable<Array<DropListOption>> = this.store.select(
    paymentOrderSelectors.selectPaymentStatusOptions,
  );

  statusPaymentFilter$: Observable<DropListOption> = this.store.select(
    paymentOrderSelectors.selectedPaymentStatusOption,
  );

  typePaymentFilters$: Observable<Array<DropListOption>> = this.store.select(
    paymentOrderSelectors.selectTypePaymentOptions,
  );

  typesPaymentFilter$: Observable<DropListOption> = this.store.select(
    paymentOrderSelectors.selectedTypePaymentOptions,
  );

  dataStart$: Observable<Date> = this.store.select(paymentOrderSelectors.selectToCalendar);

  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  isOpen = true;

  proveedores = [
    {
      name: 'Todas',
    },
    {
      name: 'nombre del proveedor S.A de C.V',
    },
    {
      name: 'nombre del proveedor S.A de C.V',
    },
    {
      name: 'nombre del proveedor S.A de C.V',
    },
  ];

  estadosPago = [
    {
      atiempo: true,
      vencido: false,
      name: 'A tiempo (-8 a 0 Dìas',
    },
    {
      atiempo: false,
      vencido: true,
      name: 'Vencido (+1 a 8 Dìas',
    },
  ];

  tipoPago = [
    {
      name: 'Directos',
    },
    {
      name: 'Indirectos',
    },
  ];

  constructor(private store: Store<AppState>) {}

  setOption(selectedTabOption: ITabOption): void {
    this.store.dispatch(executePaymentListActions.SET_SELECTED_TAB_OPTION({selectedTabOption}));
    this.isOpen = true;
  }

  activeChip(selectedChipOption: IChip): void {
    this.store.dispatch(executePaymentListActions.SET_CHIP_ACTIVE({selectedChipOption}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(executePaymentListActions.SET_SEARCH_TERM({searchTerm}));
  }

  saveInputValue(selectedPaymentOption: DropListOption): void {
    this.store.dispatch(
      executePaymentListActions.SET_SELECTED_PAYMENT_OPTION({
        selectedPaymentOption,
      }),
    );
  }

  onClick(): void {
    this.isOpen = !this.isOpen;
  }

  seeBreakdown(): void {}

  setProovedor(selectedProviderOption: DropListOption): void {
    this.store.dispatch(
      executePaymentListActions.SET_SELECTED_PROVIDER_OPTION({
        selectedProviderOption,
      }),
    );
  }

  setTypePayment(selectedTypePaymentOption: DropListOption): void {
    this.store.dispatch(
      executePaymentListActions.SET_TYPE_PAYMENT_OPTION({
        selectedTypePaymentOption,
      }),
    );
  }

  setStatusPayment(selectedPaymentStatusOption: DropListOption): void {
    this.store.dispatch(
      executePaymentListActions.SET_STATUS_PAYMENT_OPTION({
        selectedPaymentStatusOption,
      }),
    );
  }

  handleDate(node: string, value: any): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const stringDate = date.toISOString();
    this.saveDateValue(`${node}String`, stringDate);
    this.saveDateValue(node, date);
  }

  saveDateValue(node: string, value: string | Date): void {
    this.store.dispatch(
      executePaymentListActions.SET_FROM_DATE({
        node,
        value,
      }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(executePaymentListActions.SET_INITIAL_STATE());
  }
}
