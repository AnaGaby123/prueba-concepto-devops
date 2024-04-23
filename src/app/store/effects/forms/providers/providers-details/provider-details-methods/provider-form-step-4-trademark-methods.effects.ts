import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {
  offerSelectors,
  providerSelectors,
  trademarkProviderSelectors,
} from '@appSelectors/forms/providers';
import {EMPTY, of} from 'rxjs';
import {offerActions, providerActions, trademarkProviderActions} from '@appActions/forms/providers';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {
  Levels,
  ProvidersTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {PAGING_LIMIT} from '@appUtil/common.protocols';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmDialogComponent} from '@appComponents/shared/confirm-dialog/confirm-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';

@Injectable()
export class ProviderFormStep4TrademarkMethodsEffects {
  readonly tabOptions = ProvidersTabOptions;
  typesOfPop = {
    family: 'family',
    levelConfigurationTab: 'levelConfigurationTab',
  };

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  //DOCS: EFECTOS PARA SECCION DE MARCAS
  fetchMoreTradeMark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trademarkProviderActions.FETCH_MORE_TRADEMARK_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(trademarkProviderSelectors.selectFetchMoreTrademarksInfo)),
      mergeMap(([action, info]) => {
        const {
          itemList,
          itemsTotalLength,
          listRequestStatus,
          desiredPage,
          totalPages,
        }: IFetchMoreItemsInfo = info;

        // DOCS: Validar antes de pedir la siguiente página
        if (
          action.event.endIndex !== itemList.length - 1 || // DOCS: El index del último item no coincida con el final de la página
          action.event.endIndex === itemsTotalLength - 1 || // DOCS: Ya se cargaron todos los resultados
          itemsTotalLength === 0 || // DOCS: No hay resultados
          desiredPage > totalPages || // DOCS: Se intenta cargar una página que no existe
          itemList.length > itemsTotalLength || // DOCS: La lista actual supera el total de resultados
          listRequestStatus === 1 // DOCS: Se está obteniendo una página
        ) {
          return EMPTY;
        }
        return of(
          trademarkProviderActions.GET_TRADEMARK_LIST_LOAD({
            isFirstPage: false,
          }),
        );
      }),
    ),
  );

  // EFECTOS PARA LA SECCION DE OFERTA

  setIncomeLevel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.SET_INCOME_LEVEL_COMPONENT_EFFECT),
      mergeMap((action) => {
        return of(
          offerActions.SET_SELECTED_PRICE_INCOME_LEVEL_FOR_PANEL({
            incomeLevel: action.incomeLevel,
          }),
        );
      }),
    ),
  );

  searchPriceForPanel$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(offerActions.SEARCH_PRICE_FOR_PANEL_COMPONENT_EFFECT),
        mergeMap((action) => {
          this.store.dispatch(
            offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
              isLoading: true,
            }),
          );
          this.store.dispatch(
            offerActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
              needsToReload: true,
            }),
          );
          this.store.dispatch(
            offerActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM({
              searchTerm: action.searchTerm,
            }),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  getPricePageForPanel$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(offerActions.GET_PRICE_PAGE_FOR_PANEL_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(offerSelectors.selectAsidePrices)),
        mergeMap(([action, asidePrices]) => {
          if (
            (action.value === -1 && asidePrices.desiredPage > 1) ||
            (action.value === 1 && asidePrices.desiredPage < asidePrices.pricesList.TotalResults)
          ) {
            this.store.dispatch(
              offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: true,
              }),
            );
            this.store.dispatch(
              offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                value: action.value,
              }),
            );
            this.store.dispatch(offerActions.GET_PRICE_LIST_FOR_PANEL_LOAD());
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  handleSelectedFamilyChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.HANDLE_SELECTED_FAMILY_CHANGED_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(offerSelectors.selectACHasChanges),
        this.store.select(providerSelectors.selectEnableEdit),
      ),
      mergeMap(([action, hasChanges, enableEdit]) => {
        this.store.dispatch(
          offerActions.SET_PRESELECTED_FAMILY_CHANGED({
            selectedFamily: action.selectedFamily,
          }),
        );
        if (hasChanges && enableEdit) {
          return of(offerActions.ALERT_POP({active: true}));
        } else {
          return of(offerActions.SELECT_FAMILY());
        }
      }),
    ),
  );

  selectFamily$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(offerActions.SELECT_FAMILY),
        withLatestFrom(this.store.select(offerSelectors.selectPreSelectedFamily)),
        mergeMap(([action, preSelectedFamily]) => {
          this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
          this.store.dispatch(
            offerActions.SET_SELECTED_FAMILY({
              familyId: preSelectedFamily.value,
            }),
          );
          this.store.dispatch(offerActions.SET_PRESELECTED_FAMILY_CHANGED({selectedFamily: null}));
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  setLevelConfigurationTab$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.SET_LEVEL_CONFIGURATION_TAB_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(offerSelectors.selectPreSelectedLevelConfig),
      ),
      mergeMap(([action, selectedFamily, preSelectedLevelConfiguration]) => {
        if (selectedFamily.selectedLevelConfigurationTab.id === preSelectedLevelConfiguration.id) {
          return EMPTY;
        }
        this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
        this.store.dispatch(offerActions.SET_FAMILY_BACKUP());
        if (preSelectedLevelConfiguration.id !== 5) {
          this.store.dispatch(offerActions.CLEAN_ACTUAL_CONFIGURATION());
        }
        this.store.dispatch(
          offerActions.SET_LEVEL_CONFIGURATION_TAB_SELECTED({
            selectedLevelConfigurationTab: preSelectedLevelConfiguration,
          }),
        );

        switch (preSelectedLevelConfiguration.level) {
          case Levels.Family:
            this.store.dispatch(offerActions.GET_GENERAL_CONFIGURATION_LOAD());
            break;
          case Levels.listPrice:
            if (selectedFamily.prices.needsToReload) {
              this.store.dispatch(offerActions.GET_PRICE_LIST_LOAD());
            } else {
              this.store.dispatch(offerActions.RESTORE_PRICE_ACTUAL_CONFIGURATION());
            }
            break;
          case Levels.CharacteristicGrouper:
            if (selectedFamily.classifications.needsToReload) {
              this.store.dispatch(offerActions.GET_CHARACTERISTIC_GROUPER_LIST_LOAD());
            } else {
              this.store.dispatch(offerActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION());
            }
            break;
          case Levels.Product:
            if (selectedFamily.products.needsToReload) {
              this.store.dispatch(offerActions.GET_PRODUCT_LIST_LOAD());
            } else {
              this.store.dispatch(offerActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION());
            }
            break;
          default:
            break;
        }
        return of(
          offerActions.SET_PRESELECTED_LEVEL_CONFIG({
            preSelectedLevelConfiguration: null,
          }),
        );
      }),
    ),
  );

  // DOCS: SE EJECUTA AL TRATA DE CAMBIAR DE TAB EN LA SECCIÓN DE OFERTA
  handleLevelConfigTabChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.HANDLE_LEVEL_CONFIG_TAB_CHANGE_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(offerSelectors.selectACHasChanges),
        this.store.select(providerSelectors.selectEnableEdit),
      ),
      mergeMap(([{selectedLevelConfigurationTab, typeOfPop}, hasChanges, enableEdit]) => {
        this.store.dispatch(
          offerActions.SET_PRESELECTED_LEVEL_CONFIG({
            preSelectedLevelConfiguration: selectedLevelConfigurationTab,
          }),
        );
        if (hasChanges && enableEdit) {
          return of(offerActions.SHOW_CONFIRM_DIALOG({typeOfPop}));
        } else {
          return of(offerActions.SET_LEVEL_CONFIGURATION_TAB_COMPONENT_EFFECT());
        }
      }),
    ),
  );

  fetchMorePrices$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(offerActions.FETCH_MORE_PRICES_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(offerSelectors.selectSFPriceList)),
        mergeMap(([action, prices]) => {
          if (action.event.endIndex !== prices.pricesList.Results.length - 1) {
            return EMPTY;
          }
          const currentTotal: number = prices.pricesList.TotalResults;
          const currentPage: number = prices.desiredPage;
          const isLoading: boolean = prices.isLoading;
          if (action.event.endIndex !== currentTotal - 1 && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
            if (currentPage > totalPages || prices.pricesList.Results.length > currentTotal) {
              return EMPTY;
            }
            if (!isLoading) {
              setTimeout(() => {
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                    tabConfigurationName: 'prices',
                    needsToReload: true,
                  }),
                );
                this.store.dispatch(offerActions.GET_PRICE_LIST_LOAD());
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
      this.actions$.pipe(
        ofType(offerActions.FETCH_MORE_CLASSIFICATIONS_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(offerSelectors.selectCharacteristicsGroupers)),
        mergeMap(([action, classifications]) => {
          if (action.event.endIndex !== classifications.classificationsList.Results.length - 1) {
            return EMPTY;
          }
          const currentTotal: number = classifications.classificationsList.TotalResults;
          const currentPage: number = classifications.desiredPage;
          const isLoading: boolean = classifications.isLoading;
          if (action.event.endIndex !== currentTotal - 1 && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
            if (
              currentPage > totalPages ||
              classifications.classificationsList.Results.length > currentTotal
            ) {
              return EMPTY;
            }
            if (!isLoading) {
              setTimeout(() => {
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                    tabConfigurationName: 'classifications',
                    needsToReload: true,
                  }),
                );
                this.store.dispatch(offerActions.GET_CHARACTERISTIC_GROUPER_LIST_LOAD());
              }, 200);
            }
          }

          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  fetchMoreProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(offerActions.FETCH_MORE_PRODUCTS_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(offerSelectors.selectSFProducts)),
        mergeMap(([action, products]) => {
          if (action.event.endIndex !== products.productsList.Results.length - 1) {
            return EMPTY;
          }
          const currentTotal: number = products.productsList.TotalResults;
          const currentPage: number = products.desiredPage;
          const isLoading: boolean = products.isLoading;
          if (action.event.endIndex !== currentTotal - 1 && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
            if (currentPage > totalPages || products.productsList.Results.length > currentTotal) {
              return EMPTY;
            }
            if (!isLoading) {
              setTimeout(() => {
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                    tabConfigurationName: 'products',
                    needsToReload: true,
                  }),
                );
                this.store.dispatch(offerActions.GET_PRODUCT_LIST_LOAD());
              }, 200);
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  setTarget$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(offerActions.SET_TARGET_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(offerSelectors.selectedCatIndustryBrandFamily)),
        mergeMap(([action, catIndustryFamilyBrand]) => {
          if (
            action.catIndustryFamilyBrand?.IdMarcaFamiliaCatIndustria !==
            catIndustryFamilyBrand?.IdMarcaFamiliaCatIndustria
          ) {
            this.store.dispatch(offerActions.RESET_ASIDE_PRICES());
            this.store.dispatch(offerActions.SET_IS_OPEN_POP_BREAKDOWN({value: true}));
            this.store.dispatch(
              offerActions.SET_SELECTED_CAT_INDUSTRY_RAND_FAMILY({
                catIndustryFamilyBrand: action.catIndustryFamilyBrand,
              }),
            );
            this.store.dispatch(offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({value: 1}));
            this.store.dispatch(
              offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: true,
              }),
            );
            this.store.dispatch(offerActions.GET_PRICE_LIST_FOR_PANEL_LOAD());
          } else {
            return EMPTY;
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: EFFECT FOR CONFIRM DIALOG TO DISCARD CHANGES
  showConfirmDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(offerActions.SHOW_CONFIRM_DIALOG),
        mergeMap(({typeOfPop}) => {
          const dialogRef = this.dialog.open(
            ConfirmDialogComponent,
            buildDialogConfig({
              message: this.translateService.instant(
                'formProvider.step8.continueWithoutChangesConfigurationMessage',
              ),
            }),
          );

          dialogRef.afterClosed().subscribe((value: boolean) => {
            if (value) {
              const typesOfPopActions = {
                [this.typesOfPop.family]: () => {
                  this.store.dispatch(offerActions.SELECT_FAMILY());
                },
                [this.typesOfPop.levelConfigurationTab]: () => {
                  this.store.dispatch(offerActions.SET_LEVEL_CONFIGURATION_TAB_COMPONENT_EFFECT());
                },
              };
              typesOfPopActions[typeOfPop]();
            }
          });

          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
