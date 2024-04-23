import * as importClientFormActions from './clients-form.actions';
import * as importClientListFormActions from './clients-list-form/clients-list-form.actions';
import * as importClientDetailsFormActions from './clients-details-form/clients-details-form.actions';
import * as importPriceActions from './clients-details-form/prices/prices.actions';
import * as importActionChargesClientForm from '@appActions/forms/client-form/clients-details-form/charges-clients-form/charges-clients-form.actions';
import * as importActionDeliveryBillingClientForm from '@appActions/forms/client-form/clients-details-form/delivery-blilling-clients-form/delivery-blilling-clients-form.actions';
import * as importActionGeneralDataClientForm from '@appActions/forms/client-form/clients-details-form/general-data-clients-form/general-data-clients-form.actions';
import * as importActionDAddressesClientForm from '@appActions/forms/client-form/clients-details-form/address-clients-form/address-clients-form.actions';
import * as importActionContractsClientForm from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';

export const clientFormActions = importClientFormActions;
export const clientListFormActions = importClientListFormActions;
export const clientDetailsFormActions = importClientDetailsFormActions;
export const generalDataActions = importActionGeneralDataClientForm;
export const addressesActions = importActionDAddressesClientForm;
export const pricesActions = importPriceActions;
export const chargesActions = importActionChargesClientForm;
export const deliveryBillingActions = importActionDeliveryBillingClientForm;
export const contractsActions = importActionContractsClientForm;
