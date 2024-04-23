// CORE
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {Store} from '@ngrx/store';
// MODELS
import {
  Levels,
  ProvidersTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// ACTIONS
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {contractsActions, pricesActions} from '@appActions/forms/client-form';
// SELECTORS
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';
// UTILS
import {PAGING_LIMIT} from '@appUtil/common.protocols';
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';

@Injectable()
export class ClientContractFormContractFamiliesMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  readonly tabOptions = ProvidersTabOptions;

  selectBrandComponent = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.SELECT_BRAND_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientContractsSelectors.selectedContractBrand),
          this.store.select(clientContractsSelectors.selectHasChanges),
        ),
        mergeMap(([{item}, selectedBrand, hasChanges$]) => {
          if (selectedBrand.IdMarca === item.IdMarca) {
            return EMPTY;
          }
          if (hasChanges$) {
            this.store.dispatch(
              contractActions.SET_PRE_SELECTED_BRAND({
                value: item,
              }),
            );
            this.store.dispatch(contractActions.ACTIVE_CANCEL_POP({value: true}));
          } else {
            this.store.dispatch(contractActions.SET_BRAND_SELECTED({brand: item}));
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  selectFamily$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.SELECT_FAMILY_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(clientContractsSelectors.selectHasChanges)),
        mergeMap(([{selectedFamily}, hasChanges$]) => {
          if (hasChanges$) {
            this.store.dispatch(contractActions.SET_PRE_SELECTED_FAMILY({value: selectedFamily}));
            this.store.dispatch(contractActions.ACTIVE_CANCEL_POP({value: true}));
          } else {
            this.store.dispatch(
              contractActions.SET_FAMILY_SELECTED({
                familyId: selectedFamily.value,
              }),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  selectLevelConfigurationTab$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.SELECT_LEVEL_CONFIGURATION_TAB_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientContractsSelectors.selectedFamily),
          this.store.select(clientContractsSelectors.selectHasChanges),
        ),
        mergeMap(([{selectedLevelConfigurationTab}, selectedFamily, hasChanges$]) => {
          if (hasChanges$) {
            this.store.dispatch(contractActions.ACTIVE_CANCEL_POP({value: true}));
            this.store.dispatch(
              contractActions.SET_PRE_SELECTED_LEVEL_CONFIGURATION({
                value: selectedLevelConfigurationTab,
              }),
            );
          } else {
            if (
              selectedFamily.selectedLevelConfigurationTab.id === selectedLevelConfigurationTab.id
            ) {
              return EMPTY;
            }
            this.store.dispatch(contractActions.CLEAN_ACTUAL_CONFIGURATION());
            this.store.dispatch(contractActions.SET_FAMILY_BACKUP());
            this.store.dispatch(
              contractActions.SET_SELECTED_TAB_CONFIGURATION({
                selectedLevelConfigurationTab,
              }),
            );
            switch (selectedLevelConfigurationTab.level) {
              case Levels.Family:
                this.store.dispatch(contractActions.GET_GENERAL_CONFIGURATION_LOAD());
                break;
              case Levels.listPrice:
                if (selectedFamily.prices.needsToReload) {
                  this.store.dispatch(contractActions.GET_PRICE_LIST_LOAD());
                } else {
                  this.store.dispatch(clientContractActions.RESTORE_PRICE_ACTUAL_CONFIGURATION());
                }
                break;
              case Levels.CharacteristicGrouper:
                if (selectedFamily.characteristicGroupers.needsToReload) {
                  this.store.dispatch(contractActions.GET_CHARACTERISTIC_GROUPER_LIST_LOAD());
                } else {
                  this.store.dispatch(
                    clientContractActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION(),
                  );
                }
                break;
              case Levels.Product:
                if (selectedFamily.products.needsToReload) {
                  this.store.dispatch(contractActions.GET_PRODUCT_LIST_LOAD());
                } else {
                  this.store.dispatch(clientContractActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION());
                }
                break;
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS EFECTO AL VERIFICAR SI HAY CAMBIOS
  handleActiveAlert$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.HANDLE_ACTIVE_ALERT_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientContractsSelectors.selectPreSelectedFamily),
          this.store.select(clientContractsSelectors.selectPreSelectedLevelConfiguration),
          this.store.select(clientContractsSelectors.selectPreSelectedBrand),
          this.store.select(clientContractsSelectors.selectedFamily),
        ),
        mergeMap(
          ([
            {status},
            preSelectedFamily,
            preSelectedLevelConfiguration,
            preSelectedBrand,
            selectedFamily,
          ]) => {
            if (status) {
              if (preSelectedBrand) {
                this.store.dispatch(clientContractActions.RESTORE_BACKUP_CONFIGURATION());
                this.store.dispatch(contractActions.SET_BRAND_SELECTED({brand: preSelectedBrand}));
              }
              if (preSelectedFamily) {
                this.store.dispatch(clientContractActions.RESTORE_BACKUP_CONFIGURATION());
                this.store.dispatch(
                  contractActions.SET_FAMILY_SELECTED({
                    familyId: preSelectedFamily.value,
                  }),
                );
              }
              if (preSelectedLevelConfiguration) {
                if (
                  selectedFamily.selectedLevelConfigurationTab.id ===
                  preSelectedLevelConfiguration.id
                ) {
                  return EMPTY;
                }
                this.store.dispatch(contractActions.CLEAN_ACTUAL_CONFIGURATION());
                this.store.dispatch(contractActions.SET_FAMILY_BACKUP());
                this.store.dispatch(
                  contractActions.SET_SELECTED_TAB_CONFIGURATION({
                    selectedLevelConfigurationTab: preSelectedLevelConfiguration,
                  }),
                );
                switch (preSelectedLevelConfiguration.level) {
                  case Levels.Family:
                    this.store.dispatch(contractActions.GET_GENERAL_CONFIGURATION_LOAD());
                    break;
                  case Levels.listPrice:
                    if (selectedFamily.prices.needsToReload) {
                      this.store.dispatch(contractActions.GET_PRICE_LIST_LOAD());
                    }
                    break;
                  case Levels.CharacteristicGrouper:
                    if (selectedFamily.characteristicGroupers.needsToReload) {
                      this.store.dispatch(contractActions.GET_CHARACTERISTIC_GROUPER_LIST_LOAD());
                    }
                    break;
                  case Levels.Product:
                    if (selectedFamily.products.needsToReload) {
                      this.store.dispatch(contractActions.GET_PRODUCT_LIST_LOAD());
                    }
                    break;
                }
              }
            }
            this.store.dispatch(contractActions.ACTIVE_CANCEL_POP({value: false}));
            this.store.dispatch(
              pricesActions.SET_PRE_SELECTED_LEVEL_CONFIGURATION({
                value: null,
              }),
            );
            this.store.dispatch(contractActions.SET_PRE_SELECTED_BRAND({value: null}));
            this.store.dispatch(pricesActions.SET_PRE_SELECTED_FAMILY({value: null}));
            return EMPTY;
          },
        ),
      ),
    {dispatch: false},
  );
  fetchMorePrices$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.FETCH_MORE_PRICES_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(clientContractsSelectors.selectPriceSectionConfiguration)),
        mergeMap(([{event}, prices]) => {
          if (event.endIndex !== prices.pricesList.Results.length - 1) {
            return EMPTY;
          }
          const currentTotal: number = prices.pricesList.TotalResults;
          const currentPage: number = prices.desiredPage;
          const isLoading: boolean = prices.isLoading;
          if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
            if (currentPage > totalPages || prices.pricesList.Results.length > currentTotal) {
              return EMPTY;
            }
            if (!isLoading) {
              setTimeout(async () => {
                this.setNeedsToReload('prices');
                this.getPricesList();
              }, 200);
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  fetchMoreClassifications$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.FETCH_MORE_CLASSIFICATIONS_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(
            clientContractsSelectors.selectCharacteristicGrouperSectionConfiguration,
          ),
        ),
        mergeMap(([{event}, classifications]) => {
          if (event.endIndex !== classifications.characteristicGroupersList.Results.length - 1) {
            return EMPTY;
          }
          const currentTotal: number = classifications.characteristicGroupersList.TotalResults;
          const currentPage: number = classifications.desiredPage;
          const isLoading: boolean = classifications.isLoading;
          if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
            if (
              currentPage > totalPages ||
              classifications.characteristicGroupersList.Results.length > currentTotal
            ) {
              return EMPTY;
            }
            if (!isLoading) {
              setTimeout(async () => {
                this.setNeedsToReload('classifications');
                this.getClassificationsList();
              }, 200);
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  fetchMoreProduct$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.FETCH_MORE_PRODUCT_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientContractsSelectors.selectProductsSectionConfiguration),
        ),
        mergeMap(([{event}, products]) => {
          if (event.endIndex !== products.productsList.Results.length - 1) {
            return EMPTY;
          }
          const currentTotal: number = products.productsList.TotalResults;
          const currentPage: number = products.desiredPage;
          const isLoading: boolean = products.isLoading;
          if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
            if (currentPage > totalPages || products.productsList.Results.length > currentTotal) {
              return EMPTY;
            }
            if (!isLoading) {
              setTimeout(async () => {
                this.setNeedsToReload('products');
                this.getProductsList();
              }, 200);
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  searchByPrice$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.SEARCH_BY_PRICE_COMPONENT_EFFECT),

        mergeMap(({searchTerm}) => {
          this.setNeedsToReload('generalAsidePrices');
          this.store.dispatch(
            contractActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM({
              searchTerm,
              node: 'generalAsidePrices',
            }),
          );
          if (searchTerm) {
            this.store.dispatch(
              contractActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: true,
                node: 'generalAsidePrices',
              }),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  setListOfTabConfigSearchTerm$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.SET_LIST_OF_TAB_CONFIG_SEARCH_TERM_COMPONENT_EFFECT),
        mergeMap(({searchTerm, tabConfiguration}) => {
          this.store.dispatch(
            contractActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
              tabConfigurationName: tabConfiguration,
              needsToReload: true,
            }),
          );
          switch (tabConfiguration) {
            case 'prices':
              this.store.dispatch(contractActions.SET_PRICE_LIST_SEARCH_TERM({searchTerm}));
              break;
            case 'classifications':
              this.store.dispatch(
                contractActions.SET_CHARACTERISTIC_GROUPER_LIST_SEARCH_TERM({searchTerm}),
              );
              break;
            case 'products':
              this.store.dispatch(contractActions.SET_PRODUCT_LIST_SEARCH_TERM({searchTerm}));
              break;
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  fetchMoreGeneralAsidePrices$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.FETCH_MORE_GENERAL_ASIDE_PRICES_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientContractsSelectors.selectAsidePricesForSelectedLevel),
        ),
        mergeMap(([{event}, prices]) => {
          if (event.endIndex !== prices.pricesList.Results.length - 1) {
            return EMPTY;
          }
          const currentTotal: number = prices.pricesList.TotalResults;
          const currentPage: number = prices.desiredPage;
          const isLoading: boolean = prices.isLoading;
          if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
            if (currentPage > totalPages || prices.pricesList.Results.length > currentTotal) {
              return EMPTY;
            }
            if (!isLoading) {
              this.store.dispatch(
                contractActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: true,
                  node: 'generalAsidePrices',
                }),
              );
              setTimeout(() => {
                this.setAsidePricesNeedsToReload('generalAsidePrices');
                this.getPricesListForPanelFamilyLevel();
              }, 200);
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: SAVE CONTRACT CONFIGURATION
  handleSaveContractConfiguration$ = createEffect(() =>
    this.action$.pipe(
      ofType(contractActions.HANDLE_SAVE_CONTRACT_CONFIGURATION),
      withLatestFrom(this.store.select(clientContractsSelectors.selectClientSendContract)),
      map(([{value}, send]) => {
        if (value) {
          if (!send) {
            this.store.dispatch(contractsActions.SET_ADD_STEP_VALUE({addStep: true}));
            this.store.dispatch(contractsActions.VALIDATE_CONTRATO_CLIENTE_LOAD());
          } else {
            this.store.dispatch(
              clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP({
                addContractActualStep: 2,
              }),
            );
          }
        } else {
          this.store.dispatch(contractActions.SET_INITIAL_CONFIGURATION_CONTRACT());
        }
        return RETURN_EMPTY();
      }),
    ),
  );

  getPricesList() {
    this.store.dispatch(contractActions.GET_PRICE_LIST_LOAD());
  }

  getClassificationsList() {
    this.store.dispatch(contractActions.GET_CHARACTERISTIC_GROUPER_LIST_LOAD());
  }

  getProductsList() {
    this.store.dispatch(contractActions.GET_PRODUCT_LIST_LOAD());
  }

  setNeedsToReload(selectedTab: string) {
    this.store.dispatch(
      contractActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
        needsToReload: true,
        tabConfigurationName: selectedTab,
      }),
    );
  }

  setAsidePricesNeedsToReload(selectedTab: string) {
    this.store.dispatch(
      contractActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
        needsToReload: true,
        node: selectedTab,
      }),
    );
  }

  getPricesListForPanelFamilyLevel() {
    this.store.dispatch(contractActions.GET_PRICE_LIST_FOR_PANEL_FAMILY_LEVEL_LOAD());
  }
}
