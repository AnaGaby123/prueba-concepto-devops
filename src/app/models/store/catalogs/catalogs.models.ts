import {AppState} from '@appCore/core.state';
import {
  Aduana,
  AgenteAduanal,
  CatAplicacion,
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
  CatIncoterm,
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
  CatPais,
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
  QueryInfo,
  QueryResultVCliente,
  Usuario,
  UsuarioBase,
  UsuariosCartera,
  VCatPais,
  VCliente,
  VFamilia,
  VFamiliaLinea,
  VProveedor,
  VUsuario,
} from 'api-catalogos';
import {DropListOption, DropListOptionCustom} from '@appModels/drop-list/drop-list-option';
import {ALL_VALUE, API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';
import {ClientFilter as Client_Filter, initialFiltersState} from '@appModels/filters/ClientFilter';
import {AjOfRazonRechazo, EmpleadoDetalleObj} from 'api-logistica';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';

export const initialClients = (): Clients => ({
  data: {
    Results: [],
    TotalResults: 0,
  },
  corporates: {
    totalCorporates: 0,
    corporatesToShow: [],
    corporatesStatus: API_REQUEST_STATUS_DEFAULT,
    needsToReloadCorporates: true,
  },
  clientsStatus: API_REQUEST_STATUS_DEFAULT,
  filters: initialFiltersState(),
  searchTerm: '',
  clientQueryInfo: {
    Filters: [],
    SortDirection: 'asc',
    SortField: 'Nombre',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
  },
  importancias: [],
  contacto: {
    tiposDificultad: [],
    tiposDecision: [],
    tiposMantenimiento: [],
    tiposNivelPuesto: [],
  },
  direccion: {
    tiposDireccion: [],
    rutasEntrega: [],
    paises: [],
    zonas: [],
    destinos: [],
  },
  datosPago: {
    condicionesPago: [],
    metodoPagoCFDI: [],
    tipoRevision: [],
    formaPago: [],
    empresas: [],
    catUsoCFDI: [],
    needToReload: true,
  },
  marcas: [],

  listaContactos: [],
  totalCustomer: 0,
  sector: [],
  roles: [],
  industria: [],
  getAdress: {
    getAdress: [],
  },
  incomeLevelOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  routeOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  clientsOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
    {
      value: '2',
      label: 'Habilitados',
    },
    {
      value: '3',
      label: 'Deshabilitados',
    },
  ],
  esacOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  evOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  corporativeIsSelected: false,
  acountIsSelected: false,
  selectedIncomeLevelOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedRouteOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedClientsOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedEsacOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedEvOption: {
    value: '1',
    label: ALL_VALUE,
  },
});

export const initialProviders = (): Providers => ({
  data: [],
  totalProviders: 0,
  familias: [],
  vFamilias: [],
});

export const initialCatClients = (): CatClients => ({
  data: {
    Results: [],
    TotalResults: 0,
  },
  needsToReload: true,
});

export interface Clients {
  data: QueryResultVCliente;
  corporates: ResultCorporates;
  clientsStatus: number;
  filters: Array<Client_Filter>;
  searchTerm: string;
  clientQueryInfo: QueryInfo;
  importancias: DropListOptionCustom[];
  contacto: ContactType;
  direccion: AddressType;
  datosPago: PaymentData;
  marcas: any[];
  listaContactos: any[];
  totalCustomer: number;
  sector: DropListOptionCustom[];
  roles: DropListOptionCustom[];
  industria: DropListOptionCustom[];
  getAdress: GetAddressType;
  incomeLevelOptions: Array<DropListOption>;
  routeOptions: Array<DropListOption>;
  clientsOptions: Array<DropListOption>;
  esacOptions: Array<DropListOption>;
  evOptions: Array<DropListOption>;
  corporativeIsSelected: boolean;
  acountIsSelected: boolean;
  selectedIncomeLevelOption: DropListOption;
  selectedRouteOption: DropListOption;
  selectedClientsOption: DropListOption;
  selectedEsacOption: DropListOption;
  selectedEvOption: DropListOption;
}

