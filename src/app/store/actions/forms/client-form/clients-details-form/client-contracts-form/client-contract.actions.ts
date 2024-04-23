import {createAction, props} from '@ngrx/store';
import {
  BrandItem,
  IConfContratoCliente,
  IContract,
  IFamilyCharacteristicGrouperList,
  IFamilyPricesList,
  IFamilyProductsList,
  ITrademark,
  IVClasificacionProductoMarcaCliente,
  IVContractFamily,
  IVPrecioListaClienteProductoContrato,
  IVPrecioProductoCliente,
  OfferContractBrands,
  SignedContract,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {LevelConfigurationOption} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {
  ArchivoDetalle,
  QueryInfo,
  QueryResultVPrecioListaClienteProductoFamiliaContrato,
  ResultObtenerContratosContemporaneosMismasMarcas,
  VMarcaFamilia,
} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICard} from '@appModels/card/card';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {IUploadFile} from '@appModels/UploadFile/UploadFile';
import {buildingStringActionType} from '@appUtil/strings';
import {OptionBar} from '@appModels/options-bar/options-bar';

const typeApi = 'Api ClientForm - Contracts';
const typeReducer = 'Reduce ClientForm - Contracts';

export const GET_INITIAL_DATA_CONTRACT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Get Initial Data Contract Component Effect'),
);
export const SET_BRAND = createAction(
  '[ClientForm] Set Marca Contrato',
  props<{brand: ITrademark}>(),
);
export const DELETE_BRAND = createAction(
  '[ClientForm] Eliminar Marca Contrato',
  props<{brand: ITrademark}>(),
);
export const SET_CONTRACT_PRICE = createAction(
  buildingStringActionType(typeReducer, 'Set Contract price to configured'),
  props<{price: IVPrecioListaClienteProductoContrato}>(),
);
export const SET_DATE_INITIAL = createAction(
  '[ClientForm] Set Fecha Inicio Contrato',
  props<{payload: any}>(),
);
export const SET_DATE_FINAL = createAction(
  '[ClientForm] Set Fecha Final Contrato',
  props<{payload: any}>(),
);

export const SET_DATES_CONTRACT = createAction(
  buildingStringActionType(typeReducer, 'Set Dates Contract'),
  props<{typeDate: string; payload: any}>(),
);
export const SET_ID_CONDICIONES_PAGO = createAction(
  '[ClientForm] Set Condiciones Pago Contrato',
  props<{IdCatCondicionesDePago: string}>(),
);

export const GET_BRANDS_DATES_UPDATE = createAction(
  buildingStringActionType(typeReducer, 'Get Brands Dates Update'),
);
export const GET_BRANDS_LOAD = createAction('[API] BRANDS LOAD');

export const GET_BRANDS_SUCCESS = createAction(
  '[API] BRANDS SUCCESS',
  props<{
    brands: BrandItem[];
  }>(),
);

// export const GET_BRANDS_SUCCESS = createAction(
//   '[API] BRANDS SUCCESS',
//   props<{
//     brands: Array<ITrademark>;
//     totalBrands: number;
//     currentPage: number;
//   }>(),
// );
export const GET_BRANDS_ERROR = createAction('[API] BRANDS ERROR', props<{error: any}>());
/*Consulta de familia y precio de lista*/
export const SET_V_FAMILY_CONTRATO_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'obtener familias en contratos Success'),
  props<{families: Array<IVContractFamily>}>(),
);

