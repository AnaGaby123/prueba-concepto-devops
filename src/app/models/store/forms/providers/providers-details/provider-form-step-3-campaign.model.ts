import {
  Campana,
  CampanaProducto,
  QueryResultVAgrupadorCaracteristica,
  QueryResultVMarca,
  QueryResultVMarcaFamilia,
  QueryResultVProducto,
  VAgrupadorCaracteristica,
  VCampana,
  VMarcaFamilia,
} from 'api-catalogos';
import {CampaignsViewConfigurations} from '@appModels/catalogos/providers/campaigns/campaigns';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {currentDateWithoutHoursUTCFormat} from '@appUtil/dates';
import {VMarca, VProducto} from 'api-logistica';

export interface Campaign {
  campaignList: CampaignList;
  campaignDetails: CampaignDetails;
  addCampaing: boolean;
  backup: CampaignBackup;
}

export const initialCampaign = (): Campaign => ({
  campaignList: initialCampaignList(),
  campaignDetails: initialCampaignDetails(),
  addCampaing: false,
  backup: {} as CampaignBackup,
});

export interface IVQueryResultVCampana {
  Results?: Array<IVCampana>;
  TotalResults?: number;
}

export interface IVCampana extends VCampana {
  apiStatusItemsRelated?: number;
  Index?: number;
  isSelected?: boolean;
  itemCampaign?: any;
  itemsRelated?: Array<any>;
  needsToReload?: boolean;
}

export const initialIVCampana = (): IVCampana => ({
  itemCampaign: {
    Results: [],
    TotalResults: 0,
  },
  itemsRelated: [],
});

export interface CampaignList {
  campaigns: IVQueryResultVCampana;
  campaignTabOptions: Array<ITabOption>;
  selectedCampaignTabOption: ITabOption;
  selectedCampaign?: IVCampana;
  queryInfo?: {
    searchTerm?: string;
    desiredPage: number;
    apiStatus: number;
  };
  apiStatusCampaigns: number;
  campaignsToDelete: Array<IVCampana>;
}

export interface CampaignBackup {
  campaigns?: Array<IVCampana>;
  campaignForm?: ICampaignForm;
}

export const initialCampaignList = (): CampaignList => ({
  campaigns: {
    Results: [],
    TotalResults: 0,
  },
  selectedCampaign: initialIVCampana(),
  campaignTabOptions: [
    {id: '1', label: 'ACTIVAS', activeSubtitle: false},
    {id: '2', label: 'INACTIVAS', activeSubtitle: false},
  ],
  selectedCampaignTabOption: {id: '1', label: 'ACTIVAS', activeSubtitle: false},
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    apiStatus: API_REQUEST_STATUS_DEFAULT,
  },
  apiStatusCampaigns: API_REQUEST_STATUS_DEFAULT,
  campaignsToDelete: [],
});

export interface CampaignDetails {
  campaignFilterOptions: Array<DropListOption>;
  campaignFilterSelected: DropListOption;
  labelsTexts: Array<CampaignsViewConfigurations>;
  campaign: ICampaignForm;
  classifications: QueryResultVAgrupadorCaracteristica;
  products: QueryResultVProducto;
  trademark: QueryResultVMarca;
  familiesProvider: QueryResultVMarcaFamilia;
  needsToReloadProducts: boolean;
  needsToReloadClassifications: boolean;
  needsToReloadFamiliesProvider: boolean;
  needsToReloadTrademark: boolean;
  currentPageProducts: number;
  currentPageClassifications: number;
  currentPageProvidersFamilies: number;
  currentPageTrademark: number;
  searchTermProducts: string;
  searchTermClassifications: string;
  searchTermFamiliesProvider: string;
  searchTermTrademark: string;
  apiStatusProducts: number;
  apiStatusClassifications: number;
  apiStatusFamiliesProvider: number;
  apiStatusTrademark: number;
  editCampaign: boolean;
}

export const initialCampaignDetails = (): CampaignDetails => ({
  campaignFilterOptions: [],
  campaignFilterSelected: null,
  labelsTexts: initialLabelTexts(),
  campaign: initialCampaignForm(),
  products: {
    Results: [],
    TotalResults: 0,
  },
  classifications: {
    Results: [],
    TotalResults: 0,
  },
  trademark: {
    Results: [],
    TotalResults: 0,
  },
  familiesProvider: {
    Results: [],
    TotalResults: 0,
  },
  needsToReloadProducts: true,
  needsToReloadClassifications: true,
  needsToReloadFamiliesProvider: true,
  needsToReloadTrademark: true,
  currentPageProducts: 0,
  currentPageClassifications: 0,
  currentPageProvidersFamilies: 0,
  currentPageTrademark: 0,
  searchTermProducts: '',
  searchTermClassifications: '',
  searchTermFamiliesProvider: '',
  searchTermTrademark: '',
  apiStatusProducts: API_REQUEST_STATUS_DEFAULT,
  apiStatusClassifications: API_REQUEST_STATUS_DEFAULT,
  apiStatusFamiliesProvider: API_REQUEST_STATUS_DEFAULT,
  apiStatusTrademark: API_REQUEST_STATUS_DEFAULT,
  editCampaign: false,
});

