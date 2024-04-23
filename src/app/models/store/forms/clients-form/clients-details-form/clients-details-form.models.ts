import {
  IGeneralDataClientsForm,
  initialIGeneralDataClientsForm,
} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  IClientAddress,
  initialIClientAddress,
} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {
  IChargesClientForm,
  initialChargesClientsForm,
} from '@appModels/store/forms/clients-form/clients-details-form/charges/charges-clients-form.models';
import {
  ClientPricesState,
  initialPricesState,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';

import {
  IDeliveryBilling,
  initialDeliveryBillingClientsForm,
} from '@appModels/store/forms/clients-form/clients-details-form/delivery-billing/delivery-billing-client-form.models';
import {
  IContractsForm,
  initialIContractsForm,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {VCliente} from 'api-catalogos';
import {appRoutes} from '@appHelpers/core/app-routes';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IClientsDetailsForm {
  tabOptions: Array<ITabOption>;
  tabSelected: ITabOption;
  preSelectedTab: ITabOption;
  generalData: IGeneralDataClientsForm;
  address: IClientAddress;
  charges: IChargesClientForm;
  deliveryBilling: IDeliveryBilling;
  prices: ClientPricesState;
  contracts: IContractsForm;
  selectedClient: VCliente;
}

export enum ClientTabOptions {
  GeneralData = 'DATOS GENERALES',
  DeliveryAddress = 'DIRECCIONES DE ENTREGA',
  DeliveryAndBilling = 'ENTREGA Y FACTURACIÓN',
  Charges = 'COBROS',
  Prices = 'PRECIOS',
  Contracts = 'CONTRATOS',
}

export const initialIClientsDetailsForm = (): IClientsDetailsForm => ({
  tabOptions: initialTabOptions(),
  tabSelected: initialTabOptions()[0],
  preSelectedTab: null,
  generalData: initialIGeneralDataClientsForm(),
  address: initialIClientAddress(),
  charges: initialChargesClientsForm(),
  prices: initialPricesState(),
  deliveryBilling: initialDeliveryBillingClientsForm(),
  contracts: initialIContractsForm(),
  selectedClient: null,
});

export const initialTabOptions = () => [
  {
    id: '1',
    label: ClientTabOptions.GeneralData,
    activeSubtitle: false,
    route: appRoutes.catalogs.clients.generalData,
  },
  {
    id: '2',
    label: ClientTabOptions.DeliveryAddress,
    activeSubtitle: false,
    route: appRoutes.catalogs.clients.address,
  },
  {
    id: '3',
    label: ClientTabOptions.DeliveryAndBilling,
    activeSubtitle: false,
    route: appRoutes.catalogs.clients.deliveryBilling,
  },
  {
    id: '4',
    label: ClientTabOptions.Charges,
    activeSubtitle: false,
    route: appRoutes.catalogs.clients.charges,
  },
  {
    id: '5',
    label: ClientTabOptions.Prices,
    activeSubtitle: false,
    route: appRoutes.catalogs.clients.prices,
  },
  {
    id: '6',
    label: ClientTabOptions.Contracts,
    activeSubtitle: false,
    route: appRoutes.catalogs.clients.contracts,
  },
];

//DOCS: Incializador del toggle
export enum OfferToggleOptionsClients {
  Monto = 'Monto',
  Unidad = 'Unidad',
}

export const initialToggleSwitchOptionsClients = (): DropListOption[] => [
  {
    value: '1',
    label: OfferToggleOptionsClients.Monto,
  },
  {
    value: '2',
    label: OfferToggleOptionsClients.Unidad,
  },
];