export const GET_V_FAMILY_CONTRATO_ERROR = createAction(
  '[API] obtener familias en contratos Success',
  props<{error: any}>(),
);
export const GET_ADDRESSES_CLIENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get addresses client load'),
);
export const GET_ADDRESSES_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get address client success'),
  props<{clientAddresses: any}>(),
);
export const GET_ADDRESSES_CLIENT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get address client failed'),
);
/*Actualizar el item seleccionado de momento*/
export const SET_BRAND_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set selected brand'),
  props<{brand: OfferContractBrands}>(),
);
export const SET_PRE_SELECTED_BRAND = createAction(
  buildingStringActionType(typeReducer, 'Set pre selected brand'),
  props<{value: OfferContractBrands | null}>(),
);
export const SET_PRE_SELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set pre selected family'),
  props<{value: ICard | null}>(),
);
export const SET_PRE_SELECTED_LEVEL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Set pre selected level configuration'),
  props<{value: LevelConfigurationOption | null}>(),
);
export const SET_FAMILY_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set selected family'),
  props<{familyId: string}>(),
);
export const SET_SELECTED_TAB_CONFIGURATION = createAction(
  buildingStringActionType(typeApi, 'Set selected tab configuration'),
  props<{selectedLevelConfigurationTab: LevelConfigurationOption}>(),
);
export const SAVE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save contract configuration load'),
);
export const SAVE_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save contract configuration success'),
  props<{newFamily: IVContractFamily}>(),
);
export const SAVE_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Save contract configuration failed'),
);
export const SAVE_GENERAL_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save contract general configuration load'),
  props<{selectedFamily: IVContractFamily}>(),
);
export const SAVE_PRICE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save contract price configuration load'),
  props<{selectedFamily: IVContractFamily}>(),
);
export const SAVE_CLASSIFICATION_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save contract classification configuration load'),
  props<{selectedFamily: IVContractFamily}>(),
);
export const SAVE_PRODUCT_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save contract product configuration load'),
  props<{selectedFamily: IVContractFamily}>(),
);
export const SET_SEARCH_TERM_BY_BRAND = createAction(
  '[ClientFormStep5] Set Search Term By Brand',
  props<{
    searchTerm: string;
    queryInfo: QueryInfo;
  }>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search Term'),
  props<{searchTerm: string}>(),
);
export const GET_LIST_CONTRACTS_CLIENT_LOAD = createAction('[API-CONTRACT] Get List Contracts');

export const GET_LIST_CONTRACTS_CLIENT_SUCCESS = createAction(
  '[API-CONTRACT] Get List Contracts Success',
  props<{lista: IContract[]; tab: string}>(),
);
export const SET_EDIT_MODE = createAction(
  '[ClientForm5] Set Edit Mode contract',
  props<{editMode: boolean}>(),
);
export const SET_ENABLE_EDIT = createAction(
  '[ClientForm5] Set Enable edit contract',
  props<{enableEdit: boolean}>(),
);
export const SET_URL_CONTRACT = createAction(
  '[ClientForm5] Guardar URL PDF',
  props<{url: string}>(),
);
/*DATOS CONFIGURACIÓN CONTRATO*/
export const SET_CONTRACT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Contract Data'),
  props<{node: string; payload}>(),
);
export const SET_CONTRACT_DATA_BUSSINESSNAME = createAction(
  buildingStringActionType(typeReducer, 'Set Contract Data BussinessName'),
  props<{payload: DropListOption}>(),
);
export const SET_VALUE_TYPE_CONTRACT = createAction(
  buildingStringActionType(typeReducer, 'Set Value Type Contract'),
  props<{payload: boolean}>(),
);
export const SET_VALUE_TYPE_AGREEEMENT = createAction(
  buildingStringActionType(typeReducer, 'Set Value Type Agreement Contract'),
  props<{payload: boolean}>(),
);
export const SET_INITIAL_CONFIGURATION_CONTRACT = createAction(
  buildingStringActionType(typeReducer, 'Set Initial Configuration Contract'),
);
export const SET_ID_EMPRESA = createAction(
  '[API-CONTRACT-CONFIGURATION] Guardar Id Empresa',
  props<{payload: string}>(),
);
/*Recuperar lista empresas para drop*/
export const GET_COMPANYS_LOAD = createAction('[API-CONTRACT-CONFIGURATION] LISTA DE EMPRESAS');
export const GET_COMPANYS_SUCCESS = createAction(
  '[API-CONTRACT-CONFIGURATION] LISTA DE EMPRESAS SUCCESS',
  props<{payload: any}>(),
);
/*Guardar el contrato en BD*/
export const VALIDATE_CONTRATO_CLIENTE_LOAD = createAction('[API-CONTRACT] Validar Contrato Load');

