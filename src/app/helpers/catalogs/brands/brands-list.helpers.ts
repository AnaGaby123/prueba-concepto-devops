import {VMarca} from 'api-catalogos';
import {IVMarca} from '@appModels/store/forms/brand-form/brand-form-list/brand-form-list.models';
import {map} from 'lodash-es';

export const buildBrandsListAddImage = (response: Array<VMarca>): Array<IVMarca> =>
  map(response, (o: VMarca) => ({
    ...o,
    image: `assets/Images/logos/${o.NombreImagen?.toLowerCase()}.svg`,
    imageHover: `assets/Images/logos/${o.NombreImagen?.toLowerCase()}_hover.svg`,
  }));
