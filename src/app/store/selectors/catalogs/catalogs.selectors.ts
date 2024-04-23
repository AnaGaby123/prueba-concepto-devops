import {createSelector} from '@ngrx/store';
import {selectCatalogsState} from '@appCore/core.state';

import {deburr, filter, find, findIndex, flow, isArray, isEmpty, isString, map} from 'lodash-es';
import {CatalogsState} from '@appModels/store/catalogs/catalogs.models';
import {
  getArrayForDropDownList,
  getArrayForDropList,
  getArrayForDropListOptionsPqf,
} from '@appUtil/util';
import {
  Aduana,
  AgenteAduanal,
  CatCondicionesDePago,
  CatEstadoCotizacion,
  CatIndustria,
  CatNivelDecisionDatosPersona,
  CatPais,
  CatRutaEntrega,
  CatTipoAutorizacion,
  CatTipoNumeroTelefonico,
  CatUnidadTiempo,
  ConceptoAgenteAduanal,
} from 'api-catalogos';

import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {DropListOptionsPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {QUOTATION_SAVED} from '@appUtil/common.protocols';
import {queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {CatMoneda, Usuario} from 'api-logistica';

export const selectCatalogs = createSelector(selectCatalogsState, (state) => state);
export const selectClientsCatalog = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.clientes,
);
export const selectClientes = createSelector(
  selectCatalogs,
  (state) => state.clientes.data.Results,
);
export const selectTotalClients = createSelector(
  selectCatalogs,
  (state) => state.clientes.data.TotalResults,
);
export const selectSearchTerm = createSelector(
  selectCatalogs,
  (state) => state.clientes.searchTerm,
);
export const selectClientQueryInfo = createSelector(selectCatalogs, (state) => {
  const queryInfo = {...state.clientes.clientQueryInfo};
  const clients = {...state.clientes};

  // TODO: falta filtro para corporativo y cuenta clave

  if (clients.selectedIncomeLevelOption.value !== '1') {
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'IdCatNivelIngreso',
        ValorFiltro: clients.selectedIncomeLevelOption.value.toString(),
      },
    ];
  }
  if (clients.selectedRouteOption.value !== '1') {
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'IdCatRutaEntrega',
        ValorFiltro: clients.selectedRouteOption.value.toString(),
      },
    ];
  }
  if (clients.selectedClientsOption.value !== '1') {
    if (clients.selectedClientsOption.value === '2') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'Activo',
          ValorFiltro: true,
        },
      ];
    } else {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'Activo',
          ValorFiltro: false,
        },
      ];
    }
  }
  if (clients.selectedEsacOption.value !== '1') {
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'IdUsuarioESAC',
        ValorFiltro: clients.selectedEsacOption.value.toString(),
      },
    ];
  }
  if (clients.selectedEvOption.value !== '1') {
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'IdUsuarioEVI',
        ValorFiltro: clients.selectedEvOption.value.toString(),
      },
    ];
  }

  // TODO: Agregamos el filtro por tab
  queryInfo.Filters = [
    ...queryInfo.Filters,
    {
      NombreFiltro: 'Nombre',
      ValorFiltro: state.clientes.searchTerm,
    },
  ];

  return queryInfo;
});

export const selectActiveTapCorporates = createSelector(selectCatalogs, (state) => {
  const tap = find(state.clientes.filters, (o) => {
    return o.isSelected;
  });
  return tap && tap.id === 2;
});
export const selectCurrentPage = createSelector(
  selectCatalogs,
  (state) => state.clientes.clientQueryInfo.desiredPage,
);
export const getClientFilters = createSelector(selectCatalogs, (state) => state.clientes.filters);
export const selectCorporatesToShow = createSelector(selectCatalogs, (state) =>
  filter(state.clientes.corporates.corporatesToShow, (corporation) => {
    const clients = filter(corporation.Clientes, (o) => {
      return (
        o.NombreCorporativo.toLowerCase().indexOf(state.clientes.searchTerm.toLowerCase()) !== -1
      );
    });
    return clients.length > 0;
  }),
);
export const selectTotalCorporates = createSelector(
  selectCatalogs,
  (state) => state.clientes.corporates.totalCorporates,
);
export const selectNeedsToReloadCorporates = createSelector(
  selectCatalogs,
  (state) => state.clientes.corporates.needsToReloadCorporates,
);
export const selectClientsStatus = createSelector(selectCatalogs, (state): number => {
  return state.clientes.clientsStatus;
});
export const selectTotClientes = createSelector(
  selectCatalogs,
  (state) => state.clientes.totalCustomer,
);
export const selectFilterClientes = createSelector(selectCatalogs, (state) => state.filterCustomer);
export const filterNivelIngreso = createSelector(
  selectCatalogs,
  (state) => state.filterCustomer.filterNivelIngreso,
);
export const filterRuta = createSelector(
  selectCatalogs,
  (state) => state.filterCustomer.filterRuta,
);
export const dropListImportancia = createSelector(
  selectCatalogs,
  (state) => state.clientes.importancias,
);
export const dropListImportanciaForDropDownList = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(state.clientes.importancias, 'id', 'nombre');
  },
);
export const dropListSector = createSelector(selectCatalogs, (state) => state.clientes.sector);
export const dropListSelectorForDropDownList = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(state.clientes.sector, 'id', 'nombre');
  },
);
export const dropListRoles = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.clientes.roles,
);
export const dropListRolesForDropDownList = createSelector(selectCatalogs, (state) => {
  return getArrayForDropDownList(state.clientes.roles, 'id', 'nombre');
});
export const dropListIndustria = createSelector(
  selectCatalogs,
  (state) => state.clientes.industria,
);
export const dropIndustriaForDropDownList = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(state.clientes.industria, 'id', 'nombre');
  },
);
export const dropListTipoDificultad = createSelector(
  selectCatalogs,
  (state) => state.clientes.contacto.tiposDificultad,
);
export const dropListTipoDecision = createSelector(
  selectCatalogs,
  (state) => state.clientes.contacto.tiposDecision,
);
export const dropListMantenimiento = createSelector(
  selectCatalogs,
  (state) => state.clientes.contacto.tiposMantenimiento,
);
export const dropListNivelPuesto = createSelector(
  selectCatalogs,
  (state) => state.clientes.contacto.tiposNivelPuesto,
);
export const getOptionDefaultListTipoDecision = createSelector(selectCatalogs, (state) =>
  flow([
    () =>
      filter(state.clientes.contacto.tiposDecision, (o) => {
        return deburr(isString(o.nombre) ? o.nombre.toLowerCase() : '') === 'ninguno';
      }),
    (option) => {
      return isArray(option) && option.length > 0 ? option[0].id : '';
    },
  ])(),
);
export const getOptionDefaultListNivelPuesto = createSelector(selectCatalogs, (state) =>
  flow([
    () =>
      filter(state.clientes.contacto.tiposNivelPuesto, (o) => {
        return deburr(isString(o.nombre) ? o.nombre.toLowerCase() : '') === 'ninguno';
      }),
    (option) => {
      return isArray(option) && option.length > 0 ? option[0].id : '';
    },
  ])(),
);
export const dropTiposDireccion = createSelector(
  selectCatalogs,
  (state) => state.tiposDireccion.listCatTiposDireccion,
);
export const tiposDireccionForDropDown = createSelector(selectCatalogs, (state: CatalogsState) => {
  return getArrayForDropDownList(
    state.tiposDireccion.listCatTiposDireccion,
    'IdCatTipoDireccion',
    'Tipo',
  );
});
export const dropListRutasEntrega = createSelector(
  selectCatalogs,
  (state) => state.rutasEntrega.listCatRutasEntrega,
);
export const dropListDestinos = createSelector(
  selectCatalogs,
  (state) => state.destinos.listCatDestino,
);
export const selectZoneCatalogList = createSelector(
  selectCatalogs,
  (state) => state.zonas.listCatZona,
);
export const selectCatPaisList = createSelector(
  selectCatalogs,
  (state: CatalogsState): Array<CatPais> => state.paises.listCatPais,
);
export const selectPaymentDataClient = createSelector(selectCatalogs, (state) => state.clientes);
export const selectPaymentData = createSelector(
  selectPaymentDataClient,
  (state) => state.datosPago,
);
export const dropListMoneda = createSelector(
  selectCatalogs,
  (state): Array<DropListOption> => {
    const data = filter(
      state?.catMoneda?.listCatMoneda,
      (o: CatMoneda) => o.Clave === 'mxn' || o.Clave === 'usd' || o.Clave === 'eur',
    );
    return map(data, (o: CatMoneda) => ({
      value: o.IdCatMoneda,
      label: o.Moneda,
    }));
  },
);
export const dropCondicionesPago = createSelector(
  selectCatalogs,
  (state) => state.clientes.datosPago.condicionesPago,
);

