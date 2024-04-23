import {AttributeDashboard, Resumen} from 'api-logistica';
import {addRowIndex} from '@appUtil/util';
import {forEach, map as _map} from 'lodash-es';

import {ICustomerResults} from '@appModels/store/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.model';

enum PurchasePromiseStatus {
  Todos = 'Todos',
  ConOC = 'Con OC',
  SinOC = 'Sin OC',
}

enum PurchasePromiseApiResponse {
  Total = 'Total',
  ConOC = 'PromesasConOC',
  SinOC = 'PromesasSinOC',
}

const mapPurchasePromiseApiResponse = {
  [PurchasePromiseStatus.Todos]: PurchasePromiseApiResponse.Total,
  [PurchasePromiseStatus.ConOC]: PurchasePromiseApiResponse.ConOC,
  [PurchasePromiseStatus.SinOC]: PurchasePromiseApiResponse.SinOC,
};

const mapPurchasePromiseState = {
  [PurchasePromiseStatus.Todos]: PurchasePromiseStatus.Todos,
  [PurchasePromiseStatus.ConOC]: PurchasePromiseStatus.ConOC,
  [PurchasePromiseStatus.SinOC]: PurchasePromiseStatus.SinOC,
};

const buildPurchasePromiseFromDashboard = (
  customerList: Array<Resumen>,
): Array<ICustomerResults> => {
  customerList = addRowIndex(0, 0, customerList);
  return _map(customerList, (o: ICustomerResults) => {
    const newObject = {...o, IdCliente: o.DescripcionLlave};
    forEach(o.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });
    return newObject;
  });
};

export {
  PurchasePromiseStatus,
  PurchasePromiseApiResponse,
  mapPurchasePromiseApiResponse,
  mapPurchasePromiseState,
  buildPurchasePromiseFromDashboard,
};
