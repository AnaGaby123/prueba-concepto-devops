import {QueryResultVMarca, VMarca} from 'api-catalogos';
import {IQueryResultIVMarca} from '@appModels/store/forms/providers/providers-details/provider-form-step-4-trademark.model';
import {map, toLower} from 'lodash-es';

export const buildTrademarkListAfterResponse = (
  response: QueryResultVMarca,
): IQueryResultIVMarca => ({
  ...response,
  Results: map(response.Results, (o: VMarca) => ({
    ...o,
    image: `assets/Images/logos/${o.NombreImagen}.svg`,
    imageHover: `assets/Images/logos/${o.NombreImagen}_hover.svg`,
  })),
});

export const buildFamilyName = ({family, hasPoints = true, hasProducts = true}) =>
  `${family?.Tipo}${
    toLower(family?.Subtipo) !== 'n/a'
      ? hasPoints
        ? ' · ' + family?.Subtipo
        : ' ' + family?.Subtipo
      : ''
  }${
    toLower(family?.Control) !== 'n/a'
      ? hasPoints
        ? ' · ' + family?.Control
        : ' ' + family?.Control
      : ''
  }${hasProducts ? ': ' + family?.Productos : ''}`;
