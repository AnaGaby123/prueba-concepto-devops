/* tslint:disable */
import { ConfiguracionComisionProveedor } from './configuracion-comision-proveedor';
import { ConfiguracionPrecioUtilidadCategoriaProveedorObj } from './configuracion-precio-utilidad-categoria-proveedor-obj';
export interface VMarcaFamiliaIndustriaObj {
  Activo?: boolean;
  ConfiguracionComisionProveedor?: ConfiguracionComisionProveedor;
  ConfiguracionPrecioUtilidadCategoriaProveedor?: Array<ConfiguracionPrecioUtilidadCategoriaProveedorObj>;
  IdCatIndustria?: string;
  IdMarcaFamilia?: string;
  IdMarcaFamiliaCatIndustria?: string;
  Industria?: string;
  OrdenIndustria?: number;
  OrdenSector?: number;
  Sector?: string;
  habilitado?: boolean;
  idCatSector?: string;
}
