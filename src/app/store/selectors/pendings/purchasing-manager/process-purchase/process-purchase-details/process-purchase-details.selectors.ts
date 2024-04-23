/* Core Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectProcessPurchaseDetails} from '@appSelectors/pendings/purchasing-manager/process-purchase/process-purchase.selectors';

/* Models Imports */
import {
  IFamily,
  IProcessPurchaseDetails,
  IProducts,
} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-details/process-purchase-details.models';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.models';
import {Empresa, TramitarCompraElaborar} from 'api-logistica';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';

/* Tools Imports */
import {find, findIndex, forEach, isEmpty} from 'lodash-es';

import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';
import {getOnlyFileName, getOnlyFileNameWithOutExtension} from '@appUtil/files';

export const selectDetails = createSelector(
  selectProcessPurchaseDetails,
  (state: IProcessPurchaseDetails) => state,
);
export const selectContactsProviders = createSelector(
  selectProcessPurchaseDetails,
  (state: IProcessPurchaseDetails) => state.providerContacts,
);
export const selectContactsProvidersDropList = createSelector(
  selectContactsProviders,
  (contacts: Array<ContactoDetalleProvObj>): Array<DropListOption> =>
    !isEmpty(contacts)
      ? contacts.map((item: ContactoDetalleProvObj) => {
          return {
            value: item.IdContactoProveedor,
            label: item.Nombres + ' ' + item.ApellidoPaterno + ' ' + item.ApellidoMaterno,
          };
        })
      : [],
);
export const selectProvider = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) => state.provider,
);
export const selectedDropListProviderContact = createSelector(
  [selectProcessPurchaseDetails],
  (state: IProcessPurchaseDetails) => state.selectedProviderContact,
);

export const selectedProviderContact = createSelector(
  [selectContactsProviders, selectProvider, selectedDropListProviderContact],
  (
    contactList: Array<ContactoDetalleProvObj>,
    provider: IProvider,
    selectedContact: DropListOption,
  ): IProviderContact => {
    const selectedFilteredContact: ContactoDetalleProvObj = find(
      contactList,
      (o: ContactoDetalleProvObj) => o.IdContactoProveedor === selectedContact.value,
    );
    return selectedFilteredContact
      ? {
          fullName:
            selectedFilteredContact?.Nombres +
            ' ' +
            selectedFilteredContact?.ApellidoPaterno +
            ' ' +
            selectedFilteredContact?.ApellidoMaterno,
          providerName: provider?.Nombre,
          Mail: selectedFilteredContact?.Mail,
          NumeroTelefonico: selectedFilteredContact?.NumeroTelefonico,
          Departamento: selectedFilteredContact?.Departamento,
          Puesto: selectedFilteredContact?.Puesto,
          NivelDecision: selectedFilteredContact?.NivelDecision,
          IdContactoProveedor: selectedFilteredContact?.IdContactoProveedor,
        }
      : null;
  },
);
export const selectPopUpMail = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) => state.popUpSendMail,
);
export const selectPurchaseOrderPdfFileName = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) => getOnlyFileName(state.pdfData?.FileKey),
);
export const selectPurchaseOrderSubject = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) =>
    `Orden de Compra #${getOnlyFileNameWithOutExtension(state.pdfData?.FileKey)}`,
);
export const selectPurchaseOrderIdFile = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) => state.pdfData.IdArchivo,
);
export const selectIdPurchaseOrder = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) => state.idPurchaseOrder,
);
export const selectIdProvider = createSelector(
  selectProvider,
  (provider: IProvider) => provider.IdProveedor,
);
export const selectNeedsToReloadContacts = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) => state.needsToReloadContacts,
);
// FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
/*export const selectCardOptions = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) => {
    const options: Array<ICard> = [];
    _.forEach(state.families, (o: IFamily, index: number) => {
      options.push({
        active: o.isSelected,
        value: o.IdProveedorFamilia,
        labels: [
          {label: ''},
          {label: o.Tipo},
          {label: o.Subtipo},
          {label: o.Control},
        ],
      });
    });
    return options;
  },
);*/
export const selectTotalFamilies = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) => state.totalFamilies,
);
export const selectNameProvider = createSelector(
  selectProvider,
  (provider: IProvider) => provider.Nombre,
);
export const selectGeneralDataIsLoading = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) =>
    state.generalDataStatus === API_REQUEST_STATUS_LOADING ||
    state.generalDataStatus === API_REQUEST_STATUS_DEFAULT,
);
export const selectCompaniesOfBuys = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) => state.provider,
);
export const selectGeneralData = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) => state.generalData,
);
export const selectCompanyThatBuysOptions = createSelector(
  selectGeneralData,
  (generalData: TramitarCompraElaborar) => {
    const options: Array<DropListOption> = [];
    forEach(generalData.EmpresasCompra, (company: Empresa) => {
      let newOption: DropListOption;
      newOption = {
        value: company.IdEmpresa,
        label: `${company.Prefijo} · ${company.RazonSocial}`,
        labelColor: '#008894',
        subtitle: `RFC: ${company.RFC}`,
      };
      options.push(newOption);
    });
    return options;
  },
);
export const selectCompanyBuysSelected = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) =>
    !state.companyBuysSelected
      ? {value: DEFAULT_UUID, label: 'Seleccionar'}
      : state.companyBuysSelected,
);
export const selectShippingCompanyOptions = createSelector(
  selectGeneralData,
  (generalData: TramitarCompraElaborar) => {
    const options: Array<DropListOption> = [];
    forEach(generalData.EmpresasEmbargue, (company: Empresa) => {
      let newOption: DropListOption;
      newOption = {
        value: company.IdEmpresa,
        label: `${company.Prefijo} · ${company.RazonSocial}`,
        labelColor: '#008894',
        subtitle: `RFC: ${company.RFC}`,
      };
      options.push(newOption);
    });
    return options;
  },
);
export const selectShippingCompanySelected = createSelector(
  selectDetails,
  (state: IProcessPurchaseDetails) =>
    !state.shippingCompanySelected
      ? {value: DEFAULT_UUID, label: 'Seleccionar'}
      : state.shippingCompanySelected,
);

