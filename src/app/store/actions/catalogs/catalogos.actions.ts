import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  Aduana,
  AgenteAduanal,
  CatBanco,
  CatBrokerCliente,
  CatClasificacionInformativaProducto,
  CatClasificacionRegulatoria,
  CatCondicionesDePago,
  CatDepositarioInternacional,
  CatDestino,
  CatDificultadDatosPersona,
  CatDisponibilidad,
  CatEstadoCotizacion,
  CatEstadoFisico,
  CatFletera,
  CatFormatoPublicacion,
  CatImportanciaCliente,
  CatIndustria,
  CatLugarDespacho,
  CatManejo,
  CatMantenimientoDatosPersona,
  CatMarcaTarjeta,
  CatMarcaVehiculo,
  CatMedioDePago,
  CatMedioDifusion,
  CatMedioTransporte,
  CatMetodoDePagoCFDI,
  CatMoneda,
  CatNivelDecisionDatosPersona,
  CatNivelIngreso,
  CatNivelPuestoDatosPersona,
  CatPrioridad,
  CatProceso,
  CatProductoInvestigacionSeguimiento,
  CatRegimenFiscal,
  CatRestriccionDeCompra,
  CatRestriccionFlete,
  CatRevision,
  CatRolCliente,
  CatRolProveedor,
  CatRutaEntrega,
  CatSector,
  CatTemaComentario,
  CatTipoAutorizacion,
  CatTipoCampana,
  CatTipoCotizacion,
  CatTipoDireccion,
  CatTipoNumeroTelefonico,
  CatTipoPartidaCotizacion,
  CatTipoPresentacion,
  CatTipoSociedadMercantil,
  CatTipoValidacion,
  CatTipoVehiculo,
  CatUnidad,
  CatUnidadTiempo,
  CatUso,
  CatUsoCFDI,
  CatZona,
  ConceptoAgenteAduanal,
  Empresa,
  Marca,
  UsuarioBase,
  UsuariosCartera,
  VCatPais,
  VFamilia,
  VFamiliaLinea,
  VUsuario,
} from 'api-catalogos';
import {AjOfRazonRechazo, EmpleadoDetalleObj} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';

const typeApi = 'CatalogosApi';
const typeReducer = 'Catalogos';
export const GET_UNIDAD_LOAD = createAction(buildingStringActionType(typeReducer, 'Unidad Load'));
export const GET_UNIDAD_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Unidad Success'),
  props<{listDropList: DropListOption[]; listDropListPqf: DropListOptionPqf[]}>(),
);

