import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ICard} from '@appModels/card/card';
import {LevelConfigurationOption} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {
  IConfContratoCliente,
  IFamilyProducts,
  ITrademark,
  IVContractFamily,
  OfferContractBrands,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {CANCEL_EDITION_MESSAGE, DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {VCliente} from 'api-catalogos';
import {debounce, isEmpty} from 'lodash-es';
import {
  clientContractsSelectors,
  clientsDetailsSelectors,
  clientsSelectors,
} from '@appSelectors/forms/clients-form';
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';

@Component({
  selector: 'app-client-contract-families',
  templateUrl: './client-contract-families.component.html',
  styleUrls: ['./client-contract-families.component.scss'],
})
export class ClientContractFamiliesComponent implements OnInit, AfterContentChecked {
  enableEdit$: Observable<boolean> = this.store.select(clientsSelectors.selectEnableEdit);
  viewType$: Observable<string> = this.store.select(selectViewType);
  familiesForCard$: Observable<Array<ICard>> = this.store.select(
    clientContractsSelectors.selectFamiliesForCard,
  );
  tabsConfiguration$: Observable<Array<LevelConfigurationOption>> = this.store.select(
    clientContractsSelectors.selectTabsConfiguration,
  );
  selectedTabConfiguration$: Observable<LevelConfigurationOption> = this.store.select(
    clientContractsSelectors.selectedLevelTabConfiguration,
  );
  selectedContractBrand$: Observable<ITrademark> = this.store.select(
    clientContractsSelectors.selectedContractBrand,
  );
  familiesByBrand$: Observable<Array<IVContractFamily>> = this.store.select(
    clientContractsSelectors.selectFamiliesForNewContract,
  );
  products$: Observable<IFamilyProducts> = this.store.select(
    clientContractsSelectors.selectProductsSectionConfiguration,
  );
  actualConfiguration$: Observable<IConfContratoCliente> = this.store.select(
    clientContractsSelectors.selectActualConfiguration,
  );
  clientIncomeLevel$: Observable<string> = this.store.select(
    clientContractsSelectors.getNivelIngreso,
  );
  activateSaveConfigButton$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectActivateSaveConfigurationButton,
  );
  activateCancelConfigButton$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectHasChanges,
  );
  listBrand$: Observable<OfferContractBrands[]> = this.store.select(
    clientContractsSelectors.selectContractBrands,
  );
  activeAlert$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectCancelPopIsOpen,
  );
  activeCancelPop$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectActivePopCancel,
  );
  tabsSubConfiguration$: Observable<Array<OptionBar>> = this.store.select(
    clientContractsSelectors.selectTabsSubConfiguration,
  );
  selectedSubConfigOption: Observable<OptionBar> = this.store.select(
    clientContractsSelectors.selectedTabSubConfiguration,
  );
  hasConfigurationProvider: Observable<boolean> = this.store.select(
    clientContractsSelectors.hasProviderConfiguration,
  );
  selectedClient$: Observable<VCliente> = this.store.select(clientsDetailsSelectors.selectedClient);
  isMexican$: Observable<boolean> = this.store.select(clientContractsSelectors.isMexican);
  searchTermBrand$: Observable<string> = this.store.select(
    clientContractsSelectors.selectSearchTermBrand,
  );
  statusBrandList$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectStatusBrandList,
  );

  readonly inputValidators = InputValidators;
  readonly textAlert = CANCEL_EDITION_MESSAGE;
  readonly viewTypes = AppViewTypes;
  titleNotConfiguration =
    'No cuenta con una configuración en la oferta del proveedor, por favor agrega una.';
  handleSearchByBrand = debounce(this.searchByBrand, DEFAULT_TIME_DEBOUNCE_SEARCH);
  lodashIsEmpty = isEmpty;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store.dispatch(catalogsActions.GET_CAT_UNIDAD_TIEMPO_LOAD());
    this.store.dispatch(catalogsActions.GET_LIST_CONCEPTS_CUSTOM_AGENT_LOAD());
    this.store.dispatch(catalogsActions.GET_LIST_AGENTE_ADUANAL_LOAD());
    this.store.dispatch(catalogsActions.GET_LIST_ADUANA_LOAD());
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  selectBrand(item: OfferContractBrands): void {
    this.store.dispatch(contractActions.SELECT_BRAND_COMPONENT_EFFECT({item}));
  }

  searchByBrand(searchTerm: string): void {
    this.store.dispatch(
      contractActions.SET_SEARCH_TERM_BY_BRAND_SELECTED({
        searchTerm,
      }),
    );
  }

  selectFamily(selectedFamily: ICard): void {
    this.store.dispatch(contractActions.SELECT_FAMILY_COMPONENT_EFFECT({selectedFamily}));
  }

  selectLevelConfigurationTab(selectedLevelConfigurationTab: LevelConfigurationOption): void {
    this.store.dispatch(
      contractActions.SELECT_LEVEL_CONFIGURATION_TAB_COMPONENT_EFFECT({
        selectedLevelConfigurationTab,
      }),
    );
  }

  cancelConfiguration(cancel: boolean): void {
    if (cancel) {
      this.store.dispatch(contractActions.RESTORE_BACKUP_CONFIGURATION());
    }
    this.store.dispatch(contractActions.IS_CANCEL_POP_OPEN({value: false}));
  }

  handleSelectedOption(option: OptionBar) {
    this.store.dispatch(clientContractActions.SET_SELECTED_BAR_OPTION({option}));
  }

  handleActiveAlert(status: boolean): void {
    this.store.dispatch(clientContractActions.HANDLE_ACTIVE_ALERT_COMPONENT_EFFECT({status}));
  }
}
