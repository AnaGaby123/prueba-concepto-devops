import {createReducer, on} from '@ngrx/store';
import {filter, find, findIndex, forEach, map as _map} from 'lodash-es';

// Models
import {
  initialTrademark,
  IVTrademarkDetail,
  IVTrademarkFamilyDetail,
  Trademark,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-4-trademark.model';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';

// Actions
import * as actionsTrademarkPovider from '@appActions/forms/providers/providers-details/provider-form-step-4-trademark.actions';
import * as addEditProvidersActions from '@appActions/forms/providers/providers-details/providers-details.actions';
import {trademarkProviderActions} from '@appActions/forms/providers';

const initialStateTradeMark: Trademark = {
  ...initialTrademark(),
};

export const trademarkReducer = createReducer(
  initialStateTradeMark,
  on(
    addEditProvidersActions.SET_INITIAL_DATA_ADD_EDIT_PROVIDER,
    trademarkProviderActions.CLEAN_TRADEMARK_OFFER_STATE,
    (state, action) => initialTrademark(),
  ),
  on(
    actionsTrademarkPovider.GET_PROVIDER_SUCCESS,
    (state: Trademark, {provider}): Trademark => ({
      ...state,
      provider,
    }),
  ),
  on(actionsTrademarkPovider.GET_TRADEMARK_LIST_LOAD, (state, action) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: action.isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
    tradeMarkStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(
    actionsTrademarkPovider.GET_ASSOCIATES_TRADEMARK_LOAD,
    (state: Trademark): Trademark => ({
      ...state,
      associatedTradeMarkStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(actionsTrademarkPovider.GET_TRADEMARK_LIST_SUCCESS, (state, {response}) => ({
    ...state,
    tradeMarkList: {
      ...state.tradeMarkList,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...response.Results]
          : [...state.tradeMarkList.Results, ...response.Results],
      TotalResults: response.TotalResults,
    },
    tradeMarkStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(
    actionsTrademarkPovider.CLEAR_TRADEMARK_LIST,
    (state: Trademark): Trademark => ({
      ...state,
      queryInfo: {...state.queryInfo, desiredPage: 1},
      tradeMarkStatus: API_REQUEST_STATUS_LOADING,
      tradeMarkList: {
        Results: [],
        TotalResults: 0,
      },
    }),
  ),
  on(actionsTrademarkPovider.GET_TRADEMARK_LIST_ERROR, (state) => ({
    ...state,
    tradeMarkStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(actionsTrademarkPovider.SET_ASSOCIATED_TRADEMARK, (state, {trademark}) => ({
    ...state,
    associatedList:
      findIndex(state.associatedList, (o) => {
        return o.IdMarca === trademark.IdMarca;
      }) === -1
        ? [...state.associatedList, trademark]
        : [...state.associatedList],
  })),
  on(
    actionsTrademarkPovider.GET_TRADEMARK_FAMILIES_LIST_SUCCESS,
    (state: Trademark, {trademarkId, trademarkFamilies}): Trademark => ({
      ...state,
      associatedList: _map(state.associatedList, (trademark: IVTrademarkDetail) => ({
        ...trademark,
        vMarcaFamiliaDetalle:
          trademarkId === trademark.IdMarca ? trademarkFamilies : trademark.vMarcaFamiliaDetalle,
      })),
    }),
  ),
  // DOCS: Asocia la MarcaFamilia al Proveedor que se esta trabajando
  on(
    actionsTrademarkPovider.SET_TRADEMARK_FAMILY_VALUE,
    (state: Trademark, {familyChange}): Trademark => ({
      ...state,
      associatedList: _map(
        state.associatedList,
        (trademark: IVTrademarkDetail): IVTrademarkDetail => ({
          ...trademark,
          vMarcaFamiliaDetalle:
            trademark.IdMarca === familyChange.family.IdMarca // DOCS: Encontramos la Marca
              ? _map(
                  trademark.vMarcaFamiliaDetalle,
                  (o: IVTrademarkFamilyDetail): IVTrademarkFamilyDetail => ({
                    ...o,
                    MarcaFamiliaProveedor:
                      o.IdMarcaFamilia === familyChange.family.IdMarcaFamilia // DOCS: Encontramos la MarcaFamilia
                        ? familyChange.value // DOCS: Evalua si esta marcando o desmarcando
                          ? o.MarcaFamiliaProveedor // DOCS: Evalua si ya existe una configuración
                            ? {...o.MarcaFamiliaProveedor, Activo: true}
                            : {
                                IdMarcaFamiliaProveedor: DEFAULT_UUID,
                                IdMarcaFamilia: o.IdMarcaFamilia,
                                IdProveedor: state.provider.IdProveedor,
                                FechaRegistro: DEFAULT_DATE,
                                Activo: true,
                              }
                          : o.MarcaFamiliaProveedor?.IdMarcaFamiliaProveedor !== DEFAULT_UUID // DOCS: Si esta desmarcando puede que ya venga e objeto desde BD
                          ? {...o.MarcaFamiliaProveedor, Activo: false}
                          : null
                        : o.MarcaFamiliaProveedor,
                    IdProveedor:
                      o.IdMarcaFamilia === familyChange.family.IdMarcaFamilia // DOCS: Encontramos la MarcaFamilia
                        ? familyChange.value // DOCS: Evalua si esta marcando o desmarcando
                          ? o.IdProveedorBackup // DOCS: Evalua si ya hay un proveedor principal
                            ? o.IdProveedorBackup // DOCS: Deja el proveedor principal
                            : state.provider.IdProveedor // DOCS: Si no hay un principal lo asigna como principal
                          : o.IdProveedorBackup // DOCS: Si esta desmarcando le regresa el valor original
                        : o.IdProveedor,
                  }),
                )
              : trademark.vMarcaFamiliaDetalle,
        }),
      ),
    }),
  ),

  // DOCS: Marca el actual proveedor como el principal para la MarcaFamilia seleccionada
  on(
    actionsTrademarkPovider.SET_MAIN_PROVIDER_TRADEMARK_FAMILY_VALUE,
    (state: Trademark, {familyChange}) => ({
      ...state,
      associatedList: _map(state.associatedList, (trademark: IVTrademarkDetail) => ({
        ...trademark,
        vMarcaFamiliaDetalle:
          trademark.IdMarca === familyChange.family.IdMarca // DOCS: Encontramos la Marca
            ? _map(trademark.vMarcaFamiliaDetalle, (o: IVTrademarkFamilyDetail) => ({
                ...o,
                IdProveedor:
                  o.IdMarcaFamilia === familyChange.family.IdMarcaFamilia // DOCS: Encontramos la MarcaFamilia
                    ? familyChange.value // DOCS: Evalua si esta marcando o desmarcando
                      ? state.provider.IdProveedor // DOCS: Si esta marcando le colocamos el IdProveedor actual
                      : o.IdProveedorBackup // DOCS: Si esta desmarcando le regresa el valor original
                    : o.IdProveedor,
              }))
            : trademark.vMarcaFamiliaDetalle,
      })),
    }),
  ),
  on(
    actionsTrademarkPovider.DELETE_ASSOCIATED_TRADEMARK,
    (state: Trademark, {trademarkId}): Trademark => {
      const deletedTrademark = find(
        state.associatedList,
        (o: IVTrademarkDetail) => o.IdMarca === trademarkId,
      );

      let hasConfig = false;
      forEach(deletedTrademark.vMarcaFamiliaDetalle, (o: IVTrademarkFamilyDetail) => {
        if (
          o.MarcaFamiliaProveedor &&
          (o.MarcaFamiliaProveedor.Activo || o.MarcaFamiliaProveedor.original)
        ) {
          hasConfig = true;
        }
      });
      return {
        ...state,
        associatedList: filter(
          state.associatedList,
          (o: IVTrademarkDetail) => o.IdMarca !== trademarkId,
        ),
        disableAssociated:
          findIndex(
            state.disableAssociated,
            (o: IVTrademarkDetail) => o.IdMarca === trademarkId,
          ) === -1 && hasConfig // DOCS: Si no tiene ninguna configuración hecha, es decir es nueva, no debe agregarse a la lista por eliminar
            ? [
                ...state.disableAssociated,
                {
                  ...deletedTrademark,
                  vMarcaFamiliaDetalle: _map(
                    deletedTrademark.vMarcaFamiliaDetalle,
                    (o: IVTrademarkFamilyDetail) => ({
                      ...o,
                      IdProveedor:
                        state.provider.IdProveedor === o.IdProveedorBackup // DOCS: Si originalmente era el proveedor principal deja de serlo
                          ? null
                          : o.IdProveedorBackup,
                      MarcaFamiliaProveedor: o.MarcaFamiliaProveedor // DOCS: Desactivamos la configuración para desasociarlo
                        ? {...o.MarcaFamiliaProveedor, Activo: false}
                        : o.MarcaFamiliaProveedor,
                    }),
                  ),
                },
              ]
            : [...state.disableAssociated],
      };
    },
  ),
  on(actionsTrademarkPovider.FILTER_TRADEMAK, (state, action) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: action.isfirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
    tradeMarkStatus: API_REQUEST_STATUS_LOADING,
    filter: action.filter,
  })),
  on(actionsTrademarkPovider.SEARCH_FILTER_TRADEMAK, (state, action) => ({
    ...state,
    termSearch: action.searchTerm,
  })),
  on(
    actionsTrademarkPovider.GET_ASSOCIATES_TRADEMARK_SUCCESS,
    (state: Trademark, {list}): Trademark => ({
      ...state,
      associatedList: list,
      associatedTradeMarkStatus: API_REQUEST_STATUS_SUCCEEDED,
      backUpAssociated: {
        ...state.backUpAssociated,
        associatedList: list,
        deleteTradeMark: state.disableAssociated,
      },
    }),
  ),
  on(
    actionsTrademarkPovider.GET_ASSOCIATES_TRADEMARK_ERROR,
    (state: Trademark): Trademark => ({
      ...state,
      associatedTradeMarkStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(actionsTrademarkPovider.SET_TRADEMARK_BACKUP, (state: Trademark, action) => ({
    ...state,
    backUpAssociated: {
      ...state.backUpAssociated,
      listTradeMark: state.associatedList,
      deleteTradeMark: state.disableAssociated,
    },
  })),
  on(actionsTrademarkPovider.RESTORE_TRADEMARK_BACKUP, (state, actions) => ({
    ...state,
    associatedList: state.backUpAssociated.associatedList,
    disableAssociated: state.backUpAssociated.deleteTradeMark,
  })),
  on(actionsTrademarkPovider.UPDATE_IS_FIRST_LOADING, (state, {value}) => ({
    ...state,
    firstLoading: value,
  })),
  on(actionsTrademarkPovider.SET_IS_OPEN_TRADEMARK_POP_UP, (state, {value}) => ({
    ...state,
    isOpenTrademarkPop: value,
  })),
);
