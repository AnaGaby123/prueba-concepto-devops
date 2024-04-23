import {FiltrosMarcaFamiliaObj, MarcaFamilia, VMarca, VSectorIndustriaFamilia} from 'api-catalogos';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

export interface IBrandsDetailsForm {
  brand: VMarca;
  brandBackup: VMarca;
  filterList: FiltrosMarcaFamiliaObj;
  items: Array<IBrandItemConfig>;
  needsToReloadFiltersList: boolean;
  forceErrors: boolean;
}

export const initialIBrandsDetailsForm = (): IBrandsDetailsForm => ({
  brand: initialBrand(),
  brandBackup: {} as VMarca,
  filterList: {} as FiltrosMarcaFamiliaObj,
  items: [],
  needsToReloadFiltersList: true,
  forceErrors: false,
});
export const initialBrand = (): VMarca => ({
  Activo: true,
  Capacitaciones: null,
  Direccion: null,
  Estandares: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdArchivo: null,
  IdCatPaisCompra: null,
  IdCatPaisManufactura: null,
  IdMarca: DEFAULT_UUID,
  Labware: null,
  // TODO: Descomentar cuando se actualicen apis de dev a prod
  // DispositivoMedico: null,
  NombreImagen: '',
  Nombre: null,
  Publicaciones: null,
  RazonSocial: null,
  Reactivos: null,
  TaxId: null,
  TotalProductos: null,
  CotizarAlternos: false,
  CotizarComplementarios: false,
});

export interface brandItem {
  title: string;
  items: Array<IBrandItemConfig>;
}

export interface IBrandItemConfig extends VSectorIndustriaFamilia {
  original: boolean;
  FechaRegistro: string;
  FechaUltimaActualizacion: string;
}

export const initialIMarcaFamilia = (): MarcaFamilia => ({
  Activo: true,
  ArchivoUSMCA: false,
  CartaDeUso: false,
  CartaDeUsoPersonalizada: false,
  CartaTraduccion: false,
  CertificadoDeAnalisis: false,
  DocumentosAdicionales: false,
  FacturaDeProveedor: false,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  PackingList: false,
});