export interface CatClients {
  data: QueryResultVCliente;
  needsToReload: boolean;
}

export interface ResultCorporates {
  totalCorporates: number;
  corporatesToShow: Array<Corporates>;
  corporatesStatus?: number;
  needsToReloadCorporates?: boolean;
}

export interface Corporates {
  IdCatCorporativo: string;
  NombreCorporativo: string;
  Clientes: Array<VCliente>;
}

export interface GetAddressType {
  getAdress: DataAdress[];
}

export interface ContactType {
  tiposDificultad: any[];
  tiposDecision: any[];
  tiposMantenimiento: any[];
  tiposNivelPuesto: any[];
}

export interface AddressType {
  tiposDireccion: any[];
  rutasEntrega: any[];
  paises: any[];
  zonas: any[];
  destinos: any[];
}

export interface PaymentData {
  condicionesPago: any[];
  metodoPagoCFDI: any[];
  tipoRevision: any[];
  formaPago: any[];
  empresas: any[];
  catUsoCFDI: any[];
  needToReload: boolean;
}

export interface Providers {
  data: any[];
  totalProviders: number;
  familias: any;
  vFamilias: [];
}

export interface ClientFilter {
  filterNivelIngreso: any[];
  filterRuta: any[];
}

export interface Offer {
  honorariosAA: AgenteAduanalObj;
  conceptosAA: ConceptoAgenteAduanalObj;
  unidadTiempo: CatUnidadTiempoObj;
  lista: any[];
  listaPrecios: any[];
  filteredConceptsAA: ConceptoAgenteAduanalObj;
}

export interface AgenteAduanalObj {
  listAA: AgenteAduanal[];
  needsToReload: boolean;
}

export interface ConceptoAgenteAduanalObj {
  listCAA: ConceptoAgenteAduanal[];
  needsToReload: boolean;
}

export interface CatUnidadTiempoObj {
  listUnidadTiempo: CatUnidadTiempo[];
  needsToReload: boolean;
}

export interface CatalogsState {
  Aduana: {
    needsToReload: boolean;
    listAduana: Array<Aduana>;
  };
  AgenteAduanal: {
    needsToReload: boolean;
    listAgenteAduanal: Array<AgenteAduanal>;
  };
  ConceptoAgenteAduanal: {
    needsToReload: boolean;
    listConceptoAgenteAduanal: Array<ConceptoAgenteAduanal>;
  };
  clientes: Clients;
  catClients: CatClients;
  proveedores: Providers;
  vProveedores: {
    needsToReload: boolean;
    listVproveedores: Array<VProveedor>;
  };
  filterCustomer: ClientFilter;
  oferta: Offer;
  tiposDireccion: {
    needsToReload: boolean;
    listCatTiposDireccion: Array<CatTipoDireccion>;
  };
  rutasEntrega: {
    needsToReload: boolean;
    listCatRutasEntrega: Array<CatRutaEntrega>;
  };
  paises: {
    needsToReload: boolean;
    listCatPais: Array<VCatPais>;
  };
  zonas: {
    needsToReload: boolean;
    listCatZona: Array<CatZona>;
  };
  destinos: {
    needsToReload: boolean;
    listCatDestino: Array<CatDestino>;
  };
  catClasificacionRegulatoria: {
    needsToReload: boolean;
    listCatClasificacionRegulatoria: Array<CatClasificacionRegulatoria>;
    listCatClasificacionRegulatoriaPqf: Array<DropListOptionPqf>;
  };
  catLugarDespacho: {
    needsToReload: boolean;
    listCatDispatchPlace: Array<CatLugarDespacho>;
  };
  catRolProvider: {
    needsToReload: boolean;
    listCatRolProvider: Array<CatRolProveedor>;
  };
  catUser: {
    needsToReload: boolean;
    listCatUser: Array<Usuario>;
  };
  catCommercialLeader: {
    needsToReload: boolean;
    listCatCommercialLeader: Array<UsuariosCartera>;
  };
  catCoordinatorESAC: {
    needsToReload: boolean;
    listCatCoordinatorESAC: Array<UsuariosCartera>;
  };
  catMoneda: {
    needsToReload: boolean;
    listCatMoneda: Array<CatMoneda>;
  };
  catReasonRejection: {
    needsToReload: boolean;
    listCatReasonRejection: Array<AjOfRazonRechazo>;
  };
  catPaymentConditions: {
    needsToReload: boolean;
    listCatPaymentConditions: Array<CatCondicionesDePago>;
  };
  catFreight: {
    needsToReload: boolean;
    listCatFreight: Array<CatFletera>;
  };
  catMedioDePago: {
    needsToReload: boolean;
    listCatMedioDePago: Array<CatMedioDePago>;
  };
  catTipoValidacion: {
    needsToReload: boolean;
    listCatTipoValidacion: Array<CatTipoValidacion>;
  };
  catSector: {
    needsToReload: boolean;
    listCatSector: Array<CatSector>;
  };
  catIndustria: {
    needsToReload: boolean;
    listCatIndustria: Array<CatIndustria>;
  };

