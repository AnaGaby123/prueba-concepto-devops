// CORE
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// MODELS
import {ClientTabOptions} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';
// SELECTORS
import {
  clientContractsSelectors,
  clientDeliveryBillingSelectors,
  clientsDetailsSelectors,
} from '@appSelectors/forms/clients-form';
// ACTIONS
import {
  addressesActions,
  chargesActions,
  clientDetailsFormActions,
  clientFormActions,
  contractsActions,
  deliveryBillingActions,
  generalDataActions,
  pricesActions,
} from '@appActions/forms/client-form';
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';

@Injectable()
export class ClientsDetailsFormEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  /*DOCS: Dispara el guardado dependiendo la sección en la que se encuentra*/
  dispatchSaveClientsSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientDetailsFormActions.SAVE_CLIENTS_SECTION_LOAD),
      withLatestFrom(
        this.store.select(clientsDetailsSelectors.selectedTabOption),
        this.store.select(clientDeliveryBillingSelectors.selectBilling),
      ),
      mergeMap(([action, {label}, billing]) => {
        const saves = {
          [ClientTabOptions.GeneralData]: () => generalDataActions.SAVE_GENERAL_DATA_LOAD(),
          [ClientTabOptions.DeliveryAddress]: () => addressesActions.SAVE_ADDRESS_CLIENT_LOAD(),
          [ClientTabOptions.DeliveryAndBilling]: () =>
            billing.TypeChangeSelected?.label === 'Diario Oficial'
              ? deliveryBillingActions.SHOW_REQUEST_AUTH_CODE()
              : deliveryBillingActions.SET_SAVE_BILLING_LOAD(),
          [ClientTabOptions.Charges]: () => chargesActions.SAVE_CHARGES_LOAD(),
          [ClientTabOptions.Prices]: () => pricesActions.SAVE_CONFIGURATION_LOAD(),
          [ClientTabOptions.Contracts]: () => contractsActions.VALIDATE_CONTRATO_CLIENTE_LOAD(),
        };
        return of(saves[label]());
      }),
    ),
  );

  /*DOCS: Dispara el backup del state dependiendo la sección en la que se encuentra*/
  dispatchBackupClientsSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientDetailsFormActions.BACKUP_CLIENTS_SECTION_LOAD),
      withLatestFrom(
        this.store.select(clientsDetailsSelectors.selectedTabOption),
        this.store.select(clientContractsSelectors.selectContracts),
      ),
      mergeMap(([action, {label}, contracts]) => {
        this.store.dispatch(clientFormActions.SET_ENABLE_EDIT({value: true}));
        const saves = {
          [ClientTabOptions.GeneralData]: () => generalDataActions.GENERATE_BACKUP(),
          [ClientTabOptions.DeliveryAddress]: () => addressesActions.SET_BACKUP_EDIT_ADDRESS(),
          [ClientTabOptions.DeliveryAndBilling]: () =>
            deliveryBillingActions.SET_BACKUP_DELIVERY_BILLING(),
          [ClientTabOptions.Charges]: () => chargesActions.SET_BACKUP_CHARGES(),
          [ClientTabOptions.Prices]: () => pricesActions.SET_BACKUP_CONFIGURATION(),
          [ClientTabOptions.Contracts]: () =>
            clientContractActions.GENERATE_BACKUP({
              selectedContract: contracts.selectedContract,
              newContract: contracts.newContract,
            }),
        };
        return of(saves[label]());
      }),
    ),
  );
}
