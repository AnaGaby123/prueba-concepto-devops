import {ActionReducer, createReducer, on} from '@ngrx/store';
import {filter, findIndex, map as _map} from 'lodash-es';

/* Models Import */
import {
  IAttendReviewDetails,
  IBills,
  initialIAttendReviewDetails,
  initialIRebill,
} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';
/*Actions Import*/
import {attendReviewDetailsActions} from '@appActions/pendings/charges/attend-review';
import {IUploadFileCustom} from '@appModels/files/files.models';

export const attendReviewDetailsReducer: ActionReducer<IAttendReviewDetails> = createReducer(
  initialIAttendReviewDetails(),
  on(attendReviewDetailsActions.SET_SELECTED_CLIENT, (state, {selectedClient}) => ({
    ...state,
    selectedClient,
  })),
  on(attendReviewDetailsActions.SET_OPTION_FILTER, (state, {option}) => ({
    ...state,
    selectedFilter: option,
  })),
  on(attendReviewDetailsActions.FETCH_INVOICES_SUCCESS, (state, {bills}) => ({
    ...state,
    bills,
  })),
  on(attendReviewDetailsActions.SET_SELECTED_BILL, (state, {bill}) => ({
    ...state,
    bills: state.selectedBill
      ? _map(state.bills, (item: IBills) => {
          if (item.IdTPProformaPedido === state.selectedBill.IdTPProformaPedido) {
            return {...state.selectedBill};
          }
          return item;
        })
      : state.bills,
    selectedBill: bill,
  })),
  on(attendReviewDetailsActions.SET_TERM_SEARCH, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(attendReviewDetailsActions.SET_REQUEST_STATUS, (state, {status}) => ({
    ...state,
    queryInfo: {...state.queryInfo, requestStatus: status},
  })),
  on(attendReviewDetailsActions.FETCH_CONTACT_SUCCESS, (state, {contact}) => ({
    ...state,
    selectedBill: {
      ...state.selectedBill,
      contact,
    },
  })),
  on(attendReviewDetailsActions.CLEAN_ALL_DETAILS_STATE, (state) => initialIAttendReviewDetails()),
  on(attendReviewDetailsActions.FETCH_ADDRESS_SUCCESS, (state, {address}) => ({
    ...state,
    address,
  })),
  on(attendReviewDetailsActions.FETCH_BILLS_CLIENT_SUCCESS, (state, {billsOfClient}) => ({
    ...state,
    billsOfClient,
  })),
  on(attendReviewDetailsActions.SET_PRIORITY, (state, {priority}) => ({
    ...state,
    priority,
    selectedBill: {
      ...state.selectedBill,
      dataReview: {
        ...state.selectedBill.dataReview,
        Prioridad: priority.label,
        IdCatPrioridad: priority.value.toString(),
      },
    },
  })),
  on(attendReviewDetailsActions.SET_REVIEW_DATE, (state, {date, dateFormat}) => ({
    ...state,
    reviewDate: date,
    selectedBill: {
      ...state.selectedBill,
      dataReview: {
        ...state.selectedBill.dataReview,
        FechaRevision: date,
        dateFormat: new Date(date),
      },
    },
  })),
  on(attendReviewDetailsActions.SET_COMMENT, (state, {comment}) => ({
    ...state,
    selectedBill: {
      ...state.selectedBill,
      dataReview: {
        ...state.selectedBill.dataReview,
        ComentariosAdicionales: comment,
      },
    },
  })),
  on(attendReviewDetailsActions.ADD_FILE, (state, {file}) => ({
    ...state,
    selectedBill: {
      ...state.selectedBill,
      files:
        findIndex(state.selectedBill.files, (o: IUploadFileCustom) => o.name === file.name) === -1
          ? [...state.selectedBill.files, file]
          : [...state.selectedBill.files],
    },
  })),
  on(attendReviewDetailsActions.DELETE_FILE, (state, {name}) => ({
    ...state,
    selectedBill: {
      ...state.selectedBill,
      files: filter(state.selectedBill.files, (o: IUploadFileCustom) => o.name !== name),
    },
  })),
  on(attendReviewDetailsActions.FETCH_DATA_REVIEW_SUCCESS, (state, {dataReview}) => ({
    ...state,
    selectedBill: {...state.selectedBill, dataReview, needToReload: false},
  })),
  on(attendReviewDetailsActions.SET_URL_PROFORMA, (state, {url}) => ({
    ...state,
    selectedBill: {...state.selectedBill, url},
  })),
  on(attendReviewDetailsActions.SET_REQUEST_STATUS_FILE, (state, {status}) => ({
    ...state,
    selectedBill: {...state.selectedBill, requestStatusFile: status},
  })),
  // Reducer Rebill
  on(attendReviewDetailsActions.CLEAN_ALL_REBILL_STATE, (state) => ({
    ...state,
    rebill: {
      ...initialIRebill(),
    },
  })),
  on(attendReviewDetailsActions.SET_RADIO_BUTTON_SELECTED, (state, {radioButton}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      radioButtons: _map(state.rebill.radioButtons, (o) => {
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
  on(attendReviewDetailsActions.SET_REASON_CANCEL_INVOICE, (state, {reason}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      cancelInvoice: {reason},
    },
  })),
  on(attendReviewDetailsActions.SET_REASON_REBILL, (state, {reason}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      rebillRadio: {
        ...state.rebill.rebillRadio,
        reason,
      },
    },
  })),
  on(attendReviewDetailsActions.SET_CHECK_BOX, (state) => ({
    ...state,
    rebill: {
      ...state.rebill,
      rebillRadio: {
        ...state.rebill.rebillRadio,
        checkBox: !state.rebill.rebillRadio.checkBox,
      },
    },
  })),
  on(attendReviewDetailsActions.SET_IS_IN_ITEMS_VIEW, (state, {value}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      creditNote: {
        ...state.rebill.creditNote,
        isInItemsView: value,
      },
    },
  })),
  on(attendReviewDetailsActions.SET_CFDI, (state, {item}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      creditNote: {
        ...state.rebill.creditNote,
        dropItemSelected: item,
      },
    },
  })),
  on(attendReviewDetailsActions.SET_FILE_INVOICE, (state, {file}) => ({
    ...state,
    rebill: {
      ...state.rebill,
      invoiceFile: file,
    },
  })),
);