  catNivelIngreso: {
    needsToReload: boolean;
    listCatNivelIngreso: Array<CatNivelIngreso>;
  };
  catVFamilias: {
    needsToReload: boolean;
    listCatVFamilias: Array<VFamilia>;
  };
  catUnidadTiempo: {
    needsToReload: boolean;
    listCatUnidadTiempo: Array<CatUnidadTiempo>;
  };
  catTipoTelefono: {
    needsToReload: boolean;
    listCatTipoTelefono: Array<CatTipoNumeroTelefonico>;
  };
  catEstadoCotizacion: {
    needsToReload: boolean;
    listCatEstadoCotizacion: Array<CatEstadoCotizacion>;
  };
  catTipoCotizacion: {
    needsToReload: boolean;
    listCatTipoCotizacion: Array<CatTipoCotizacion>;
  };
  catTipoPartidaCotizacion: {
    needsToReload: boolean;
    listCatTipoPartidaCotizacion: Array<CatTipoPartidaCotizacion>;
  };
  catUsoCFDI: {
    needsToReload: boolean;
    listCatUsoCFDI: Array<CatUsoCFDI>;
  };
  catMetodoDePagoCFDI: {
    needsToReload: boolean;
    listCatMetodoDePagoCFDI: Array<CatMetodoDePagoCFDI>;
  };
  catMedioDeDifusion: {
    needsToReload: boolean;
    listCatMedioDeDifusion: Array<CatMedioDifusion>;
    listCatMedioDeDifusionPqf: Array<DropListOptionPqf>;
  };
  catBrokerCliente: {
    needsToReload: boolean;
    listCatBrokerCliente: Array<CatBrokerCliente>;
  };
  catBanco: {
    needsToReload: boolean;
    listCatBanco: Array<CatBanco>;
  };
  empresas: {
    needsToReload: boolean;
    listEmpresas: Array<Empresa>;
  };
  marcas: {
    needsToReload: boolean;
    listMarcas: Array<DropListOptionCustom>;
  };
  unidad: {
    needsToReload: boolean;
    listUnidad: Array<DropListOption>;
  };
  unidadPqf: {
    needsToReload: boolean;
    listUnidad: Array<DropListOptionPqf>;
  };
  tipoProducto: {
    needsToReload: boolean;
    listTipoProducto: Array<DropListOption>;
  };
  linesProducts: {
    needsToReload: boolean;
    listLinesProducts: Array<DropListOptionCustom>;
  };
  catProcess: {
    needsToReload: boolean;
    listCatProcess: Array<CatProceso>;
  };
  catPriority: {
    needsToReload: boolean;
    listPriority: Array<CatPrioridad>;
  };
  catReviews: {
    needsToReload: boolean;
    listReviews: Array<CatRevision>;
  };
  catIncoterm: {
    needsToReload: boolean;
    listIncoterm: Array<CatIncoterm>;
  };
  catMarcaTarjeta: {
    needsToReload: boolean;
    listCatCardMark: Array<CatMarcaTarjeta>;
  };
  catVehicleBrand: {
    needsToReload: boolean;
    listVehicleBrand: Array<CatMarcaVehiculo>;
  };

