import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Actions
import {trademarkProviderActions} from '@appActions/forms/providers';

// Selectors
import {
  providersDetailsSelectors,
  providerSelectors,
  trademarkProviderSelectors,
} from '@appSelectors/forms/providers';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';

/* Interfaces Imports */
import {ITabOption} from '@appModels/botonera/botonera-option';
import {VMarca} from 'api-catalogos';
import {
  ITrademarkFamilyChange,
  IVMarca,
  IVTrademarkDetail,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-4-trademark.model';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {IItemCatalogData} from '@appModels/item-card-catalog/item-card-catalog';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {buildFamilyName} from '@appHelpers/catalogs/providers/trademark.helpers';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-trademark',
  templateUrl: './trademark.component.html',
  styleUrls: ['./trademark.component.scss'],
})
export class TrademarkComponent implements OnInit {
  viewType$: Observable<string> = this.store.select(selectViewType);
  keypadList: Array<ITabOption> = [
    {id: '1', label: 'HABILITADOS', activeSubtitle: false},
    {id: '2', label: 'DESHABILITADOS', activeSubtitle: false},
  ];
  tabSelected: ITabOption = this.keypadList[0];
  trademarks$: Observable<VMarca[]> = this.store.select(
    trademarkProviderSelectors.selectProvidersTrademarkList,
  );
  scrollItems: Array<VMarca> = [];
  timer;
  itemSearch = 'Nombre';
  apiStatus$: Observable<number> = this.store.select(
    trademarkProviderSelectors.selectTrademarkStatus,
  );
  associatedApiStatus$: Observable<number> = this.store.select(
    trademarkProviderSelectors.selectAssociatedTrademarkStatus,
  );
  totalTradeMark$: Observable<number> = this.store.select(
    trademarkProviderSelectors.selectProvidersTrademarkTotal,
  );
  associated$: Observable<Array<IVTrademarkDetail>> = this.store.select(
    trademarkProviderSelectors.selectAssociatedList,
  );
  selectedProviderName$: Observable<string> = this.store.select(
    providersDetailsSelectors.selectedProviderName,
  );
  alertPopIsOpen = false;
  preselectedTrademarkFamilyChange: ITrademarkFamilyChange;
  titleHeader = 'AGREGAR MARCA';
  enableEdit$: Observable<boolean> = this.store.select(providerSelectors.selectEnableEdit);
  editMode$: Observable<boolean> = this.store.select(providerSelectors.selectModeEdit);
  selectSearchTerm$: Observable<string> = this.store.select(
    trademarkProviderSelectors.selectSearchTerm,
  );
  selectedProviderId$: Observable<string> = this.store.select(
    providersDetailsSelectors.selectedProviderId,
  );
  readonly viewTypes = AppViewTypes;
  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);
  lodashIsEmpty = isEmpty;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(trademarkProviderActions.INITIALIZE_TRADEMARK_MODULE());
  }

  fetchMore(event: IPageInfo): void {
    this.store.dispatch(trademarkProviderActions.FETCH_MORE_TRADEMARK_COMPONENT_EFFECT({event}));
  }

  handleDeleteTrademarkClick(trademarkId: string): void {
    this.store.dispatch(trademarkProviderActions.DELETE_ASSOCIATED_TRADEMARK({trademarkId}));
  }

  handleTrademarkFamilyChange(familyChange: ITrademarkFamilyChange): void {
    this.store.dispatch(trademarkProviderActions.SET_TRADEMARK_FAMILY_VALUE({familyChange}));
  }

  handleChangeMainProviderChange(familyChange: ITrademarkFamilyChange): void {
    this.preselectedTrademarkFamilyChange = familyChange;
    this.alertPopIsOpen = true;
  }

  buildFamilyName(): string {
    return buildFamilyName({
      family: this.preselectedTrademarkFamilyChange.family,
      hasPoints: false,
      hasProducts: false,
    });
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(trademarkProviderActions.CLEAR_TRADEMARK_LIST());
    this.store.dispatch(
      trademarkProviderActions.SEARCH_FILTER_TRADEMAK({
        searchTerm,
      }),
    );
  }

  handlePopClosed(status: boolean): void {
    this.alertPopIsOpen = false;
    if (status) {
      this.store.dispatch(
        trademarkProviderActions.SET_MAIN_PROVIDER_TRADEMARK_FAMILY_VALUE({
          familyChange: this.preselectedTrademarkFamilyChange,
        }),
      );
    }
  }

  drop(event: CdkDragDrop<Array<VMarca>>): void {
    this.setBrands(event.item.data);
  }

  setBrands(trademark: VMarca): void {
    this.store.dispatch(
      trademarkProviderActions.SET_ASSOCIATED_TRADEMARK({
        trademark,
      }),
    );
  }

  noReturnPredicate(): boolean {
    return false;
  }

  handleEmitRightImageClick(trademark: VMarca): void {
    this.setBrands(trademark);
  }

  buildItem(trademark: IVMarca): IItemCatalogData {
    return {
      title: trademark.Nombre,
      subtitle: `${trademark.TotalProductos} ${
        trademark.TotalProductos === 1 ? 'Producto' : 'Productos'
      }`,
      imageHover: trademark.imageHover,
      image: trademark.image,
      active: trademark.Activo,
    };
  }

  handleTrackBy(item: IVTrademarkDetail, index: number): string {
    return item.IdMarca;
  }
}
