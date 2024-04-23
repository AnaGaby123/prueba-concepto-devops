import {GMPartidaInvestigacionCotizador} from 'api-logistica';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {QueryResultVMarcaFamilia} from 'api-catalogos';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';

export interface Product {
  data: GMPartidaInvestigacionCotizador;
  brandSelected: DropListOption;
  offlineProductStatus: number;
  typeUnitSelected: DropListOption;
  typesFamiliesOptionsApi: QueryResultVMarcaFamilia;
  typesFamiliesOptionsDropList: Array<DropListOption>;
  typeFamilySelected: DropListOption;
  productExisting: ProductSearchResult;
}

export const initialQueryResultVMarcaFamily = (): QueryResultVMarcaFamilia => ({
  Results: [],
  TotalResults: 0,
});

export const initialProduct = (): Product => ({
  data: initialItem(),
  brandSelected: {} as DropListOption,
  offlineProductStatus: API_REQUEST_STATUS_DEFAULT,
  typeUnitSelected: {} as DropListOption,
  typesFamiliesOptionsApi: initialQueryResultVMarcaFamily(),
  typesFamiliesOptionsDropList: [] as Array<DropListOption>,
  typeFamilySelected: {} as DropListOption,
  productExisting: {} as ProductSearchResult,
});

const initialItem = (): GMPartidaInvestigacionCotizador => ({
  cotPartidaCotizacionInvestigacion: {
    Activo: true,
    Atendida: false,
    Cantidad: '',
    Catalogo: null,
    Descripcion: null,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdCatEstadoInvestigacion: DEFAULT_UUID,
    IdCatUnidad: null,
    IdCotCotizacion: null,
    IdCotPartidaCotizacionInvestigacion: DEFAULT_UUID,
    IdMarcaFamiliaProveedor: null,
    IdUsuarioAtiende: null,
    Investigada: false,
    Piezas: 0,
  },
  cotPartidaCotizacionInvestigacionComentario: {
    IdCotPartidaCotizacionInvestigacion: DEFAULT_UUID,
    IdCotPartidaCotizacionInvestigacionComentario: DEFAULT_UUID,
    Activo: true,
    Comentario: null,
    ComentarioEVI: true,
    ComentarioInvestigador: false,
    FechaRegistro: DEFAULT_DATE,
  },
});
