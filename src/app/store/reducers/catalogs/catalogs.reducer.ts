import {Action, createReducer, on} from '@ngrx/store';
// Models
import {
  CatalogsState,
  initialCatClients,
  initialClients,
  initialProviders,
} from '@appModels/store/catalogs/catalogs.models';
import {ClientFilter} from '@appModels/filters/ClientFilter';
// Actions
import * as clientsActions from '@appActions/catalogs/cliente.actions';
import * as providersActions from '@appActions/catalogs/proveedor.actions';
import * as customsActions from '@appActions/catalogs/aduanas.actions';
import * as productsActions from '@appActions/catalogs/producto.actions';
import * as adressActions from '@appActions/catalogs/direccion.actions';
import * as providerFormsStep6Actions from '@appActions/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.actions';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import * as catBrandAction from '@appActions/catalogs/marca.actions';
import {GET_CAT_LINES_ERROR, GET_CAT_LINES_SUCCESS} from '@appActions/catalogs/lineas.actions';
// Utils
import {map} from 'lodash-es';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {getArrayForDropListOptionsPqf} from '@appUtil/util';

export const initialState: CatalogsState = {
  Aduana: {needsToReload: true, listAduana: []},
  AgenteAduanal: {needsToReload: true, listAgenteAduanal: []},
  ConceptoAgenteAduanal: {
    needsToReload: true,
    listConceptoAgenteAduanal: [],
  },
  clientes: initialClients(),
  catClients: initialCatClients(),
  proveedores: initialProviders(),
  filterCustomer: {
    filterNivelIngreso: [],
    filterRuta: [],
  },
  oferta: {
    honorariosAA: {
      needsToReload: true,
      listAA: [],
    },
    conceptosAA: {
      needsToReload: true,
      listCAA: [],
    },
    unidadTiempo: {
      needsToReload: true,
      listUnidadTiempo: [],
    },
    lista: [],
    listaPrecios: [],
    filteredConceptsAA: {
      needsToReload: true,
      listCAA: [],
    },
  },
  tiposDireccion: {needsToReload: true, listCatTiposDireccion: []},
  rutasEntrega: {needsToReload: true, listCatRutasEntrega: []},
  paises: {needsToReload: true, listCatPais: []},
  zonas: {needsToReload: true, listCatZona: []},
  destinos: {needsToReload: true, listCatDestino: []},
  catClasificacionRegulatoria: {
    needsToReload: true,
    listCatClasificacionRegulatoria: [],
    listCatClasificacionRegulatoriaPqf: [],
  },
  catLugarDespacho: {
    needsToReload: true,
    listCatDispatchPlace: [],
  },
  catBanco: {needsToReload: true, listCatBanco: []},
  catBrokerCliente: {needsToReload: true, listCatBrokerCliente: []},
  catDificultadDatosPersona: {
    needsToReload: true,
    listDificultadDatosPersona: [],
  },
  catEstadoCotizacion: {needsToReload: true, listCatEstadoCotizacion: []},
  catFreight: {needsToReload: true, listCatFreight: []},
  catIncoterm: {needsToReload: true, listIncoterm: []},
  catMoneda: {needsToReload: true, listCatMoneda: []},
  catMedioDePago: {needsToReload: true, listCatMedioDePago: []},
  catTipoValidacion: {needsToReload: true, listCatTipoValidacion: []},
  catIndustria: {needsToReload: true, listCatIndustria: []},
  catMantenimientoDatosPersona: {
    needsToReload: true,
    listMantenimientoDatosPersona: [],
  },
  catMetodoDePagoCFDI: {needsToReload: true, listCatMetodoDePagoCFDI: []},
  catNivelDecisionDatosPersona: {
    needsToReload: true,
    listNivelDecisionDatosPersona: [],
  },
  catNivelIngreso: {needsToReload: true, listCatNivelIngreso: []},
  catNivelPuestoDatosPersona: {
    needsToReload: true,
    listNivelPuestoDatosPersona: [],
  },
  catPaymentConditions: {needsToReload: true, listCatPaymentConditions: []},
  catPriority: {needsToReload: true, listPriority: []},
  catProcess: {needsToReload: true, listCatProcess: []},
  catReasonRejection: {needsToReload: true, listCatReasonRejection: []},
  catReviews: {needsToReload: true, listReviews: []},
  catRolProvider: {needsToReload: true, listCatRolProvider: []},
  catSector: {needsToReload: true, listCatSector: []},
  catTipoCotizacion: {needsToReload: true, listCatTipoCotizacion: []},
  catTipoPartidaCotizacion: {
    needsToReload: true,
    listCatTipoPartidaCotizacion: [],
  },
  catTipoTelefono: {needsToReload: true, listCatTipoTelefono: []},
  catUnidadTiempo: {needsToReload: true, listCatUnidadTiempo: []},
  catUser: {needsToReload: true, listCatUser: []},
  catCommercialLeader: {needsToReload: true, listCatCommercialLeader: []},
  catCoordinatorESAC: {needsToReload: true, listCatCoordinatorESAC: []},
  catUsoCFDI: {needsToReload: true, listCatUsoCFDI: []},
  catVFamilias: {needsToReload: true, listCatVFamilias: []},
  empresas: {needsToReload: true, listEmpresas: []},
  marcas: {needsToReload: true, listMarcas: []},
  unidad: {needsToReload: true, listUnidad: []},
  unidadPqf: {needsToReload: true, listUnidad: []},
  tipoProducto: {needsToReload: true, listTipoProducto: []},
  linesProducts: {needsToReload: true, listLinesProducts: []},
  vProveedores: {needsToReload: true, listVproveedores: []},
  catVehicleType: {needsToReload: true, listVehicleType: []},
  catMarcaTarjeta: {
    needsToReload: true,
    listCatCardMark: [],
  },
  catVehicleBrand: {needsToReload: true, listVehicleBrand: []},
  catVendedores: {needsToReload: true, listVendedores: []},
  catRolClientes: {needsToReload: true, listRolClientes: []},
  catImportanciasCliente: {needsToReload: true, listImportanciasCliente: []},
  catTipoSociedadMercantil: {
    needsToReload: true,
    listTipoSociedadMercantil: [],
  },
  catRegimenFiscal: {
    needsToReload: true,
    listRegimenFiscal: [],
  },
  catThemesComments: {
    needsToReload: true,
    listThemesComments: [],
  },
  catAvailability: {
    needsToReload: true,
    listAvailability: [],
  },
  catFamilyLine: {
    needsToReload: true,
    listFamilyLine: [],
  },
  catRestriccionesFlete: {
    needsToReload: true,
    listRestriccionesFlete: [],
  },
  catTrademark: {
    needsToReload: true,
    listTrademark: [],
  },
  catBillingRestriction: {
    needsToReload: true,
    listBillingRestriction: [],
  },
  catClassifications: {
    needsToReload: true,
    listClassifications: [],
  },
  catPhysicalState: {
    needsToReload: true,
    listPhysicalStates: [],
    listPhysicalStatesPqf: [],
  },
  catUse: {
    needsToReload: true,
    listUses: [],
    listUsesPqf: [],
  },
  catCampaignType: {
    needsToReload: true,
    listCampaigns: [],
  },
  catInternationalDepositary: {
    needsToReload: true,
    listInternationalDepositary: [],
    listInternationalDepositaryPqf: [],
  },
  catPresentationType: {
    needsToReload: true,
    listPresentationTypes: [],
    listPresentationTypesPqf: [],
  },
  catTransportationWay: {
    needsToReload: true,
    listTransportationsWay: [],
    listTransportationsWayPqf: [],
  },
  catTransportationManagement: {
    needsToReload: true,
    listTransportationManagement: [],
    listTransportationManagementPqf: [],
  },
  catPublicationsFormat: {
    needsToReload: true,
    listPublicationsFormat: [],
    listPublicationsFormatPqf: [],
  },
  catUnit: {
    needsToReload: true,
    listUnits: [],
  },
  catApplication: {
    needsToReload: true,
    listApplications: [],
    listApplicationsPqf: [],
  },
  catMedioDeDifusion: {
    needsToReload: true,
    listCatMedioDeDifusion: [],
    listCatMedioDeDifusionPqf: [],
  },
  catProductInvestigationFollow: {
    needsToReload: true,
    listProductInvestigationFollow: [],
  },
  catTiposAutorizacion: {
    needsToReload: true,
    listAuthorizationTypes: [],
  },
  catLegalRepresentatives: {
    needsToReload: true,
    listLegalRepresentatives: [],
  },
};
const reducer = createReducer(
  initialState,
  on(clientsActions.SET_SEARCH_TERM, (state, {searchTerm, queryInfo}) => ({
    ...state,
    clientes: {
      ...state.clientes,
      searchTerm,
      clientQueryInfo: {...state.clientes.clientQueryInfo, ...queryInfo},
    },
  })),
  on(clientsActions.SET_QUERY_INFO, (state, action) => ({
    ...state,
    clientes: {
      ...state.clientes,
      clientQueryInfo: {...state.clientes.clientQueryInfo, ...action.payload},
    },
  })),
  on(clientsActions.SELECTED_OPTION_CLIENT_FILTERS, (state, {option, value}) => ({
    ...state,
    clientes: {
      ...state.clientes,
      filters: map(state.clientes.filters, (o: ClientFilter) => {
        if (o.id === option.id) {
          return {
            ...o,
            selected: o.hasOptions ? value : o.selected,
            isSelected: true,
          };
        }
        return {
          ...o,
          isSelected: false,
        };
      }),
    },
  })),
  on(clientsActions.FETCH_CAT_CLIENTS, (state, {isFirstPage}) => ({
    ...state,
    clientes: {
      ...state.clientes,
      clientsStatus: API_REQUEST_STATUS_LOADING,
      clientQueryInfo: {
        ...state.clientes.clientQueryInfo,
        desiredPage: isFirstPage ? 1 : state.clientes.clientQueryInfo.desiredPage + 1,
      },
    },
  })),
  on(clientsActions.FETCH_CAT_CLIENTS_SUCCESS, (state, {response, currentPage}) => {
    return {
      ...state,
      clientes: {
        ...state.clientes,
        data: {
          ...state.clientes.data,
          Results:
            currentPage === 1
              ? [...response.Results]
              : [...state.clientes.data.Results, ...response.Results],
          TotalResults: response.TotalResults,
        },
        clientsStatus: API_REQUEST_STATUS_SUCCEEDED,
        totalCustomer: response.Results.length,
      },
    };
  }),
  on(clientsActions.FETCH_CAT_CLIENTS_FAILED, (state, action) => ({
    ...state,
    clientes: {
      ...state.clientes,
      clientsStatus: API_REQUEST_STATUS_FAILED,
    },
  })),
  on(clientsActions.FETCH_CLIENT_FILTER_ERROR, (state, action) => ({...state})),
  on(
    clientsActions.FETCH_CLIENT_FILTER_SUCCESS,
    (state: CatalogsState, {esacOptions, routeOptions, incomeLevelOptions, evOptions, type}) => ({
      ...state,
      clientes: {
        ...state.clientes,
        incomeLevelOptions: [...state.clientes.incomeLevelOptions, ...incomeLevelOptions],
        routeOptions: [...state.clientes.routeOptions, ...routeOptions],
        esacOptions: [...state.clientes.esacOptions, ...esacOptions],
        evOptions: [...state.clientes.evOptions, ...evOptions],
      },
    }),
  ),
  on(clientsActions.SET_CLIENTS_FILTER, (state, {selectedFilter, filterName}) => ({
    ...state,
    clientes: {
      ...state.clientes,
      [filterName]: selectedFilter,
    },
  })),
  on(clientsActions.FETCH_DROP_LIST_FOR_CUSTOMER_SUCCESS, (state, action) => ({
    ...state,
    clientes: {
      ...state.clientes,
      importancias: action.payload[0],
      sector: action.payload[1],
      roles: action.payload[2],
      industria: action.payload[3],
    },
  })),
  on(clientsActions.FETCH_DROP_LIST_FOR_CUSTOMER_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(clientsActions.FETCH_CORPORATES, (state) => ({
    ...state,
    clientes: {
      ...state.clientes,
      corporates: {
        ...state.clientes.corporates,
        corporatesStatus: API_REQUEST_STATUS_LOADING,
      },
    },
  })),
  on(clientsActions.FETCH_CORPORATES_FAILED, (state) => ({
    ...state,
    clientes: {
      ...state.clientes,
      corporates: {
        ...state.clientes.corporates,
        corporatesStatus: API_REQUEST_STATUS_FAILED,
      },
    },
  })),
  on(clientsActions.FETCH_CORPORATES_SUCCESS, (state, {totalCorporates, corporatesToShow}) => ({
    ...state,
    clientes: {
      ...state.clientes,
      corporates: {
        ...state.clientes.corporates,
        totalCorporates,
        corporatesToShow,
        corporatesStatus: API_REQUEST_STATUS_SUCCEEDED,
        needsToReloadCorporates: false,
      },
    },
  })),
  on(clientsActions.SET_NEEDS_TO_RELOAD_CORPORATES, (state, {value}) => ({
    ...state,
    clientes: {
      ...state.clientes,
      corporates: {
        ...state.clientes.corporates,
        needsToReloadCorporates: value,
      },
    },
  })),
  on(clientsActions.GET_SAVE_CUSTOMER_LOAD, (state) => ({
    ...state,
  })),
  on(clientsActions.GET_SAVE_CUSTOMER_SUCCESS, (state, action) => ({
    ...state,
    clientes: {
      ...state.clientes,
      idCliente: action.payload,
    },
  })),
  on(clientsActions.GET_SAVE_CUSTOMER_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(clientsActions.GET_DATASDROPLIST_CONTACT_LOAD, (state) => ({
    ...state,
  })),
  on(clientsActions.GET_DATASDROPLIST_CONTACT_SUCCESS, (state, action) => ({
    ...state,
    clientes: {
      ...state.clientes,
      contacto: {
        tiposDificultad: action.payload[0],
        tiposDecision: action.payload[1],
        tiposMantenimiento: action.payload[2],
        tiposNivelPuesto: action.payload[3],
      },
    },
  })),
  on(clientsActions.GET_DATASDROPLIST_CONTACT_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(clientsActions.GET_DATADROPLIST_ADDRES_LOAD, (state) => ({
    ...state,
  })),
  on(clientsActions.GET_DATADROPLIST_ADDRES_SUCCESS, (state, action) => ({
    ...state,
    tiposDireccion: {
      ...state.tiposDireccion,
      needsToReload: false,
      listCatTiposDireccion: action.payload[0],
    },
    rutasEntrega: {
      ...state.rutasEntrega,
      needsToReload: false,
      listCatRutasEntrega: action.payload[1],
    },
    paises: {
      ...state.paises,
      needsToReload: false,
      listCatPais: action.payload[2],
    },
    zonas: {
      ...state.zonas,
      needsToReload: false,
      listCatZona: action.payload[3],
    },
    destinos: {
      ...state.destinos,
      needsToReload: false,
      listCatDestino: action.payload[4],
    },
  })),
  on(clientsActions.GET_DATADROPLIST_ADDRES_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(clientsActions.GET_DATADROPLIST_PAGO_SUCCESS, (state, action) => ({
    ...state,
    clientes: {
      ...state.clientes,
      datosPago: {
        condicionesPago: action.payload[0].Results,
        metodoPagoCFDI: action.payload[1].Results,
        tipoRevision: action.payload[2].Results,
        formaPago: action.payload[3].Results,
        empresas: action.payload[4].Results,
        catUsoCFDI: action.payload[5].Results,
        needToReload: false,
      },
    },
    catTipoValidacion: {
      ...state.catTipoValidacion,
      needsToReload: false,
      listCatTipoValidacion: action.payload[8],
    },
  })),
  on(clientsActions.GET_DATADROPLIST_PAGO_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(clientsActions.GET_DATADROPLIST_ADDRES_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(providersActions.GET_PROVIDERS_LOAD, (state) => ({
    ...state,
  })),
  on(providersActions.GET_PROVIDERS_SUCCESS, (state, action) => {
    return {
      ...state,
      proveedores: {
        ...state.proveedores,
        data: action.payload,
        totalProviders: action.payload.TotalResults,
      },
    };
  }),
  on(providersActions.GET_PROVIDERS_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(providersActions.GET_VPROVIDERS_LOAD, (state) => ({
    ...state,
  })),
  on(providersActions.GET_VPROVIDERS_SUCCESS, (state, action) => {
    return {
      ...state,
      vProveedores: {
        ...state.vProveedores,
        listVproveedores: action.payload,
      },
    };
  }),
  on(providersActions.GET_VPROVIDERS_ERROR, (state) => ({
    ...state,
  })),
  on(providersActions.GET_FAMILY_PROVIDER_LOAD, (state) => ({
    ...state,
  })),
  on(providersActions.GET_FAMILY_PROVIDER_SUCCESS, (state, action) => {
    return {
      ...state,
      proveedores: {
        ...state.proveedores,
        familias: action.payload,
      },
    };
  }),
  on(providersActions.GET_FAMILY_PROVIDER_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(providersActions.GET_FAMILY_PROVIDER_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  // DOCS: Se comentó porque no hace nada
  /*on(customsActions.GET_LIST_AGENTES_LOAD, (state) => ({
    ...state,
  })),*/
  on(customsActions.GET_LIST_AGENTES_SUCCESS, (state, action) => {
    return {
      ...state,
      oferta: {
        ...state.oferta,
        honorariosAA: {needsToReload: false, listAA: action.payload},
      },
    };
  }),
  on(catalogsActions.GET_LIST_AGENTE_ADUANAL_SUCCESS, (state, {listAgenteAduanal}) => {
    return {
      ...state,
      AgenteAduanal: {
        needsToReload: false,
        listAgenteAduanal,
      },
    };
  }),
  on(catalogsActions.GET_CAT_INCOTERM_SUCCESS, (state, {listIncoterm}) => {
    return {
      ...state,
      catIncoterm: {
        needsToReload: false,
        listIncoterm,
      },
    };
  }),
  on(catalogsActions.GET_LIST_ADUANA_SUCCESS, (state, {listAduana}) => {
    return {
      ...state,
      Aduana: {
        needsToReload: false,
        listAduana,
      },
    };
  }),
  on(
    catalogsActions.GET_LIST_CONCEPTS_CUSTOM_AGENT_SUCCESS,
    (state, {listConceptoAgenteAduanal}) => {
      return {
        ...state,
        ConceptoAgenteAduanal: {
          needsToReload: false,
          listConceptoAgenteAduanal,
        },
      };
    },
  ),
  on(customsActions.GET_LIST_AGENTES_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(customsActions.GET_LIST_CONCEPTOSAA_LOAD, (state) => ({
    ...state,
  })),
  on(customsActions.GET_LIST_CONCEPTOSAA_SUCCESS, (state, action) => {
    return {
      ...state,
      oferta: {
        ...state.oferta,
        conceptosAA: {needsToReload: false, listCAA: action.payload},
        filteredConceptsAA: {needsToReload: false, listCAA: action.payload},
      },
    };
  }),
  on(customsActions.FILTER_LIST_CONCEPTOSAA_SUCCESS, (state, action) => {
    return {
      ...state,
      oferta: {
        ...state.oferta,
        filteredConceptsAA: action.payload,
      },
    };
  }),
  on(customsActions.GET_LIST_CONCEPTOSAA_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(clientsActions.GET_DATADROPLIST_UNIDADTIEMPO_LOAD, (state) => ({
    ...state,
  })),
  on(clientsActions.GET_DATADROPLIST_UNIDADTIEMPO_SUCCESS, (state, action) => {
    return {
      ...state,
      oferta: {
        ...state.oferta,
        unidadTiempo: {needsToReload: false, listUnidadTiempo: action.payload},
      },
    };
  }),
  on(clientsActions.GET_DATADROPLIST_UNIDADTIEMPO_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(productsActions.GET_PRODUCTS_LOAD, (state) => ({
    ...state,
  })),
  on(productsActions.GET_PRODUCTS_SUCCESS, (state, action) => {
    return {
      ...state,
      oferta: {
        ...state.oferta,
        lista: action.payload,
      },
    };
  }),
  on(productsActions.GET_PRODUCTS_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(clientsActions.GET_LISTACONTACTOS_CLIENTE_LOAD, (state) => ({
    ...state,
  })),
  on(clientsActions.GET_LISTACONTACTOS_CLIENTE_SUCCES, (state, action) => {
    return {
      ...state,
      clientes: {
        ...state.clientes,
        listaContactos: action.payload,
      },
    };
  }),
  on(clientsActions.GET_LISTACONTACTOS_CLIENTE_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(productsActions.GET_PRECIOLISTA_LOAD, (state) => ({
    ...state,
  })),
  on(productsActions.GET_PRECIOLISTA_SUCCESS, (state, action) => {
    return {
      ...state,
      oferta: {
        ...state.oferta,
        listaPrecios: action.payload,
      },
    };
  }),
  on(productsActions.GET_PRECIOLISTA_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(adressActions.GET_DIRECCION_ENTREGA_SUCCESS, (state, action) => {
    return {
      ...state,
      address: action.payload,
    };
  }),
  on(adressActions.GET_DIRECCION_ENTREGA_ERROR, (state, action) => {
    return {
      ...state,
    };
  }),
  on(catalogsActions.GET_CAT_ROL_PROVIDERS_SUCCESS, (state, action) => ({
    ...state,
    catRolProvider: {
      ...state.catRolProvider,
      needsToReload: false,
      listCatRolProvider: action.lisCatRolProvider,
    },
  })),
  on(catalogsActions.GET_CAT_ADDRESS_TYPE_SUCCESS, (state, action) => ({
    ...state,
    tiposDireccion: {
      ...state.tiposDireccion,
      needsToReload: false,
      listCatTiposDireccion: action.lisCatAddressType,
    },
  })),
  on(catalogsActions.GET_CAT_RUTA_ENTREGA_SUCCESS, (state, action) => ({
    ...state,
    rutasEntrega: {
      ...state.rutasEntrega,
      needsToReload: false,
      listCatRutasEntrega: action.lisCatRutaEntrega,
    },
  })),
  on(catalogsActions.GET_CAT_PAIS_SUCCESS, (state: CatalogsState, action) => ({
    ...state,
    paises: {
      ...state.paises,
      needsToReload: false,
      listCatPais: action.lisCatPais,
    },
  })),
  on(catalogsActions.GET_CAT_ZONA_SUCCESS, (state, action) => ({
    ...state,
    zonas: {
      ...state.zonas,
      needsToReload: false,
      listCatZona: action.lisCatZona,
    },
  })),
  on(catalogsActions.GET_CAT_DESTINO_SUCCESS, (state, action) => ({
    ...state,
    destinos: {
      ...state.destinos,
      needsToReload: false,
      listCatDestino: action.listCatDestino,
    },
  })),
  on(catalogsActions.GET_CAT_CUSTOMER_SUCCESS, (state, action) => ({
    ...state,
    catUser: {
      ...state.catUser,
      needsToReload: false,
      listCatUser: action.lisCatCustomer,
    },
  })),
  on(catalogsActions.GET_CAT_COMMERCIAL_LEADER_SUCCESS, (state, action) => ({
    ...state,
    catCommercialLeader: {
      ...state.catCommercialLeader,
      needsToReload: false,
      listCatCommercialLeader: action.listCommercialLeader,
    },
  })),
  on(catalogsActions.GET_CAT_COORDINATOR_ESAC_SUCCESS, (state, action) => ({
    ...state,
    catCoordinatorESAC: {
      ...state.catCoordinatorESAC,
      needsToReload: false,
      listCatCoordinatorESAC: action.listCoordinatorEsac,
    },
  })),
  on(catalogsActions.GET_CAT_MONEDA_SUCCESS, (state, action) => ({
    ...state,
    catMoneda: {
      ...state.catMoneda,
      needsToReload: false,
      listCatMoneda: action.lisCatMoneda,
    },
  })),
  on(catalogsActions.GET_CAT_REASON_REJECTION_SUCCESS, (state, action) => ({
    ...state,
    catReasonRejection: {
      ...state.catReasonRejection,
      needsToReload: false,
      listCatReasonRejection: action.listCatReasonRejection,
    },
  })),
  on(catalogsActions.GET_CAT_PAYMENT_CONDITIONS_SUCCESS, (state, action) => ({
    ...state,
    catPaymentConditions: {
      ...state.catPaymentConditions,
      needsToReload: false,
      listCatPaymentConditions: action.listCatPaymentConditions,
    },
  })),
  on(
    catalogsActions.GET_CAT_FREIGHT_SUCCESS,
    (state: CatalogsState, {listCatFreight}): CatalogsState => ({
      ...state,
      catFreight: {
        ...state.catFreight,
        needsToReload: false,
        listCatFreight,
      },
    }),
  ),
  on(catalogsActions.GET_CAT_MEDIO_DE_PAGO_SUCCESS, (state, {listCatMedioDePago}) => ({
    ...state,
    catMedioDePago: {
      ...state.catMedioDePago,
      needsToReload: false,
      listCatMedioDePago,
    },
  })),
  on(catalogsActions.GET_CAT_TIPO_VALIDACION_SUCCESS, (state, action) => ({
    ...state,
    catTipoValidacion: {
      ...state.catTipoValidacion,
      needsToReload: false,
      listCatTipoValidacion: action.listCatTipoValidacion,
    },
  })),
  on(catalogsActions.GET_CAT_SECTOR_SUCCESS, (state, action) => ({
    ...state,
    catSector: {
      ...state.catSector,
      needsToReload: false,
      listCatSector: action.lisCatSector,
    },
  })),
  on(catalogsActions.GET_CAT_INDUSTRIA_SUCCESS, (state, action) => ({
    ...state,
    catIndustria: {
      ...state.catIndustria,
      needsToReload: false,
      listCatIndustria: action.listCatIndustria,
    },
  })),
  on(catalogsActions.GET_CAT_FAMILIAS_SUCCESS, (state, action) => ({
    ...state,
    catVFamilias: {
      ...state.catVFamilias,
      needsToReload: false,
      listCatVFamilias: action.listCatVFamilias,
    },
  })),
  on(catalogsActions.GET_CAT_UNIDAD_TIEMPO_SUCCESS, (state, action) => ({
    ...state,
    catUnidadTiempo: {
      ...state.catUnidadTiempo,
      needsToReload: false,
      listCatUnidadTiempo: action.listCatUnidadTiempo,
    },
  })),
  on(catalogsActions.GET_CAT_TIPO_TELEFONO_SUCCESS, (state, action) => ({
    ...state,
    catTipoTelefono: {
      ...state.catTipoTelefono,
      needsToReload: false,
      listCatTipoTelefono: action.lisCatTIipoTelefono,
    },
  })),
  on(catalogsActions.GET_CAT_ESTADO_COTIZACION_SUCCESS, (state, {listCatEstadoCotizacion}) => ({
    ...state,
    catEstadoCotizacion: {
      ...state.catEstadoCotizacion,
      needsToReload: false,
      listCatEstadoCotizacion,
    },
  })),
  on(catalogsActions.GET_CAT_TIPO_COTIZACION_SUCCESS, (state, {listCatTipoCotizacion}) => ({
    ...state,
    catTipoCotizacion: {
      ...state.catTipoCotizacion,
      needsToReload: false,
      listCatTipoCotizacion,
    },
  })),
  on(
    catalogsActions.GET_CAT_TIPO_PARTIDA_COTIZACION_SUCCESS,
    (state, {listCatTipoPartidaCotizacion}) => ({
      ...state,
      catTipoPartidaCotizacion: {
        ...state.catTipoPartidaCotizacion,
        needsToReload: false,
        listCatTipoPartidaCotizacion,
      },
    }),
  ),
  on(catalogsActions.GET_CAT_USO_CFDI_SUCCESS, (state, {listCatUsoCFDI}) => ({
    ...state,
    catUsoCFDI: {
      ...state.catUsoCFDI,
      needsToReload: false,
      listCatUsoCFDI,
    },
  })),
  on(catalogsActions.GET_CAT_METODO_DE_PAGO_SUCCESS, (state, {listCatMetodoDePagoCFDI}) => ({
    ...state,
    catMetodoDePagoCFDI: {
      ...state.catMetodoDePagoCFDI,
      needsToReload: false,
      listCatMetodoDePagoCFDI,
    },
  })),
  on(catalogsActions.GET_CAT_EMPRESAS_SUCCESS, (state, action) => ({
    ...state,
    empresas: {
      ...state.empresas,
      needsToReload: false,

      listEmpresas: action.listEmpresas,
    },
  })),
  on(catBrandAction.GET_CAT_BRANDS_SUCCESS, (state, {list}) => ({
    ...state,
    marcas: {...state.marcas, needsToReload: false, listMarcas: list},
  })),
  on(catalogsActions.GET_UNIDAD_SUCCESS, (state, {listDropList, listDropListPqf}) => ({
    ...state,
    unidad: {...state.unidad, needsToReload: false, listUnidad: listDropList},
    unidadPqf: {...state.unidad, needsToReload: false, listUnidad: listDropListPqf},
  })),
  on(catalogsActions.GET_TIPO_PRODUCTO_SUCCESS, (state, {list}) => ({
    ...state,
    tipoProducto: {
      ...state.tipoProducto,
      needsToReload: false,
      listTipoProducto: list,
    },
  })),
  on(GET_CAT_LINES_ERROR, (state) => ({
    ...state,
    linesProducts: {
      ...state.linesProducts,
      needsToReload: true,
      listLinesProducts: [],
    },
  })),
  on(GET_CAT_LINES_SUCCESS, (state, {list}) => ({
    ...state,
    linesProducts: {
      ...state.linesProducts,
      needsToReload: false,
      listLinesProducts: list,
    },
  })),
  on(catalogsActions.GET_CAT_NIVEL_INGRESO_SUCCESS, (state, {listCatNivelIngreso}) => ({
    ...state,
    catNivelIngreso: {listCatNivelIngreso, needsToReload: false},
  })),
  on(catalogsActions.GET_CAT_DESTINO_SUCCESS, (state, {listCatDestino}) => ({
    ...state,
    destinos: {listCatDestino, needsToReload: false},
  })),
  on(catalogsActions.GET_CAT_BROKER_CLIENTE_SUCCESS, (state, {listCatBrokerCliente}) => ({
    ...state,
    catBrokerCliente: {listCatBrokerCliente, needsToReload: false},
  })),
  on(catalogsActions.GET_CAT_BANK_SUCCESS, (state, {listCatBanco}) => ({
    ...state,
    catBanco: {listCatBanco, needsToReload: false},
  })),
  on(catalogsActions.GET_CAT_PROCESS_SUCCESS, (state, {listCatProcess}) => ({
    ...state,
    catProcess: {listCatProcess, needsToReload: false},
  })),
  on(catalogsActions.GET_CAT_PRIORITY_SUCCESS, (state, {listPriority}) => ({
    ...state,
    catPriority: {...state.catPriority, listPriority, needsToReload: false},
  })),
  on(catalogsActions.GET_CAT_REVIEWS_SUCCESS, (state, {listReviews}) => ({
    ...state,
    catReviews: {listReviews, needsToReload: false},
  })),

  on(catalogsActions.GET_CAT_REVIEWS_SUCCESS, (state, {listReviews}) => ({
    ...state,
    catReviews: {listReviews, needsToReload: false},
  })),
  on(providerFormsStep6Actions.GET_EMPRESAS_SUCCESS, (state, action) => ({
    ...state,
    empresas: {
      ...state.empresas,
      needsToReload: false,
      listEmpresas: action.listEmpresas,
    },
  })),
  on(catalogsActions.GET_LIST_VEHICLE_BRANDS_SUCCESS, (state, {listVehicleBrand}) => ({
    ...state,
    catVehicleBrand: {listVehicleBrand, needsToReload: false},
  })),
  on(catalogsActions.GET_LIST_VEHICLE_TYPE_SUCCESS, (state, {listVehicleType}) => ({
    ...state,
    catVehicleType: {listVehicleType, needsToReload: false},
  })),
  on(
    catalogsActions.GET_CAT_DIFICULTAD_SUCCESS,
    (state: CatalogsState, {listDificultadDatosPersona}): CatalogsState => ({
      ...state,
      catDificultadDatosPersona: {
        listDificultadDatosPersona,
        needsToReload: false,
      },
    }),
  ),
  on(
    catalogsActions.GET_CAT_NIVEL_DECISION_SUCCESS,
    (state: CatalogsState, {listNivelDecisionDatosPersona}): CatalogsState => ({
      ...state,
      catNivelDecisionDatosPersona: {
        listNivelDecisionDatosPersona,
        needsToReload: false,
      },
    }),
  ),
  on(
    catalogsActions.GET_CAT_MANTENIMIENTO_SUCCESS,
    (state: CatalogsState, {listMantenimientoDatosPersona}): CatalogsState => ({
      ...state,
      catMantenimientoDatosPersona: {
        listMantenimientoDatosPersona,
        needsToReload: false,
      },
    }),
  ),
  on(
    catalogsActions.GET_CAT_NIVEL_PUESTO_SUCCESS,
    (state: CatalogsState, {listNivelPuestoDatosPersona}): CatalogsState => ({
      ...state,
      catNivelPuestoDatosPersona: {
        listNivelPuestoDatosPersona,
        needsToReload: false,
      },
    }),
  ),
  on(clientsActions.CLEAN_ALL_CLIENTS_STATE, (state) => ({
    ...state,
    clientes: initialClients(),
  })),
  on(clientsActions.SET_CLIENTS_STATUS, (state, {clientsStatus}) => ({
    ...state,
    clientes: {
      ...state.clientes,
      clientsStatus,
    },
  })),
  on(catalogsActions.GET_CAT_SELLER_SUCCESS, (state, {listVendedores}) => ({
    ...state,
    catVendedores: {
      listVendedores,
      needsToReload: false,
    },
  })),
  on(
    catalogsActions.GET_CAT_TIPO_SOCIEDAD_MERCANTIL_SUCCESS,
    (state, {listMercantileSocietyType}) => ({
      ...state,
      catTipoSociedadMercantil: {
        listTipoSociedadMercantil: listMercantileSocietyType,
        needsToReload: false,
      },
    }),
  ),
  on(catalogsActions.GET_CAT_REGIMEN_FISCAL_SUCCESS, (state, {listTaxRegime}) => ({
    ...state,
    catRegimenFiscal: {
      listRegimenFiscal: listTaxRegime,
      needsToReload: false,
    },
  })),
  on(catalogsActions.GET_CAT_THEMES_COMMENTS_SUCCESS, (state, {listThemeComments}) => ({
    ...state,
    catThemesComments: {
      listThemesComments: listThemeComments,
      needsToReload: false,
    },
  })),

  /*GET_CAT_THEMES_COMMENTS_SUCCESS*/
  on(catalogsActions.GET_CAT_ROL_CLIENTS_SUCCESS, (state, {listRolClientes}) => ({
    ...state,
    catRolClientes: {
      listRolClientes,
      needsToReload: false,
    },
  })),
  on(catalogsActions.GET_CAT_IMPORTANCIAS_CLIENTE_SUCCESS, (state, {listImportanciasCliente}) => ({
    ...state,
    catImportanciasCliente: {
      listImportanciasCliente,
      needsToReload: false,
    },
  })),
  on(catalogsActions.GET_CAT_AVALABILITY_SUCCESS, (state, {listAvailability}) => ({
    ...state,
    catAvailability: {
      listAvailability,
      needsToReload: false,
    },
  })),
  on(catalogsActions.GET_CAT_FAMILY_LINE_SUCCESS, (state, {listFamilyLine}) => ({
    ...state,
    catFamilyLine: {
      needsToReload: false,
      listFamilyLine,
    },
  })),
  on(catalogsActions.GET_CAT_RESTRICCIONES_FLETE_SUCCESS, (state, {listRestriccionesFlete}) => ({
    ...state,
    catRestriccionesFlete: {
      needsToReload: false,
      listRestriccionesFlete,
    },
  })),
  on(catalogsActions.GET_CAT_TRADEMARK_SUCCESS, (state, {listTrademark}) => ({
    ...state,
    catTrademark: {
      needsToReload: false,
      listTrademark,
    },
  })),
  on(catalogsActions.NEEDS_TO_RELOAD_TRADEMARKS, (state) => ({
    ...state,
    catTrademark: {
      ...state.catTrademark,
      needsToReload: true,
    },
  })),
  on(catalogsActions.GET_CAT_BILLING_RESTRICTION_SUCCESS, (state, {listBillingRestriction}) => ({
    ...state,
    catBillingRestriction: {
      needsToReload: false,
      listBillingRestriction,
    },
  })),
  on(catalogsActions.GET_CAT_CLASSIFICATIONS_SUCCESS, (state, {listClassifications}) => ({
    ...state,
    catClassifications: {
      needsToReload: false,
      listClassifications,
    },
  })),
  on(catalogsActions.GET_CAT_PHYSICAL_STATE_SUCCESS, (state, {listPhysicalStates}) => ({
    ...state,
    catPhysicalState: {
      needsToReload: false,
      listPhysicalStates,
      listPhysicalStatesPqf: getArrayForDropListOptionsPqf(
        listPhysicalStates,
        'IdCatEstadoFisico',
        'EstadoFisico',
      ),
    },
  })),
  on(catalogsActions.GET_CAT_USE_SUCCESS, (state, {listUses}) => ({
    ...state,
    catUse: {
      needsToReload: false,
      listUses,
      listUsesPqf: getArrayForDropListOptionsPqf(listUses, 'IdCatUso', 'Uso'),
    },
  })),
  on(
    catalogsActions.GET_CAT_INTERNATIONAL_DEPOSITARY_SUCCESS,
    (state, {listInternationalDepositary}) => ({
      ...state,
      catInternationalDepositary: {
        needsToReload: false,
        listInternationalDepositary,
        listInternationalDepositaryPqf: getArrayForDropListOptionsPqf(
          listInternationalDepositary,
          'IdCatDepositarioInternacional',
          'DepositarioInternacional',
        ),
      },
    }),
  ),
  on(catalogsActions.GET_CAT_PRESENTATION_TYPE_SUCCESS, (state, {listPresentationTypes}) => ({
    ...state,
    catPresentationType: {
      needsToReload: false,
      listPresentationTypes,
      listPresentationTypesPqf: getArrayForDropListOptionsPqf(
        listPresentationTypes,
        'IdCatTipoPresentacion',
        'TipoPresentacion',
      ),
    },
  })),
  on(catalogsActions.GET_CAT_TRANSPORTATION_WAY_SUCCESS, (state, {listTransportationsWay}) => ({
    ...state,
    catTransportationWay: {
      needsToReload: false,
      listTransportationsWay,
      listTransportationsWayPqf: getArrayForDropListOptionsPqf(
        listTransportationsWay,
        'IdCatMedioTransporte',
        'MedioTransporte',
      ),
    },
  })),
  on(
    catalogsActions.GET_CAT_TRANSPORTATION_MANAGEMENT_SUCCESS,
    (state, {listTransportationManagement}) => ({
      ...state,
      catTransportationManagement: {
        needsToReload: false,
        listTransportationManagement,
        listTransportationManagementPqf: getArrayForDropListOptionsPqf(
          listTransportationManagement,
          'IdCatManejo',
          'Manejo',
        ),
      },
    }),
  ),
  on(catalogsActions.GET_CAT_PUBLICATIONS_FORMAT_SUCCESS, (state, {listPublicationsFormat}) => ({
    ...state,
    catPublicationsFormat: {
      needsToReload: false,
      listPublicationsFormat,
      listPublicationsFormatPqf: getArrayForDropListOptionsPqf(
        listPublicationsFormat,
        'IdCatFormatoPublicacion',
        'FormatoPublicacion',
      ),
    },
  })),
  on(catalogsActions.GET_CAT_UNIT_SUCCESS, (state, {listUnits}) => ({
    ...state,
    catUnit: {
      needsToReload: false,
      listUnits,
    },
  })),
  on(catalogsActions.GET_CAT_APPLICATION_SUCCESS, (state, {listApplications}) => ({
    ...state,
    catApplication: {
      needsToReload: false,
      listApplications,
      listApplicationsPqf: getArrayForDropListOptionsPqf(
        listApplications,
        'IdCatAplicacion',
        'Aplicacion',
      ),
    },
  })),
  on(
    catalogsActions.GET_CAT_CLASIFICACION_REGULATORIA_SUCCESS,
    (state, {clasifications}): CatalogsState => ({
      ...state,
      catClasificacionRegulatoria: {
        needsToReload: false,
        listCatClasificacionRegulatoria: clasifications,
        listCatClasificacionRegulatoriaPqf: getArrayForDropListOptionsPqf(
          clasifications,
          'IdCatClasificacionRegulatoria',
          'Descripcion',
        ),
      },
    }),
  ),
  on(
    catalogsActions.GET_CAT_MODELO_DIFUSION_SUCCESS,
    (state, {listCatMedioDeDifusion}): CatalogsState => ({
      ...state,
      catMedioDeDifusion: {
        needsToReload: false,
        listCatMedioDeDifusion,
        listCatMedioDeDifusionPqf: getArrayForDropListOptionsPqf(
          listCatMedioDeDifusion,
          'IdCatMedioDifusion',
          'MedioDifusion',
        ),
      },
    }),
  ),
  on(
    catalogsActions.GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_SUCCESS,
    (state, {listProductInvestigationFollow}): CatalogsState => ({
      ...state,
      catProductInvestigationFollow: {
        needsToReload: true,
        listProductInvestigationFollow,
      },
    }),
  ),
  on(
    catalogsActions.GET_CAT_TIPO_CAMPANA_SUCCESS,
    (state, {lisCampaigns}): CatalogsState => ({
      ...state,
      catCampaignType: {
        needsToReload: false,
        listCampaigns: lisCampaigns,
      },
    }),
  ),
  on(
    catalogsActions.GET_CAT_LUGAR_DESPACHO_SUCCESS,
    (state, {listCatDispatchPlace}): CatalogsState => ({
      ...state,
      catLugarDespacho: {
        needsToReload: false,
        listCatDispatchPlace,
      },
    }),
  ),
  on(
    catalogsActions.GET_CAT_MARCA_TARJETA_SUCCESS,
    (state, {listCatCardMark}): CatalogsState => ({
      ...state,
      catMarcaTarjeta: {
        needsToReload: false,
        listCatCardMark,
      },
    }),
  ),
  on(catalogsActions.GET_CAT_TIPOS_AUTORIZACION_SUCCESS, (state, {listAuthorizationTypes}) => ({
    ...state,
    catTiposAutorizacion: {
      needsToReload: false,
      listAuthorizationTypes,
    },
  })),
  on(catalogsActions.GET_CAT_LEGAL_REPRESENTATIVE_SUCCESS, (state, {listLegalRepresentatives}) => ({
    ...state,
    catLegalRepresentatives: {
      needsToReload: false,
      listLegalRepresentatives,
    },
  })),
);

export function catalogsReducer(state: CatalogsState | undefined, action: Action) {
  return reducer(state, action);
}
