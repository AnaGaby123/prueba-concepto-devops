import {createSelector} from '@ngrx/store';
import {selectUploadInvoiceDetail} from '@appSelectors/pendings/purchasing-manager/upload-invoice/upload-invoice.selectors';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {QueryInfo} from 'api-finanzas';
import {find, isEmpty, map as _map} from 'lodash-es';
import {
  IInvoice,
  initialITotItems,
  IPurchaseItemUploadInvoice,
  ITotItems,
  IUploadInvoiceDetails,
} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-details/upload-invoice-details.models';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.models';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {IProviderUpload} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.models';

export const selectUploadInvoiceDetails = createSelector(
  selectUploadInvoiceDetail,
  (state) => state,
);
export const selectSortList = createSelector(
  selectUploadInvoiceDetails,
  (state) => state.sortOptions,
);
export const selectSortSelected = createSelector(
  selectUploadInvoiceDetails,
  (state) => state.sortSelected,
);
export const selectSearchTerm = createSelector(
  selectUploadInvoiceDetails,
  (state) => state.queryInfo.searchTerm,
);
export const selectProvider = createSelector(
  selectUploadInvoiceDetails,
  (state) => state.providerSelected,
);
export const selectPurchaseOrders = createSelector(
  selectUploadInvoiceDetails,
  (state) => state.purchaseOrder.Results,
);
export const selectPurchaseOrdersTotal = createSelector(
  selectUploadInvoiceDetails,
  (state) => state.purchaseOrder.TotalResults,
);
export const selectQueryInfo = createSelector(
  selectUploadInvoiceDetails,
  (state) => state.queryInfo,
);
export const selectIsLoadingApi = createSelector(selectQueryInfo, (state) => state.requestStatus);
export const selectCurrentPage = createSelector(selectQueryInfo, (state) => state.desiredPage);
export const selectParams = createSelector(
  [selectQueryInfo, selectProvider, selectSortSelected],
  (queryInfo: IQueryInfoOptions, provider: IProviderUpload, sort: DropListOption): QueryInfo => {
    const params = new FiltersOnlyActive();
    params.Filters.push({
      NombreFiltro: 'SinFactura',
      ValorFiltro: true,
    });
    params.desiredPage = queryInfo.desiredPage;
    params.pageSize = queryInfo.pageSize;
    params.SortField = 'TotalUSD';
    params.SortDirection = sort.value === '1' ? 'Desc' : 'Asc';
    if (provider) {
      params.Filters.push({
        NombreFiltro: 'IdProveeedor',
        ValorFiltro: provider.IdProveedor,
      });
    }
    if (queryInfo.searchTerm) {
      params.Filters.push({
        NombreFiltro: 'NumeroOrdenDeCompra',
        ValorFiltro: queryInfo.searchTerm,
      });
    }
    return params;
  },
);
export const selectOrderSelected = createSelector(
  selectUploadInvoiceDetails,
  (state) => state.orderSelected,
);
export const selectItemsByOrder = createSelector(selectOrderSelected, (state) =>
  state.items
    ? _map(state.items, (item, index) => {
        return {...item, Index: index + 1};
      })
    : [],
);
export const selectItemsOfInvoice = createSelector(
  selectUploadInvoiceDetail,
  (state) => state.itemsInvoice,
);
export const viewPopInvalidate = createSelector(
  selectUploadInvoiceDetail,
  (state) => state.invalidateSelected,
);
export const selectPDF = createSelector(
  selectUploadInvoiceDetail,
  (state) => state.dataInvoice.filePDF,
);
export const selectInvoiceData = createSelector(
  selectUploadInvoiceDetail,
  (state) => state.dataInvoice,
);
export const selectArrayFiles = createSelector(
  selectInvoiceData,
  (state): Array<File> => {
    const files = [];
    if (state.filePDF) {
      files.push(state.filePDF);
    } else {
      return [];
    }
    if (state.fileXML) {
      files.push(state.fileXML);
    }
    return files;
  },
);
export const selectImportAmount = createSelector(
  selectUploadInvoiceDetail,
  (state) => state.importAmount,
);
export const selectValidateBtnGenerate = createSelector(
  [selectInvoiceData, selectItemsOfInvoice],
  (invoice: IInvoice, list: Array<IPurchaseItemUploadInvoice>): boolean => {
    return (
      invoice.filePDF !== null &&
      invoice.amount &&
      invoice.invoiceDate !== null &&
      invoice.invoiceNum &&
      invoice.receptionDate !== null &&
      list.length > 0
    );
  },
);
export const selectTotItems = createSelector(
  selectOrderSelected,
  (order): ITotItems => {
    const totals: ITotItems = initialITotItems();
    if (order?.items) {
      order.items.forEach((item) => {
        totals.cant += item.NumeroDePiezas;
        totals.amount += item.PrecioLista;
        totals.import += item.TotalPartida;
      });
    }
    return totals;
  },
);
export const selectTotItemsInvoice = createSelector(
  selectItemsOfInvoice,
  (items): ITotItems => {
    const totals: ITotItems = initialITotItems();
    if (items) {
      items.forEach((item) => {
        totals.cant += item.NumeroDePiezas;
        totals.amount += item.PrecioLista;
        totals.import += item.TotalPartida;
      });
    }
    return totals;
  },
);
export const selectIsLoadingOrders = createSelector(
  selectQueryInfo,
  (state) => state.requestStatus === API_REQUEST_STATUS_LOADING,
);
export const selectIsNational = createSelector(
  selectUploadInvoiceDetail,
  (state) => state.isNational,
);

export const selectContactsProviders = createSelector(
  selectUploadInvoiceDetail,
  (state: IUploadInvoiceDetails) => state.providerContacts,
);

export const selectContactsProviderDropList = createSelector(
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

export const selectedDropListProviderContact = createSelector(
  selectUploadInvoiceDetail,
  (state: IUploadInvoiceDetails) => state.selectedProviderContact,
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
