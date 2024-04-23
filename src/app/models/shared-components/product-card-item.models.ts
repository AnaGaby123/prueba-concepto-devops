import {IImageItem} from '@appModels/shared/shared.models';

export interface IProductLinked {
  product: IProductCardItem;
  value: boolean;
}

export interface IProductCardItem extends IImageItem {
  Activo?: boolean;
  ActivoConfiguracion?: boolean;
  Catalogo: string;
  Controlado: boolean;
  Descripcion: string;
  DisponibilidadClave: string;
  Disponibilidad: string;
  IdProducto: string;
  IdProductoAlternativo?: string;
  IdProductoAlternativoRelacion?: string;
  IdProductoComplementarioRelacion?: string;
  ImagenMarca?: string;
  ImagePresentation?: string;
  ImagePresentationHover?: string;
  Index?: number;
  PrecioLista: number;
  Presentacion: string;
  Subtipo: string;
  Tipo: string;
  TipoProductoClave: string;
  TotalAlternativo: number;
  TotalComplementario: number;
  Unidad: string;
  Uso: string;
  MonedaVentaProveedor?: string;
  NombreMarca?: string;
  AgrupadorCaracteristica?: string;
}