export interface ICampaignForm {
  generaData: Campana | IVCampana;
  itemsRelated: Array<VProducto | VAgrupadorCaracteristica | VMarcaFamilia | VMarca>;
  itemsToDelete: Array<any>;
}

export const initialCampaignForm = (): ICampaignForm => ({
  generaData: {
    Activo: true,
    Dinero: false,
    FechaFin: currentDateWithoutHoursUTCFormat(),
    FechaInicio: currentDateWithoutHoursUTCFormat(),
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdCampana: DEFAULT_UUID,
    IdCatTipoCampana: null,
    IdProveedor: DEFAULT_UUID,
    Nombre: null,
    Objetivo: null,
    Porcentaje: true,
    ValorComisionDinero: null,
    ValorComisionPorcentaje: null,
  },
  itemsRelated: [],
  itemsToDelete: [],
});

export const initialLabelTexts = (): Array<CampaignsViewConfigurations> => [
  {
    id: 'Producto',
    titleListData: 'PRODUCTO',
    titleListItemsRelated: 'PRODUCTOS RELACIONADOS',
    textNumberRegisterListData: 'Producto',
    textNumberRegisterListItemsRelated: 'Producto Relacionado',
    text2NumberRegisterListData: '',
    withoutTextRelated: 'SIN PRODUCTOS RELACIONADOS',
    withoutTextItems: 'SIN RESULTADOS',
    searchConfiguration: 'Catálogo, Concepto',
    fetchMoreConfiguration: {
      listName: 'products',
      idName: 'IdProducto',
      selectListName: 'getProducts',
      selectCurrentPageName: 'currentPageProducts',
    },
  },
  {
    id: 'Proveedor',
    titleListData: 'TODAS LAS FAMILIAS',
    titleListItemsRelated: 'TODAS LAS FAMILIAS',
    textNumberRegisterListData: 'FAMILIAS',
    textNumberRegisterListItemsRelated: 'Familias',
    text2NumberRegisterListData: 'Productos',
    withoutTextRelated: 'SIN FAMILIAS',
    withoutTextItems: 'SIN RESULTADOS',
    searchConfiguration: 'Familia',
    fetchMoreConfiguration: {
      listName: 'familiesProvider',
      idName: 'IdProveedorFamilia',
      selectListName: 'getFamiliesProvider',
      selectCurrentPageName: 'currentPageProvidersFamilies',
    },
  },
  {
    id: 'Agrupador por característica',
    titleListData: 'AGRUPADOR POR CARACTERÍSTICAS',
    titleListItemsRelated: 'AGRUPADORES RELACIONADOS',
    textNumberRegisterListData: 'Agrupadores',
    textNumberRegisterListItemsRelated: 'Agrupador Relacionado',
    text2NumberRegisterListData: '',
    withoutTextRelated: 'SIN AGRUPADORES RELACIONADOS',
    withoutTextItems: 'SIN RESULTADOS',
    searchConfiguration: 'Concepto',
    fetchMoreConfiguration: {
      listName: 'classifications',
      idName: 'IdCatClasificacionProducto',
      selectListName: 'getClassifications',
      selectCurrentPageName: 'currentPageClassifications',
    },
  },
  {
    id: 'Marca',
    titleListData: 'MARCAS',
    titleListItemsRelated: 'MARCAS RELACIONADAS',
    textNumberRegisterListData: 'Marcas',
    textNumberRegisterListItemsRelated: 'Marca Relacionada',
    text2NumberRegisterListData: '',
    withoutTextRelated: 'SIN MARCAS RELACIONADAS',
    withoutTextItems: 'SIN RESULTADOS',
    searchConfiguration: 'Marca',
    fetchMoreConfiguration: {
      listName: 'trademark',
      idName: 'IdMarca',
      selectListName: 'getTrademark',
      selectCurrentPageName: 'currentPageTrademark',
    },
  },
  {
    id: 'Familia',
    titleListData: 'FAMILIAS',
    titleListItemsRelated: 'FAMILIAS RELACIONADAS',
    textNumberRegisterListData: 'FAMILIAS',
    textNumberRegisterListItemsRelated: 'Familias',
    text2NumberRegisterListData: 'Productos',
    withoutTextRelated: 'SIN FAMILIAS RELACIONADAS',
    withoutTextItems: 'SIN RESULTADOS',
    searchConfiguration: 'Familia',
    fetchMoreConfiguration: {
      listName: 'familiesProvider',
      idName: 'IdProveedorFamilia',
      selectListName: 'getFamiliesProvider',
      selectCurrentPageName: 'currentPageProvidersFamilies',
    },
  },
];

export const initialProductCampaignItem = (): CampanaProducto => ({
  IdCampanaProducto: DEFAULT_UUID,
  IdCampana: null,
  IdProducto: null,
  Activo: true,
});