export const GET_UNIDAD_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Unidad Error'),
  props<{error: any}>(),
);
export const GET_TIPO_PRODUCTO_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Tipo Producto Load'),
);
export const GET_TIPO_PRODUCTO_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Tipo Producto Success'),
  props<{list: DropListOption[]}>(),
);
export const GET_TIPO_PRODUCTO_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Tipo Producto Error'),
  props<{error: any}>(),
);
export const GET_CAT_ESTADO_COTIZACION = createAction(
  buildingStringActionType(typeApi, 'Get Cat Estado Cotizacion'),
);
export const GET_CAT_ESTADO_COTIZACION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Estado Cotizacion Success'),
  props<{listCatEstadoCotizacion: Array<CatEstadoCotizacion>}>(),
);
export const GET_CAT_ESTADO_COTIZACION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Cat Estado Cotizacion Failed'),
);
export const GET_CAT_TIPO_COTIZACION = createAction(
  buildingStringActionType(typeApi, 'Get Cat Tipo Cotizacion'),
);
export const GET_CAT_TIPO_COTIZACION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Tipo Cotizacion Success'),
  props<{listCatTipoCotizacion: Array<CatTipoCotizacion>}>(),
);
export const GET_CAT_TIPO_COTIZACION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Cat Tipo Cotizacion Failed'),
);
export const GET_CAT_TIPO_PARTIDA_COTIZACION = createAction(
  buildingStringActionType(typeApi, 'Get Cat Tipo Partida Cotizacion'),
);
export const GET_CAT_TIPO_PARTIDA_COTIZACION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Tipo Partida Cotizacion Success'),
  props<{listCatTipoPartidaCotizacion: Array<CatTipoPartidaCotizacion>}>(),
);
export const GET_CAT_TIPO_PARTIDA_COTIZACION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Cat Tipo Partida Cotizacion Failed'),
);
export const GET_CAT_USO_CFDI = createAction(buildingStringActionType(typeApi, 'Get Cat Uso CFDI'));
export const GET_CAT_USO_CFDI_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Uso CFDI Success'),
  props<{listCatUsoCFDI: Array<CatUsoCFDI>}>(),
);
export const GET_CAT_USO_CFDI_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Cat Uso CFDI Failed'),
);
export const GET_CAT_METODO_DE_PAGO = createAction(
  buildingStringActionType(typeApi, 'Get Cat Metodo de pago'),
);
export const GET_CAT_METODO_DE_PAGO_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Metodo de pago Success'),
  props<{listCatMetodoDePagoCFDI: Array<CatMetodoDePagoCFDI>}>(),
);
export const GET_CAT_METODO_DE_PAGO_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Cat Metodo de pago Failed'),
);
export const GET_CAT_NIVEL_INGRESO_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Cat Nivel ingreso Load'),
);
export const GET_CAT_NIVEL_INGRESO_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Nivel ingreso Success'),
  props<{listCatNivelIngreso: Array<CatNivelIngreso>}>(),
);
export const GET_CAT_NIVEL_INGRESO_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Tipo Nivel ingreso Failed'),
);
export const GET_CAT_DESTINO_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Cat Destino Load'),
);
export const GET_CAT_DESTINO_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Destino Success'),
  props<{listCatDestino: Array<CatDestino>}>(),
);
export const GET_CAT_DESTINO_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Destino Failed'),
);
export const GET_CAT_BROKER_CLIENTE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Cat Broker Cliente Load'),
);
export const GET_CAT_BROKER_CLIENTE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Broker Cliente Success'),
  props<{listCatBrokerCliente: Array<CatBrokerCliente>}>(),
);
export const GET_CAT_BROKER_CLIENTE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Broker Cliente Failed'),
);
export const GET_CAT_PROCESS_LOAD = createAction('[CatalogClient] Get cat process load');
export const GET_CAT_PROCESS_SUCCESS = createAction(
  '[CatalogClient] Get cat process success',
  props<{listCatProcess: Array<CatProceso>}>(),
);
export const GET_CAT_PROCESS_FAILED = createAction('[CatalogClient] Get cat process failed');
export const GET_CAT_BANK_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Cat Bank Load'),
);
export const GET_CAT_BANK_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Bank Success'),
  props<{listCatBanco: Array<CatBanco>}>(),
);
export const GET_CAT_BANK_ERROR = createAction(
  buildingStringActionType(typeApi, 'Get Cat Bank Error'),
  props<{error: any}>(),
);
export const GET_CAT_PRIORITY_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Priority Load'),
);
export const GET_CAT_PRIORITY_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Priority Success'),
  props<{listPriority: Array<CatPrioridad>}>(),
);
export const GET_CAT_PRIORITY_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Priority Error'),
  props<{error: any}>(),
);
export const GET_CAT_REVIEWS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Reviews Load'),
);
export const GET_CAT_REVIEWS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Reviews Success'),
  props<{listReviews: Array<CatRevision>}>(),
);
export const GET_CAT_REVIEWS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Reviews Error'),
  props<{error: any}>(),
);
export const GET_LIST_ADUANA_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get List Aduana Load'),
);
export const GET_LIST_ADUANA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get List Aduana Success'),
  props<{listAduana: Array<Aduana>}>(),
);
export const GET_LIST_ADUANA_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get List Aduana Error'),
);
export const GET_LIST_AGENTE_ADUANAL_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get List Agente Aduanal Load'),
);
export const GET_LIST_AGENTE_ADUANAL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get List Agente Aduanal Success'),
  props<{listAgenteAduanal: Array<AgenteAduanal>}>(),
);
export const GET_LIST_AGENTE_ADUANAL_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get List Agente Aduanal Error'),
);
export const GET_LIST_CONCEPTS_CUSTOM_AGENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get List Concepto Agente Aduanal'),
);
export const GET_LIST_CONCEPTS_CUSTOM_AGENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get List Concepto Agente Aduanal Success'),
  props<{listConceptoAgenteAduanal: Array<ConceptoAgenteAduanal>}>(),
);
export const GET_LIST_CONCEPTS_CUSTOM_AGENT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get List Concepto Agente Aduanal Error'),
  props<{error: any}>(),
);
export const GET_CAT_INCOTERM_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Incoterm Load'),
);
export const GET_CAT_INCOTERM_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Incoterm Success'),
  props<{listIncoterm: Array<AgenteAduanal>}>(),
);
export const GET_CAT_INCOTERM_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Incoterm Error'),
);