export const metodoCFDI = createSelector(
  selectCatalogs,
  (state) => state.clientes.datosPago.metodoPagoCFDI,
);
export const dropMetodoCFDI = createSelector(
  selectCatalogs,
  (state): Array<DropListOption> =>
    map(state.clientes.datosPago.metodoPagoCFDI, (o) => ({
      label: o.nombre,
      value: o.id,
    })),
);
export const dropTipoRevision = createSelector(
  selectCatalogs,
  (state): Array<DropListOption> =>
    map(state.clientes.datosPago.tipoRevision, (o) => ({
      label: o.nombre,
      value: o.id,
    })),
);
export const dropFormaPagos = createSelector(
  selectCatalogs,
  (state): Array<DropListOption> =>
    map(state.clientes.datosPago.formaPago, (o) => ({
      label: o.nombre,
      value: o.id,
      booleanValue: o.requiereNumeroDeCuenta,
    })),
);

export const dropEmpresas = createSelector(
  selectCatalogs,
  (state): Array<DropListOption> => {
    return map(state.clientes.datosPago.empresas, (o) => ({
      label: o.IdEmpresa,
      value: o.Alias,
    }));
  },
);
export const dropTemas = createSelector(
  selectCatalogs,
  (state) => state.clientes.datosPago.condicionesPago,
);
// export const saveCliente = createSelector(select)
export const selectProviders = createSelector(selectCatalogs, (state) => state.proveedores.data);
export const selectTotalProviders = createSelector(
  selectCatalogs,
  (state) => state.proveedores.totalProviders,
);
export const selectFamiliasProvider = createSelector(
  selectCatalogs,
  (state) => state.proveedores.familias,
);

export const selectVProvider = createSelector(
  selectCatalogs,
  (state) => state.vProveedores.listVproveedores,
);

// SEGMENTACION DE LA OFERTA
export const selectOfferCatalog = createSelector(selectCatalogs, (state) => state.oferta);
export const selectListAgentes = createSelector(
  selectCatalogs,
  (state) => state.oferta.honorariosAA.listAA,
);
export const selectListConceptosAA = createSelector(
  selectCatalogs,
  (state) => state.oferta.conceptosAA,
);
export const selectListUnidadTiempoForDropDown = createSelector(selectCatalogs, (state) => {
  return getArrayForDropDownList(
    state.oferta.unidadTiempo.listUnidadTiempo,
    'IdCatUnidadTiempo',
    'UnidadTiempo',
  );
});
export const selectListAgentesAAForDropDown = createSelector(selectCatalogs, (state) => {
  return getArrayForDropDownList(
    state.oferta.honorariosAA.listAA,
    'IdAgenteAduanal',
    'NombreComercial',
  );
});

export const selectListFilteredConceptosAA = createSelector(
  selectCatalogs,
  (state) => state.oferta.filteredConceptsAA,
);
export const selectListUnidadT = createSelector(
  selectCatalogs,
  (state) => state.oferta.unidadTiempo.listUnidadTiempo,
);
export const selectListProd = createSelector(selectCatalogs, (state) => state.oferta.lista);
/// Contactos
export const selectListContact = createSelector(
  selectCatalogs,
  (state) => state.clientes.listaContactos,
);
/// Lista Precios
export const selectPreciosLista = createSelector(
  selectCatalogs,
  (state) => state.oferta.listaPrecios,
);
export const selectvFamiliasCont = createSelector(
  selectCatalogs,
  (state) => state.proveedores.vFamilias,
);

//// Recuperar direcciones
export const selectGetAdress = createSelector(
  selectCatalogs,
  (state) => state.clientes.getAdress.getAdress,
);