export const SET_VALIDATE_CLIENTE_SUCCESS = createAction(
  '[API-CONTRACT] Guardar Validar Contrato Success',
  props<{value: boolean}>(),
);
export const SET_BRAND_INVALIDATE = createAction(
  '[API-CONTRACT] Guardar Marcas Invalidas Contrato Success',
  props<{brands: ResultObtenerContratosContemporaneosMismasMarcas[]}>(),
);
export const VALIDATE_CONTRATO_CLIENTE_ERROR = createAction(
  '[API-CONTRACT] Validar Contrato Success',
  props<{error: any}>(),
);
export const SAVE_CONTRATO_CLIENTE = createAction(
  '[API-CONTRACT] Guardar Contrato Cliente',
  props<{activeSequential: boolean}>(),
);

export const SAVE_CONTRATO_CLIENTE_FAILED = createAction('[API-CONTRACT] Guardo Contrato Error');
export const SAVE_CONTRATO_CLIENTE_MARCA = createAction(
  '[API-CONTRACT] Guardar Marcas Contrato Cliente',
);
export const SET_CONTRACT_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeApi, 'Set contract needs to reload'),
  props<{contract: IContract}>(),
);
/*Almacenar ID CONTRATO CLIENTE*/
export const SET_ID_CONTRACT_CLIENT = createAction(
  '[API-CONTRACT-CLIENT] Almacenar ID Contrato Cliente',
  props<{payload: string}>(),
);
export const SET_SIGNED_CONTRACT = createAction(
  '[ClientFormStep5] Set Signed Contract',
  props<{
    signedContract: SignedContract;
  }>(),
);
export const UPLOAD_SIGNED_CONTRACT_FILE = createAction('[MinIO] Upload signed contract file');
/*Consult de URL para visualizar el contrato*/
export const GET_CONTRACT_FILE_DETAIL = createAction(
  '[ClientFormStep5] Get Contract File Detail',
  props<{idFile: string}>(),
);
export const GET_URL_CONTRACT_SUCCESS = createAction(
  '[ClientFormStep5] Recuperar URL Contrato Success',
);
export const CREATE_PDF_CONTRACT_LOAD = createAction('[ClientFormStep5] Generar PDF Contrato');
export const CREATE_PDF_CONTRACT_SUCCESS = createAction(
  '[ClientFormStep5] Generar PDF Contrato Success',
);