export const GET_LIST_VEHICLE_BRANDS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Vehicle Brands Load'),
);

export const GET_LIST_VEHICLE_BRANDS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Vehicle Brands Error'),
);

export const GET_LIST_VEHICLE_BRANDS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Vehicle Brands Success'),
  props<{listVehicleBrand: Array<CatMarcaVehiculo>}>(),
);

export const GET_LIST_VEHICLE_TYPE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Vehicle Type Load'),
);

export const GET_LIST_VEHICLE_TYPE_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Vehicle Type Error'),
);

export const GET_LIST_VEHICLE_TYPE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Vehicle Type Success'),
  props<{listVehicleType: Array<CatTipoVehiculo>}>(),
);
export const GET_CAT_TIPO_TELEFONO_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat tipo telefono load'),
);
export const GET_CAT_TIPO_TELEFONO_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat tipo telefono success'),
  props<{lisCatTIipoTelefono: Array<CatTipoNumeroTelefonico>}>(),
);
export const GET_CAT_TIPO_TELEFONO_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat tipo telefono failed'),
);
export const GET_CAT_IMPORTANCIAS_CLIENTE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat importancias load'),
);
export const GET_CAT_IMPORTANCIAS_CLIENTE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat importancias success'),
  props<{listImportanciasCliente: Array<CatImportanciaCliente>}>(),
);
export const GET_CAT_IMPORTANCIAS_CLIENTE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat importancias failed'),
);
export const GET_CAT_ROL_CLIENTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat rol clients load'),
);
export const GET_CAT_ROL_CLIENTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat rol clients success'),
  props<{listRolClientes: Array<CatRolCliente>}>(),
);
export const GET_CAT_ROL_CLIENTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat rol clients failed'),
);
export const GET_CAT_MONEDA_LOAD = createAction('[CatalogClient] Get cat moneda load');
export const GET_CAT_MONEDA_SUCCESS = createAction(
  '[CatalogClient] Get cat moneda success',
  props<{lisCatMoneda: Array<CatMoneda>}>(),
);
export const GET_CAT_MONEDA_FAILED = createAction('[CatalogClient] Get cat moneda failed');
export const GET_CAT_REASON_REJECTION_LOAD = createAction(
  '[CatalogClient] Get cat reason of rejection load',
);
export const GET_CAT_REASON_REJECTION_SUCCESS = createAction(
  '[CatalogClient] Get cat reason of rejection success',
  props<{listCatReasonRejection: Array<AjOfRazonRechazo>}>(),
);
export const GET_CAT_REASON_REJECTION_FAILED = createAction(
  '[CatalogClient] Get cat reason of rejection failed',
);
export const GET_CAT_PAYMENT_CONDITIONS_LOAD = createAction(
  '[CatalogClient] Get cat payment conditions load',
);
export const GET_CAT_PAYMENT_CONDITIONS_SUCCESS = createAction(
  '[CatalogClient] Get cat payment conditions success',
  props<{listCatPaymentConditions: Array<CatCondicionesDePago>}>(),
);
export const GET_CAT_PAYMENT_CONDITIONS_FAILED = createAction(
  '[CatalogClient] Get cat payment conditions failed',
);
export const GET_CAT_FREIGHT_LOAD = createAction('[CatalogClient] Get cat freight load');
export const GET_CAT_FREIGHT_SUCCESS = createAction(
  '[CatalogClient] Get cat freight success',
  props<{listCatFreight: Array<CatFletera>}>(),
);
export const GET_CAT_FREIGHT_FAILED = createAction('[CatalogClient] Get cat freight failed');
export const GET_CAT_MEDIO_DE_PAGO_LOAD = createAction(
  '[CatalogClient] Get cat medio de pago load',
);
export const GET_CAT_MEDIO_DE_PAGO_SUCCESS = createAction(
  '[CatalogClient] Get cat medio de pago success',
  props<{listCatMedioDePago: Array<CatMedioDePago>}>(),
);
export const GET_CAT_MEDIO_DE_PAGO_FAILED = createAction(
  '[CatalogClient] Get cat medio de pago failed',
);
export const GET_CAT_TIPO_VALIDACION_LOAD = createAction(
  '[CatalogClient] Get cat tipo validacion load',
);
export const GET_CAT_TIPO_VALIDACION_SUCCESS = createAction(
  '[CatalogClient] Get cat tipo validacion success',
  props<{listCatTipoValidacion: Array<CatTipoValidacion>}>(),
);
export const GET_CAT_TIPO_VALIDACION_FAILED = createAction(
  '[CatalogClient] Get cat tipo validacion failed',
);
export const GET_CAT_SECTOR_LOAD = createAction('[CatalogClient] Get cat sector load');
export const GET_CAT_SECTOR_SUCCESS = createAction(
  '[CatalogClient] Get cat sector success',
  props<{lisCatSector: Array<CatSector>}>(),
);
export const GET_CAT_SECTOR_FAILED = createAction('[CatalogClient] Get cat sector failed');
export const GET_CAT_INDUSTRIA_LOAD = createAction('[CatalogClient] Get cat industria load');
export const GET_CAT_INDUSTRIA_SUCCESS = createAction(
  '[CatalogClient] Get cat industria success',
  props<{listCatIndustria: Array<CatIndustria>}>(),
);
export const GET_CAT_INDUSTRIA_FAILED = createAction('[CatalogClient] Get cat industria failed');
export const GET_CAT_ROL_PROVIDERS_LOAD = createAction(
  '[CatalogClient] Get cat rol providers load',
);
export const GET_CAT_ROL_PROVIDERS_SUCCESS = createAction(
  '[CatalogClient] Get cat rol providers success',
  props<{lisCatRolProvider: Array<CatRolProveedor>}>(),
);
export const GET_CAT_ROL_PROVIDERS_FAILED = createAction(
  '[CatalogClient] Get cat rol providers failed',
);
export const GET_CAT_ADDRESS_TYPE_LOAD = createAction('[CatalogClient] Get cat address type load');
export const GET_CAT_ADDRESS_TYPE_SUCCESS = createAction(
  '[CatalogClient] Get cat address type success',
  props<{lisCatAddressType: Array<CatTipoDireccion>}>(),
);
export const GET_CAT_ADDRESS_TYPE_FAILED = createAction(
  '[CatalogClient] Get cat address type failed',
);
export const GET_CAT_RUTA_ENTREGA_LOAD = createAction('[CatalogClient] Get cat ruta entrega load');
export const GET_CAT_RUTA_ENTREGA_SUCCESS = createAction(
  '[CatalogClient] Get cat ruta entrega success',
  props<{lisCatRutaEntrega: Array<CatRutaEntrega>}>(),
);
export const GET_CAT_RUTA_ENTREGA_FAILED = createAction(
  '[CatalogClient] Get cat ruta entrega failed',
);
export const GET_CAT_PAIS_LOAD = createAction('[CatalogClient] Get cat pais load');
export const GET_CAT_PAIS_SUCCESS = createAction(
  '[CatalogClient] Get cat pais success',
  props<{lisCatPais: Array<VCatPais>}>(),
);
export const GET_CAT_PAIS_FAILED = createAction('[CatalogClient] Get cat pais failed');
export const GET_CAT_ZONA_LOAD = createAction('[CatalogClient] Get cat zona load');
export const GET_CAT_ZONA_SUCCESS = createAction(
  '[CatalogClient] Get cat zona success',
  props<{lisCatZona: Array<CatZona>}>(),
);
export const GET_CAT_ZONA_FAILED = createAction('[CatalogClient] Get cat zona failed');
export const GET_CAT_CUSTOMER_LOAD = createAction('[CatalogClient] Get cat customer load');
export const GET_CAT_COMMERCIAL_LEADER_LOAD = createAction(
  '[CatalogClient] Get cat commercial leader load',
);
export const GET_CAT_COORDINATOR_ESAC_LOAD = createAction(
  '[CatalogClient] Get cat coordinator ESAC load',
);
export const GET_CAT_CUSTOMER_SUCCESS = createAction(
  '[CatalogClient] Get cat customer success',
  props<{lisCatCustomer: Array<CatDestino>}>(),
);
export const GET_CAT_COMMERCIAL_LEADER_SUCCESS = createAction(
  '[CatalogClient] Get cat commercial leader success',
  props<{listCommercialLeader: Array<UsuariosCartera>}>(),
);
export const GET_CAT_COORDINATOR_ESAC_SUCCESS = createAction(
  '[CatalogClient] Get cat coordinator ESAC success',
  props<{listCoordinatorEsac: Array<UsuariosCartera>}>(),
);
export const GET_CAT_CUSTOMER_FAILED = createAction('[CatalogClient] Get cat customer failed');
export const GET_CAT_COMMERCIAL_LEADER_FAILED = createAction(
  '[CatalogClient] Get cat commercial leader failed',
);
export const GET_CAT_COORDINATOR_ESAC_FAILED = createAction(
  '[CatalogClient] Get cat coordinator ESAC failed',
);
export const GET_CAT_FAMILIAS_LOAD = createAction('[CatalogClient] Get cat familias load');
export const GET_CAT_FAMILIAS_SUCCESS = createAction(
  '[CatalogClient] Get cat familias success',
  props<{listCatVFamilias: Array<VFamilia>}>(),
);
export const GET_CAT_FAMILIAS_FAILED = createAction('[CatalogClient] Get cat familias failed');
export const GET_CAT_UNIDAD_TIEMPO_LOAD = createAction(
  '[CatalogClient] Get cat unidad de tiempo load',
);
export const GET_CAT_UNIDAD_TIEMPO_SUCCESS = createAction(
  '[CatalogClient] Get cat unidad de tiempo success',
  props<{listCatUnidadTiempo: Array<CatUnidadTiempo>}>(),
);
export const GET_CAT_UNIDAD_TIEMPO_FAILED = createAction(
  '[CatalogClient] Get cat unidad de tiempo failed',
);
export const GET_CAT_DIFICULTAD_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Cat Dificultad Load'),
);
export const GET_CAT_DIFICULTAD_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Dificultad Success'),
  props<{listDificultadDatosPersona: Array<CatDificultadDatosPersona>}>(),
);
export const GET_CAT_DIFICULTAD_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Cat Dificultad Failed'),
);
export const GET_CAT_NIVEL_DECISION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Cat Nivel decisión Load'),
);
export const GET_CAT_NIVEL_DECISION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Nivel decisión Success'),
  props<{listNivelDecisionDatosPersona: Array<CatNivelDecisionDatosPersona>}>(),
);
export const GET_CAT_NIVEL_DECISION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Cat Nivel decisión Failed'),
);
export const GET_CAT_MANTENIMIENTO_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Cat Mantenimiento Load'),
);
export const GET_CAT_MANTENIMIENTO_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Mantenimiento Success'),
  props<{listMantenimientoDatosPersona: Array<CatMantenimientoDatosPersona>}>(),
);
export const GET_CAT_MANTENIMIENTO_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Cat Mantenimiento Failed'),
);
export const GET_CAT_NIVEL_PUESTO_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Cat Nivel Puesto Load'),
);
export const GET_CAT_NIVEL_PUESTO_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Nivel Puesto Success'),
  props<{listNivelPuestoDatosPersona: Array<CatNivelPuestoDatosPersona>}>(),
);
export const GET_CAT_NIVEL_PUESTO_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Cat Nivel Puesto Failed'),
);
export const GET_CAT_SELLER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat seller load'),
);
export const GET_CAT_SELLER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat seller success'),
  props<{listVendedores: Array<VUsuario>}>(),
);
export const GET_CAT_SELLER_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat seller failed'),
);
export const GET_CAT_TIPO_SOCIEDAD_MERCANTIL_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat tipo sociedad mercantil load'),
);
export const GET_CAT_EMPRESAS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat empresas load'),
);
export const GET_CAT_TIPO_SOCIEDAD_MERCANTIL_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat tipo sociedad mercantil success'),
  props<{listMercantileSocietyType: Array<CatTipoSociedadMercantil>}>(),
);
export const GET_CAT_EMPRESAS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat empresas success'),
  props<{listEmpresas: Array<Empresa>}>(),
);
export const GET_CAT_TIPO_SOCIEDAD_MERCANTIL_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat tipo sociedad mercantil failed'),
);
export const GET_CAT_REGIMEN_FISCAL_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat regimen fiscal load'),
);
export const GET_CAT_REGIMEN_FISCAL_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat regimen fiscal success'),
  props<{listTaxRegime: Array<CatRegimenFiscal>}>(),
);
export const GET_CAT_REGIMEN_FISCAL_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat regimen fiscal failed'),
);
export const GET_CAT_THEMES_COMMENTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat Themes Comments load'),
);
export const GET_CAT_THEMES_COMMENTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat Themes Comments success'),
  props<{listThemeComments: Array<CatTemaComentario>}>(),
);
export const GET_CAT_THEMES_COMMENTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat Themes Commentsfailed'),
);
export const GET_CATALOGS_FACTURATION = createAction(
  buildingStringActionType(typeApi, 'Get Catalogs Facturation'),
);
export const GET_CAT_TRADEMARK_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat trademark load'),
);
export const GET_CAT_TRADEMARK_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat trademark success'),
  props<{listTrademark: Array<Marca>}>(),
);
export const NEEDS_TO_RELOAD_TRADEMARKS = createAction(
  buildingStringActionType(typeReducer, 'Needs to reload trademark'),
);
export const GET_CAT_TRADEMARKY_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat trademark failed'),
);
export const GET_CAT_FAMILY_LINE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat family line load'),
);
export const GET_CAT_FAMILY_LINE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat family line success'),
  props<{listFamilyLine: Array<VFamiliaLinea>}>(),
);
export const GET_CAT_AVALABILITY_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat availability load'),
);
export const GET_CAT_AVALABILITY_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat availability success'),
  props<{listAvailability: Array<CatDisponibilidad>}>(),
);
export const GET_CAT_AVALABILITY_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat availability failed'),
);
export const GET_CAT_RESTRICCIONES_FLETE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat restricciones flete load'),
);
export const GET_CAT_RESTRICCIONES_FLETE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat restricciones flete success'),
  props<{listRestriccionesFlete: Array<CatRestriccionFlete>}>(),
);
export const GET_CAT_RESTRICCIONES_FLETE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get cat restricciones flete failed'),
);
export const GET_CAT_CLASSIFICATIONS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat classifications load'),
  props<{IdCatSubtipoProducto}>(),
);
export const GET_CAT_CLASSIFICATIONS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat classifications success'),
  props<{listClassifications: Array<CatClasificacionInformativaProducto>}>(),
);
export const GET_CAT_CLASSIFICATIONS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat classifications failed'),
);
export const GET_CAT_PHYSICAL_STATE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat physical state load'),
);
export const GET_CAT_PHYSICAL_STATE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat hysical state success'),
  props<{listPhysicalStates: Array<CatEstadoFisico>}>(),
);
export const GET_CAT_PHYSICAL_STATE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat physical state failed'),
);
export const GET_CAT_USE_LOAD = createAction(buildingStringActionType(typeApi, 'Get cat use load'));
export const GET_CAT_USE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat use success'),
  props<{listUses: Array<CatUso>}>(),
);
export const GET_CAT_USE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat use failed'),
);
export const GET_CAT_INTERNATIONAL_DEPOSITARY_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat international depositary load'),
);
export const GET_CAT_INTERNATIONAL_DEPOSITARY_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat international depositary success'),
  props<{listInternationalDepositary: Array<CatDepositarioInternacional>}>(),
);
export const GET_CAT_INTERNATIONAL_DEPOSITARY_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat international depositary failed'),
);
export const GET_CAT_PRESENTATION_TYPE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat presentation type load'),
);
export const GET_CAT_PRESENTATION_TYPE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat presentation type success'),
  props<{listPresentationTypes: Array<CatTipoPresentacion>}>(),
);
export const GET_CAT_PRESENTATION_TYPE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat presentation type failed'),
);
export const GET_CAT_TRANSPORTATION_WAY_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat transportation way load'),
);
export const GET_CAT_TRANSPORTATION_WAY_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat transportation way  success'),
  props<{listTransportationsWay: Array<CatMedioTransporte>}>(),
);
export const GET_CAT_TRANSPORTATION_WAY_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat transportation way  failed'),
);
export const GET_CAT_TRANSPORTATION_MANAGEMENT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat transportation management load'),
);
export const GET_CAT_TRANSPORTATION_MANAGEMENT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat transportation management success'),
  props<{listTransportationManagement: Array<CatManejo>}>(),
);
export const GET_CAT_TRANSPORTATION_MANAGEMENT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat transportation management failed'),
);
export const GET_CAT_PUBLICATIONS_FORMAT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat publications format load'),
);
export const GET_CAT_PUBLICATIONS_FORMAT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat publications format success'),
  props<{listPublicationsFormat: Array<CatFormatoPublicacion>}>(),
);
export const GET_CAT_PUBLICATIONS_FORMAT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat publications format failed'),
);
export const GET_CAT_UNIT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat unit load'),
);
export const GET_CAT_UNIT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat unit success'),
  props<{listUnits: Array<CatUnidad>}>(),
);
export const GET_CAT_UNIT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat unit failed'),
);
export const GET_CAT_APPLICATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat applications load'),
);
export const GET_CAT_APPLICATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat applications success'),
  props<{listApplications: Array<CatUnidad>}>(),
);
export const GET_CAT_APPLICATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat applications failed'),
);
export const GET_CAT_BILLING_RESTRICTION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat billing restriction load'),
);
export const GET_CAT_BILLING_RESTRICTION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat billing restriction success'),
  props<{listBillingRestriction: Array<CatRestriccionDeCompra>}>(),
);
export const GET_CAT_BILLING_RESTRICTION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat billing restriction failed'),
);
export const GET_CAT_CLASIFICACION_REGULATORIA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat clasificacion regulatoria load'),
);
export const GET_CAT_CLASIFICACION_REGULATORIA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat clasificacion regulatoria success'),
  props<{clasifications: Array<CatClasificacionRegulatoria>}>(),
);
export const GET_CAT_CLASIFICACION_REGULATORIA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat clasificacion regulatoria failed'),
);
export const GET_CAT_MODELO_DIFUSION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat modelo de difucion load'),
);
export const GET_CAT_MODELO_DIFUSION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat modelo de difusion success'),
  props<{listCatMedioDeDifusion: Array<CatMedioDifusion>}>(),
);
export const GET_CAT_MODELO_DIFUSION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat modelo de difusion failed'),
);
export const GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat product investigation follow load'),
);
export const GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat product investigation follow success'),
  props<{listProductInvestigationFollow: Array<CatProductoInvestigacionSeguimiento>}>(),
);
export const GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat product investigation follow failed'),
);
export const GET_CAT_TIPO_CAMPANA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat tipo campana load'),
);
export const GET_CAT_TIPO_CAMPANA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat tipo campana success'),
  props<{lisCampaigns: Array<CatTipoCampana>}>(),
);
export const GET_CAT_TIPO_CAMPANA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat tipo campana failed'),
);
export const GET_CAT_LUGAR_DESPACHO_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat lugar de despacho load'),
);
export const GET_CAT_LUGAR_DESPACHO_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat lugar de despacho success'),
  props<{listCatDispatchPlace: Array<CatLugarDespacho>}>(),
);
export const GET_CAT_LUGAR_DESPACHO_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat lugar despacho failed'),
);
export const GET_CAT_MARCA_TARJETA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat marca tarjeta load'),
);
export const GET_CAT_MARCA_TARJETA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat marca tarjeta success'),
  props<{listCatCardMark: Array<CatMarcaTarjeta>}>(),
);
export const GET_CAT_MARCA_TARJETA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat marca tarjeta failed'),
);
export const GET_CAT_TIPOS_AUTORIZACION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat tipos de autorización load'),
);
export const GET_CAT_TIPOS_AUTORIZACION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat tipos de autorización success'),
  props<{listAuthorizationTypes: Array<CatTipoAutorizacion>}>(),
);
export const GET_CAT_TIPOS_AUTORIZACION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get cat tipos de autorización failed'),
);
export const GET_CAT_LEGAL_REPRESENTATIVE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat legal representative load'),
);
export const GET_CAT_LEGAL_REPRESENTATIVE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat legal representative success'),
  props<{listLegalRepresentatives: Array<EmpleadoDetalleObj>}>(),
);
export const GET_CAT_LEGAL_REPRESENTATIVE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get cat legal representative failed'),
);