  catVehicleType: {
    needsToReload: boolean;
    listVehicleType: Array<CatTipoVehiculo>;
  };
  catDificultadDatosPersona: {
    needsToReload: boolean;
    listDificultadDatosPersona: Array<CatDificultadDatosPersona>;
  };
  catNivelDecisionDatosPersona: {
    needsToReload: boolean;
    listNivelDecisionDatosPersona: Array<CatNivelDecisionDatosPersona>;
  };
  catMantenimientoDatosPersona: {
    needsToReload: boolean;
    listMantenimientoDatosPersona: Array<CatMantenimientoDatosPersona>;
  };
  catNivelPuestoDatosPersona: {
    needsToReload: boolean;
    listNivelPuestoDatosPersona: Array<CatNivelPuestoDatosPersona>;
  };
  catVendedores: {
    needsToReload: boolean;
    listVendedores: Array<VUsuario>;
  };
  catRolClientes: {
    needsToReload: boolean;
    listRolClientes: Array<CatRolCliente>;
  };
  catImportanciasCliente: {
    needsToReload: boolean;
    listImportanciasCliente: Array<CatImportanciaCliente>;
  };
  catTipoSociedadMercantil: {
    needsToReload: boolean;
    listTipoSociedadMercantil: Array<CatImportanciaCliente>;
  };
  catRegimenFiscal: {
    needsToReload: boolean;
    listRegimenFiscal: Array<CatRegimenFiscal>;
  };
  catThemesComments: {
    needsToReload: boolean;
    listThemesComments: Array<CatTemaComentario>;
  };
  catAvailability: {
    needsToReload: boolean;
    listAvailability: Array<CatDisponibilidad>;
  };
  catFamilyLine: {
    needsToReload: boolean;
    listFamilyLine: Array<VFamiliaLinea>;
  };
  catRestriccionesFlete: {
    needsToReload: boolean;
    listRestriccionesFlete: Array<CatRestriccionFlete>;
  };
  catTrademark: {
    needsToReload: boolean;
    listTrademark: Array<Marca>;
  };
  catBillingRestriction: {
    needsToReload: boolean;
    listBillingRestriction: Array<CatRestriccionDeCompra>;
  };
  catClassifications: {
    needsToReload: boolean;
    listClassifications: Array<CatClasificacionInformativaProducto>;
  };
  catPhysicalState: {
    needsToReload: boolean;
    listPhysicalStates: Array<CatEstadoFisico>;
    listPhysicalStatesPqf: Array<DropListOptionPqf>;
  };
  catUse: {
    needsToReload: boolean;
    listUses: Array<CatUso>;
    listUsesPqf: Array<DropListOptionPqf>;
  };
  catInternationalDepositary: {
    needsToReload: boolean;
    listInternationalDepositary: Array<CatDepositarioInternacional>;
    listInternationalDepositaryPqf: Array<DropListOptionPqf>;
  };
  catPresentationType: {
    needsToReload: boolean;
    listPresentationTypes: Array<CatTipoPresentacion>;
    listPresentationTypesPqf: Array<DropListOptionPqf>;
  };
  catCampaignType: {
    needsToReload: boolean;
    listCampaigns: Array<CatTipoCampana>;
  };
  catTransportationWay: {
    needsToReload: boolean;
    listTransportationsWay: Array<CatMedioTransporte>;
    listTransportationsWayPqf: Array<DropListOptionPqf>;
  };
  catTransportationManagement: {
    needsToReload: boolean;
    listTransportationManagement: Array<CatManejo>;
    listTransportationManagementPqf: Array<DropListOptionPqf>;
  };
  catPublicationsFormat: {
    needsToReload: boolean;
    listPublicationsFormat: Array<CatFormatoPublicacion>;
    listPublicationsFormatPqf: Array<DropListOptionPqf>;
  };
  catUnit: {
    needsToReload: boolean;
    listUnits: Array<CatUnidad>;
  };
  catApplication: {
    needsToReload: boolean;
    listApplications: Array<CatAplicacion>;
    listApplicationsPqf: Array<DropListOptionPqf>;
  };
  catProductInvestigationFollow: {
    needsToReload: boolean;
    listProductInvestigationFollow: Array<CatProductoInvestigacionSeguimiento>;
  };
  catTiposAutorizacion: {
    needsToReload: boolean;
    listAuthorizationTypes: Array<CatTipoAutorizacion>;
  };
  catLegalRepresentatives: {
    needsToReload: boolean;
    listLegalRepresentatives: Array<EmpleadoDetalleObj>;
  };
}

