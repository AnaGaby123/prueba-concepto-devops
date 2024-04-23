import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IClientsDetailsForm,
  initialIClientsDetailsForm,
} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';
import {generalDataClientsFormsReducers} from '@appReducers/forms/clients-form/clients-details-form/general-data-clients-form/general-data-clients-form.reducers';
import * as clientsDetailsActions from '@appActions/forms/client-form/clients-form.actions';
import {addressClientsFormReducers} from '@appReducers/forms/clients-form/clients-details-form/address-clients-form/address-clients-form.reducers';
import {chargesClientsFormReducers} from '@appReducers/forms/clients-form/clients-details-form/charges-clients-form/charges-clients-form.reducers';
import {pricesReducer} from '@appReducers/forms/clients-form/clients-details-form/prices/prices.reducer';
import {deliveryBillingClientsFormReducers} from '@appReducers/forms/clients-form/clients-details-form/delivery-billing-clients-form/delivery-billing-clients-form.reducers';
import {contractsClientFormReducers} from '@appReducers/forms/clients-form/clients-details-form/contracts-clients-form/contracts-form.reducer';
import * as clientsGeneralDataActions from '@appActions/forms/client-form/clients-details-form/general-data-clients-form/general-data-clients-form.actions';

export const clientsDetailsFormReducers: ActionReducer<IClientsDetailsForm> = combineReducers(
  {
    tabOptions: createReducer([
      {id: '1', label: 'DATOS GENERALES', activeSubtitle: false},
      {id: '2', label: 'DIRECCIONES DE ENTREGA', activeSubtitle: false},
      {id: '3', label: 'ENTREGA Y FACTURACIÓN', activeSubtitle: false},
      {id: '4', label: 'COBROS', activeSubtitle: false},
      {id: '5', label: 'PRECIOS', activeSubtitle: false},
      {id: '6', label: 'CONTRATOS', activeSubtitle: false},
    ]),
    tabSelected: createReducer(
      {
        id: '1',
        label: 'DATOS GENERALES',
        activeSubtitle: false,
      },
      on(clientsDetailsActions.SET_TAB_SELECTED, (state, {tab}) => ({
        ...state,
        id: tab.id,
        label: tab.label,
        activeSubtitle: false,
      })),
      on(clientsDetailsActions.RESTORE_STATE, (state) => ({
        ...state,
        id: '1',
        label: 'DATOS GENERALES',
        activeSubtitle: false,
      })),
    ),
    preSelectedTab: createReducer(
      null,
      on(clientsDetailsActions.SET_PRESELECTED_TAB, (state, {preSelectedTab}) => preSelectedTab),
    ),
    generalData: generalDataClientsFormsReducers,
    address: addressClientsFormReducers,
    charges: chargesClientsFormReducers,
    prices: pricesReducer,
    deliveryBilling: deliveryBillingClientsFormReducers,
    contracts: contractsClientFormReducers,
    selectedClient: createReducer(
      null,
      on(clientsGeneralDataActions.GET_CLIENT_SELECTED, (state, {client}) => client),
      on(clientsDetailsActions.SET_SELECTED_CLIENT, (state, {client}) => client),
      on(clientsGeneralDataActions.UPDATE_NAME_CLIENT, (state, {name}) => ({
        ...state,
        Nombre: name,
      })),
    ),
  },
  {
    ...initialIClientsDetailsForm(),
  },
);