export const SET_SELECTED_TAB_FILTER = createAction(
  '[ClientFormStep5] Update Selected tab Filter',
  props<{item: ITabOption}>(),
);
/*Mantener el item seleccionado de la lista de contratos*/
export const SET_ITEM_SELECTED_CONTRAT = createAction(
  '[ClientFormStep5] Guardar item seleccionado',
  props<{item: IContract}>(),
);
/*Obtener url y marcas del contrato seleccionado*/
export const GET_DATAS_CONTRACT_LOAD = createAction(
  '[ClientFormStep5] Obtener Marcas Relacionadas al Contrato Load',
  props<{
    contract: IContract;
    isEdition: boolean;
    tabSelected: string;
    typeAction: string;
  }>(),
);
export const GET_DATAS_CONTRACT_ERROR = createAction(
  '[ClientFormStep5] Obtener Marcas Relacionadas al Contrato Error',
);
export const GET_DATAS_CONTRACT_SUCCESS = createAction(
  '[ClientFormStep5] Obtener Marcas Relacionadas al Contrato Success',
  props<{item: IContract; tab: string}>(),
);
export const GET_DATA_NEW_CONTRACT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Obtener Marcas Relacionadas al nuevo Contrato Load'),
  props<{contract: IContract}>(),
);
export const GET_DATA_NEW_CONTRACT_ERROR = createAction(
  '[ClientFormStep5] Obtener Marcas Relacionadas al Contrato Error',
);
export const GET_DATA_NEW_CONTRACT_SUCCESS = createAction(
  '[ClientFormStep5] Obtener Marcas Relacionadas al nuevo Contrato Success',
  props<{brands: OfferContractBrands[]}>(),
);
/*Desactivar un contrato existente*/
export const DISABLE_CONTRACT_LOAD = createAction(
  '[ClientFormStep5] Cancelar Contrato Load',
  props<{idContratoCliente: string}>(),
);
export const DISABLE_CONTRACT_SUCCESS = createAction('[ClientFormStep5] Cancelar Contrato Success');
export const DISABLE_CONTRACT_ERROR = createAction(
  '[ClientFormStep5] Cancelar Contrato Error',
  props<{error: any}>(),
);
export const SET_CONTRACT_TO_EDIT = createAction(
  '[ClientFormStep5] Set Contract To Edit',
  props<{contract: IContract}>(),
);
export const SET_ACTIVE_CONTRACT_TO_EDIT = createAction(
  '[ClientFormStep5] Set Active Contract To Edit',
  props<{value: boolean}>(),
);
export const RESET_FORM_CONTRACT = createAction('[ClientFormStep5] Reset Form Contract');
export const RESET_VALIDATE_CONTRACT = createAction('[ClientFormStep5] Reset Validate Contract');
export const SET_SAVE_CONTRACT_STATUS = createAction(
  '[ClientFormStep5] Save Contract Status',
  props<{value: number}>(),
);
export const REQUEST_DISABLE_BRANDS = createAction('[API_Contract] Request disable brands');
export const CHECK_GENERATED_CONTRACT_STATUS = createAction(
  '[ClientFormStep5] Check Generated Contract Status',
  props<{idFile: string}>(),
);
export const SET_ID_CONTRACT_FILE = createAction(
  '[ClientFormStep5] Set Id Contract File',
  props<{IdArchivoContrato: string}>(),
);
export const SET_ID_SIGNED_CONTRACT_FILE = createAction(
  '[ClientFormStep5] Set Id Signed Contract File',
  props<{IdArchivoContratoFirmado: string}>(),
);
export const SET_SEARCH_TERM_BY_BRAND_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set search term by brand'),
  props<{searchTerm: string}>(),
);
export const SET_PDF_CONTRACT_LOADING = createAction('[ClientFormStep5] Set PDF Contract Loading');
export const SET_PDF_CONTRACT_SUCCESS = createAction('[ClientFormStep5] Set PDF Contract Success');
export const SET_PDF_CONTRACT_FAILED = createAction('[ClientFormStep5] Set PDF Contract Failed');
export const GET_PROCESO_SISTEMA_LOAD = createAction(
  '[ClientFormStep5] Get Proceso Sistema Load',
  props<{IdProcesoSistema: string}>(),
);
export const SET_IS_ADDING_CONTRACT = createAction(
  buildingStringActionType(typeReducer, 'Set is adding contract'),
  props<{addingContract: boolean}>(),
);
export const SET_CONTRACT_IS_EDIT_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set contract is edit mode'),
  props<{contractEditMode: boolean}>(),
);
export const SET_ADD_CONTRACT_ACTUAL_STEP = createAction(
  buildingStringActionType(typeReducer, 'Set add contract actual step'),
  props<{addContractActualStep: number}>(),
);
export const SET_ADD_STEP_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set add step value'),
  props<{addStep: boolean}>(),
);
export const NEW_CONTRACT = createAction(
  buildingStringActionType(typeApi, 'Generate new contract load'),
  props<{orderType: string}>(),
);
export const GET_CONTRACT_PRE_SELECTED_BRANDS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Obtener Marcas del contrato editado'),
  props<{contract: IContract}>(),
);
export const GET_CONTRACT_PRE_SELECTED_BRANDS_ERROR = createAction(
  buildingStringActionType(typeApi, 'Obtener Marcas del contrato editado failed'),
);
export const GET_CONTRACT_PRE_SELECTED_BRANDS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Obtener Marcas del contrato editado success'),
  props<{brands: ITrademark[]}>(),
);
export const SET_FAMILY_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set family backup'),
);
export const CLEAN_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Clean actual configuration'),
);
export const IS_CANCEL_POP_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set is open cancel pop'),
  props<{value: boolean}>(),
);
export const ACTIVE_CANCEL_POP = createAction(
  buildingStringActionType(typeReducer, 'Active cancel pop'),
  props<{value: boolean}>(),
);

