import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {
  FIXED_FACTORR,
  LevelConfigurationOption,
  SubTabOptions,
  UTILITY,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {debounce, isEmpty} from 'lodash-es';
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {
  IConfContratoCliente,
  IFamilyPrices,
  IVPrecioListaClienteProductoContrato,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-provider-price-list',
  templateUrl: './provider-price-list.component.html',
  styleUrls: ['./provider-price-list.component.scss'],
})
export class ProviderPriceListComponent {
  @Input() activateCancelConfigButton = false;
  @Input() activateSaveConfigButton = false;
  @Input() actualConfiguration: IConfContratoCliente = null;
  @Input() clientIncomeLevel = null;
  @Input() isMexican: boolean;
  @Input() selectedSubConfigOption = null;
  @Input() selectedTabConfiguration: LevelConfigurationOption = null;
  @Input() subConfigurationTabs: Array<OptionBar>;
  @Input() viewType = null;
  @Output() emitSelectedSubConfigOption: EventEmitter<OptionBar> = new EventEmitter<OptionBar>();
  pricesSearchTerm$: Observable<string> = this.store.select(
    clientContractsSelectors.selectPriceSectionSearchTerm,
  );
  pricesResults$: Observable<Array<IVPrecioListaClienteProductoContrato>> = this.store.select(
    clientContractsSelectors.selectPriceResults,
  );
  priceSelected$: Observable<IVPrecioListaClienteProductoContrato> = this.store.select(
    clientContractsSelectors.selectPriceSelected,
  );
  showSubConfigSection$: Observable<boolean> = this.store.select(
    clientContractsSelectors.showSubConfigPriceList,
  );
  prices$: Observable<IFamilyPrices> = this.store.select(
    clientContractsSelectors.selectPriceSectionConfiguration,
  );
  handleSetSearchTerm = debounce(this.setListOfTabConfigSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  pricesResults: Array<IVPrecioListaClienteProductoContrato>;
  lodashIsEmpty = isEmpty;
  readonly FIELD_UTILITY = UTILITY;
  readonly FIELD_FIXED_FACTOR = FIXED_FACTORR;
  readonly subTabs = SubTabOptions;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  fetchMorePrices(event: IPageInfo): void {
    this.store.dispatch(contractActions.FETCH_MORE_PRICES_COMPONENT_EFFECT({event}));
  }

  setListOfTabConfigSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      contractActions.SET_PRICE_LIST_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  saveConfiguration(): void {
    this.store.dispatch(contractActions.SAVE_CONFIGURATION_LOAD());
  }

  discardChanges(): void {
    this.store.dispatch(contractActions.IS_CANCEL_POP_OPEN({value: true}));
  }

  emitOption(option: OptionBar) {
    this.emitSelectedSubConfigOption.emit(option);
  }

  openConfiguration(price: IVPrecioListaClienteProductoContrato): void {
    if (!price.isSelected) {
      this.store.dispatch(
        contractActions.SET_CONTRACT_PRICE({
          price,
        }),
      );
    }
  }

  saveInputValue(field: string, value: any): void {
    this.store.dispatch(
      contractActions.SAVE_INPUT_VALUE_COMPONENT_EFFECT({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }

  handleTrackByPriceList(index: number, item: IVPrecioListaClienteProductoContrato): number {
    return item.PrecioLista;
  }
}