export const selectDirectionType = createSelector(selectCatalogs, (state) => state.tiposDireccion);
// Id tipo direccion "Facturacion"
export const getIdAddreessTypeFacturacion = createSelector(selectCatalogs, (state) => {
  if (state.rutasEntrega.listCatRutasEntrega.length > 0) {
    const tipoDireccion = state.tiposDireccion.listCatTiposDireccion.filter(
      (item) => item.Tipo === 'Facturacion',
    )[0];
    if (tipoDireccion) {
      return tipoDireccion.IdCatTipoDireccion;
    }
  }
});
// Id tipo direccion "Principal"
export const getIdAddreessTypePrincipal = createSelector(selectCatalogs, (state) => {
  if (state.rutasEntrega.listCatRutasEntrega.length > 0) {
    const tipoDireccion = state.tiposDireccion.listCatTiposDireccion.filter(
      (item) => item.Tipo === 'Principal',
    )[0];
    if (tipoDireccion) {
      return tipoDireccion.IdCatTipoDireccion;
    }
  }
});
// Id tipo direccion "Entrega"
export const getIdAddreessTypeEntrega = createSelector(selectCatalogs, (state) => {
  if (state.rutasEntrega.listCatRutasEntrega.length > 0) {
    const tipoDireccion = state.tiposDireccion.listCatTiposDireccion.filter(
      (item) => item.Tipo === 'Entrega',
    )[0];
    if (tipoDireccion) {
      return tipoDireccion.IdCatTipoDireccion;
    }
  }
});
export const selectvCatRolProviderForDropList = createSelector(selectCatalogs, (state) =>
  getArrayForDropList(state.catRolProvider.listCatRolProvider, 'IdCatRolProveedor', 'Nombre'),
);
export const selectvCatRolProviderForDropDownList = createSelector(selectCatalogs, (state) =>
  getArrayForDropDownList(state.catRolProvider.listCatRolProvider, 'IdCatRolProveedor', 'Nombre'),
);
export const selectvCatAddressTypeForDropList = createSelector(selectCatalogs, (state) =>
  getArrayForDropDownList(
    state.tiposDireccion.listCatTiposDireccion,
    'IdCatTipoDireccion',
    'Descripcion',
  ),
);
export const selectvCatAddressTypeForDropDown = createSelector(selectCatalogs, (state) =>
  getArrayForDropDownList(
    state.tiposDireccion.listCatTiposDireccion,
    'IdCatTipoDireccion',
    'Descripcion',
  ),
);
export const selectvCatAddressTypeForDropDownList = createSelector(
  selectCatalogs,
  (state: CatalogsState) =>
    getArrayForDropDownList(
      state.tiposDireccion.listCatTiposDireccion,
      'IdCatTipoDireccion',
      'Tipo',
    ),
);
export const selectvCatRutaEntregaForDropList = createSelector(selectCatalogs, (state) =>
  getArrayForDropList(state.rutasEntrega.listCatRutasEntrega, 'IdCatRutaEntrega', 'RutaEntrega'),
);
export const selectListDeliveryRoutes = createSelector(
  selectCatalogs,
  (state: CatalogsState): CatRutaEntrega[] => state.rutasEntrega.listCatRutasEntrega,
);
export const selectvCatRutasEntregaForDropDownList = createSelector(
  selectListDeliveryRoutes,
  (deliveryRoutes: CatRutaEntrega[]) => {
    return getArrayForDropDownList(
      deliveryRoutes,
      'IdCatRutaEntrega',
      'RutaEntrega',
      null,
      null,
      null,
      'Clave',
    );
  },
);
export const selectvCatPaisForDropList = createSelector(selectCatalogs, (state) =>
  getArrayForDropList(state.paises.listCatPais, 'IdCatPais', 'NombreEspanol'),
);
export const selectCatPaisForDropDownList = createSelector(
  selectCatalogs,
  (state: CatalogsState): Array<DropListOption> =>
    getArrayForDropDownList(
      state.paises.listCatPais,
      'IdCatPais',
      'NombreEspanol',
      null,
      null,
      null,
      'Codigo',
    ),
);
export const selectCatPaisForDropDownListWithLabelKey = createSelector(
  selectCatalogs,
  (state: CatalogsState): Array<DropListOption> =>
    getArrayForDropDownList(
      state.paises.listCatPais,
      'IdCatPais',
      'NombreEspanol',
      null,
      null,
      null,
      'Codigo',
    ),
);
export const selectvCatZonaForDropList = createSelector(selectCatalogs, (state) =>
  getArrayForDropList(state.zonas.listCatZona, 'IdCatZona', 'Zona'),
);
export const selectvCatZonaForDropDownList = createSelector(
  selectCatalogs,
  (state: CatalogsState) => getArrayForDropDownList(state.zonas.listCatZona, 'IdCatZona', 'Zona'),
);
export const selectvCatDestinoForDropList = createSelector(selectCatalogs, (state) =>
  getArrayForDropList(state.destinos.listCatDestino, 'IdCatDestino', 'Destino'),
);
export const selectListCustomer = createSelector(
  selectCatalogs,
  (state) => state.catUser.listCatUser,
);
export const selectListCommercialLeader = createSelector(
  selectCatalogs,
  (state) => state.catCommercialLeader.listCatCommercialLeader,
);
export const selectListCoordinatorESAC = createSelector(
  selectCatalogs,
  (state) => state.catCoordinatorESAC.listCatCoordinatorESAC,
);
export const selectvCatCustomerForDropList = createSelector(
  selectCatalogs,
  (state): Array<DropListOption> =>
    getArrayForDropDownList(state.catUser.listCatUser, 'IdUsuario', 'UserName'),
);

export const selectvCatCustomerForDropDownList = createSelector(selectCatalogs, (state) =>
  getArrayForDropDownList(state.catUser.listCatUser, 'IdUsuario', 'UserName'),
);

export const selectvPayerCatCustomerForDropDownList = createSelector(selectCatalogs, (state) => {
  const payer = state.catUser.listCatUser.filter((item) => item.AnalistaDeCuentasPorPagar);
  return getArrayForDropDownList(payer, 'IdUsuario', 'NombreCompleto');
});