export const selectCurrentFamily = createSelector(selectDetails, (state: IProcessPurchaseDetails) =>
  findIndex(state.families, (family) => family.isSelected) !== -1
    ? find(state.families, (family) => family.isSelected)
    : {
        Control: '',
        IdCatControl: '',
        IdCatIndustria: '',
        IdCatSubtipoProducto: '',
        IdCatTipoProducto: '',
        IdFamilia: '',
        IdProveedor: '',
        IdProveedorFamilia: '',
        Industria: '',
        Productos: 0,
        Subtipo: '',
        Tipo: '',
        isSelected: false,
        products: [],
        totalProducts: 0,
        needsToReloadProducts: false,
        productsStatus: API_REQUEST_STATUS_FAILED,
        desiredPage: 0,
        isLoadingMoreProducts: false,
        tabOptions: [
          {
            id: 1,
            label: 'Todas',
            activeSubtitle: true,
            labelSubtitle: 'Pzas',
            totalSubtitle: 0,
          },
          {
            id: 2,
            label: 'Regulares',
            activeSubtitle: true,
            labelSubtitle: 'Pzas',
            totalSubtitle: 0,
          },
          {
            id: 3,
            label: 'Programadas',
            activeSubtitle: true,
            labelSubtitle: 'Pzas',
            totalSubtitle: 0,
          },
          {
            id: 4,
            label: 'Flete Express',
            activeSubtitle: true,
            labelSubtitle: 'Pzas',
            totalSubtitle: 0,
          },
          {
            id: 5,
            label: 'Stock',
            activeSubtitle: true,
            labelSubtitle: 'Pzas',
            totalSubtitle: 0,
          },
        ],
        tabSelected: {},
        searchTerm: '',
        stockPop: {},
        vProveedorFamiliaOcPendienteCompra: {},
      },
);
// FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
/*export const selectIdFamilyProvider = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) => currentFamily.IdProveedorFamilia,
);
export const selectCurrentFamilyName = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) =>
    `${currentFamily.Tipo} ${currentFamily.Subtipo} ${currentFamily.Control}`,
);*/
export const selectNeedsToReload = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) => currentFamily.needsToReloadProducts,
);
export const selectMoreProducts = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) => currentFamily.isLoadingMoreProducts,
);
export const selectDesiredPageOfCurrentFamily = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) => currentFamily.desiredPage,
);
export const selectDataByType = createSelector(
  selectProcessPurchaseDetails,
  (state: IProcessPurchaseDetails) => state.dataByType,
);
export const selectDataByTypeSelected = createSelector(
  selectProcessPurchaseDetails,
  (state: IProcessPurchaseDetails) => state.dataByTypeSelected,
);
export const selectSearchTermOfCurrentFamily = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) => currentFamily.searchTerm,
);
export const selectIsLoadingProducts = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) =>
    currentFamily.productsStatus === API_REQUEST_STATUS_DEFAULT ||
    currentFamily.productsStatus === API_REQUEST_STATUS_LOADING,
);
export const selectProductsOfCurrentFamily = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) => currentFamily.products,
);
export const selectTotalProducts = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) => currentFamily.totalProducts,
);
// FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
/*export const selectControlOfCurrentFamily = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) => currentFamily.Control,
);
export const selectTotalAmount = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) =>
    !_.isEmpty(currentFamily.vProveedorFamiliaOcPendienteCompra)
      ? currentFamily.vProveedorFamiliaOcPendienteCompra.TotalUSD
      : 0,
);
export const selectTotalPzas = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) =>
    !_.isEmpty(currentFamily.vProveedorFamiliaOcPendienteCompra)
      ? currentFamily.vProveedorFamiliaOcPendienteCompra.NumeroDePiezas
      : 0,
);*/
export const selectListProductsToGenerateOrder = createSelector(
  selectProcessPurchaseDetails,
  (state: IProcessPurchaseDetails) => state.productsToGenerateOrder,
);
export const selectPzasToGenerateOrder = createSelector(
  selectProcessPurchaseDetails,
  (state: IProcessPurchaseDetails) => {
    let pzas = 0;
    forEach(
      state.productsToGenerateOrder,
      (product: IProducts) => (pzas = pzas + product.NumeroDePiezas),
    );

    return pzas;
  },
);
export const selectSubtotal = createSelector(
  selectProcessPurchaseDetails,
  (state: IProcessPurchaseDetails) => {
    let subtotal = 0;
    forEach(
      state.productsToGenerateOrder,
      (product: IProducts) => (subtotal = subtotal + product.TotalPartida),
    );

    return subtotal;
  },
);
export const selectTax = createSelector(
  selectProcessPurchaseDetails,
  (state: IProcessPurchaseDetails) => {
    let tax = 0;
    forEach(state.productsToGenerateOrder, (product: IProducts) => (tax = tax + product.MontoIVA));

    return tax;
  },
);

