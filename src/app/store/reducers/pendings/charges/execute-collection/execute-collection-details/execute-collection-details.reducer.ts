/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  IExecuteCollectionDetails,
  IExecuteCollectionPayment,
  IFccNotaCredito,
  IInvoice,
  initialIExecuteCollectionDetails,
  IPaymentTransaction,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IUploadFileCustom} from '@appModels/files/files.models';
import {initialIRebill} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';

// Actions
import {executeCollectionDetailsActions} from '@appActions/pendings/charges/execute-collection';

// Utils
import {filter, isEmpty, map, toLower, toNumber} from 'lodash-es';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {FccPagoFacturaPedido} from 'api-finanzas';

export const executeCollectionDetailsReducer: ActionReducer<IExecuteCollectionDetails> = createReducer(
  {...initialIExecuteCollectionDetails()},
  on(
    executeCollectionDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): IExecuteCollectionDetails => ({
      ...initialIExecuteCollectionDetails(),
    }),
  ),
  on(
    executeCollectionDetailsActions.CLEAN_PAYMENT_TRANSACTION,
    (state: IExecuteCollectionDetails): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {} as IPaymentTransaction,
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_SELECTED_CLIENT,
    (state: IExecuteCollectionDetails, {selectedClient}): IExecuteCollectionDetails => ({
      ...state,
      selectedClient,
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_SEARCH_TERM,
    (state: IExecuteCollectionDetails, {searchTerm}): IExecuteCollectionDetails => ({
      ...state,
      searchTerm,
      needsToReload: true,
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_SELECTED_BURGER_OPTION,
    (state: IExecuteCollectionDetails, {burgerOptionSelected}): IExecuteCollectionDetails => ({
      ...state,
      burgerOptionSelected,
      needsToReload: true,
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_ITEMS_STATUS,
    (state: IExecuteCollectionDetails, {itemsStatus}): IExecuteCollectionDetails => ({
      ...state,
      itemsStatus,
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_PAYMENTS_STATUS,
    (state: IExecuteCollectionDetails, {paymentStatus}): IExecuteCollectionDetails => ({
      ...state,
      paymentStatus,
    }),
  ),
  on(
    executeCollectionDetailsActions.INITIAL_PAYMENT,
    (state: IExecuteCollectionDetails, {selectedPayment}): IExecuteCollectionDetails => ({
      ...state,
      selectedPayment,
      needsToReload: false,
    }),
  ),
  on(
    executeCollectionDetailsActions.FETCH_PAYMENT_BARS_SUCCESS,
    (state: IExecuteCollectionDetails, {barsData}): IExecuteCollectionDetails => ({
      ...state,
      barsData,
    }),
  ),
  on(
    executeCollectionDetailsActions.FETCH_PAYMENTS_SUCCESS,
    (state: IExecuteCollectionDetails, {paymentList}): IExecuteCollectionDetails => ({
      ...state,
      paymentList,
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_SELECTED_PAYMENT,
    (state: IExecuteCollectionDetails, {paymentId}): IExecuteCollectionDetails => ({
      ...state,
      paymentList: map(state.paymentList, (o: IExecuteCollectionPayment) => {
        if (o.IdFCCFolioPagoCliente === state.selectedPayment.IdFCCFolioPagoCliente) {
          return {
            ...state.selectedPayment,
            isSelected: o.IdFCCFolioPagoCliente === paymentId,
          };
        } else if (o.IdFCCFolioPagoCliente === paymentId) {
          return {...o, isSelected: true};
        }
        return {...o, isSelected: false};
      }),
      selectedPayment: filter(
        state.paymentList,
        (o: IExecuteCollectionPayment) => o.IdFCCFolioPagoCliente === paymentId,
      )[0],
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_SELECTED_DROP_OPTION,
    (state: IExecuteCollectionDetails, {node, selectedOption}): IExecuteCollectionDetails => ({
      ...state,
      [node]: selectedOption,
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_SELECTED_PAYMENT_SEARCH_TERM,
    (state: IExecuteCollectionDetails, {searchTerm}): IExecuteCollectionDetails => ({
      ...state,
      billsSearchTerm: searchTerm,
    }),
  ),
  on(
    executeCollectionDetailsActions.FETCH_CLIENT_CONTACT_SUCCESS,
    (state: IExecuteCollectionDetails, {clientContact}): IExecuteCollectionDetails => ({
      ...state,
      selectedPayment: {
        ...state.selectedPayment,
        clientContact,
        needsToReloadItems: false,
      },
    }),
  ),
  on(executeCollectionDetailsActions.FETCH_DATA_TABS_SUCCESS, (state, {tabs}) => ({
    ...state,
    totalsTabs: tabs,
    selectedTab: {
      id: '0',
      label: 'Todas las empresas',
      activeSubtitle: true,
      labelSubtitle: 'facturas',
      totalSubtitle: 0,
    },
  })),
  on(executeCollectionDetailsActions.SET_OPTION_TAB, (state, {tab}) => ({
    ...state,
    selectedTab: tab,
  })),
  on(executeCollectionDetailsActions.FETCH_LIST_INVOICE_SUCCESS, (state, {itemsList}) => ({
    ...state,
    itemsList,
    itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(executeCollectionDetailsActions.FETCH_LIST_INVOICE_FAILED, (state) => ({
    ...state,
    itemsStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(executeCollectionDetailsActions.SET_SELECTED_BILL, (state, {bill}) => ({
    ...state,
    itemsList: map(state.itemsList, (item) => {
      if (bill.IdTPProformaPedido === item.IdTPProformaPedido) {
        return {...item, selected: !item.selected};
      }
      return {...item};
    }),
  })),
  on(executeCollectionDetailsActions.FETCH_REQUEST_SUCCESS, (state, {email}) => ({
    ...state,
    selectedPayment: {...state.selectedPayment, clientEmail: email},
  })),
  on(executeCollectionDetailsActions.FETCH_FILES_MAIL_SUCCESS, (state, {file}) => ({
    ...state,
    selectedPayment: {...state.selectedPayment, filesEmail: file},
  })),
  on(executeCollectionDetailsActions.SET_OPEN_VIEW_FILE, (state, {active}) => ({
    ...state,
    selectedPayment: {...state.selectedPayment, openViewFile: active},
  })),
  on(executeCollectionDetailsActions.VIEW_FILE_SUCCESS, (state, {fileBase64}) => ({
    ...state,
    selectedPayment: {...state.selectedPayment, fileBase64},
  })),
  on(
    executeCollectionDetailsActions.FETCH_CREDIT_NOTES_SUCCESS,
    (state: IExecuteCollectionDetails, {creditNotes}): IExecuteCollectionDetails => ({
      ...state,
      creditNotes,
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_INITIAL_PAYMENT_TRANSACTION_DATA,
    (state: IExecuteCollectionDetails): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        fccPagoCliente: {
          ...state.paymentTransaction.fccPagoCliente,
          IdEmpresa: !isEmpty(filter(state.itemsList, (o: IInvoice) => o.selected))
            ? state.itemsList[0].IdEmpresa
            : null,
          IdFCCFolioPagoCliente: !isEmpty(state.selectedPayment)
            ? state.selectedPayment?.IdFCCFolioPagoCliente
            : DEFAULT_UUID,
        },
        fccFolioPagoCliente: !isEmpty(state.selectedPayment)
          ? {...state.selectedPayment}
          : {
              ...state.paymentTransaction.fccFolioPagoCliente,
            },
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.FETCH_BANK_DATA_SUCCESS,
    (state: IExecuteCollectionDetails, {bankData}): IExecuteCollectionDetails => ({
      ...state,
      bankData,
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_SELECTED_BILLS,
    (state: IExecuteCollectionDetails): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        fccPagoCliente: {
          ...state.paymentTransaction.fccPagoCliente,
          IdCliente: state.selectedClient.IdCliente,
          IdContactoCliente: state.selectedPayment?.clientContact?.IdContactoCliente,
          IdEmpresa: filter(state.itemsList, (o: IInvoice) => o.selected)[0].IdEmpresa,
          IdArchivo: !isEmpty(state.selectedPayment) ? state.selectedPayment?.IdArchivo : null,
        },
        itemsList: state.itemsList
          ? map(
              filter(state.itemsList, (o: IInvoice) => o.selected),
              (o: IInvoice) => ({...o, NumeroDeParcialidad: 1}),
            )
          : [],
        fccPagoFacturaPedido: state.itemsList
          ? map(
              filter(state.itemsList, (o: IInvoice) => o.selected),
              (o: IInvoice) => ({
                Activo: true,
                FechaAplicacion: DEFAULT_DATE,
                FechaRegistro: DEFAULT_DATE,
                FechaUltimaActualizacion: DEFAULT_DATE,
                IdFCCPagoCliente: DEFAULT_UUID,
                IdFCCPagoFacturaPedido: DEFAULT_UUID,
                IdTPProformaPedido: o.IdTPProformaPedido,
                Monto: o.MontoPagado,
                MontoPendienteAnterior: o.MontoPendiente,
                NumeroDeParcialidad: 1,
              }),
            )
          : [],
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.DELETE_SELECTED_BILL,
    (state: IExecuteCollectionDetails, {billId}): IExecuteCollectionDetails => ({
      ...state,
      itemsList: map(state.itemsList, (o: IInvoice) => {
        if (o.IdTPProformaPedido === billId) {
          return {...o, selected: false};
        }
        return {...o};
      }),
      paymentTransaction: {
        ...state.paymentTransaction,
        itemsList: filter(
          state.paymentTransaction.itemsList,
          (o: IInvoice) => o.IdTPProformaPedido !== billId,
        ),
        fccPagoFacturaPedido: filter(
          state.paymentTransaction.itemsList,
          (o: IInvoice) => o.IdTPProformaPedido !== billId,
        ),
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_FIELD_VALUE_PAYMENT_DATA,
    (state: IExecuteCollectionDetails, {field, value}): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        fccPagoCliente: {
          ...state.paymentTransaction.fccPagoCliente,
          [field]: value,
        },
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.CALCULATE_PAYMENT_CURRENCIES,
    (state: IExecuteCollectionDetails): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        fccPagoCliente: {
          ...state.paymentTransaction.fccPagoCliente,
          MontoMXN:
            toLower(state.paymentTransaction.selectedCurrency?.label) === 'mxn'
              ? toNumber(state.paymentTransaction.fccPagoCliente.Monto)
              : toNumber(state.paymentTransaction.fccPagoCliente.Monto) *
                toNumber(state.paymentTransaction.fccPagoCliente.TipoDeCambio),
          MontoUSD:
            toLower(state.paymentTransaction.selectedCurrency?.label) === 'usd'
              ? toNumber(state.paymentTransaction.fccPagoCliente.Monto)
              : toNumber(state.paymentTransaction.fccPagoCliente.Monto) /
                toNumber(state.paymentTransaction.fccPagoCliente.TipoDeCambio),
        },
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_DROP_LIST_OPTION_PAYMENT_DATA,
    (state: IExecuteCollectionDetails, {field, value}): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        [field]: value,
        fccPagoCliente: {
          ...state.paymentTransaction.fccPagoCliente,
          MXN:
            field !== 'selectedCurrency'
              ? state.paymentTransaction.fccPagoCliente.MXN
              : value.value === '1',
          USD:
            field !== 'selectedCurrency'
              ? state.paymentTransaction.fccPagoCliente.USD
              : value.value === '2',
        },
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_CHECK_BOX_VALUE_PAYMENT_DATA,
    (state: IExecuteCollectionDetails, {field, value}): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        fccPagoCliente: {
          ...state.paymentTransaction.fccPagoCliente,
          Broker: field === 'Broker' ? value : false,
          InformacionComplementoPago: field === 'InformacionComplementoPago' ? value : false,
          CuentaOrdenante:
            field === 'InformacionComplementoPago' && value
              ? state.paymentTransaction.fccPagoCliente.CuentaOrdenante
              : '',
          ReferenciaBancaria:
            field === 'InformacionComplementoPago' && value
              ? state.paymentTransaction.fccPagoCliente.ReferenciaBancaria
              : '',
        },
        selectedBrokerName:
          field === 'Broker' && value
            ? state.paymentTransaction.selectedBrokerName
            : ({} as DropListOption),
        selectedBankName:
          field === 'InformacionComplementoPago' && value
            ? state.paymentTransaction.selectedBankName
            : ({} as DropListOption),
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.ADD_FILE,
    (state: IExecuteCollectionDetails, {file}): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        files: isEmpty(
          filter(state.paymentTransaction.files, (o: IUploadFileCustom) => o.name === file.name),
        )
          ? [...state.paymentTransaction.files, file]
          : [...state.paymentTransaction.files],
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.DELETE_FILE,
    (state: IExecuteCollectionDetails, {name}): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        files: filter(state.paymentTransaction.files, (o: IUploadFileCustom) => o.name !== name),
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_FILTER_RANGE_DATE,
    (state: IExecuteCollectionDetails, {rangeDate, param}): IExecuteCollectionDetails => ({
      ...state,
      [param]: rangeDate,
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_INPUT_IS_OPEN,
    (state: IExecuteCollectionDetails, {billId}): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        itemsList: map(state.paymentTransaction.itemsList, (o: IInvoice) => {
          if (o.IdTPProformaPedido === billId) {
            return {
              ...o,
              openInput: true,
            };
          }
          return {...o, openInput: false};
        }),
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_INVOICE_CURRENCY,
    (state: IExecuteCollectionDetails, {node, billId}): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        itemsList: map(state.paymentTransaction.itemsList, (o: IInvoice) => {
          if (o.IdTPProformaPedido === billId) {
            return {
              ...o,
              isUSD: node === 'isUSD',
              isMXN: node === 'isMXN',
            };
          }
          return {...o, openInput: false};
        }),
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.UPDATE_AMOUNT_TO_PAY_ITEM,
    (state: IExecuteCollectionDetails, {bill}): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        itemsList: map(state.paymentTransaction.itemsList, (o: IInvoice) => {
          if (o.IdTPProformaPedido === bill.IdTPProformaPedido) {
            return {
              ...o,
              MontoPagado:
                bill.MontoPagado > bill.MontoPendiente ? bill.MontoPendiente : bill.MontoPagado,
              openInput: false,
            };
          }
          return {...o, openInput: false};
        }),
        fccPagoFacturaPedido: map(
          state.paymentTransaction.fccPagoFacturaPedido,
          (o: FccPagoFacturaPedido): FccPagoFacturaPedido => {
            if (o.IdTPProformaPedido === bill.IdTPProformaPedido) {
              return {
                ...o,
                Monto:
                  bill.MontoPagado > bill.MontoPendiente ? bill.MontoPendiente : bill.MontoPagado,
              };
            }
            return {...o};
          },
        ),
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_INPUT_IS_CLOSE,
    (state: IExecuteCollectionDetails): IExecuteCollectionDetails => ({
      ...state,
      paymentTransaction: {
        ...state.paymentTransaction,
        itemsList: map(state.paymentTransaction.itemsList, (o: IInvoice) => ({
          ...o,
          openInput: false,
        })),
      },
    }),
  ),
  on(
    executeCollectionDetailsActions.SET_CREDIT_NOTE_CHECK_BOX_VALUE,
    (state: IExecuteCollectionDetails, {creditNodeId}): IExecuteCollectionDetails => ({
      ...state,
      creditNotes: map(state.creditNotes, (o: IFccNotaCredito) => {
        if (o.IdFCCNotaCredito === creditNodeId) {
          return {...o, isSelected: !o.isSelected};
        }
        return {...o};
      }),
    }),
  ),
  // Reducer Rebill
  on(executeCollectionDetailsActions.CLEAN_ALL_REBILL_STATE, (state) => ({
    ...state,
    rebill: {
      ...initialIRebill(),
    },
  })),
  on(executeCollectionDetailsActions.SET_RADIO_BUTTON_SELECTED, (state, {radioButton}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      radioButtons: map(state.rebill.radioButtons, (o) => {
        if (o.label === radioButton.label) {
          return {
            ...o,
            value: true,
            label: radioButton.label,
          };
        } else {
          return {
            value: false,
            label: o.label,
          };
        }
      }),
      creditNote: {
        ...state.rebill.creditNote,
        isInItemsView: false,
      },
    },
  })),
  on(executeCollectionDetailsActions.SET_REASON_CANCEL_INVOICE, (state, {reason}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      cancelInvoice: {reason},
    },
  })),
  on(executeCollectionDetailsActions.SET_REASON_REBILL, (state, {reason}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      rebillRadio: {
        ...state.rebill.rebillRadio,
        reason,
      },
    },
  })),
  on(executeCollectionDetailsActions.SET_CHECK_BOX, (state) => ({
    ...state,
    rebill: {
      ...state.rebill,
      rebillRadio: {
        ...state.rebill.rebillRadio,
        checkBox: !state.rebill.rebillRadio.checkBox,
      },
    },
  })),
  on(executeCollectionDetailsActions.SET_IS_IN_ITEMS_VIEW, (state, {value}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      creditNote: {
        ...state.rebill.creditNote,
        isInItemsView: value,
      },
    },
  })),
  on(executeCollectionDetailsActions.SET_CFDI, (state, {item}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      creditNote: {
        ...state.rebill.creditNote,
        dropItemSelected: item,
      },
    },
  })),
  on(executeCollectionDetailsActions.SET_FILE_INVOICE, (state, {file}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      invoiceFile: file,
    },
  })),
);