export const selectvBuyerCatCustomerForDropDownList = createSelector(selectCatalogs, (state) => {
  const buyer = state.catUser.listCatUser.filter((item) => item.GestorDeComprasEImportaciones);
  return getArrayForDropDownList(buyer, 'IdUsuario', 'NombreCompleto');
});

export const selectCatMoneda = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catMoneda?.listCatMoneda,
);
/*export const selectvCatMonedaForDropList = createSelector(
  selectCatalogs,
  (state: CatalogsState): Array<DropListOptionCustom> =>
    getArrayForDropList(state.catMoneda.listCatMoneda, 'IdCatMoneda', 'ClaveMoneda'),
);*/
export const selectvCatMonedaForDropDownList = createSelector(selectCatalogs, (state) =>
  getArrayForDropDownList(state.catMoneda.listCatMoneda, 'IdCatMoneda', 'ClaveMoneda'),
);
export const selectCatMonedaDropDropDown = createSelector(selectCatalogs, (state) =>
  getArrayForDropDownList(state.catMoneda.listCatMoneda, 'IdCatMoneda', 'ClaveMoneda'),
);
export const selectCatMonedaFacturationDropDropDown = createSelector(selectCatalogs, (state) =>
  getArrayForDropDownList(state.catMoneda.listCatMoneda, 'IdCatMoneda', 'Moneda'),
);
export const selectCatReasonRejectionForDropDown = createSelector(selectCatalogs, (state) =>
  getArrayForDropDownList(
    state.catReasonRejection.listCatReasonRejection,
    'IdAjOfRazonRechazo',
    'RazonRechazo',
  ),
);
export const selectCatPaymentConditionsForDropDown = createSelector(
  selectCatalogs,
  (state): Array<DropListOption> =>
    map(
      state.catPaymentConditions.listCatPaymentConditions,
      (o: CatCondicionesDePago): DropListOption => ({
        label: o.CondicionesDePago,
        labelKey: o.Clave,
        sinCredito: o.SinCredito,
        value: o.IdCatCondicionesDePago,
      }),
    ),
);
export const selectCatFreightForDropDown = createSelector(selectCatalogs, (state) =>
  getArrayForDropDownList(state.catFreight.listCatFreight, 'IdCatFletera', 'Fletera'),
);
export const selectCatMedioDePagoForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) =>
    getArrayForDropDownList(
      state.catMedioDePago.listCatMedioDePago,
      'IdCatMedioDePago',
      'MedioDePago',
      null,
      null,
      null,
      'Clave',
    ),
);
export const selectCatPaymentConditionById = (id: string) =>
  createSelector(selectCatalogs, (state) =>
    id
      ? flow(
          () =>
            !isEmpty(state.catPaymentConditions.listCatPaymentConditions)
              ? filter(
                  state.catPaymentConditions.listCatPaymentConditions,
                  (o: CatCondicionesDePago) => o.IdCatCondicionesDePago === id,
                )
              : [],
          (payment) =>
            !isEmpty(payment) ? payment[0].CondicionesDePago : ({} as CatCondicionesDePago),
        )()
      : 'N/D',
  );