export interface State extends AppState {
  catalogs: CatalogsState;
}

export interface DataAdress {
  IdDireccion: string;
  IdCatRutaEntrega: string;
  IdCatZona: string;
  DireccionTextoUno: string;
  DireccionTextoDos: string;
  UsaFormatoEnTexto: boolean;
  TipoRegion: string;
  Calle: string;
  NumeroInterior: number;
  NumeroExterior: number;
  Colonia: string;
  Ciudad: string;
  Municipio: string;
  Estado: string;
  CodigoPostal: string;
  Latitud: number;
  Longitud: number;
  FechaRegistro: string;
  FechaUltimaActualizacion: string;
  RequiereCita: boolean;
  IdCatTipoDireccion: string;
  IdCatPais: string;
  Activo: boolean;
  TipoDireccion?: CatDireccion;
  HorarioAtencionCobro: DataSchedule[];
  HorarioAtencionEntrega: DataSchedule[];
  HorarioAtencionRevision: DataSchedule[];
  HorarioAtencionVisita: DataSchedule[];
  ConfiguracionEntrega: ConfigDelivery;
}

export interface CatDireccion {
  IdCatTipoDireccion: string;
  Tipo: string;
  Descripcion: string;
  Activo: boolean;
}

export interface DiasHorario {
  HorarioAtencionLunes: Horario;
  HorarioAtencionMartes: Horario;
  HorarioAtencionMiercoles: Horario;
  HorarioAtencionJueves: Horario;
  HorarioAtencionViernes: Horario;
}

export interface Horario {
  IdHorarioAtencion: string;
  HoraInicioPrimerHorario: string;
  HoraFinPrimerHorario: string;
  DosTurnos: boolean;
  HoraInicioSegundoHorario: string;
  HoraFinSegundoHorario: string;
  Activo: boolean;
}

export interface DataSchedule {
  IdHorario: string;
  HoraInicioPrimerHorario: string;
  HoraFinPrimerHorario: string;
  DosTurnos: boolean;
  HoraInicioSegundoHorario: string;
  HoraFinSegundoHorario: string;
  Activo: boolean;
  Dia: string;
  Checked: boolean;
}

export interface ConfigDelivery {
  IdEntregaDireccionCliente: string;
  AceptaParciales: boolean;
  EntregaYRevisionMismoDia: boolean;
  SoloAceptaEntregasPorFactura: boolean;
  EntregaEnCondicionesDeAlmacenaje: boolean;
  PedidoOriginal: boolean;
  CopiasPorFactura: boolean;
  NumCopiasFacturas: number;
  HojasSeguridad: number;
  CopiaPedido: true;
  NumCopiasPedido: number;
  Certificados: number;
  Comentarios: string;
  AceptaParcialesPorLinea: boolean;
}
