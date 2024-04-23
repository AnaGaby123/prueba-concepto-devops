/* tslint:disable */
import { CatControl } from './cat-control';
import { CatSubtipoProducto } from './cat-subtipo-producto';
import { CatTipoProducto } from './cat-tipo-producto';
import { VMarcaFamilia } from './vmarca-familia';
export interface OpcionesFamiliaContenido {
  ListaCatControl?: Array<CatControl>;
  ListaCatSubtipoProducto?: Array<CatSubtipoProducto>;
  ListaCatTipoProducto?: Array<CatTipoProducto>;
  ListaVMarcaFamilia?: Array<VMarcaFamilia>;
}