export const selectvCatTipoValidacionForDropList = createSelector(selectCatalogs, (state) =>
  getArrayForDropList(
    state.catTipoValidacion.listCatTipoValidacion,
    'IdCatTipoValidacion',
    'TipoValidacion',
  ),
);
export const selectCatDestinoForDropList = createSelector(
  selectCatalogs,
  (state): Array<DropListOption> =>
    getArrayForDropDownList(
      state.destinos.listCatDestino,
      'IdCatDestino',
      'Destino',
      '',
      '',
      '',
      'Clave',
    ),
);
export const selectCatBrokerClienteForDropList = createSelector(
  selectCatalogs,
  (state): Array<DropListOption> =>
    getArrayForDropDownList(
      state.catBrokerCliente.listCatBrokerCliente,
      'IdCatBrokerCliente',
      'RazonSocial',
      '',
      '',
      'RFC',
    ),
);
export const selectCatBancoForDropList = createSelector(
  selectCatalogs,
  (state): Array<DropListOption> =>
    getArrayForDropDownList(state.catBanco.listCatBanco, 'IdCatBanco', 'Banco'),
);
export const selectTipoTelefono = createSelector(
  selectCatalogs,
  (state): Array<CatTipoNumeroTelefonico> => state.catTipoTelefono.listCatTipoTelefono,
);
export const selectTypePhone1 = createSelector(
  selectTipoTelefono,
  (state: Array<CatTipoNumeroTelefonico>) =>
    !isEmpty(state)
      ? find(state, (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === 'Telefono 1')
      : null,
);
export const selectTypePhone2 = createSelector(
  selectTipoTelefono,
  (state: Array<CatTipoNumeroTelefonico>) =>
    !isEmpty(state)
      ? find(state, (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === 'Telefono 2')
      : null,
);
export const selectTypeMobile = createSelector(
  selectTipoTelefono,
  (state: Array<CatTipoNumeroTelefonico>) =>
    !isEmpty(state)
      ? find(state, (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === 'Móvil')
      : null,
);
export const selectvEmpresas = createSelector(
  selectCatalogs,
  (state) => state.empresas.listEmpresas,
);
export const selectvEmpresasForDropDown = createSelector(selectCatalogs, (state: CatalogsState) => {
  return getArrayForDropDownList(state.empresas.listEmpresas, 'IdEmpresa', 'Alias');
});

export const selectCatNivelIngreso = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catNivelIngreso.listCatNivelIngreso,
);
export const selectvCatSectorForDropList = createSelector(selectCatalogs, (state) =>
  getArrayForDropList(state.catSector.listCatSector, 'IdCatSector', 'Sector'),
);
export const selectCatSectorForDropDown = createSelector(selectCatalogs, (state: CatalogsState) => {
  return getArrayForDropDownList(
    state.catSector.listCatSector,
    'IdCatSector',
    'Sector',
    null,
    null,
    null,
    'Clave',
  );
});
export const selectvCatIndustriaForIdSector = createSelector(selectCatalogs, (state, props) =>
  getFilteredIndustria(props.idSector, state.catIndustria.listCatIndustria),
);
export const selecCatIndustriaForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState): Array<DropListOption> => {
    return getArrayForDropDownList(
      state.catIndustria.listCatIndustria,
      'IdCatIndustria',
      'Industria',
    );
  },
);
export const needsToReloadCatRolProvider = createSelector(
  selectCatalogs,
  (state) => state.catRolProvider.needsToReload,
);
export const needsToReloadCatTipoDireccion = createSelector(
  selectCatalogs,
  (state) => state.tiposDireccion.needsToReload,
);
export const needsToReloadCatRutaEntrega = createSelector(
  selectCatalogs,
  (state) => state.rutasEntrega.needsToReload,
);
export const needsToReloadCatNivelIngreso = createSelector(
  selectCatalogs,
  (state) => state.catNivelIngreso.needsToReload,
);
export const needsToReloadCatDificultad = createSelector(
  selectCatalogs,
  (state) => state.catDificultadDatosPersona.needsToReload,
);
export const needsToReloadCatNivelDecision = createSelector(
  selectCatalogs,
  (state) => state.catNivelDecisionDatosPersona.needsToReload,
);
export const needsToReloadCatMantenimiento = createSelector(
  selectCatalogs,
  (state) => state.catMantenimientoDatosPersona.needsToReload,
);
export const needsToReloadCatNivelPuesto = createSelector(
  selectCatalogs,
  (state) => state.catNivelPuestoDatosPersona.needsToReload,
);
export const needsToReloadCatPais = createSelector(
  selectCatalogs,
  (state) => state.paises.needsToReload,
);
export const needsToReloadCatRolDestino = createSelector(
  selectCatalogs,
  (state) => state.destinos.needsToReload,
);
export const needsToReloadCatBrokerCliente = createSelector(
  selectCatalogs,
  (state) => state.catBrokerCliente.needsToReload,
);
export const needsToReloadCatBanco = createSelector(
  selectCatalogs,
  (state) => state.catBanco.needsToReload,
);
export const needsToReloadCatUser = createSelector(
  selectCatalogs,
  (state) => state.catUser.needsToReload,
);
export const needsToReloadCommercialLeader = createSelector(
  selectCatalogs,
  (state) => state.catCommercialLeader.needsToReload,
);
export const needsToReloadCoordinatorESAC = createSelector(
  selectCatalogs,
  (state) => state.catCoordinatorESAC.needsToReload,
);
export const needsToReloadCatMoneda = createSelector(
  selectCatalogs,
  (state) => state.catMoneda.needsToReload,
);
export const needsToReloadCatReasonRejection = createSelector(
  selectCatalogs,
  (state) => state.catReasonRejection.needsToReload,
);
export const needsToReloadCatPaymentConditions = createSelector(
  selectCatalogs,
  (state) => state.catPaymentConditions.needsToReload,
);
export const needsToReloadCatFreight = createSelector(
  selectCatalogs,
  (state) => state.catFreight.needsToReload,
);
export const needsToReloadCatMedioDePago = createSelector(
  selectCatalogs,
  (state) => state.catMedioDePago.needsToReload,
);
export const needsToReloadCatTipoValidacion = createSelector(
  selectCatalogs,
  (state) => state.catTipoValidacion.needsToReload,
);
export const needsToReloadCatZona = createSelector(
  selectCatalogs,
  (state) => state.zonas.needsToReload,
);
export const needsToReloadCatSector = createSelector(
  selectCatalogs,
  (state) => state.catSector.needsToReload,
);
export const needsToReloadCatIndustria = createSelector(
  selectCatalogs,
  (state) => state.catIndustria.needsToReload,
);
export const needsToReloadCatFamilias = createSelector(
  selectCatalogs,
  (state) => state.catVFamilias.needsToReload,
);
export const needsToReloadCatUnidadTiempo = createSelector(
  selectCatalogs,
  (state) => state.catUnidadTiempo.needsToReload,
);
export const selectCatUnidadTiempoList = createSelector(
  selectCatalogs,
  (state) => state.catUnidadTiempo.listCatUnidadTiempo,
);
export const selectCatUnidadTiempoForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catUnidadTiempo.listCatUnidadTiempo,
      'IdCatUnidadTiempo',
      'UnidadTiempo',
    );
  },
);
export const catUnidadTiempo = createSelector(selectCatalogs, (state) =>
  state.catUnidadTiempo.listCatUnidadTiempo?.map((item) => ({
    id: item.IdCatUnidadTiempo,
    nombre: item.UnidadTiempo,
  })),
);
export const selectCatUnidadTiempo = createSelector(selectCatalogs, (state) =>
  map(state.catUnidadTiempo.listCatUnidadTiempo, (o: CatUnidadTiempo) => ({
    value: o.IdCatUnidadTiempo,
    label: o.UnidadTiempo,
  })),
);

export const needsToReloadCatTipoTelefono = createSelector(
  selectCatalogs,
  (state) => state.catTipoTelefono.needsToReload,
);
export const needsToReloadCatEstadoCotizacion = createSelector(
  selectCatalogs,
  (state) => state.catEstadoCotizacion.needsToReload,
);
export const selectCatEstadoCotizacion = createSelector(
  selectCatalogs,
  (state) => state.catEstadoCotizacion.listCatEstadoCotizacion,
);

