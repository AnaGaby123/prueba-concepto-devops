import {Proveedor, QueryResultVProveedor, VProveedor} from 'api-catalogos';
import {map} from 'lodash-es';
import {QueryResultIVProveedor} from '@appModels/store/forms/providers/providers-list/providers-list.models';

export const buildProvidersListAfterResponse = (
  response: QueryResultVProveedor,
): QueryResultIVProveedor => ({
  ...response,
  Results: map(response.Results, (o: VProveedor | Proveedor) => ({
    ...o,
    image: `assets/Images/logos/${o.NombreImagen?.toLowerCase()}.svg`,
    imageHover: `assets/Images/logos/${o.NombreImagen?.toLowerCase()}_hover.svg`,
  })),
});