// DOCS: Panel of PriceList
export const SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM = createAction(
  buildingStringActionType(typeApi, 'Set contracts price list for panel search term'),
  props<{searchTerm: string; node: string}>(),
);
export const SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE = createAction(
  buildingStringActionType(typeApi, 'Set contracts price list for panel desired page'),
  props<{value: number; node: string}>(),
);
export const RESET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE = createAction(
  buildingStringActionType(typeApi, 'Reset contracts price list for panel desired page'),
  props<{node: string}>(),
);
export const SET_PRICE_LIST_FOR_PANEL_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set contracts price list for panel is loading'),
  props<{isLoading: boolean; node: string}>(),
);
export const SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeReducer, 'Set contracts price list for panel needs to reload'),
  props<{needsToReload: boolean; node: string}>(),
);
// DOCS: Family level
export const GET_GENERAL_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get contracts general configuration load'),
);
export const GET_GENERAL_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get contracts general configuration success'),
  props<{configuration: IConfContratoCliente}>(),
);
export const GET_GENERAL_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get contracts general configuration failed'),
);
export const RESTORE_GENERAL_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore contracts general actual configuration'),
);
// DOCS: Cost level
export const GET_PRICE_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get contracts price list load'),
);
export const GET_PRICE_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get contracts price list success'),
  props<{prices: IFamilyPricesList}>(),
);
export const SET_PRICE_LIST_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set contracts list search term'),
  props<{searchTerm: string}>(),
);
export const GET_PRICE_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get contracts price configuration success'),
  props<{configuration: IConfContratoCliente}>(),
);
export const RESTORE_PRICE_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore contracts price actual configuration'),
);
// DOCS: CharacteristicGrouper level
export const GET_CHARACTERISTIC_GROUPER_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get contracts characteristic grouper list load'),
);
export const GET_CHARACTERISTIC_GROUPER_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get contracts characteristic grouper list success'),
  props<{characteristicGroupers: IFamilyCharacteristicGrouperList}>(),
);
export const SET_CHARACTERISTIC_GROUPER_LIST_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set contracts characteristic grouper list search term'),
  props<{searchTerm: string}>(),
);
export const GET_CHARACTERISTIC_GROUPER_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(
    typeReducer,
    'Get contracts characteristic grouper configuration success',
  ),
  props<{configuration: IConfContratoCliente}>(),
);
export const RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore contracts classifications actual configuration'),
);
export const SET_CONTRACT_CLASSIFICATION = createAction(
  buildingStringActionType(typeReducer, 'Set Contract classification to configured'),
  props<{classification: IVClasificacionProductoMarcaCliente}>(),
);
// DOCS: Product level
export const GET_PRODUCT_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get contracts products list load'),
);
export const GET_PRODUCT_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get contracts products list success'),
  props<{products: IFamilyProductsList}>(),
);
export const SET_PRODUCT_LIST_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set contracts products list search term'),
  props<{searchTerm: string}>(),
);
export const GET_PRODUCT_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get contracts products configuration success'),
  props<{configuration: IConfContratoCliente}>(),
);
export const GET_PRODUCT_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get contracts products configuration failed'),
);
export const RESTORE_PRODUCT_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore contracts product actual configuration'),
);
export const SET_PRODUCT_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set contract product is open value'),
  props<{productId: string}>(),
);
export const SET_CONTRACT_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Set Contract product to configured'),
  props<{product: IVPrecioProductoCliente}>(),
);

// DOCS: Two or more levels
export const SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set contracts list of tab configuration is loading'),
  props<{tabConfigurationName: string; isLoading: boolean}>(),
);
export const SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeReducer, 'Set contracts list of tab configuration needs to reload'),
  props<{tabConfigurationName: string; needsToReload: boolean}>(),
);
export const SET_LIST_OF_CONFIGURED_TAB_CONFIGURATION_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(
    typeReducer,
    'Set contracts list of configured tab configuration needs to reload',
  ),
  props<{tabConfigurationName: string}>(),
);