export const needsToReloadCatTipoCotizacion = createSelector(
  selectCatalogs,
  (state) => state.catTipoCotizacion.needsToReload,
);
export const selectCatTipoCotizacion = createSelector(
  selectCatalogs,
  (state) => state.catTipoCotizacion.listCatTipoCotizacion,
);
export const needsToReloadCatTipoPartidaCotizacion = createSelector(
  selectCatalogs,
  (state) => state.catTipoPartidaCotizacion.needsToReload,
);
export const needsToReloadCatUsoCFDI = createSelector(
  selectCatalogs,
  (state) => state.catUsoCFDI.needsToReload,
);
export const needsToReloadCatMetodoDePagoCFDI = createSelector(
  selectCatalogs,
  (state) => state.catMetodoDePagoCFDI.needsToReload,
);
export const needsToReloadEmpresas = createSelector(
  selectCatalogs,
  (state) => state.empresas.needsToReload,
);
export const getCatBrands = createSelector(selectCatalogs, (state) => state.marcas);
export const getListBrands = createSelector(selectCatalogs, (state) => state.marcas.listMarcas);
export const getCatUnit = createSelector(selectCatalogs, (state: CatalogsState) => state?.unidad);
export const getCatUnitList = createSelector(
  selectCatalogs,
  (state: CatalogsState): Array<DropListOption> => state.unidad.listUnidad,
);
export const getCatTypeProduct = createSelector(selectCatalogs, (state) => state.tipoProducto);
export const getListCatTypeProduct = createSelector(
  selectCatalogs,
  (state: CatalogsState): Array<DropListOption> => state?.tipoProducto?.listTipoProducto,
);
export const getCatLinesProducts = createSelector(selectCatalogs, (state) => state.linesProducts);
export const getListCatLinesProducts = createSelector(
  selectCatalogs,
  (state) => state.linesProducts.listLinesProducts,
);
export const selectCatTipoPartidaCotizacion = createSelector(
  selectCatalogs,
  (state) => state.catTipoPartidaCotizacion.listCatTipoPartidaCotizacion,
);
export const selectUsoCFDI = createSelector(
  selectCatalogs,
  (state) => state.catUsoCFDI.listCatUsoCFDI,
);
export const selectMetodoDePagoCFDI = createSelector(
  selectCatalogs,
  (state) => state.catMetodoDePagoCFDI.listCatMetodoDePagoCFDI,
);
export const getIdTypeQuoted = (type: string) =>
  createSelector(selectCatEstadoCotizacion, (state: Array<CatEstadoCotizacion>) => {
    const index = findIndex(state, (o) => o.EstadoCotizacion.toLowerCase() === type.toLowerCase());
    if (index >= 0) {
      return state[index].IdCatEstadoCotizacion;
    } else {
      return null;
    }
  });
export const dropUsoCFDI = createSelector(
  selectCatalogs,
  (state): Array<DropListOption> =>
    map(state.clientes.datosPago.catUsoCFDI, (o) => ({
      label: o.nombre,
      value: o.id,
    })),
);
/*export const getCatVFamiliasForTypeEstandaresBiologico = createSelector(
  selectCatalogs,
  (state) =>
    state.catVFamilias.listCatVFamilias?.filter(
      (item) => item.Tipo === 'Estandares' && item.Subtipo === 'Biológico',
    ),
);
export const getCatVFamiliasForTypeReactivosQuimico = createSelector(
  selectCatalogs,
  (state) =>
    state.catVFamilias.listCatVFamilias?.filter(
      (item) => item.Tipo === 'Reactivos' && item.Subtipo === 'Químico',
    ),
);
export const getCatVFamiliasForTypeReacvtivosBiologico = createSelector(
  selectCatalogs,
  (state) =>
    state.catVFamilias.listCatVFamilias?.filter(
      (item) => item.Tipo === 'Reactivos' && item.Subtipo === 'Biológico',
    ),
);*/
export const selectNeedToReloadProcess = createSelector(
  selectCatalogs,
  (state) => state.catProcess.needsToReload,
);
export const selectListCatProcess = createSelector(
  selectCatalogs,
  (state) => state.catProcess.listCatProcess,
);
export const selectNeedToReloadPriority = createSelector(
  selectCatalogs,
  (state) => state.catPriority.needsToReload,
);
export const selectListPriority = createSelector(
  selectCatalogs,
  (state) => state.catPriority.listPriority,
);
export const selectNeedToReloadReviews = createSelector(
  selectCatalogs,
  (state) => state.catReviews.needsToReload,
);
export const selectNeedToReloadAgenteAduanal = createSelector(
  selectCatalogs,
  (state) => state.AgenteAduanal.needsToReload,
);
export const selectNeedToReloadCatIncoterm = createSelector(
  selectCatalogs,
  (state) => state.catIncoterm.needsToReload,
);
export const selectNeedToReloadAduana = createSelector(
  selectCatalogs,
  (state) => state.Aduana.needsToReload,
);
export const selectNeedToReloadConceptoAgenteAduanal = createSelector(
  selectCatalogs,
  (state) => state.ConceptoAgenteAduanal.needsToReload,
);
export const selectListReviews = createSelector(
  selectCatalogs,
  (state) => state.catReviews.listReviews,
);
export const selectListAgenteAduanal = createSelector(
  selectCatalogs,
  (state) => state.AgenteAduanal.listAgenteAduanal,
);
export const selectListIncoterm = createSelector(
  selectCatalogs,
  (state) => state.catIncoterm.listIncoterm,
);
export const selectListAduana = createSelector(selectCatalogs, (state) => state.Aduana.listAduana);
export const selectListConceptoAgenteAduanal = createSelector(
  selectCatalogs,
  (state: CatalogsState): Array<ConceptoAgenteAduanal> =>
    state.ConceptoAgenteAduanal.listConceptoAgenteAduanal,
);
const getFilteredIndustria = (idSector: string, listCatIndustria: CatIndustria[]) => {
  /* FIXME: Corregir cuando se trabaje la sección de Oferta*/
  // return listCatIndustria.filter((item) => item.IdCatSector === idSector);
  return listCatIndustria;
};

export const selectNeedToReloadCatVehicleBrand = createSelector(
  selectCatalogs,
  (state) => state.catVehicleType.needsToReload,
);

export const selectNeedToReloadCatVehicleType = createSelector(
  selectCatalogs,
  (state) => state.catVehicleBrand.needsToReload,
);
export const selectListVehicleTypeForDropDown = createSelector(selectCatalogs, (state) => {
  return getArrayForDropDownList(
    state.catVehicleType.listVehicleType,
    'IdCatTipoVehiculo',
    'TipoVehiculo',
  );
});
export const selectListVehicleBrandForDropDown = createSelector(selectCatalogs, (state) => {
  return getArrayForDropDownList(
    state.catVehicleBrand.listVehicleBrand,
    'IdCatMarcaVehiculo',
    'MarcaVehiculo',
  );
});
export const selectListCatDifficultyForDropDown = createSelector(selectCatalogs, (state) => {
  return getArrayForDropDownList(
    state.catDificultadDatosPersona.listDificultadDatosPersona,
    'IdCatDificultadDatosPersona',
    'Dificultad',
  );
});
export const selectListCatDecisionLevelForDropDown = createSelector(selectCatalogs, (state) => {
  return getArrayForDropDownList(
    state.catNivelDecisionDatosPersona.listNivelDecisionDatosPersona,
    'IdCatNivelDecisionDatosPersona',
    'NivelDecision',
  );
});
export const selectListCatMaintenanceForDropDown = createSelector(selectCatalogs, (state) => {
  return getArrayForDropDownList(
    state.catMantenimientoDatosPersona.listMantenimientoDatosPersona,
    'IdCatMantenimientoDatosPersona',
    'Mantenimiento',
  );
});
export const selectListCatJobLevelForDropDown = createSelector(selectCatalogs, (state) => {
  return getArrayForDropDownList(
    state.catNivelPuestoDatosPersona.listNivelPuestoDatosPersona,
    'IdCatNivelPuestoDatosPersona',
    'NivelPuesto',
  );
});
export const selectListCatJobLevel = createSelector(
  selectCatalogs,
  (state): Array<CatNivelDecisionDatosPersona> =>
    state.catNivelDecisionDatosPersona.listNivelDecisionDatosPersona,
);
export const selectListCatSellers = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catVendedores,
);
export const selectListTipoSociedadMercantil = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catTipoSociedadMercantil,
);
export const selectListRegimenFiscal = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catRegimenFiscal,
);

