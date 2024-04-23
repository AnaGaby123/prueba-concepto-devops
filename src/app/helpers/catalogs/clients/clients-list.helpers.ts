import * as models from 'api-catalogos';
import {QueryResultVCliente, VCliente} from 'api-catalogos';
import {forIn, map, orderBy} from 'lodash-es';
import {
  IQueryResultVCliente,
  IVClient,
} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {ResultCorporates} from '@appModels/store/catalogs/catalogs.models';

export const buildClientsListAfterResponse = (
  response: QueryResultVCliente,
): IQueryResultVCliente => ({
  ...response,
  Results: map(
    response.Results,
    (o: VCliente): IVClient => ({
      ...o,
      image: `assets/Images/logos/${o.NombreImagen?.toLowerCase()}.png`,
      imageHover: `assets/Images/logos/${o.NombreImagen?.toLowerCase()}_hover.png`,
    }),
  ),
});

export const generateCSVBodyRequest = () => ({
  POCO: 'vCliente',
  info: {
    SortField: 'Nombre',
    SortDirection: 'asc',
    Filters: [
      {
        NombreFiltro: 'Activo',
        ValorFiltro: true,
      },
    ],
  },
  Columnas: [
    'Nombre:Nombre',
    'RazonSocial:Razón Social',
    'RFC:RFC',
    'Industria:Industria',
    'ESAC:ESAC',
    'EVI:EV',
    'Cobrador:Cobrador',
    'NombreCatRolCliente:Rol',
    'Sector:Sector',
    'NombrePais:País',
    'RutaEntrega:Ruta',
  ],
});
export const processCorporates = (result: models.GroupQueryResultVCliente): ResultCorporates => {
  const data = [];
  forIn(result.Groups, (value, key) => {
    data.push({
      IdCatCorporativo: key,
      NombreCorporativo: value.Results.length > 0 ? value.Results[0].NombreCorporativo : 'ND',
      Clientes: value.Results.length > 0 ? orderBy(value.Results.slice(), 'Nombre', 'asc') : [],
    });
  });

  return {
    totalCorporates: result.TotalGroups,
    corporatesToShow: orderBy(data, 'NombreCorporativo', 'asc'),
  };
};
