// Core
import {createFeatureSelector, createSelector} from '@ngrx/store';

// Models
import {ICard} from '@appModels/card/card';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {
  ParametroBuzonCorreo,
  ParametroCorreosClientesTotales,
  ParametroGeneradorProcesoMailBot,
} from 'api-catalogos';
import {
  ArchivoCustom,
  CatClasificacionCorreoRecibidoReferenciaCustom,
  CorreoRecibidoClienteCustom,
  CorreoRecibidoCustom,
  MailboxState,
  PpPedidoCustom,
  VCorreoClienteCustom,
} from '@appModels/store/mailbox/mailbox.models';
// Selectors
import {selectUserFunctions} from '@appSelectors/auth/auth.selectors';
// Utils
import {countBy, deburr, filter, find, forEach, includes, isEmpty, map, toLower} from 'lodash-es';
import {DateFormatSlashShort} from '@appPipes/date-format.pipe';
import * as moment from 'moment';
import {
  DEFAULT_UUID,
  ENUM_USER_FUNCTIONS,
  MAILBOX_FEATURE_KEY,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {getOnlyFileName} from '@appUtil/files';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';

export const selectMailboxState = createFeatureSelector<MailboxState>(MAILBOX_FEATURE_KEY);
export const selectMailbox = createSelector(
  selectMailboxState,
  (state: MailboxState): MailboxState => state,
);

export const selectReceivedMailsArray = createSelector(
  selectMailbox,
  (state: MailboxState) => state.receivedMailsArray,
);
export const selectReceivedMailsSelected = createSelector(
  selectReceivedMailsArray,
  (state: Array<VCorreoClienteCustom>): VCorreoClienteCustom =>
    find(state, (o: VCorreoClienteCustom) => o.isSelected),
);
export const isNewClient = createSelector(
  selectReceivedMailsSelected,
  (state: VCorreoClienteCustom): boolean => state?.ClienteNuevo,
);
export const selectViewedMailsArray = createSelector(
  selectMailbox,
  (state: MailboxState) => state.viewedEmails,
);
export const selectMailIsSelected = createSelector(
  selectMailbox,
  (state: MailboxState) => state.mailIsSelected,
);
export const selectLinkMailActivate = createSelector(
  selectMailbox,
  (state: MailboxState) => state.linkMailActivate,
);
export const selectOrderValueId = createSelector(
  selectMailboxState,
  (state: MailboxState) => state.orderValue,
);
export const selectSearchTerm = createSelector(
  selectMailbox,
  (state: MailboxState) => state.searchTerm,
);
export const selectTitle = createSelector(
  [selectMailbox, selectUserFunctions],
  (state: MailboxState, functions: Array<string>): string => {
    return includes(functions, ENUM_USER_FUNCTIONS.functionEvi)
      ? 'Buzón requisición'
      : includes(functions, ENUM_USER_FUNCTIONS.functionEsac)
      ? 'Buzón pedidos'
      : includes(functions, ENUM_USER_FUNCTIONS.functionAnalistaDeCuentasPorCobrar)
      ? 'Buzón de cobros'
      : state.title;
  },
);
export const selectName = createSelector(selectMailbox, (state: MailboxState) => state.name);
export const selectCurrentPage = createSelector(
  selectMailbox,
  (state: MailboxState) => state.currentPage,
);
export const selectTotalResults = createSelector(
  selectMailbox,
  (state: MailboxState) => state.totalResults,
);
export const selectIsLoading = createSelector(
  selectMailbox,
  (state: MailboxState): number => state.isLoading,
);

export const selectIsMessageLoading = createSelector(
  selectMailbox,
  (state: MailboxState) => state.isMessageLoading,
);
export const selectNeedsToReload = createSelector(
  selectMailbox,
  (state: MailboxState) => state.needsToReload,
);
export const selectCurrentMail = createSelector(
  selectMailbox,
  (state: MailboxState) => state.selectedMail,
);
export const selectedClientToDrop = createSelector(
  selectCurrentMail,
  (state) => state.selectedClientToDrop,
);
export const selectClientsWithSameMail = createSelector(
  selectCurrentMail,
  (state): Array<DropListOption> => state.clientsWithSameMail,
);
export const selectQueryInfo = createSelector(
  selectOrderValueId,
  selectSearchTerm,
  selectCurrentPage,
  selectUserFunctions,
  (orderValue, searchTerm, currentPage, userFunctions): ParametroBuzonCorreo => {
    const queryInfo = new FiltersOnlyActive();
    queryInfo.SortField = 'FechaRecepcion';
    queryInfo.SortDirection = orderValue.value.toString();
    queryInfo.pageSize = PAGING_LIMIT;
    queryInfo.desiredPage = currentPage;
    if (searchTerm !== '') {
      queryInfo.Filters.push({
        NombreFiltro: 'ClienteOCorreo',
        ValorFiltro: searchTerm,
      });
    }
    const parametroGeneradorProcesoMailBot: ParametroGeneradorProcesoMailBot = {
      AnalistaDeCuentasPorCobrar: !!includes(
        userFunctions,
        ENUM_USER_FUNCTIONS.functionAnalistaDeCuentasPorCobrar,
      ),
      EVI: !!includes(userFunctions, ENUM_USER_FUNCTIONS.functionEvi),
      EVE: !!includes(userFunctions, ENUM_USER_FUNCTIONS.functionEve),
      ESAC: !!includes(userFunctions, ENUM_USER_FUNCTIONS.functionEsac),
      CoordinadorDeServicioAlCliente: !!includes(
        userFunctions,
        ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente,
      ),
      IdCorreoRecibido: DEFAULT_UUID,
    };
    return {
      queryInfo,
      parametroGeneradorProcesoMailBot,
    };
  },
);
export const selectFetchMoreProvidersInfo = createSelector(
  selectMailbox,
  (state: MailboxState): IFetchMoreItemsInfo => {
    return {
      itemList: state.receivedMailsArray,
      itemsTotalLength: state.totalResults,
      listRequestStatus: state.isLoading,
      desiredPage: state.queryInfo.desiredPage,
      pageSize: state.queryInfo.pageSize,
      totalPages:
        state?.totalResults >= state.queryInfo.pageSize
          ? Math.ceil(state?.totalResults / state.queryInfo.pageSize)
          : 0,
    };
  },
);
export const selectCurrentMailClient = createSelector(
  selectCurrentMail,
  (state: CorreoRecibidoCustom) => state.Cliente,
);
export const selectFiles = createSelector(selectCurrentMail, (state: any) => state.Archivos);
export const selectCurrentMailClientReceivedMail = createSelector(
  selectCurrentMail,
  (state: CorreoRecibidoCustom) => state.CorreoRecibidoCliente,
);
export const selectedCurrentMailClientReceiveMail = createSelector(
  selectCurrentMailClientReceivedMail,
  (state) => filter(state, (o: CorreoRecibidoClienteCustom) => o.IsSelected),
);
export const selectCurrentMailClientReceivedMailToDelete = createSelector(
  selectCurrentMail,
  (state: CorreoRecibidoCustom) => state.CorreoRecibidoClienteToDelete,
);
export const selectIdCurrentMail = createSelector(
  selectCurrentMail,
  (state: CorreoRecibidoCustom) => {
    if (state.CorreoRecibido) {
      return state.CorreoRecibido.IdCorreoRecibido;
    }
  },
);
export const selectTempUrl = createSelector(selectCurrentMail, (state: any) => state.tempUrl);
export const selectDefaultClassificationIsSelected = createSelector(
  selectCurrentMail,
  (state: CorreoRecibidoCustom) => state.DefaultClassificationIsSelected,
);
export const selectOCPending = createSelector(
  selectCurrentMail,
  (state: CorreoRecibidoCustom) => state.OCPending,
);
export const selectOCPendingList = createSelector(selectOCPending, (state) => state.OCPendingList);
export const selectOCPendingTotal = createSelector(selectOCPending, (state) => state.OCPending);
export const selectCurrentMailFilesNumber = createSelector(
  selectCurrentMail,
  (state: CorreoRecibidoCustom) => state.Archivos.length,
);
export const selectIsUserESAC = createSelector(
  selectUserFunctions,
  (selectUserFunctions) => !!includes(selectUserFunctions, ENUM_USER_FUNCTIONS.functionEsac),
);
export const selectIsUserCoordinadorDeServicioAlCliente = createSelector(
  selectUserFunctions,
  (selectUserFunctions) =>
    !!includes(selectUserFunctions, ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente),
);
export const selectBlockClassificationsEdition = createSelector(
  selectCurrentMail,
  (state: any) => state.BlockClassificationEdition,
);
export const selectCurrentMailReferencesClasifications = createSelector(
  selectCurrentMail,
  (state: CorreoRecibidoCustom): CorreoRecibidoClienteCustom[] => {
    return map(
      state.CorreoRecibidoCliente,
      (o: CorreoRecibidoClienteCustom): CorreoRecibidoClienteCustom => {
        if (o.CatClasificacionCorreoRecibidoReferencia.length > 0) {
          return {
            ...o,
            CatClasificacionCorreoRecibidoReferencia: map(
              o.CatClasificacionCorreoRecibidoReferencia,
              (
                i: CatClasificacionCorreoRecibidoReferenciaCustom,
              ): CatClasificacionCorreoRecibidoReferenciaCustom => {
                return {
                  ...i,
                  value: i.IdCatClasificacionCorreoRecibidoReferencia,
                  label: i.Nombre,
                  subtitle: i.PrefijoComentario,
                  labelKey: i.Clave,
                };
              },
            ),
          };
        } else {
          return {...o};
        }
      },
    );
  },
);
export const alreadyExistReference = createSelector(
  selectCurrentMailReferencesClasifications,
  selectCurrentMail,
  (state: Array<any>, currentMail: CorreoRecibidoCustom): boolean => {
    const oc = state[1];
    const commentReference = oc?.ComentariosReferenciasTemp;
    return (
      !isEmpty(commentReference) &&
      !isEmpty(
        filter(
          currentMail.CorreoRecibidoCliente[1].CorreoRecibidoClienteReferencia,
          (o: CatClasificacionCorreoRecibidoReferenciaCustom) => o.Referencia === commentReference,
        ),
      )
    );
  },
);
export const selectSomeClassificationIsSelected = createSelector(
  selectCurrentMail,
  (state: CorreoRecibidoCustom) => {
    return !isEmpty(filter(state.CorreoRecibidoCliente, (o) => o.IsSelected));
  },
);
export const mailUrlFileActive = createSelector(selectCurrentMail, (state) => {
  let Url = '';
  forEach(state.Archivos, (o: ArchivoCustom) => {
    if (o.active) {
      Url = o.Url;
    }
  });
  return Url;
});
export const mailUrlOCPendingActive = createSelector(selectCurrentMail, (state) => {
  let Url = '';
  forEach(state.OCPending.OCPendingList, (o: PpPedidoCustom) => {
    if (o.active) {
      Url = o.Url;
    }
  });
  return Url;
});
export const mailFileActive = createSelector(selectCurrentMail, (state) => {
  return filter(state.Archivos, (o: ArchivoCustom) => o.active);
});
export const mailOCPendingActive = createSelector(selectCurrentMail, (state) => {
  return filter(state.OCPending.OCPendingList, (o: PpPedidoCustom) => o.active);
});
export const selectCountFilesNotLinked = createSelector(selectCurrentMail, (state) => {
  const files = countBy(state.Archivos, (o) => !o.isLinked);
  return files.true ? files.true : 0;
});
export const selectCountOcPendingNotLinked = createSelector(selectOCPending, (state) => {
  const oc = countBy(state?.OCPendingList, (o) => !o?.isLinked);
  return oc?.true ? oc.true : 0;
});
export const mailFilesToCardOptions = createSelector(
  selectCurrentMail,
  (state): Array<ICard> => {
    const options: Array<ICard> = [];
    forEach(state.Archivos, (o: ArchivoCustom, index: number) => {
      if (!o.isLinked) {
        options.push({
          active: o.active,
          value: o.IdArchivo,
          labels: [
            {
              label: `#${index + 1} · ${getOnlyFileName(o.FileKey)}`,
              className: CLASS_NAMES.title,
            },
            {
              label: `${new DateFormatSlashShort().transform(o.FechaRegistro)}`,
              className: CLASS_NAMES.dateLastUpdate,
            },
          ],
        });
      }
    });
    return options;
  },
);
export const ocPendingToCardOptions = createSelector(
  selectCurrentMail,
  (state): Array<ICard> => {
    const options: Array<ICard> = [];
    forEach(state.OCPending?.OCPendingList, (o: PpPedidoCustom, index: number) => {
      if (!o.isLinked) {
        const now = new Date();
        const date = new Date(o.FechaEstimadaAjuste);
        const today = moment(now);
        const fea = moment(date);
        const diff = fea.diff(today, 'days', false);

        options.push({
          active: o.active,
          value: o.IdPPPedido,
          labels: [
            {
              label: `#${index + 1} · ${o.OrdenDeCompra}`,
              className: CLASS_NAMES.title,
            },
            {
              label: `FEA: ${new DateFormatSlashShort().transform(o.FechaEstimadaAjuste)}`,
              className: CLASS_NAMES.status,
              color: diff > 1 ? '#4ba92b' : diff < 1 && diff > -1 ? '#e39d2a' : '#df8a99',
            },
          ],
        });
      }
    });
    return options;
  },
);
export const selectReferencesOrderClassification = createSelector(
  selectCurrentMail,
  (state) => state.CorreoRecibidoCliente[1].CorreoRecibidoClienteReferencia,
);
export const selectUsersWalletErrorDropList = createSelector(
  selectCurrentMail,
  (state: CorreoRecibidoCustom) => state.UsuariosErrorCartera,
);
export const selectTotalFooter = createSelector(
  selectMailboxState,
  (state: MailboxState) => state.totalFooter,
);

// DOCS validacion botones agregar

export const selectValidationButtonFirstClassification = createSelector(
  [
    selectMailboxState,
    selectCurrentMailReferencesClasifications,
    selectBlockClassificationsEdition,
  ],
  (state, classifications, blockClassification) =>
    classifications[0]?.IsSelected &&
    !blockClassification &&
    classifications[0]?.ComentariosTemp.trim() &&
    classifications[0]?.ArchivoTemp &&
    classifications[0]?.CatClasificacionCorreoRecibidoReferenciaTemp.value &&
    classifications[0]?.Total > 0 &&
    classifications[0]?.Total !== null
      ? 'active'
      : 'disable',
);
export const selectValidationDisabledButtonFirstClassification = createSelector(
  [
    selectMailboxState,
    selectCurrentMailReferencesClasifications,
    selectBlockClassificationsEdition,
  ],
  (state, classifications, blockClassification) =>
    !(
      classifications[0]?.IsSelected &&
      !blockClassification &&
      classifications[0]?.ComentariosTemp.trim() &&
      classifications[0]?.ArchivoTemp &&
      classifications[0]?.CatClasificacionCorreoRecibidoReferenciaTemp.value &&
      classifications[0]?.Total > 0 &&
      classifications[0]?.Total !== null
    ),
);
export const selectTotalFisrtClassification = createSelector(
  selectCurrentMailReferencesClasifications,
  (classification) => {
    return classification[0]?.Total;
  },
);
export const selectValidationButtonSecondClassification = createSelector(
  selectMailboxState,
  selectCurrentMailReferencesClasifications,
  selectBlockClassificationsEdition,
  alreadyExistReference,
  (state, classifications, blockClassification, alreadyExistRef) => {
    const classificationSelecte = classifications[1];

    return classifications[1]?.CatClasificacionCorreoRecibidoReferencia[0].value ===
      classificationSelecte.CatClasificacionCorreoRecibidoReferenciaTemp.value
      ? classifications[1]?.IsSelected &&
        !blockClassification &&
        classifications[1]?.ComentariosReferenciasTemp.trim() &&
        classifications[1]?.ArchivoTempName &&
        classifications[1]?.ComentariosTemp.trim() &&
        classifications[1]?.Total > 0 &&
        classifications[1]?.Total !== null &&
        !alreadyExistRef
        ? 'active'
        : 'disable'
      : classifications[1]?.IsSelected &&
        !blockClassification &&
        classifications[1]?.Total > 0 &&
        classifications[1]?.Total !== null &&
        classifications[1]?.ComentariosTemp.trim()
      ? 'active'
      : 'disable';
  },
);
export const selectValidationDisabledButtonSecondClassification = createSelector(
  selectMailboxState,
  selectCurrentMailReferencesClasifications,
  selectBlockClassificationsEdition,
  alreadyExistReference,
  (state, classifications, blockClassification, alreadyExistRef) =>
    alreadyExistRef ||
    !classifications[1]?.IsSelected ||
    blockClassification ||
    !classifications[1]?.ComentariosTemp.trim() ||
    !(classifications[1]?.Total > 0 && classifications[1]?.Total !== null) ||
    !classifications[1]?.CatClasificacionCorreoRecibidoReferenciaTemp.value ||
    (!classifications[1]?.ArchivoTempName &&
      toLower(deburr(classifications[1]?.CatClasificacionCorreoRecibidoReferenciaTemp.label)) ===
        '#oc cliente') ||
    (toLower(deburr(classifications[1]?.CatClasificacionCorreoRecibidoReferenciaTemp.label)) ===
      '#oc cliente' &&
      !classifications[1]?.ComentariosReferenciasTemp),
);
export const selectValidationButtonThirdClassification = createSelector(
  [
    selectMailboxState,
    selectCurrentMailReferencesClasifications,
    selectBlockClassificationsEdition,
  ],
  (state, classifications, blockClassification) =>
    classifications[2]?.IsSelected &&
    classifications[2]?.ComentariosTemp.trim() &&
    !blockClassification
      ? 'active'
      : 'disable',
);
export const selectValidationDisabledButtonThirdClassification = createSelector(
  [
    selectMailboxState,
    selectCurrentMailReferencesClasifications,
    selectBlockClassificationsEdition,
  ],
  (state, classifications, blockClassification) =>
    !classifications[2]?.IsSelected ||
    !classifications[2]?.ComentariosTemp.trim() ||
    blockClassification,
);
export const selectValidationButtonFourthClassification = createSelector(
  [
    selectMailboxState,
    selectCurrentMailReferencesClasifications,
    selectBlockClassificationsEdition,
  ],
  (state, classifications, blockClassification) =>
    classifications[3]?.IsSelected &&
    classifications[3]?.ComentariosTemp.trim() &&
    !blockClassification
      ? 'active'
      : 'disable',
);
export const selectValidationDisabledButtonFourthClassification = createSelector(
  [
    selectMailboxState,
    selectCurrentMailReferencesClasifications,
    selectBlockClassificationsEdition,
  ],
  (state, classifications, blockClassification) =>
    !classifications[3]?.IsSelected ||
    !classifications[3]?.ComentariosTemp.trim() ||
    blockClassification,
);
export const selectValidationButtonFiveClassification = createSelector(
  [
    selectMailboxState,
    selectCurrentMailReferencesClasifications,
    selectBlockClassificationsEdition,
  ],
  (state, classifications, blockClassification) =>
    classifications[4]?.IsSelected &&
    classifications[4]?.ComentariosTemp.trim() &&
    !blockClassification
      ? 'active'
      : 'disable',
);
export const selectValidationDisabledButtonFiveClassification = createSelector(
  [
    selectMailboxState,
    selectCurrentMailReferencesClasifications,
    selectBlockClassificationsEdition,
  ],
  (state, classifications, blockClassification) =>
    !classifications[4]?.IsSelected ||
    !classifications[4]?.ComentariosTemp.trim() ||
    blockClassification,
);
export const selectValidationButtonSixClassification = createSelector(
  [
    selectMailboxState,
    selectCurrentMailReferencesClasifications,
    selectBlockClassificationsEdition,
  ],
  (state, classifications, blockClassification) =>
    classifications[5]?.IsSelected &&
    classifications[5].ComentariosTemp.trim() &&
    !blockClassification
      ? 'active'
      : 'disable',
);
export const selectValidationDisabledButtonSixClassification = createSelector(
  [
    selectMailboxState,
    selectCurrentMailReferencesClasifications,
    selectBlockClassificationsEdition,
  ],
  (state, classifications, blockClassification) =>
    !classifications[5]?.IsSelected ||
    !classifications[5].ComentariosTemp.trim() ||
    blockClassification,
);
// DOCS: Construye el objeto para marcar como leido o procesado el correo por cada rol
export const selectMailsByFunctions = createSelector(selectUserFunctions, (userFunctions) => {
  const body: ParametroGeneradorProcesoMailBot = {
    AnalistaDeCuentasPorCobrar: !!includes(
      userFunctions,
      ENUM_USER_FUNCTIONS.functionAnalistaDeCuentasPorCobrar,
    ),
    EVI: !!includes(userFunctions, ENUM_USER_FUNCTIONS.functionEvi),
    EVE: !!includes(userFunctions, ENUM_USER_FUNCTIONS.functionEve),
    ESAC: !!includes(userFunctions, ENUM_USER_FUNCTIONS.functionEsac),
    CoordinadorDeServicioAlCliente: !!includes(
      userFunctions,
      ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente,
    ),
  };
  return body;
});
export const selectMailsByFunctionsFooter = createSelector(selectUserFunctions, (functions) => {
  const body: ParametroCorreosClientesTotales = {
    AnalistaDeCuentasPorCobrar: !!includes(
      functions,
      ENUM_USER_FUNCTIONS.functionAnalistaDeCuentasPorCobrar,
    ),
    EVI: !!includes(functions, ENUM_USER_FUNCTIONS.functionEvi),
    EVE: !!includes(functions, ENUM_USER_FUNCTIONS.functionEve),
    ESAC: !!includes(functions, ENUM_USER_FUNCTIONS.functionEsac),
    CoordinadorDeServicioAlCliente: !!includes(
      functions,
      ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente,
    ),
  };
  return body;
});
export const selectAccountsReceivableAnalystValidation = createSelector(
  selectMailboxState,
  selectCurrentMailReferencesClasifications,
  selectUserFunctions,
  selectSomeClassificationIsSelected,
  (
    state: MailboxState,
    classifications: Array<CorreoRecibidoClienteCustom>,
    functions,
    classificationSelected,
  ) =>
    (classificationSelected && !classifications[0].IsSelected) ||
    (classifications[0].IsSelected &&
      classificationSelected &&
      classifications[0].CorreoRecibidoClienteReferencia.length > 0 &&
      !classifications[0].ErrorDeCartera) ||
    (classifications[0].IsSelected &&
      classificationSelected &&
      classifications[0].CorreoRecibidoClienteReferencia.length > 0 &&
      classifications[0].ErrorDeCartera &&
      !isEmpty(classifications[0].UsuarioErrorCarteraSelect)),
);

export const selectEviValidation = createSelector(
  selectMailboxState,
  selectCurrentMailReferencesClasifications,
  selectUserFunctions,
  selectSomeClassificationIsSelected,
  (
    state: MailboxState,
    classifications: Array<CorreoRecibidoClienteCustom>,
    functions,
    classificationSelected,
  ) =>
    classifications[2].IsSelected
      ? classifications[2].CorreoRecibidoComentarios.length > 0 && classifications[2].IsSelected
      : classificationSelected,
  /*(classificationSelected && !classifications[2].IsSelected && !classifications[1].IsSelected) ||
    ((classifications[1].IsSelected
      ? classificationSelected &&
        classifications[1].CorreoRecibidoClienteReferencia.length > 0 &&
        (!classifications[1].ErrorDeCartera
          ? !classifications[1].ErrorDeCartera
          : !_.isEmpty(classifications[1].UsuarioErrorCarteraSelect))
      : !classifications[1].IsSelected) &&
      (classifications[2].IsSelected
        ? classificationSelected &&
          classifications[2].CorreoRecibidoComentarios.length > 0 &&
          (!classifications[2].ErrorDeCartera
            ? !classifications[2].ErrorDeCartera
            : !_.isEmpty(classifications[2].UsuarioErrorCarteraSelect))
        : !classifications[2].IsSelected)),*/
);
export const selectEveValidation = createSelector(
  selectMailboxState,
  selectCurrentMailReferencesClasifications,
  selectUserFunctions,
  (state: MailboxState, functions) => {
    return false;
  },
);
export const selectEsacValidation = createSelector(
  selectMailboxState,
  selectCurrentMailReferencesClasifications,
  selectUserFunctions,
  isNewClient,
  selectSomeClassificationIsSelected,
  (
    state: MailboxState,
    classifications: Array<CorreoRecibidoClienteCustom>,
    functions,
    newClient,
    classificationSelected,
  ) =>
    (newClient ? state.selectedMail?.selectedClientToDrop?.label !== 'Cliente Nuevo' : true) &&
    (classifications[1].IsSelected
      ? classifications[1].CorreoRecibidoClienteReferencia.length > 0 &&
        classifications[1].IsSelected
      : classificationSelected),
  /*    (classificationSelected &&
      !classifications[3].IsSelected &&
      !classifications[4].IsSelected &&
      !classifications[5].IsSelected) ||
    (classifications[3].IsSelected &&
      classificationSelected &&
      classifications[3].CorreoRecibidoComentarios.length > 0 &&
      (!classifications[4].IsSelected
        ? !classifications[4].IsSelected
        : classifications[4].CorreoRecibidoComentarios.length > 0) &&
      (!classifications[5].IsSelected
        ? !classifications[5].IsSelected
        : classifications[5].CorreoRecibidoComentarios.length > 0)) ||
    (classifications[4].IsSelected &&
      classificationSelected &&
      classifications[4].CorreoRecibidoComentarios.length > 0 &&
      (!classifications[3].IsSelected
        ? !classifications[3].IsSelected
        : classifications[3].CorreoRecibidoComentarios.length > 0) &&
      (!classifications[5].IsSelected
        ? !classifications[5].IsSelected
        : classifications[5].CorreoRecibidoComentarios.length > 0)) ||
    (classifications[5].IsSelected &&
      classificationSelected &&
      classifications[5].CorreoRecibidoComentarios.length > 0 &&
      (!classifications[3].IsSelected
        ? !classifications[3].IsSelected
        : classifications[3].CorreoRecibidoComentarios.length > 0) &&
      (!classifications[4].IsSelected
        ? !classifications[4].IsSelected
        : classifications[4].CorreoRecibidoComentarios.length > 0)),*/
);
export const selectCustomerServiceCoordinatorValidation = createSelector(
  selectMailboxState,
  selectCurrentMailReferencesClasifications,
  selectUserFunctions,
  selectSomeClassificationIsSelected,
  selectDefaultClassificationIsSelected,
  isNewClient,
  (
    state: MailboxState,
    classifications: Array<CorreoRecibidoClienteCustom>,
    functions,
    classificationSelected,
    defaultSelected,
    newClient,
  ) =>
    (classificationSelected && !classifications[1].IsSelected) ||
    (classifications[1].IsSelected &&
      classificationSelected &&
      classifications[1].CorreoRecibidoClienteReferencia.length > 0 &&
      !classifications[1].ErrorDeCartera) ||
    (classifications[1].IsSelected &&
      classificationSelected &&
      classifications[1].CorreoRecibidoClienteReferencia.length > 0 &&
      classifications[1].ErrorDeCartera &&
      !isEmpty(classifications[1].UsuarioErrorCarteraSelect) &&
      (newClient ? state.selectedMail.selectedClientToDrop?.label !== 'Cliente Nuevo' : true)),
);
export const selectButtonValidationByRol = createSelector(
  [
    selectMailbox,
    selectUserFunctions,
    selectAccountsReceivableAnalystValidation,
    selectEviValidation,
    selectEveValidation,
    selectEsacValidation,
    selectCustomerServiceCoordinatorValidation,
  ],
  (
    state: MailboxState,
    functions: Array<string>,
    accountsReceivableAnalystValidation: boolean,
    EviValidation: boolean,
    EveValidation: boolean,
    EsacValidation: boolean,
    CustomerServiceCoordinatorValidation: boolean,
  ): boolean =>
    includes(functions, ENUM_USER_FUNCTIONS.functionAnalistaDeCuentasPorCobrar)
      ? accountsReceivableAnalystValidation
      : includes(functions, ENUM_USER_FUNCTIONS.functionEvi)
      ? EviValidation
      : includes(functions, ENUM_USER_FUNCTIONS.functionEve)
      ? EveValidation
      : includes(functions, ENUM_USER_FUNCTIONS.functionEsac)
      ? EsacValidation
      : includes(functions, ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente)
      ? CustomerServiceCoordinatorValidation
      : false,
);
export const selectDeleteMailPop = createSelector(
  selectMailbox,
  (state): boolean => state.deleteMailPop,
);