export const GET_PRICE_LIST_FOR_PANEL_FAMILY_LEVEL_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get contracts price list for panel Family level load'),
);
export const GET_PRICE_LIST_FOR_PANEL_FAMILY_LEVEL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get contracts price list for panel Family level success'),
  props<{
    prices: QueryResultVPrecioListaClienteProductoFamiliaContrato;
    node: string;
  }>(),
);
export const GET_PRICE_LIST_FOR_PANEL_FAMILY_LEVEL_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get contracts price list for panel Family level success'),
);
export const RESTORE_BACKUP_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore contracts backup configuration'),
);
export const RETURN_PROCESS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Return contracts process success'),
);
export const SAVE_CONTRACTS_SECTION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save contracts section load'),
  props<{goToNextStep: boolean}>(),
);
export const DOWNLOAD_CSV_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Download configuration CSV file success'),
  props<{csvFile: ArchivoDetalle}>(),
);
export const DELETE_CSV_FILE = createAction(
  buildingStringActionType(typeReducer, 'Delete configuration CSV file'),
);
export const SET_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set details'),
  props<{value: boolean}>(),
);
export const GENERATE_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Generate backup'),
  props<{selectedContract: IContract; newContract: IContract}>(),
);
export const SET_API_STATUS_ACTIVE = createAction(
  buildingStringActionType(typeReducer, 'Set api status active'),
  props<{status: number}>(),
);
export const SET_API_STATUS_SAVED = createAction(
  buildingStringActionType(typeReducer, 'Set api status saved'),
  props<{status: number}>(),
);
export const SET_API_STATUS_EXPIRED = createAction(
  buildingStringActionType(typeReducer, 'Set api status expired'),
  props<{status: number}>(),
);
export const SET_API_STATUS_CANCELED = createAction(
  buildingStringActionType(typeReducer, 'Set api status canceled'),
  props<{status: number}>(),
);
export const CLEAN_CONTRACTS_CLIENT_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set initial state Contracts'),
);
export const SELECTED_CONTRACT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Selected contract component effect '),
  props<{contract: IContract; isEdition: boolean; typeAction: string}>(),
);
export const ADD_STEPS_CONTRACT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Add steps contract component effect '),
  props<{val: number}>(),
);
export const SELECT_BRAND_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Select brand component effect'),
  props<{item: OfferContractBrands}>(),
);
export const SELECT_FAMILY_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Select family component effect'),
  props<{selectedFamily: ICard}>(),
);
export const SELECT_LEVEL_CONFIGURATION_TAB_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Select level configuration tab component effect'),
  props<{selectedLevelConfigurationTab: LevelConfigurationOption}>(),
);
export const FETCH_MORE_PRICES_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more prices component contracts effect'),
  props<{event: IPageInfo}>(),
);
export const FETCH_MORE_CLASSIFICATIONS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more classifications component effect'),
  props<{event: IPageInfo}>(),
);
export const FETCH_MORE_PRODUCT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more products component effect'),
  props<{event: IPageInfo}>(),
);
export const SAVE_INPUT_VALUE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Save input value component effect'),
  props<{field: string; value: number}>(),
);
export const SEARCH_BY_PRICE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Search by price component effect'),
  props<{searchTerm: string}>(),
);
export const SET_LIST_OF_TAB_CONFIG_SEARCH_TERM_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set list of tab config search term component effect'),
  props<{searchTerm: string; tabConfiguration: string}>(),
);
export const FETCH_MORE_GENERAL_ASIDE_PRICES_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more general aside prices component effect'),
  props<{event: IPageInfo}>(),
);
export const HANDLE_SAVE_CONTRACT_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Handle close pop up configuration component effect'),
  props<{value: boolean}>(),
);
export const HANDLE_SIGNED_CONTRACT_UPLOAD_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Handle signed contract upload component effect'),
  props<{uploadFile: IUploadFile}>(),
);
export const SET_SELECTED_BAR_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set selected bar option'),
  props<{option: OptionBar}>(),
);
export const SET_TRADEMARK_CONSOLIDATION_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set trademark consolidation provider success'),
  props<{trademarkFamilyProviderConsolidation: Array<VMarcaFamilia>}>(),
);
export const SET_TRADEMARK_CONSOLIDATION_PROVIDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set trademark consolidation provider failed'),
);
export const HANDLE_ACTIVE_ALERT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Handle active alert component effect'),
  props<{status: boolean}>(),
);
export const SET_SHOW_INPUT_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set show input file'),
  props<{value: boolean}>(),
);
