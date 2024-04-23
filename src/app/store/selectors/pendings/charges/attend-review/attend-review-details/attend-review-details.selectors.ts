import {createSelector} from '@ngrx/store';
import {isEmpty, map as _map} from 'lodash-es';

import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
/*Selectors Imports*/
import {selectAttendReview} from '@appSelectors/pendings/charges/attend-review/attend-review.selectors';
import {selectListPriority} from '@appSelectors/catalogs/catalogs.selectors';

/*Models Imports*/
import {IAttendView} from '@appModels/store/pendings/charges/attend-review/attend-review.models';
import {
  IAddressClient,
  IAttendReviewDetails,
  IBills,
  ICancelInvoice,
  IProgrammingReview,
  IRebill,
} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {FccRevisionProgramada, QueryInfo} from 'api-finanzas';
import {ICustomerAttend} from '@appModels/store/pendings/charges/attend-review/attend-review-list/attend-review-list.models';

import {CatPrioridad, DireccionClienteDetalle} from 'api-catalogos';
import {DatosFacturacionClienteDetalle} from 'api-logistica';

export const selectAttendReviewDetails = createSelector(
  selectAttendReview,
  (state: IAttendView): IAttendReviewDetails => state.attendReviewDetails,
);
export const selectedClient = createSelector(
  selectAttendReviewDetails,
  (state: IAttendReviewDetails): ICustomerAttend => state.selectedClient,
);
export const selectSearchTerm = createSelector(
  selectAttendReviewDetails,
  (state: IAttendReviewDetails): string => state.searchTerm,
);
export const selectFilters = createSelector(
  selectAttendReviewDetails,
  (state: IAttendReviewDetails): Array<DropListOption> => state.filters,
);
export const selectedFilter = createSelector(
  selectAttendReviewDetails,
  (state: IAttendReviewDetails): DropListOption => state.selectedFilter,
);
export const selectBills = createSelector(
  selectAttendReviewDetails,
  (state: IAttendReviewDetails): Array<any> => state.bills,
);
export const selectedBill = createSelector(
  selectAttendReviewDetails,
  (state: IAttendReviewDetails): IBills => state.selectedBill,
);
export const selectQueryInfo = createSelector(
  [selectedFilter, selectedClient],
  (filter: DropListOption, client: ICustomerAttend): QueryInfo => {
    const params = new FiltersOnlyActive();
    if (client) {
      params.Filters.push({
        NombreFiltro: 'IdCliente',
        ValorFiltro: client.IdCliente,
      });
    }
    params.SortField = 'FechaEstimadaEntrega';
    params.SortDirection = filter.value === '1' ? 'Desc' : 'Asc';
    return params;
  },
);
export const selectOptionFilter = createSelector(
  selectAttendReviewDetails,
  (state) => state.selectedFilter,
);
export const selectRequestStatus = createSelector(
  selectAttendReviewDetails,
  (state) => state.queryInfo.requestStatus,
);
export const selectAddressClient = createSelector(
  selectAttendReviewDetails,
  (state): DireccionClienteDetalle => state.address,
);
export const selectAddressDrop = createSelector(
  selectAddressClient,
  (address): IAddressClient => {
    return {
      country: {
        value: '1',
        label: address?.catPais?.NombreEspanol ? address.catPais.NombreEspanol : 'N/D',
      },
      state: {
        value: '1',
        label: address?.Direccion?.Estado ? address.Direccion.Estado : 'N/D',
      },
      route: {
        value: '1',
        label: address?.catRutaEntrega?.RutaEntrega ? address.catRutaEntrega.RutaEntrega : 'N/D',
      },
      zone: {
        value: '1',
        label: address?.catZona?.Zona ? address.catZona.Zona : 'N/D',
      },
    };
  },
);
export const selectCatPriority = createSelector(
  selectListPriority,
  (list): Array<DropListOption> => {
    return _map(list, (item: CatPrioridad) => ({
      label: item.Prioridad,
      value: item.IdCatPrioridad,
    }));
  },
);
export const selectParamBills = createSelector(
  [selectedClient, selectedBill],
  (client: ICustomerAttend, bill: IBills) => {
    const params = new FiltersOnlyActive();
    if (client && bill) {
      params.Filters.push(
        {
          NombreFiltro: 'IdCliente',
          ValorFiltro: client.IdCliente,
        },
        {
          NombreFiltro: 'IdCatTipoValidacion',
          ValorFiltro: bill.IdCatTipoValidacion,
        },
      );
    }

    return params;
  },
);