export const selectListThemesComments = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catThemesComments,
);

export const selectListThemesCommentsForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catThemesComments.listThemesComments,
      'IdCatTemaComentario',
      'Tema',
    );
  },
);
export const selectListAvailability = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catAvailability,
);

export const selectListAvailabilityForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catAvailability.listAvailability,
      'IdCatDisponibilidad',
      'Disponibilidades',
      '',
      '',
      '',
      'Clave',
    );
  },
);

export const selectListFamilyLine = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catFamilyLine,
);

export const selectListTradeMark = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catTrademark,
);

export const selectListTradeMarkFilters = createSelector(
  selectCatalogs,
  (state: CatalogsState) => ({
    ...queryInfoWithActiveFilter(),
    SortField: 'Nombre',
    SortDirection: 'asc',
  }),
);

export const selectListMercantileSocietyForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catTipoSociedadMercantil.listTipoSociedadMercantil,
      'IdCatTipoSociedadMercantil',
      'TipoSociedadMerdantil',
    );
  },
);
export const selectListRegimenFiscalForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catRegimenFiscal.listRegimenFiscal,
      'IdCatRegimenFiscal',
      'RegimenFiscal',
    );
  },
);
export const selectCatRolClients = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catRolClientes,
);
export const selectCatRolClientsForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catRolClientes.listRolClientes,
      'IdCatRolCliente',
      'Nombre',
    );
  },
);
export const selectCatImportancesClients = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catImportanciasCliente,
);
export const selectImportancesclientsForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catImportanciasCliente.listImportanciasCliente,
      'IdCatImportanciaCliente',
      'Importancia',
    );
  },
);

export const selectPaymentConditionsForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState): Array<DropListOption> =>
    map(
      state.catPaymentConditions.listCatPaymentConditions,
      (o: CatCondicionesDePago): DropListOption => ({
        label: o.CondicionesDePago,
        labelKey: o.Clave,
        sinCredito: o.SinCredito,
        value: o.IdCatCondicionesDePago,
      }),
    ),
);

export const selectCustomsAgentsListForDropDown = createSelector(
  selectListAgenteAduanal,
  (state: Array<AgenteAduanal>): Array<DropListOption> =>
    getArrayForDropDownList(state, 'IdAgenteAduanal', 'NombreComercial'),
);
export const selectCustomsAgentsListForDropDownPqf = createSelector(
  selectListAgenteAduanal,
  (state: Array<AgenteAduanal>): DropListOptionsPqf => {
    return getArrayForDropListOptionsPqf(state, 'IdAgenteAduanal', 'NombreComercial');
  },
);

export const selectCustomsListForDropDown = createSelector(
  selectListAduana,
  (state: Array<Aduana>): Array<DropListOption> =>
    getArrayForDropDownList(state, 'IdAduana', 'NombreLugar'),
);
export const selectCustomsListForDropDownPqf = createSelector(
  selectListAduana,
  (state: Array<Aduana>): DropListOptionsPqf => {
    return getArrayForDropListOptionsPqf(state, 'IdAduana', 'NombreLugar');
  },
);
export const selectPaymentFormForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.clientes.datosPago.formaPago,
      'IdCatMedioDePago',
      'MedioDePago',
    );
  },
);
export const selectCatUsoCFDISelectedForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(state.catUsoCFDI.listCatUsoCFDI, 'IdCatUsoCFDI', 'Uso');
  },
);
export const selectCatMetodoDePagoCFDISelectedForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catMetodoDePagoCFDI.listCatMetodoDePagoCFDI,
      'IdCatMetodoDePagoCFDI',
      'MetodoDePagoCFDI',
    );
  },
);
export const selectCatRevisionSelectedForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(state.catReviews.listReviews, 'IdCatRevision', 'ClaveRevision');
  },
);
export const selectCustomsAgentsConceptListForDrop = createSelector(
  selectListConceptoAgenteAduanal,
  (state: Array<ConceptoAgenteAduanal>): Array<DropListOption> =>
    getArrayForDropDownList(state, 'IdConceptoAgenteAduanal', 'Concepto'),
);

