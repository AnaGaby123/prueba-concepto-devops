import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {clientDetailsFormActions, pricesActions} from '@appActions/forms/client-form';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {clientPricesSelectors} from '@appSelectors/forms/clients-form';
import * as clientSelectors from '@appSelectors/forms/clients-form/clients-form.selectors';
import {SET_ENABLE_EDIT} from '@appActions/forms/client-form/clients-form.actions';
import {Levels} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {initialPricesState} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {AppState} from '@appCore/core.state';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '@appComponents/shared/confirm-dialog/confirm-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class PricesClientsFormMethodsEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  // DOCS EFECTO AL CAMBIAR DE TAB DE CONFIGURACION DE NIVELES
  selectConfigurationTab$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.SELECT_CONFIGURATION_TAB_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientPricesSelectors.haveChangesActualConfiguration),
          this.store.select(clientSelectors.selectEnableEdit),
          this.store.select(clientPricesSelectors.selectedProviderFamily),
        ),
        mergeMap(([{selectedLevelConfigurationTab}, hasChanges$, enableEdit, selectedFamily]) => {
          if (hasChanges$ && enableEdit) {
            this.store.dispatch(pricesActions.SHOW_CONFIRM_DIALOG());
            this.store.dispatch(
              pricesActions.SET_PRE_SELECTED_LEVEL_CONFIGURATION({
                value: selectedLevelConfigurationTab,
              }),
            );
          } else {
            if (
              selectedFamily.selectedLevelConfigurationTab.id === selectedLevelConfigurationTab.id
            ) {
              return EMPTY;
            }
            this.store.dispatch(pricesActions.QUIT_ACTUAL_CONFIGURATION());
            this.store.dispatch(SET_ENABLE_EDIT({value: false}));
            this.store.dispatch(pricesActions.SET_FAMILY_BACKUP());
            this.store.dispatch(
              pricesActions.SET_LEVEL_CONFIGURATION_SELECTED_LOAD({
                selectedLevelConfigurationTab,
              }),
            );
            switch (selectedLevelConfigurationTab.level) {
              case Levels.Family: {
                this.store.dispatch(pricesActions.GET_FAMILY_GENERAL_CONFIGURATION_LOAD());
                break;
              }
              case Levels.listPrice: {
                if (selectedFamily.prices.needsToReload) {
                  this.store.dispatch(pricesActions.GET_PRICE_LOAD());
                } else {
                  this.store.dispatch(pricesActions.RESTORE_PRICE_ACTUAL_CONFIGURATION());
                }
                break;
              }
              case Levels.CharacteristicGrouper: {
                if (selectedFamily.classifications.needsToReload) {
                  this.store.dispatch(pricesActions.GET_CLASSIFICATIONS_LOAD());
                } else {
                  this.store.dispatch(pricesActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION());
                }
                break;
              }
              case Levels.Product: {
                if (selectedFamily.products.needsToReload) {
                  this.store.dispatch(pricesActions.GET_PRODUCTS_LIST_LOAD());
                } else {
                  this.store.dispatch(pricesActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION());
                }
                break;
              }
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS EFECTO AL CAMBIAR DE FAMILIA Y VERIFICAR SI EXISTEN CAMBIOS SIN GUARDAR
  selectedFamilyChange$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.SELECTED_FAMILY_CHANGES_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientPricesSelectors.haveChangesActualConfiguration),
          this.store.select(clientSelectors.selectEnableEdit),
        ),
        mergeMap(([{selectedFamily}, hasChanges$, enableEdit]) => {
          if (hasChanges$ && enableEdit) {
            this.store.dispatch(pricesActions.SET_PRE_SELECTED_FAMILY({value: selectedFamily}));
            this.store.dispatch(pricesActions.SHOW_CONFIRM_DIALOG());
          } else {
            this.store.dispatch(SET_ENABLE_EDIT({value: false}));
            this.store.dispatch(
              pricesActions.SET_SELECTED_FAMILY({
                familyId: selectedFamily.value,
              }),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS EFECTO AL CAMBIAR DE PROVEEDOR Y VERIFICAR SI EXISTEN CAMBIOS SIN GUARDAR
  selectedProvider$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.SELECTED_PROVIDER_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientPricesSelectors.haveChangesActualConfiguration),
          this.store.select(clientSelectors.selectEnableEdit),
          this.store.select(clientPricesSelectors.selectedProviderId),
        ),
        mergeMap(([{providerSelected}, hasChanges$, enableEdit, providerId]) => {
          if (providerSelected.IdProveedor !== providerId) {
            if (hasChanges$ && enableEdit) {
              this.store.dispatch(
                pricesActions.SET_PRE_SELECTED_PROVIDER({
                  value: providerSelected,
                }),
              );
              this.store.dispatch(pricesActions.SHOW_CONFIRM_DIALOG());
            } else {
              this.store.dispatch(
                pricesActions.SET_SELECTED_PROVIDER({
                  providerId: providerSelected.IdProveedor,
                }),
              );
              this.store.dispatch(SET_ENABLE_EDIT({value: false}));
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
        ofType(pricesActions.HANDLE_ACTIVE_ALERT_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientPricesSelectors.selectPreSelectedFamily),
          this.store.select(clientPricesSelectors.selectPreSelectedLevelConfiguration),
          this.store.select(clientPricesSelectors.selectPreSelectedProvider),
          this.store.select(clientPricesSelectors.selectedProviderFamily),
        ),
        mergeMap(
          ([
            {status},
            preSelectedFamily,
            preSelectedLevelConfiguration,
            preSelectedProvider,
            selectedFamily,
          ]) => {
            if (status) {
              if (preSelectedFamily) {
                this.store.dispatch(pricesActions.SET_RESTORE_DATA_BACKUP());
                this.store.dispatch(SET_ENABLE_EDIT({value: false}));
                this.store.dispatch(
                  pricesActions.SET_SELECTED_FAMILY({
                    familyId: preSelectedFamily.value,
                  }),
                );
                this.store.dispatch(pricesActions.SET_PRE_SELECTED_FAMILY({value: null}));
              }
              if (preSelectedLevelConfiguration) {
                if (
                  selectedFamily.selectedLevelConfigurationTab.id ===
                  preSelectedLevelConfiguration.id
                ) {
                  return EMPTY;
                }
                this.store.dispatch(pricesActions.SET_RESTORE_DATA_BACKUP());
                this.store.dispatch(pricesActions.QUIT_ACTUAL_CONFIGURATION());
                this.store.dispatch(SET_ENABLE_EDIT({value: false}));
                this.store.dispatch(pricesActions.SET_FAMILY_BACKUP());
                this.store.dispatch(
                  pricesActions.SET_LEVEL_CONFIGURATION_SELECTED_LOAD({
                    selectedLevelConfigurationTab: preSelectedLevelConfiguration,
                  }),
                );
                switch (preSelectedLevelConfiguration.level) {
                  case Levels.Family: {
                    this.store.dispatch(pricesActions.GET_FAMILY_GENERAL_CONFIGURATION_LOAD());
                    break;
                  }
                  case Levels.listPrice: {
                    if (selectedFamily.prices.needsToReload) {
                      this.store.dispatch(pricesActions.GET_PRICE_LOAD());
                    } else {
                      this.store.dispatch(pricesActions.RESTORE_PRICE_ACTUAL_CONFIGURATION());
                    }
                    break;
                  }
                  case Levels.CharacteristicGrouper: {
                    if (selectedFamily.classifications.needsToReload) {
                      this.store.dispatch(pricesActions.GET_CLASSIFICATIONS_LOAD());
                    } else {
                      this.store.dispatch(
                        pricesActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION(),
                      );
                    }
                    break;
                  }
                  case Levels.Product: {
                    if (selectedFamily.products.needsToReload) {
                      this.store.dispatch(pricesActions.GET_PRODUCTS_LIST_LOAD());
                    } else {
                      this.store.dispatch(pricesActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION());
                    }
                    break;
                  }
                }
                this.store.dispatch(
                  pricesActions.SET_PRE_SELECTED_LEVEL_CONFIGURATION({
                    value: null,
                  }),
                );
              }

              if (preSelectedProvider) {
                this.store.dispatch(pricesActions.SET_RESTORE_DATA_BACKUP());
                this.store.dispatch(
                  pricesActions.SET_SELECTED_PROVIDER({
                    providerId: preSelectedProvider.IdProveedor,
                  }),
                );
                this.store.dispatch(SET_ENABLE_EDIT({value: false}));
                this.store.dispatch(pricesActions.SET_PRE_SELECTED_PROVIDER({value: null}));
              }
            }
            return EMPTY;
          },
        ),
      ),
    {dispatch: false},
  );
  // DOCS EFECTO PARA BUSCAR UN PRECIO DE LISTA
  setConfigurationSearchTerm$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.SET_CONFIGURATION_SEARCH_TERM_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(clientPricesSelectors.selectedLevelConfigurationTab)),
        mergeMap(([{searchTerm}, configurationOption]) => {
          switch (configurationOption.id) {
            case 2:
              this.setNeedsToReload('prices');
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_SEARCH_TERM({
                  searchTerm,
                }),
              );
              break;
            case 3:
              this.setNeedsToReload('classifications');
              this.store.dispatch(
                pricesActions.SET_SEARCH_TERM_BY_CLASSIFICATIONS_LIST({
                  searchTerm,
                }),
              );
              break;
            case 4:
              this.setNeedsToReload('products');
              this.store.dispatch(
                pricesActions.SET_SEARCH_TERM_BY_PRODUCTS_LIST({
                  searchTerm,
                }),
              );
              break;
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS EFECTO PARA GUARDAR UNA CONFIGURACION
  saveConfiguration$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.SAVE_CONFIGURATION_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientPricesSelectors.selectConfigurationTypeSelected),
          this.store.select(clientPricesSelectors.selectedLevelConfigurationTab),
        ),
        mergeMap(([{value}, {label}, selectedTabConfiguration]) => {
          const date = new Date();
          date.setHours(date.getHours() + 2);
          this.store.dispatch(
            pricesActions.SET_VIGENCIA({
              Vigencia: label === 'Temporal' ? date.toISOString() : null,
              selectedTabConfiguration:
                selectedTabConfiguration.level === 'Familia'
                  ? 'General'
                  : selectedTabConfiguration.level === 'PrecioLista'
                  ? 'Costo'
                  : selectedTabConfiguration.level === 'AgrupadorCaracteristica'
                  ? 'Clasificacion'
                  : selectedTabConfiguration.level,
              typeConfiguration: label,
            }),
          );
          this.store.dispatch(clientDetailsFormActions.SAVE_CLIENTS_SECTION_LOAD());

          this.store.dispatch(
            pricesActions.SET_CONFIGURATION_TYPE({
              value: initialPricesState().configurationTypes[0],
            }),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: EFFECT TO SHOW CONFIRM DIALOG TO DISCARD CHANGES
  showConfirmDialog$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pricesActions.SHOW_CONFIRM_DIALOG),
        mergeMap(() => {
          const dialogRef = this.dialog.open(
            ConfirmDialogComponent,
            buildDialogConfig({
              message: this.translateService.instant('common.titleModalCancel'),
            }),
          );
          dialogRef.afterClosed().subscribe((value: boolean) => {
            this.store.dispatch(
              pricesActions.HANDLE_ACTIVE_ALERT_COMPONENT_EFFECT({status: value}),
            );
          });
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  setNeedsToReload(selectedTab: string) {
    this.store.dispatch(
      pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
        tabConfigurationName: selectedTab,
        needsToReload: true,
      }),
    );
  }
}
