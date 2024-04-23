import {VProducto} from 'api-catalogos';
import {IProduct} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';
import {map} from 'lodash-es';

export const buildProductsListAddImage = (response: Array<VProducto>): Array<IProduct> =>
  map(
    response,
    (o: IProduct): IProduct => ({
      ...o,
      image: `assets/Images/logos/${o?.NombreImagenMarca?.toLowerCase()}.svg`,
      imageHover: `assets/Images/logos/${o?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
      ImagePresentation: `assets/Images/products/${o?.TipoPresentacionClave?.toLowerCase()}.svg`,
      ImagePresentationHover: `assets/Images/products/${o?.TipoPresentacionClave?.toLowerCase()}_hover.svg`,
    }),
  );