export const selectCustomsAgentsConceptListForDropPqf = createSelector(
  selectListConceptoAgenteAduanal,
  (state: Array<ConceptoAgenteAduanal>): DropListOptionsPqf => {
    return getArrayForDropListOptionsPqf(state, 'IdConceptoAgenteAduanal', 'Concepto');
  },
);
export const selectCatBillingRestrictionForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catBillingRestriction.listBillingRestriction,
      'IdCatRestriccionDeCompra',
      'RestriccionDeCompra',
      null,
      null,
      null,
      'Clave',
    );
  },
);
export const selectCatBillingRestrictionForDropDownPqf = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropListOptionsPqf(
      state.catBillingRestriction.listBillingRestriction,
      'IdCatRestriccionDeCompra',
      'RestriccionDeCompra',
    );
  },
);
export const selectCatBillingRestriction = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catBillingRestriction,
);
export const selectCatClassificationsForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catClassifications.listClassifications,
      'IdCatClasificacionInformativaProducto',
      'Clasificacion',
    );
  },
);
export const selectCatClassifications = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catClassifications,
);
export const selectCatPhysicalStateForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catPhysicalState.listPhysicalStates,
      'IdCatEstadoFisico',
      'EstadoFisico',
    );
  },
);
export const selectCatPhysicalState = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catPhysicalState,
);
export const selectCatUseForDropDown = createSelector(selectCatalogs, (state: CatalogsState) => {
  return getArrayForDropDownList(state.catUse.listUses, 'IdCatUso', 'Uso');
});
export const selectCatUse = createSelector(selectCatalogs, (state: CatalogsState) => state.catUse);
export const selectCatInternationalDepositaryForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catInternationalDepositary.listInternationalDepositary,
      'IdCatDepositarioInternacional',
      'DepositarioInternacional',
    );
  },
);
export const selectCatInternationalDepositary = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catInternationalDepositary,
);
export const selectCatPresentationTypeForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catPresentationType.listPresentationTypes,
      'IdCatTipoPresentacion',
      'TipoPresentacion',
    );
  },
);
export const selectCatPresentationType = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catPresentationType,
);
export const selectCatTransportationWayForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catTransportationWay.listTransportationsWay,
      'IdCatMedioTransporte',
      'MedioTransporte',
    );
  },
);
export const selectCatTransportationWay = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catTransportationWay,
);
export const selectCatTransportationManagmentForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catTransportationManagement.listTransportationManagement,
      'IdCatManejo',
      'Manejo',
    );
  },
);
export const selectCatTransportationManagment = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catTransportationManagement,
);

export const selectCatPublicationsFormatForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catPublicationsFormat.listPublicationsFormat,
      'IdCatFormatoPublicacion',
      'FormatoPublicacion',
    );
  },
);
export const selectCatPublicationsFormat = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catPublicationsFormat,
);

export const selectCatUnitForDropDown = createSelector(selectCatalogs, (state: CatalogsState) => {
  return getArrayForDropDownList(state.catUnit.listUnits, 'IdCatUnidad', 'Unidad');
});
export const selectCatUnit = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catUnit,
);

export const selectCatApplication = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catApplication,
);

export const selectCatApplicationForDropDown = createSelector(
  selectCatalogs,
  (state: CatalogsState) => {
    return getArrayForDropDownList(
      state.catApplication.listApplications,
      'IdCatAplicacion',
      'Aplicacion',
    );
  },
);
export const selectCatProductInvestigationFollow = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catProductInvestigationFollow,
);
export const selectCatProductInvestigationFollowList = createSelector(
  selectCatProductInvestigationFollow,
  (state) => state.listProductInvestigationFollow,
);
export const selectCatRestriccionesFletes = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catRestriccionesFlete,
);
export const selectNeedsToReloadCatRestriccionesFletes = createSelector(
  selectCatRestriccionesFletes,
  (state) => state.needsToReload,
);
export const selectRestriccionesFleteForDropDown = createSelector(
  selectCatRestriccionesFletes,
  (state): Array<DropListOption> => {
    return getArrayForDropDownList(
      state.listRestriccionesFlete,
      'IdCatRestriccionFlete',
      'Descripcion',
    );
  },
);
export const selectCatClasificacionRegultoria = createSelector(
  selectCatalogsState,
  (state: CatalogsState) => state.catClasificacionRegulatoria,
);
export const selectNeedsToReloadCatClasificacionRegulatoria = createSelector(
  selectCatClasificacionRegultoria,
  (state) => state.needsToReload,
);
export const selectCatClasificacionRegulatoriaList = createSelector(
  selectCatClasificacionRegultoria,
  (state) => state.listCatClasificacionRegulatoria,
);
export const selectCatClasificacionRegulatoriaForDropDrown = createSelector(
  selectCatClasificacionRegulatoriaList,
  (state): Array<DropListOption> =>
    getArrayForDropDownList(state, 'IdCatClasificacionRegulatoria', 'Descripcion'),
);
export const selectCatBroadCastMedia = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catMedioDeDifusion,
);
export const selectCatTipoCampana = createSelector(
  selectCatalogsState,
  (state) => state.catCampaignType,
);
export const selectCatTipoCampanaForDropDown = createSelector(selectCatTipoCampana, (state) => {
  return getArrayForDropDownList(state.listCampaigns, 'IdCatTipoCampana', 'TipoCampana');
});
export const selectDispatchPlace = createSelector(
  selectCatalogs,
  (state) => state.catLugarDespacho,
);
export const selectDispatchPlaceForDropDown = createSelector(selectDispatchPlace, (state) => {
  return getArrayForDropDownList(state.listCatDispatchPlace, 'IdCatLugarDespacho', 'LugarDespacho');
});
export const selectCatalogCardMark = createSelector(selectCatalogs, (state: CatalogsState) => {
  return state?.catMarcaTarjeta;
});
export const selectCatalogCardMarkList = createSelector(selectCatalogCardMark, (state) => {
  return state.listCatCardMark;
});
export const selectCatCountriesForDropList = createSelector(
  selectCatalogs,
  (state: CatalogsState) =>
    getArrayForDropDownList(state.paises.listCatPais, 'IdCatPais', 'NombreEspanol'),
);
export const selectCountryListForDropListPqf = createSelector(
  selectCatPaisList,
  (cat): DropListOptionsPqf => {
    return getArrayForDropListOptionsPqf(cat, 'IdCatPais', 'NombreEspanol');
  },
);
export const selectCatAuthorizationTypes = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catTiposAutorizacion,
);
export const selectNeedsToReloadCatAuthorizationTypes = createSelector(
  selectCatAuthorizationTypes,
  (catAuthorizationTypes): boolean => catAuthorizationTypes.needsToReload,
);
export const selectListAuthorizationTypes = createSelector(
  selectCatAuthorizationTypes,
  (catAuthorization): Array<CatTipoAutorizacion> => catAuthorization.listAuthorizationTypes,
);
export const selectCatLegalRepresentatives = createSelector(
  selectCatalogs,
  (state: CatalogsState) => state.catLegalRepresentatives,
);
export const selectNeedsToReloadCatLegalRepresentatives = createSelector(
  selectCatLegalRepresentatives,
  (catLegalRepresentatives): boolean => catLegalRepresentatives.needsToReload,
);
