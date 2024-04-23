import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {
  FIXED_FACTORR,
  LevelConfigurationOption,
  SubTabOptions,
  UTILITY,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';
import {debounce, isEmpty} from 'lodash-es';
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {
  IFamilyProducts,
  IVPrecioProductoCliente,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnDestroy {
  @Input() activateCancelConfigButton = false;
  @Input() activateSaveConfigButton = false;
  @Input() actualConfiguration = null;
  @Input() clientIncomeLevel = null;
  @Input() isMexican: boolean;
  @Input() selectedSubConfigOption = null;
  @Input() selectedTabConfiguration: LevelConfigurationOption = null;
  @Input() subConfigurationTabs: Array<OptionBar>;
  @Input() viewType = null;
  @Output() emitSelectedSubConfigOption: EventEmitter<OptionBar> = new EventEmitter<OptionBar>();
  readonly FIELD_UTILITY = UTILITY;
  readonly FIELD_FIXED_FACTOR = FIXED_FACTORR;
  readonly subTabs = SubTabOptions;

  productsSearchTerm$: Observable<string> = this.store.select(
    clientContractsSelectors.selectProductsSearchTerm,
  );
  productsResults$: Observable<Array<IVPrecioProductoCliente>> = this.store.select(
    clientContractsSelectors.selectProductsResults,
  );
  selectedProduct$: Observable<IVPrecioProductoCliente> = this.store.select(
    clientContractsSelectors.selectedProduct,
  );
  products$: Observable<IFamilyProducts> = this.store.select(
    clientContractsSelectors.selectProductsSectionConfiguration,
  );
  showSubConfigSection$: Observable<boolean> = this.store.select(
    clientContractsSelectors.showSubConfigProduct,
  );
  handleSetSearchTerm = debounce(this.setListOfTabConfigSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  lodashIsEmpty = isEmpty;
  productsResults: Array<IVPrecioProductoCliente>;

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(contractActions.SET_PRODUCT_IS_OPEN({productId: null}));
  }

  setListOfTabConfigSearchTerm(searchTerm: string): void {
    this.store.dispatch(contractActions.SET_PRODUCT_LIST_SEARCH_TERM({searchTerm}));
  }

  fetchMoreProducts(event: IPageInfo): void {
    this.store.dispatch(contractActions.FETCH_MORE_PRODUCT_COMPONENT_EFFECT({event}));
  }

  discardChanges(): void {
    this.store.dispatch(contractActions.IS_CANCEL_POP_OPEN({value: true}));
  }

  saveConfiguration(): void {
    this.store.dispatch(contractActions.SAVE_CONFIGURATION_LOAD());
  }

  emitOption(option: OptionBar) {
    this.emitSelectedSubConfigOption.emit(option);
  }

  openConfiguration(product: IVPrecioProductoCliente): void {
    if (!product.isSelected) {
      this.store.dispatch(
        contractActions.SET_CONTRACT_PRODUCT({
          product,
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

  handleTrackByIdProduct(index: number, item: IVPrecioProductoCliente): string {
    return item.IdProducto;
  }
}