export const selectAdditionalComment = createSelector(
  selectAttendReviewDetails,
  (state): string => state.additionalComment,
);
export const selectReviewDate = createSelector(
  selectAttendReviewDetails,
  (state) => state.reviewDate,
);
export const selectDataBillOfClient = createSelector(
  selectAttendReviewDetails,
  (state): DatosFacturacionClienteDetalle => state.billsOfClient,
);
export const selectDataReviewPreview = createSelector(
  selectedBill,
  (state): IProgrammingReview => (state.dataReview ? state.dataReview : ({} as IProgrammingReview)),
);
export const selectPriority = createSelector(
  selectDataReviewPreview,
  (state): DropListOption =>
    isEmpty(state)
      ? null
      : {
          label: state.Prioridad,
          value: state.IdCatPrioridad,
        },
);
export const selectOrigin = createSelector(
  selectDataReviewPreview,
  (state): DropListOption =>
    isEmpty(state)
      ? null
      : {
          label: state?.UsuarioOrigen?.NombreCompleto,
          value: state?.UsuarioOrigen?.IdUsuario,
        },
);
export const selectListFile = createSelector(selectedBill, (state) => state.files);
export const selectDateReview = createSelector(
  selectedBill,
  (state) => new Date(state.dataReview.FechaRevision),
);
export const selectStatusApiFile = createSelector(selectedBill, (state) => state.requestStatusFile);
export const selectParamsSave = createSelector(
  [selectedClient, selectedBill, selectAddressClient],
  (
    client: ICustomerAttend,
    bill: IBills,
    address: DireccionClienteDetalle,
  ): FccRevisionProgramada => {
    const body: FccRevisionProgramada = {};
    body.Activo = true;
    body.ComentariosAdicionales = bill.dataReview?.ComentariosAdicionales;
    body.Consecutivo = 1; // Pendiente
    body.Digital = bill.TipoValidacion === 'Digital';
    body.FechaProgramacionCobroCalculada = null;
    body.FechaRealizada = null;
    body.FechaRegistro = DEFAULT_DATE;
    body.FechaRevision = bill.dataReview?.FechaRevision;
    body.FechaUltimaActualizacion = DEFAULT_DATE;
    body.Fisica = bill.TipoValidacion === 'Física';
    body.Folio = bill.Folio;
    body.Hibrida = bill.TipoValidacion === 'Híbrida';
    body.IdCatPrioridad = bill.dataReview?.IdCatPrioridad;
    body.IdDireccionCliente = address.DireccionCliente?.IdDireccionCliente;
    body.IdFCCRevisionProgramada = DEFAULT_UUID;
    body.IdTPProformaPedido = bill?.IdTPProformaPedido;
    body.IdUsuarioDestino = bill.dataReview?.UsuarioDestino?.IdUsuario;
    body.IdUsuarioOrigen = bill.dataReview?.UsuarioOrigen?.IdUsuario;
    body.Prioridad = bill.dataReview?.Prioridad;
    body.Realizada =
      (bill.TipoValidacion === 'Física' && bill.EstadoTPProformaPedidoEjecutada) ||
      ((bill.TipoValidacion === 'Digital' || bill.TipoValidacion === 'Híbrida') &&
        bill.files.length > 0);
    return body;
  },
);

// Selectores Rebill

export const selectRebill = createSelector(
  selectAttendReviewDetails,
  (state: IAttendReviewDetails) => state.rebill,
);
export const selectReasonOptions = createSelector(
  selectRebill,
  (state: IRebill) => state.reasonOptions,
);
export const selectRadioButtons = createSelector(
  selectRebill,
  (state: IRebill) => state.radioButtons,
);
export const selectCancelInvoiceState = createSelector(
  selectRebill,
  (state: IRebill) => state.cancelInvoice,
);
export const selectRebillState = createSelector(
  selectRebill,
  (state: IRebill) => state.rebillRadio,
);
export const selectCreditNoteState = createSelector(
  selectRebill,
  (state: IRebill) => state.creditNote,
);
export const validatorForConfirmCancellation = createSelector(
  [selectRebill, selectCancelInvoiceState],
  (state: IRebill, cancelInvoiceState: ICancelInvoice): boolean =>
    cancelInvoiceState.reason != null,
);
export const selectRebillCheckBox = createSelector(
  selectRebill,
  (state: IRebill) => state.rebillRadio.checkBox,
);
export const selectRebillValidateCancelButton = createSelector(
  selectRebill,
  (state: IRebill): boolean =>
    state.rebillRadio.reason != null && state.rebillRadio.checkBox === false,
);
export const selectDatosFacturados = createSelector(
  selectAttendReviewDetails,
  (state: IAttendReviewDetails) => state.billsOfClient.DatosFacturacionCliente,
);

export const selectRFC = createSelector(selectDatosFacturados, (state) => state.RFC);
export const selectCatMoneda = createSelector(selectDatosFacturados, (state) => state.catMoneda);
export const selectPayMethod = createSelector(
  selectDatosFacturados,
  (state) => state.catMetodoDePagoCFDI,
);
export const selectCatCondicionesDePago = createSelector(
  selectDatosFacturados,
  (state) => state.catCondicionesDePago,
);
export const selectCatUsoCFDI = createSelector(selectDatosFacturados, (state) => state.catUsoCFDI);
export const selectBussinesName = createSelector(
  selectDatosFacturados,
  (state) => state.empresa.RazonSocial,
);
export const selectAddress = createSelector(
  selectDatosFacturados,
  (state) => state.DireccionEmpresa,
);
export const selectPaymentSetup = createSelector(
  selectDatosFacturados,
  (state) => state.ConfiguracionPagos,
);
export const selectIdClient = createSelector(
  selectAttendReviewDetails,
  (state: IAttendReviewDetails) => state.selectedClient.IdCliente,
);
