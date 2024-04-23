import {VProductoAlternativo, VProductoComplementario} from 'api-catalogos';
import {
  IVProducto,
  IVProductoAlternativo,
  IVProductoComplementario,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {map} from 'lodash-es';

export const buildAlternativeProductsAddImage = (
  response: Array<VProductoAlternativo>,
): Array<IVProductoAlternativo> =>
  map(
    response,
    (o: VProductoAlternativo): IVProductoAlternativo => ({
      ...o,
      image: `assets/Images/logos/${o?.NombreImagenMarca?.toLowerCase()}.svg`,
      imageHover: `assets/Images/logos/${o?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
      ImagePresentation: `assets/Images/products/${o?.TipoPresentacionClave?.toLowerCase()}.svg`,
      ImagePresentationHover: `assets/Images/products/${o?.TipoPresentacionClave?.toLowerCase()}_hover.svg`,
    }),
  );
export const buildComplementaryProductsAddImage = (
  response: Array<VProductoComplementario>,
): Array<IVProductoComplementario> =>
  map(
    response,
    (o: VProductoComplementario): IVProductoComplementario => ({
      ...o,
      image: `assets/Images/logos/${o?.NombreImagenMarca?.toLowerCase()}.svg`,
      imageHover: `assets/Images/logos/${o?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
      ImagePresentation: `assets/Images/products/${o?.TipoPresentacionClave?.toLowerCase()}.svg`,
      ImagePresentationHover: `assets/Images/products/${o?.TipoPresentacionClave?.toLowerCase()}_hover.svg`,
    }),
  );
export const buildProductsAddImage = (response: Array<IVProducto>): Array<IVProducto> =>
  map(
    response,
    (o: IVProducto): IVProducto => ({
      ...o,
      image: `assets/Images/logos/${o?.NombreImagenMarca?.toLowerCase()}.svg`,
      imageHover: `assets/Images/logos/${o?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
      ImagePresentation: `assets/Images/products/${o?.TipoPresentacionClave?.toLowerCase()}.svg`,
      ImagePresentationHover: `assets/Images/products/${o?.TipoPresentacionClave?.toLowerCase()}_hover.svg`,
    }),
  );
