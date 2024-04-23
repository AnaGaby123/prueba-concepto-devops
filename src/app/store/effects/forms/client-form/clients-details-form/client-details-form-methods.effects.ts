/*CORE*/
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
/*ACTIONS*/
import {
  addressesActions,
  chargesActions,
  clientDetailsFormActions,
  clientFormActions,
  deliveryBillingActions,
  generalDataActions,
  pricesActions,
} from '@appActions/forms/client-form';
import * as clientsActions from '@appActions/forms/client-form/clients-form.actions';
import {RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
import {GET_CAT_TIPO_SOCIEDAD_MERCANTIL_LOAD} from '@appActions/catalogs/catalogos.actions';
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
/*SELECTORS*/
import {clientsDetailsSelectors, clientsSelectors} from '@appSelectors/forms/clients-form';
/*MODELS*/
import {
  ClientTabOptions,
  initialIClientsDetailsForm,
} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';
/*UTILS*/
import {appRoutes} from '@appHelpers/core/app-routes';
import {AppState} from '@appCore/core.state';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '@appComponents/shared/confirm-dialog/confirm-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {TranslateService} from '@ngx-translate/core';
import {TemporalConfigurationDialogComponent} from '@appComponents/catalogos/clients/clients-details/prices/temporal-configuration-dialog/temporal-configuration-dialog.component';

@Injectable()
export class ClientDetailsFormMethodsEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  readonly tabOptions = ClientTabOptions;

  // DOCS NGDESTROY de los detalles del cliente
  ngOnDestroy$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(clientDetailsFormActions.ON_DESTROY_DETAILS_COMPONENT_EFFECT),
        mergeMap(() => {
          this.store.dispatch(clientsActions.SET_EDIT_MODE({value: false}));
          this.store.dispatch(
            clientsActions.SET_TAB_SELECTED({
              tab: {
                ...initialIClientsDetailsForm().tabSelected,
              },
            }),
          );
          this.store.dispatch(generalDataActions.CLEAN_GENERAL_DATA_STATE());
          this.store.dispatch(addressesActions.CLEAN_ADDRESS_CLIENT_STATE());
          this.store.dispatch(clientsActions.SET_IS_IN_DETAILS({value: false}));
          this.store.dispatch(chargesActions.CLEAN_CHARGES_CLIENT_STATE());
          this.store.dispatch(clientsActions.SET_SELECTED_CLIENT({client: null}));
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS Efecti para la navegación entre tabs
  setTab$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(clientDetailsFormActions.SET_TAB_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientsDetailsSelectors.selectedClient),
          this.store.select(clientsSelectors.selectClientsHasChangesBySteps),
          this.store.select(clientsSelectors.selectEnableEdit),
        ),
        mergeMap(([{tab}, selectedClient, hasChanges, enableEdit]) => {
          if (hasChanges && enableEdit) {
            this.store.dispatch(clientDetailsFormActions.SHOW_CONFIRM_DIALOG({isFromTab: true}));
            this.store.dispatch(clientFormActions.SET_PRESELECTED_TAB({preSelectedTab: tab}));
          } else {
            switch (tab.label) {
              case this.tabOptions.GeneralData:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.generalData,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab}));
                    }
                  });
                break;
              case this.tabOptions.DeliveryAddress:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.address,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab}));
                      this.store.dispatch(
                        addressesActions.SET_ID_CLIENT({
                          IdCliente: selectedClient.IdCliente,
                        }),
                      );
                    }
                  });
                break;
              case this.tabOptions.DeliveryAndBilling:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.deliveryBilling,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab}));
                      this.store.dispatch(SET_LOADING({payload: true}));
                      this.store.dispatch(GET_CAT_TIPO_SOCIEDAD_MERCANTIL_LOAD());
                    }
                  });
                break;
              case this.tabOptions.Charges:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.charges,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(SET_LOADING({payload: true}));
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab}));
                    }
                  });
                break;
              case this.tabOptions.Prices:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.prices,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(SET_LOADING({payload: true}));
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab}));
                      this.store.dispatch(pricesActions.GET_INITIAL_PRICES_STATE_LOAD());
                    }
                  });
                break;
              case this.tabOptions.Contracts:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.contracts,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab}));
                    }
                  });
                break;
              default:
                return EMPTY;
            }
            this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: false}));
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS Efecto para descartar cambios o continuar editando
  discardOrContinue$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(clientDetailsFormActions.DISCARD_OR_CONTINUE_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientsDetailsSelectors.selectedTabOption),
          this.store.select(clientsSelectors.selectEditMode),
          this.store.select(clientsDetailsSelectors.selectPreSelectedTab),
        ),
        mergeMap(([{value}, tabSelected, editMode, preSelectedTab]) => {
          if (value) {
            switch (tabSelected.id) {
              // DOCS: ESTA VALIDACION SOLO ES PARA LA TAB 1, EL RESTO SOLO DEBE DISPARAR LA ACCION PARA REESTABLECER BACKUP
              case '1':
                if (!editMode) {
                  this.router.navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                  ]);
                } else {
                  this.store.dispatch(generalDataActions.CLEAN_FORM());
                }
                break;
              case '2':
                this.store.dispatch(addressesActions.CLEAN_ADDRESS_FORM());
                break;
              case '3':
                this.store.dispatch(deliveryBillingActions.SET_CLEAN_BACKUP());
                break;
              case '4':
                if (!editMode) {
                  this.router.navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                  ]);
                } else {
                  this.store.dispatch(chargesActions.SET_CLEAN_BACKUP());
                }
                break;
              case '5':
                this.store.dispatch(pricesActions.SET_RESTORE_DATA_BACKUP());
                break;
              case '6':
                this.returnToContractsList();
                this.store.dispatch(clientContractActions.SET_DETAILS({value: false}));
                break;
            }
            this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: false}));
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS Efecto para descartar cambios al cambiar de tab
  setDiscardOrContinueChangeTab$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(clientDetailsFormActions.DISCARD_OR_CONTINUE_CHANGE_TAB_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientsDetailsSelectors.selectedTabOption),
          this.store.select(clientsDetailsSelectors.selectPreSelectedTab),
          this.store.select(clientsDetailsSelectors.selectedClient),
        ),
        mergeMap(([{value}, tabSelected, preSelectedTab, selectedClient]) => {
          if (value) {
            switch (tabSelected.label) {
              case this.tabOptions.GeneralData:
                this.store.dispatch(generalDataActions.CLEAN_FORM());
                break;
              case this.tabOptions.DeliveryAddress:
                this.store.dispatch(addressesActions.CLEAN_ADDRESS_FORM());
                break;
              case this.tabOptions.DeliveryAndBilling:
                this.store.dispatch(deliveryBillingActions.SET_CLEAN_BACKUP());
                break;
              case this.tabOptions.Charges:
                this.store.dispatch(chargesActions.SET_CLEAN_BACKUP());
                break;
              case this.tabOptions.Prices:
                this.store.dispatch(pricesActions.SET_RESTORE_DATA_BACKUP());
                break;
              case this.tabOptions.Contracts:
                this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab: preSelectedTab}));
                break;
              default:
                return EMPTY;
            }
            switch (preSelectedTab.label) {
              case this.tabOptions.GeneralData:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.generalData,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab: preSelectedTab}));
                    }
                  });
                break;
              case this.tabOptions.DeliveryAddress:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.address,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab: preSelectedTab}));
                      this.store.dispatch(
                        addressesActions.SET_ID_CLIENT({
                          IdCliente: selectedClient.IdCliente,
                        }),
                      );
                    }
                  });
                break;
              case this.tabOptions.DeliveryAndBilling:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.deliveryBilling,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab: preSelectedTab}));
                      this.store.dispatch(SET_LOADING({payload: true}));
                      this.store.dispatch(GET_CAT_TIPO_SOCIEDAD_MERCANTIL_LOAD());
                    }
                  });
                break;
              case this.tabOptions.Charges:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.charges,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(SET_LOADING({payload: true}));
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab: preSelectedTab}));
                    }
                  });
                break;
              case this.tabOptions.Prices:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.prices,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(SET_LOADING({payload: true}));
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab: preSelectedTab}));
                      this.store.dispatch(pricesActions.GET_INITIAL_PRICES_STATE_LOAD());
                    }
                  });
                break;
              case this.tabOptions.Contracts:
                this.router
                  .navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                    appRoutes.catalogs.clients.details,
                    appRoutes.catalogs.clients.contracts,
                  ])
                  .then((navigate: boolean) => {
                    if (navigate) {
                      this.store.dispatch(clientsActions.SET_TAB_SELECTED({tab: preSelectedTab}));
                    }
                  });
                break;
              default:
                return EMPTY;
            }
            this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: false}));
          }
          this.store.dispatch(clientFormActions.SET_PRESELECTED_TAB({preSelectedTab: null}));
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS Efecto para cancelar los cambios hechos al realizar un nuevo registro
  cancelAdd$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(clientDetailsFormActions.CANCEL_ADD_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(clientsDetailsSelectors.openAddAlert)),
        mergeMap(([action, hasChanges]) => {
          if (hasChanges) {
            this.store.dispatch(clientDetailsFormActions.SHOW_CONFIRM_DIALOG({}));
          } else {
            this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: false}));
            this.router.navigate([
              appRoutes.protected,
              appRoutes.catalogs.catalogs,
              appRoutes.catalogs.clients.clients,
            ]);
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS Efecto para cancelar los cambios hechos al editar un registro
  cancelForm$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(clientDetailsFormActions.CANCEL_FORM_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(clientsSelectors.selectClientsSectionHasChanges),
          this.store.select(clientsDetailsSelectors.selectedTabOption),
          this.store.select(clientsSelectors.selectEditMode),
        ),
        mergeMap(([action, hasChanges, tabSelected, editMode]) => {
          if (hasChanges) {
            this.store.dispatch(clientDetailsFormActions.SHOW_CONFIRM_DIALOG({}));
          } else {
            switch (tabSelected.id) {
              case '1':
                if (!editMode) {
                  this.router.navigate([
                    appRoutes.protected,
                    appRoutes.catalogs.catalogs,
                    appRoutes.catalogs.clients.clients,
                  ]);
                }
                break;
              case '3':
                this.store.dispatch(deliveryBillingActions.SET_INITIAL_DATA());
                break;
              case '6':
                this.returnToContractsList();
                this.store.dispatch(clientContractActions.SET_DETAILS({value: false}));
                break;
            }
            this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: false}));
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS Efecto para guardar los datos en cada tab
  saveData$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(clientDetailsFormActions.SAVE_DATA_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(clientsDetailsSelectors.selectedTabOption)),
        mergeMap(([action, {label}]) => {
          if (label === ClientTabOptions.Prices) {
            const dialogRef = this.dialog.open(
              TemporalConfigurationDialogComponent,
              buildDialogConfig({}),
            );

            dialogRef.afterClosed().subscribe((value: boolean) => {
              if (value) {
                this.store.dispatch(
                  pricesActions.SAVE_CONFIGURATION_COMPONENT_EFFECT({
                    value,
                  }),
                );
              }
            });
          } else {
            this.store.dispatch(clientDetailsFormActions.SAVE_CLIENTS_SECTION_LOAD());
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  returnToContractsList() {
    this.store.dispatch(
      clientContractActions.SET_IS_ADDING_CONTRACT({
        addingContract: false,
      }),
    );
    this.store.dispatch(
      clientContractActions.SET_CONTRACT_IS_EDIT_MODE({
        contractEditMode: false,
      }),
    );
    this.store.dispatch(
      clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP({
        addContractActualStep: 0,
      }),
    );
    this.store.dispatch(
      clientContractActions.SET_SELECTED_TAB_FILTER({
        item: {id: '0', label: 'ACTIVOS', filter: 'ACTIVO'},
      }),
    );
  }

  /*   showConfirmDialog$ = createEffect(
   () =>
   this.action$.pipe(
     ofType(clientDetailsFormActions.SHOW_CONFIRM_DIALOG),
     mergeMap(() => {
       return of(RETURN_EMPTY());
     }
})
   ),
 )*/

  // DOCS: SHOW CONFIRM DIALOG FOR DISCARD CHANGES
  showConfirmDialog$ = createEffect(() =>
    this.action$.pipe(
      ofType(clientDetailsFormActions.SHOW_CONFIRM_DIALOG),
      mergeMap(({isFromTab}) => {
        const dialogRef = this.dialog.open(
          ConfirmDialogComponent,
          buildDialogConfig({
            message: this.translateService.instant('formProduct.general.titleModal'),
          }),
        );

        dialogRef.afterClosed().subscribe((value: boolean) => {
          if (isFromTab) {
            this.store.dispatch(
              clientDetailsFormActions.DISCARD_OR_CONTINUE_CHANGE_TAB_COMPONENT_EFFECT({value}),
            );
          } else {
            this.store.dispatch(
              clientDetailsFormActions.DISCARD_OR_CONTINUE_COMPONENT_EFFECT({value}),
            );
          }
        });
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