export const selectTotal = createSelector(
  [selectSubtotal, selectTax],
  (subtotal: number, tax: number) => {
    return subtotal + tax;
  },
);

// TODO: Se comento y cambio codigo por cambios en servicio
export const selectWhoToLink = createSelector(
  selectGeneralData,
  (generalData: TramitarCompraElaborar) => undefined,
  /*    !_.isEmpty(generalData.ProveedoresAlternativos)
      ? generalData.ProveedoresAlternativos[0].Nombre
      : undefined,*/
);
export const selectIdCatCurrency = createSelector(
  selectGeneralData,
  (generalData: TramitarCompraElaborar) =>
    generalData.catMoneda ? generalData.catMoneda.IdCatMoneda : '',
);
export const selectIsMexican = createSelector(
  selectGeneralData,
  (generalData: TramitarCompraElaborar) => (generalData ? generalData.EsMexicano : false),
);
export const selectDropDownListValidation = createSelector(
  [selectIsMexican, selectCompanyBuysSelected, selectShippingCompanySelected],
  (isMexican: boolean, companyBuys: DropListOption, companyShipping: DropListOption) =>
    !isMexican
      ? companyBuys.value !== DEFAULT_UUID && companyShipping.value !== DEFAULT_UUID
      : companyBuys.value !== DEFAULT_UUID,
);
// TODO: Se comento y cambio codigo por cambios en servicio
export const selectIdAlternativeProvider = createSelector(
  selectGeneralData,
  (generalData: TramitarCompraElaborar) => DEFAULT_UUID,
  /*    !_.isEmpty(generalData.ProveedoresAlternativos)
      ? generalData.ProveedoresAlternativos[0].IdProveedor
      : DEFAULT_UUID,*/
);
export const selectArrayIdProducts = createSelector(
  selectProcessPurchaseDetails,
  (state: IProcessPurchaseDetails) => {
    const products = [];
    forEach(state.productsToGenerateOrder, (product: IProducts) =>
      products.push(product.IdOcPendienteCompraProducto),
    );

    return products;
  },
);
export const selectMailList = createSelector(
  [selectProcessPurchaseDetails, selectGeneralData],
  (state: IProcessPurchaseDetails, generalData: TramitarCompraElaborar): Array<IDropListMulti> =>
    isEmpty(generalData.CorreoElectronico) ? [] : state.mailList,
);
export const selectContactsList = createSelector(
  selectProcessPurchaseDetails,
  (state: IProcessPurchaseDetails): Array<IDropListMulti> =>
    isEmpty(state.contacts) ? [] : state.contacts,
);
// FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
/*export const selectTotalPiecesCurrent = createSelector(
  [selectCurrentFamily, selectListProductsToGenerateOrder],
  (currentFamily: IFamily, productsToGenerate: Array<IProducts>) =>
    currentFamily.vProveedorFamiliaOcPendienteCompra
      ? currentFamily.vProveedorFamiliaOcPendienteCompra.NumeroDePiezas -
        _.sumBy(productsToGenerate, 'NumeroDePiezas')
      : 0,
);
export const selectTotalAmountCurrent = createSelector(
  [selectCurrentFamily, selectListProductsToGenerateOrder],
  (currentFamily: IFamily, productsToGenerate: Array<IProducts>) =>
    currentFamily.vProveedorFamiliaOcPendienteCompra
      ? currentFamily.vProveedorFamiliaOcPendienteCompra.TotalUSD -
        _.sumBy(productsToGenerate, 'TotalPartida')
      : 0,
);
export const selectTotalRegularsCurrent = createSelector(
  [selectCurrentFamily, selectListProductsToGenerateOrder],
  (currentFamily: IFamily, productsToGenerate: Array<IProducts>) =>
    currentFamily.vProveedorFamiliaOcPendienteCompra
      ? currentFamily.vProveedorFamiliaOcPendienteCompra
          .NumeroDePiezasRegulares -
        _.sumBy(
          _.filter(
            productsToGenerate,
            (product: IProducts) => product.PartidaRegular,
          ),
          'NumeroDePiezas',
        )
      : 0,
);
export const selectTotalScheduledCurrent = createSelector(
  [selectCurrentFamily, selectListProductsToGenerateOrder],
  (currentFamily: IFamily, productsToGenerate: Array<IProducts>) =>
    currentFamily.vProveedorFamiliaOcPendienteCompra
      ? currentFamily.vProveedorFamiliaOcPendienteCompra
          .NumeroDePiezasProgramadas -
        _.sumBy(
          _.filter(
            productsToGenerate,
            (product: IProducts) => product.PartidaProgramada,
          ),
          'NumeroDePiezas',
        )
      : 0,
);
export const selectTotalFreigthExpressCurrent = createSelector(
  [selectCurrentFamily, selectListProductsToGenerateOrder],
  (currentFamily: IFamily, productsToGenerate: Array<IProducts>) =>
    currentFamily.vProveedorFamiliaOcPendienteCompra
      ? currentFamily.vProveedorFamiliaOcPendienteCompra
          .NumeroDePiezasFleteExpress -
        _.sumBy(
          _.filter(
            productsToGenerate,
            (product: IProducts) => product.FleteExpress,
          ),
          'NumeroDePiezas',
        )
      : 0,
);
export const selectTotalStockCurrent = createSelector(
  [selectCurrentFamily, selectListProductsToGenerateOrder],
  (currentFamily: IFamily, productsToGenerate: Array<IProducts>) =>
    currentFamily.vProveedorFamiliaOcPendienteCompra
      ? currentFamily.vProveedorFamiliaOcPendienteCompra.NumeroDePiezasStock -
        _.sumBy(
          _.filter(
            productsToGenerate,
            (product: IProducts) => product.AsignadoStock,
          ),
          'NumeroDePiezas',
        )
      : 0,
);*/
export const selectTotalResultsCurrent = createSelector(
  [selectCurrentFamily, selectListProductsToGenerateOrder],
  (currentFamily: IFamily, productsToGenerate: Array<IProducts>) =>
    currentFamily.totalProducts - productsToGenerate.length,
);
// FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
/*export const selectCurrentTotals = createSelector(
  [
    selectTotalPiecesCurrent,
    selectTotalResultsCurrent,
    selectTotalAmountCurrent,
    selectTotalRegularsCurrent,
    selectTotalScheduledCurrent,
    selectTotalFreigthExpressCurrent,
    selectTotalStockCurrent,
  ],
  (
    allPieces: number,
    results: number,
    amount: number,
    regulars: number,
    scheduled: number,
    freigthExpress: number,
    stock: number,
  ) => {
    const currentTotals: ICurrentTotals = {
      allPieces,
      regulars,
      scheduled,
      freigthExpress,
      stock,
      results,
      amount,
    };

    return currentTotals;
  },
);
export const selectTabOptions = createSelector(
  [
    selectCurrentFamily,
    selectTotalPiecesCurrent,
    selectTotalRegularsCurrent,
    selectTotalScheduledCurrent,
    selectTotalFreigthExpressCurrent,
    selectTotalStockCurrent,
  ],
  (
    currentFamily: IFamily,
    allPieces: number,
    regulars: number,
    scheduled: number,
    freigthExpress: number,
    stock: number,
  ) => [
    {
      ...currentFamily.tabOptions[0],
      totalSubtitle: allPieces,
    },
    {
      ...currentFamily.tabOptions[1],
      totalSubtitle: regulars,
    },
    {
      ...currentFamily.tabOptions[2],
      totalSubtitle: scheduled,
    },
    {
      ...currentFamily.tabOptions[3],
      totalSubtitle: freigthExpress,
    },
    {
      ...currentFamily.tabOptions[4],
      totalSubtitle: stock,
    },
  ],
);*/
export const selectTabSelected = createSelector(
  selectCurrentFamily,
  (currentFamily: IFamily) => currentFamily.tabSelected,
);
// FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
/*export const selectQueryInfo = createSelector(
  [
    selectCurrentFamily,
    selectIdFamilyProvider,
    selectDesiredPageOfCurrentFamily,
    selectTabSelected,
    selectDataByTypeSelected,
    selectSearchTermOfCurrentFamily,
  ],
  (
    currentFamily: IFamily,
    IdFamilyProvider: string,
    desiredPage: number,
    tabSelected: ITabOption,
    filterSelected: DropListOption,
    searchTerm: string,
  ) => {
    const queryInfo: QueryInfo = {} as QueryInfo;
    queryInfo.Filters = [];
    if (!_.isEmpty(tabSelected)) {
      if (tabSelected.label === 'Regulares') {
        queryInfo.Filters = [
          {
            NombreFiltro: 'PartidaRegular',
            ValorFiltro: true,
          },
        ];
      } else if (tabSelected.label === 'Programadas') {
        queryInfo.Filters = [
          {
            NombreFiltro: 'PartidaProgramada',
            ValorFiltro: true,
          },
        ];
      } else if (tabSelected.label === 'Flete Express') {
        queryInfo.Filters = [
          {
            NombreFiltro: 'FleteExpress',
            ValorFiltro: true,
          },
        ];
      } else if (tabSelected.label === 'Stock') {
        queryInfo.Filters = [
          {
            NombreFiltro: 'StockDisponible',
            ValorFiltro: true,
          },
        ];
      }
    }
    if (searchTerm !== '') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'CatalogoDescripcionClientePedido',
          ValorFiltro: searchTerm,
        },
      ];
    }
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'IdProveedorFamilia',
        ValorFiltro: IdFamilyProvider,
      },
      {
        NombreFiltro: 'Activo',
        ValorFiltro: true,
      },
    ];

    queryInfo.SortField = 'FechaEstimadaEntrega';
    queryInfo.SortDirection = filterSelected.value === 1 ? 'Asc' : 'Desc';
    queryInfo.pageSize = PAGING_LIMIT;
    queryInfo.desiredPage = desiredPage;

    return queryInfo;
  },
);*/
