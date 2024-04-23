import {createReducer, on} from '@ngrx/store';
import {filter, find, findIndex, map as _map} from 'lodash-es';

import {
  ICardMark,
  initialAccountBankForm,
  initialCatBanco,
  initialDatosBancarios,
  initialLogisticsAndPayments,
  initialPayment,
  LogisticsAndPayments,
  Payment,
  RutaEntrega,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.model';
import {CatMarcaTarjeta, ConfiguracionPagosDatosBancariosDetalle} from 'api-catalogos';
import {Proveedor} from '@appInterfaces/catalogos';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';

// Actions
import * as logisticActions from '@appActions/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.actions';
import * as addEditProvidersActions from '@appActions/forms/providers/providers-details/providers-details.actions';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {paymentMethods} from '@appUtil/common.protocols';

const initialStateLogisticsAndPayments: LogisticsAndPayments = {
  ...initialLogisticsAndPayments(),
};
export const logisticsAndPaymentsReducer = createReducer(
  initialStateLogisticsAndPayments,
  on(
    addEditProvidersActions.SET_INITIAL_DATA_ADD_EDIT_PROVIDER,
    logisticActions.CLEAN_ALL_LOGISTIC_STATE,
    (state, action) => initialLogisticsAndPayments(),
  ),
  on(logisticActions.SET_PROVIDER, (state, {provider}) => ({
    ...state,
    logistics: provider,
  })),
  on(logisticActions.GET_CAT_ROUTES_SUCCESS, (state, {list, catUnitTime}) => {
    const newRouteList = _map(
      list,
      (o: RutaEntrega): RutaEntrega => ({
        ...o,
        idSelected: find(catUnitTime, (i: DropListOption) => i.label === 'Dias').value,
      }),
    );
    return {
      ...state,
      routeList: newRouteList,
      routeListBackUp: newRouteList,
    };
  }),
  on(logisticActions.SAVE_DELIVERY_TIME, (state, {data, value, index}) => ({
    ...state,
    routeList: _map(state.routeList, (o: RutaEntrega, i) => {
      if (i === index) {
        return {...o, [`${data}`]: value};
      }
      return o;
    }),
  })),
  on(logisticActions.GET_CAT_BANK_SUCCESS, (state, {listCatBanco}) => ({
    ...state,
    bankAccounts: {listCatBanco, needsToReload: false},
  })),
  on(logisticActions.UPDATE_ROUTE_LIST_BACKUP, (state) => ({
    ...state,
    routeListBackUp: state.routeList,
  })),

  on(logisticActions.SET_CREDIT_LIMIT, (state, {value}) => ({
    ...state,
    payment: {
      ...state.payment,
      configuracionPagos: {
        ...state.payment.configuracionPagos,
        LimiteLineaCredito: value,
      },
    },
  })),
  on(logisticActions.SET_FREIGHT_CONFIG, (state, {input, value}) => {
    return {
      ...state,
      logistics: {
        ...state.logistics,
        [input]: value,
      },
    };
  }),
  on(logisticActions.CLEAN_LOGISTIC_CONFIG, (state) => ({
    ...state,
    logistics: {
      ...state.logistics,
      TieneFleteExpress: false,
      ConceptoFleteExpress: '',
      LeyendaFleteExpress: '',
      PrecioFleteExpress: 0,
    },
    routeList: _map(state.routeList, (o: RutaEntrega) => {
      return {
        ...o,
        ValorEsperado: 0,
      };
    }),
  })),
  on(logisticActions.SET_CONDITION_PAYMENT, (state, {event}) => ({
    ...state,
    payment: {
      ...state.payment,
      configuracionPagos: {
        ...state.payment.configuracionPagos,
        IdCatCondicionesDePago: event.value,
        LimiteLineaCredito: event.sinCredito
          ? null
          : state.payment.configuracionPagos.LimiteLineaCredito,
        LineaCredito: event.sinCredito ? null : state.payment.configuracionPagos.LimiteLineaCredito,
      },
    },
  })),
  on(logisticActions.SET_CREDTI_LINE, (state, {value}) => ({
    ...state,
    payment: {
      ...state.payment,
      configuracionPagos: {
        ...state.payment.configuracionPagos,
        LineaCredito: value,
        LimiteLineaCredito: value,
      },
    },
  })),
  on(logisticActions.SET_DATA_TRANSFER_AND_CARD, (state, {tipo, parametro, value}) => ({
    ...state,
    payment: {
      ...state.payment,
      [`${tipo}`]: {
        ...state.payment[`${tipo}`],
        datosBancarios: {
          ...state.payment[`${tipo}`].datosBancarios,
          [`${parametro}`]: value,
        },
      },
    },
  })),
  on(logisticActions.UPDATE_ID_DELIVERY_TIME, (state, {item}) => ({
    ...state,
    routeList: state.routeList.map((ite: RutaEntrega) => {
      if (item.identificador === ite.identificador) {
        return (ite = {
          ...ite,
          IdValorConfiguracionTiempoEntrega: item.IdValorConfiguracionTiempoEntrega,
          IdConfiguracionTiempoEntregaProveedor: item.IdConfiguracionTiempoEntregaProveedor,
        });
      }
      return ite;
    }),
    routeListBackUp: state.routeListBackUp.map((ite: RutaEntrega) => {
      if (item.identificador === ite.identificador) {
        return (ite = {
          ...ite,
          IdValorConfiguracionTiempoEntrega: item.IdValorConfiguracionTiempoEntrega,
          IdConfiguracionTiempoEntregaProveedor: item.IdConfiguracionTiempoEntregaProveedor,
        });
      }
      return ite;
    }),
  })),
  on(logisticActions.SET_ID_CONFIGURATION_PAYMENT, (state) => ({...state})),
  on(logisticActions.SET_IDS_PAYMENTS, (state, {item}) => ({
    ...state,
    payment: {
      ...state.payment,
      [`${item.NameProperty}`]: {
        ...state.payment[`${item.NameProperty}`],
        datosBancarios: {
          ...state.payment[`${item.NameProperty}`].datosBancarios,
          IdDatosBancarios: item.IdDatosBancarios,
        },
        IdCatMedioDePago: item.IdCatMedioDePago,
        IdDatosBancarios: item.IdDatosBancarios,
        IdConfiguracionPagos: item.IdConfiguracionPagos,
        IdConfiguracionPagosDatosBancarios: item.IdConfiguracionPagosDatosBancarios,
      },
    },
  })),
  on(logisticActions.SET_DATAS_TIME_DELIVERY, (state, {list}) => ({
    ...state,
    routeList: state.routeList.map((ite: RutaEntrega) => {
      const index = findIndex(list, (o) => {
        return o.id.toUpperCase() === ite.id.toUpperCase();
      });
      if (index >= 0) {
        return (ite = {
          ...ite,
          IdValorConfiguracionTiempoEntrega: list[index].IdValorConfiguracionTiempoEntrega,
          IdConfiguracionTiempoEntregaProveedor: list[index].IdConfiguracionTiempoEntregaProveedor,
          ValorEsperado: list[index].ValorEsperado,
          id: list[index].id,
          idSelected: list[index].idSelected,
        });
      }
      return ite;
    }),
  })),
  on(logisticActions.GET_CONFIGURATION_PAYMENT, (state, {itemConfiguracionPagos}) => ({
    ...state,
    payment: {...state.payment, configuracionPagos: itemConfiguracionPagos},
  })),
  on(logisticActions.GET_BANK_DATAS, (state, {item}) => ({
    ...state,
    payment: {...state.payment, [`${item.NameProperty}`]: item},
  })),
  on(logisticActions.SET_LOGISTIC_AND_PAYMENT_BACKUP, (state) => ({
    ...state,
    logisticsBackUp: state.logistics,
    routeListBackUp: state.routeList,
    paymentBackUp: state.payment,
    cardMarkListBackup: state.cardMarkList,
  })),
  on(logisticActions.RESTORE_LOGISTIC_AND_PAYMENT_BACKUP, (state) => {
    return {
      ...state,
      logistics: state.logisticsBackUp,
      logisticsBackUp: {} as Proveedor,
      routeList: state.routeListBackUp,
      routeListBackUp: [],
      payment: state.paymentBackUp,
      paymentBackUp: initialPayment(),
      accountsBankForm: initialAccountBankForm(),
    };
  }),
  on(logisticActions.FETCH_ACCOUNTS_BANK_SUCCESS, (state, {accounts}) => ({
    ...state,
    payment: {
      ...state.payment,
      bankAccounts: accounts,
    },
  })),
  on(logisticActions.UPDATE_CARD_MARK_LIST, (state, {cardsSaved}) => ({
    ...state,
    cardMarkList: _map(
      state.cardMarkList,
      (o: ICardMark): ICardMark => {
        if (
          find(
            cardsSaved,
            (p: ConfiguracionPagosDatosBancariosDetalle) =>
              o.IdCatMarcaTarjeta === p.IdCatMarcaTarjeta,
          )
        ) {
          return {
            ...o,
            isChecked: true,
          };
        }
        return o;
      },
    ),
  })),
  on(
    logisticActions.SET_PAYMENT_METHOD,
    (state, {value}): LogisticsAndPayments => ({
      ...state,
      accountsBankForm: {
        ...state.accountsBankForm,
        catMedioDePago: {
          ...state.accountsBankForm.catMedioDePago,
          IdCatMedioDePago: value.value.toString(),
          MedioDePago: value.label,
          Clave: value?.labelKey,
        },
        catBanco: initialCatBanco(),
        DatosBancarios:
          value.label === 'Tarjeta de crédito'
            ? {...initialDatosBancarios(), IdDatosBancarios: null}
            : initialDatosBancarios(),
        IdConfiguracionPagos: state.logistics.IdConfiguracionPagos,
        IdCatMedioDePago: value.value.toString(),
      },
    }),
  ),
  on(
    logisticActions.SET_BANK_OPTION,
    (state, {value}): LogisticsAndPayments => ({
      ...state,
      accountsBankForm: {
        ...state.accountsBankForm,
        catBanco: {
          ...state.accountsBankForm.catBanco,
          IdCatBanco: value.value.toString(),
          Banco: value.label,
        },
        DatosBancarios: {
          ...state.accountsBankForm.DatosBancarios,
          IdCatBanco: value.value.toString(),
        },
      },
    }),
  ),
  on(logisticActions.SET_BANK_DATA, (state, {input, value}) => ({
    ...state,
    accountsBankForm: {
      ...state.accountsBankForm,
      DatosBancarios: {
        ...state.accountsBankForm.DatosBancarios,
        [input]: value,
      },
    },
  })),
  on(logisticActions.ADD_ACCOUNT, (state) => {
    let accounts = state.payment.bankAccounts;
    if (state.accountsBankForm.catMedioDePago.Clave === paymentMethods.creditCard) {
      const itemsChecked = filter(state.cardMarkList, (o: ICardMark) => {
        if (
          !find(
            state.payment.bankAccounts,
            (p: ConfiguracionPagosDatosBancariosDetalle) =>
              p.IdCatMarcaTarjeta === o.IdCatMarcaTarjeta,
          )
        ) {
          if (o.isChecked) {
            return true;
          }
        }
      });
      for (const item of itemsChecked) {
        accounts = [
          ...accounts,
          {
            ...state.accountsBankForm,
            IdCatMarcaTarjeta: item.IdCatMarcaTarjeta,
          },
        ];
      }
    } else {
      accounts = [...accounts, state.accountsBankForm];
    }
    return {
      ...state,
      payment: {
        ...state.payment,
        bankAccounts: accounts,
      },
      accountsBankForm: initialAccountBankForm(),
    };
  }),
  on(logisticActions.DELETE_SELECTED_ACCOUNT, (state, {account}) => ({
    ...state,
    payment: {
      ...state.payment,
      bankAccounts: filter(
        state.payment.bankAccounts,
        (o: ConfiguracionPagosDatosBancariosDetalle) => o !== account,
      ),
      accountsToDelete:
        account.IdConfiguracionPagosDatosBancarios !== ''
          ? [...state.payment.accountsToDelete, account]
          : [...state.payment.accountsToDelete],
    },
    cardMarkList: account.IdCatMarcaTarjeta
      ? _map(state.cardMarkList, (o: ICardMark) => {
          if (o.IdCatMarcaTarjeta === account.IdCatMarcaTarjeta) {
            return {
              ...o,
              isChecked: false,
            };
          }
          return o;
        })
      : state.cardMarkList,
  })),
  on(logisticActions.SAVE_PAYMENT_CONDITIONS_SUCCESS, (state, {IdConfiguracionPagos}) => ({
    ...state,
    logistics: {
      ...state.logistics,
      IdConfiguracionPagos,
    },
    payment: {
      ...state.payment,
      bankAccounts: _map(
        state.payment.bankAccounts,
        (o: ConfiguracionPagosDatosBancariosDetalle) => ({...o, IdConfiguracionPagos}),
      ),
      configuracionPagos: {
        ...state.payment.configuracionPagos,
        IdConfiguracionPagos,
      },
    },
  })),
  on(logisticActions.SAVE_ROUTE_LIST_SUCCESS, (state, {routeList}) => ({
    ...state,
    routeList: _map(state.routeList, (o: RutaEntrega, index) => {
      return {
        ...o,
        IdValorConfiguracionTiempoEntrega: routeList[index].IdValorConfiguracionTiempoEntrega,
      };
    }),
  })),
  on(logisticActions.SAVE_PROVIDER_DELIVERY_TIME_SUCCESS, (state, {config}) => ({
    ...state,
    routeList: _map(state.routeList, (o: RutaEntrega, index) => {
      return {
        ...o,
        IdConfiguracionTiempoEntregaProveedor: config[index].IdConfiguracionTiempoEntregaProveedor,
      };
    }),
  })),
  on(
    logisticActions.SET_ID_DATOS_BANCARIOS,
    (state, {IdDatosBancarios, index}): LogisticsAndPayments => ({
      ...state,
      payment: {
        ...state.payment,
        bankAccounts: _map(
          state.payment.bankAccounts,
          (o: ConfiguracionPagosDatosBancariosDetalle, i) => {
            if (i === index) {
              return {
                ...o,
                DatosBancarios: {
                  ...o.DatosBancarios,
                  IdDatosBancarios,
                },
                IdDatosBancarios,
              };
            }
            return o;
          },
        ),
      },
    }),
  ),
  on(catalogsActions.GET_CAT_MARCA_TARJETA_SUCCESS, (state, {listCatCardMark}) => ({
    ...state,
    cardMarkList: _map(
      listCatCardMark,
      (o: CatMarcaTarjeta): ICardMark => {
        return {
          ...o,
          isChecked: false,
        };
      },
    ),
  })),
  on(logisticActions.SET_CHECK_VALUE, (state, {idCheck, value}) => ({
    ...state,
    cardMarkList: _map(state.cardMarkList, (o: ICardMark) => {
      if (o.IdCatMarcaTarjeta === idCheck) {
        return {
          ...o,
          isChecked: value,
        };
      }
      return o;
    }),
  })),
  on(
    logisticActions.SET_ID_CONFIGURACION_PAGOS_DATOS_BANCARIOS,
    (state, {IdConfiguracionPagosDatosBancarios, index}) => ({
      ...state,
      payment: {
        ...state.payment,
        bankAccounts: _map(
          state.payment.bankAccounts,
          (o: ConfiguracionPagosDatosBancariosDetalle, i) => {
            if (i === index) {
              return {
                ...o,
                IdConfiguracionPagosDatosBancarios,
              };
            }
            return o;
          },
        ),
      },
    }),
  ),
  on(logisticActions.CLEAN_BACK_UP, (state) => ({
    ...state,
    logisticsBackUp: {} as Proveedor,
    routeListBackUp: [],
    payment: {
      ...state.payment,
      accountsToDelete: [],
    },
    paymentBackUp: {} as Payment,
  })),
);
