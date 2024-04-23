import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IFileUpload,
  initialOrderModificationDetailsState,
  IOrderModificationDetails,
  IOrdersC,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/order-modification/order-modification-details/order-modification-details.models';
/*Actions Imports*/
import {orderModificationDetailsActions} from '@appActions/pendings/order-modification';
/*Utils Imports*/
import {filter, findIndex, map} from 'lodash-es';
import {
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {ContactoDetalleObj, DireccionClienteDetalle} from 'api-catalogos';
import {TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj} from 'api-logistica';

export const orderModificationDetailsReducer: ActionReducer<IOrderModificationDetails> = createReducer(
  initialOrderModificationDetailsState(),
  on(orderModificationDetailsActions.SET_OPTION_DESTINY, (state, {option}) => ({
    ...state,
    destinySelected: option,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        catDestino: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails.catDestino,
          IdCatDestino: option.value.toString(),
          Destino: option.label,
          Activo: true,
        },
        tpPedido: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
          IdCatDestino: option.value.toString(),
        },
      },
    },
  })),
  on(orderModificationDetailsActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(orderModificationDetailsActions.SET_OPTION_PROCESS, (state, {option}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      processSelected: option,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        tpPedido: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
          IdCatProceso: option.value.toString(),
        },
      },
    },
  })),

  on(
    orderModificationDetailsActions.SET_CODE_VALUE_BY_POSITION,
    (state: IOrderModificationDetails, {position, value}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        code: map(state.selectedPurchaseOrder.code, (o: number, index: number) => {
          if (position === index) {
            return value;
          }
          return o;
        }),
      },
    }),
  ),
  on(orderModificationDetailsActions.RESTORE_CODE_VALUE, (state: IOrderModificationDetails) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      code: [null, null, null, null],
    },
  })),
  on(
    orderModificationDetailsActions.SET_FIRST_CODE_PASSED,
    (state: IOrderModificationDetails, {firstCodePassed}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        firstCodePassed,
      },
    }),
  ),
  on(orderModificationDetailsActions.SET_SHAKED, (state: IOrderModificationDetails, {value}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      shaked: value,
    },
  })),
  on(
    orderModificationDetailsActions.GENERATE_VERIFICATION_CODE_SUCCESS,
    (state: IOrderModificationDetails, {codeRequest}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        codeRequest,
        needsToReload: true,
      },
    }),
  ),
  on(
    orderModificationDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_SUCCESS_ONLY_CODE,
    (state: IOrderModificationDetails, {tpClienteCSCreditoMorosoCorreo}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        needsToReload: false,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          tpClienteCSCreditoMorosoCorreo,
          apiStatus: API_REQUEST_STATUS_SUCCEEDED,
          needsToReload: false,
        },
      },
    }),
  ),
  on(
    orderModificationDetailsActions.SET_AUTHORIZED_VERIFICATION_CODE_LOAD,
    (state: IOrderModificationDetails, {codeRequest}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        needsToReload: true,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          tpClienteCSCreditoMorosoCorreo: codeRequest,
        },
      },
    }),
  ),
  on(orderModificationDetailsActions.SET_FILTER_SELECTED, (state, {filter}) => ({
    ...state,
    filterSelected: filter,
  })),
  on(orderModificationDetailsActions.CUSTOMER_SELECTED, (state, {customer}) => ({
    ...state,
    customerSelected: customer,
  })),
  on(
    orderModificationDetailsActions.FETCH_CLIENT_ADDRESSES_SUCCESS,
    (state: IOrderModificationDetails, {addresses}) => ({
      ...state,
      clientAddresses: addresses,
    }),
  ),
  on(
    orderModificationDetailsActions.FETCH_CLIENT_CONTACTS_SUCCESS,
    (state: IOrderModificationDetails, {contacts}) => ({
      ...state,
      clientContacts: contacts,
    }),
  ),
  on(orderModificationDetailsActions.FETCH_ORDERS_SUCCESS, (state, {list, listStatus}) => ({
    ...state,
    purchaseOrders: {...state.purchaseOrders, list, listStatus},
  })),
  on(orderModificationDetailsActions.SET_ORDER_SELECTED, (state, {IdTPPedido}) => ({
    ...state,
    selectedPurchaseOrder:
      IdTPPedido === null
        ? ({} as IOrdersC)
        : map(
            filter(state.purchaseOrders.list, (o: IOrdersC) => {
              return o.IdTPPedido === IdTPPedido;
            }),
            (i: IOrdersC): IOrdersC => ({
              ...i,
              isSelected: true,
              purchaseOrderEntries: {
                ...i.purchaseOrderEntries,
                listStatus: API_REQUEST_STATUS_LOADING,
              },
              purchaseOrderDetails: {
                ...i.purchaseOrderDetails,
                apiStatus: API_REQUEST_STATUS_LOADING,
              },
            }),
          )[0],
  })),
  on(orderModificationDetailsActions.GET_ORDER_SELECTED_SUCCESS, (state, {order}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      ...order,
    },
    purchaseOrders: {
      ...state.purchaseOrders,
      list: map(state.purchaseOrders.list, (o: IOrdersC) => {
        if (o.IdTPPedido === order.IdTPPedido) {
          return {...o, ...order};
        }
        return {...o};
      }),
    },
  })),
  on(orderModificationDetailsActions.GET_CLIENT_SELECTED_SUCCESS, (state, {client}) => ({
    ...state,
    customerSelected: {
      ...state.customerSelected,
      ...client,
    },
  })),
  on(
    orderModificationDetailsActions.FETCH_PURCHASE_ORDER_ENTRIES_SUCCESS,
    (state: IOrderModificationDetails, {purchaseOrderEntries}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        needsToReload: false,
        purchaseOrderEntries: {
          listStatus: API_REQUEST_STATUS_SUCCEEDED,
          list: purchaseOrderEntries,
        },
      },
    }),
  ),

  on(orderModificationDetailsActions.SET_OPEN_VIEW_FILE, (state, {active}) => ({
    ...state,
    openViewFile: active,
  })),
  on(orderModificationDetailsActions.VIEW_FILE_SUCCESS, (state, {fileBase64}) => ({
    ...state,
    fileBase64,
  })),
  on(
    orderModificationDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_SUCCESS,
    (state: IOrderModificationDetails, {purchaseOrderDetails}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        needsToReload: false,
        purchaseOrderDetails: {
          ...purchaseOrderDetails,
          apiStatus: API_REQUEST_STATUS_SUCCEEDED,
          needsToReload: false,
        },
      },
    }),
  ),
  on(
    orderModificationDetailsActions.SET_CLIENT_ADDRESS,
    (state: IOrderModificationDetails, {clientAddress}): IOrderModificationDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          selectedClientAddresses: clientAddress,
          tpPedido: {
            ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
            IdDireccionCliente: clientAddress.value.toString(),
          },
          DireccionClienteDetalle: filter(
            state.clientAddresses,
            (o: DireccionClienteDetalle) =>
              o.DireccionCliente.IdDireccionCliente === clientAddress.value.toString(),
          )[0],
        },
      },
    }),
  ),
  on(
    orderModificationDetailsActions.ADD_CLIENT_CONTACT,
    (state: IOrderModificationDetails, {itemId}): IOrderModificationDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          ListaContactoNotificadoEntrega:
            findIndex(
              state.selectedPurchaseOrder.purchaseOrderDetails.deletedClientContacts,
              (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
                o.m_Item2.CorreoElectronico[0].IdCorreoElectronico === itemId,
            ) !== -1
              ? [
                  ...state.selectedPurchaseOrder.purchaseOrderDetails
                    .ListaContactoNotificadoEntrega,
                  ...filter(
                    state.selectedPurchaseOrder.purchaseOrderDetails.deletedClientContacts,
                    (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
                      o.m_Item2.CorreoElectronico[0].IdCorreoElectronico === itemId,
                  ),
                ]
              : [
                  ...state.selectedPurchaseOrder.purchaseOrderDetails
                    .ListaContactoNotificadoEntrega,
                  map(
                    filter(
                      state.clientContacts,
                      (o: ContactoDetalleObj) =>
                        o.CorreoElectronico[0].IdCorreoElectronico === itemId,
                    ),
                    (i: ContactoDetalleObj) => ({
                      m_Item1: {
                        Activo: true,
                        FechaRegistro: DEFAULT_DATE,
                        FechaUltimaActualizacion: DEFAULT_DATE,
                        IdContactoCliente: i.IdContactoCliente,
                        IdTPPedido: state.selectedPurchaseOrder.IdTPPedido,
                        IdTPedidoContactoNotificadoEntrega: DEFAULT_UUID,
                      },
                      m_Item2: i,
                    }),
                  )[0],
                ],
          deletedClientContacts: filter(
            state.selectedPurchaseOrder.purchaseOrderDetails.deletedClientContacts,
            (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
              o.m_Item2.CorreoElectronico[0].IdCorreoElectronico !== itemId,
          ),
        },
      },
    }),
  ),
  on(
    orderModificationDetailsActions.DELETE_CLIENT_CONTACT,
    (state: IOrderModificationDetails, {emailId}): IOrderModificationDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          deletedClientContacts:
            findIndex(
              state.selectedPurchaseOrder.purchaseOrderDetails.ListaContactoNotificadoEntrega,
              (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
                o.m_Item2.CorreoElectronico[0].IdCorreoElectronico === emailId &&
                o.m_Item1.IdTPedidoContactoNotificadoEntrega !== DEFAULT_UUID,
            ) !== -1
              ? [
                  ...state.selectedPurchaseOrder.purchaseOrderDetails.deletedClientContacts,
                  filter(
                    state.selectedPurchaseOrder.purchaseOrderDetails.ListaContactoNotificadoEntrega,
                    (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
                      o.m_Item2.CorreoElectronico[0].IdCorreoElectronico === emailId &&
                      o.m_Item1.IdTPedidoContactoNotificadoEntrega !== DEFAULT_UUID,
                  )[0],
                ]
              : [...state.selectedPurchaseOrder.purchaseOrderDetails.deletedClientContacts],
          ListaContactoNotificadoEntrega: filter(
            state.selectedPurchaseOrder.purchaseOrderDetails.ListaContactoNotificadoEntrega,
            (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
              o.m_Item2.CorreoElectronico[0].IdCorreoElectronico !== emailId,
          ),
        },
      },
    }),
  ),
  on(
    orderModificationDetailsActions.SET_TPPEDIDO_VALUE,
    (state: IOrderModificationDetails, {value, field}): IOrderModificationDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          tpPedido: {
            ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
            [field]: value,
            FacturaPorAdelantado:
              field === 'EntregaConRemision'
                ? false
                : field === 'FacturaPorAdelantado'
                ? value
                : state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido.FacturaPorAdelantado,
            EntregaConRemision:
              field === 'FacturaPorAdelantado'
                ? false
                : field === 'EntregaConRemision'
                ? value
                : state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido.EntregaConRemision,
          },
        },
      },
    }),
  ),
  on(
    orderModificationDetailsActions.SET_USAGE_OR_PAYMENT_METHOD,
    (state: IOrderModificationDetails, {item, node}): IOrderModificationDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          [node]: item,
        },
      },
    }),
  ),
  on(
    orderModificationDetailsActions.SET_ITEM_IS_SELECTED,
    (state: IOrderModificationDetails, {isSelected, item}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderEntries: {
          ...state.selectedPurchaseOrder.purchaseOrderEntries,
          list: map(
            state.selectedPurchaseOrder.purchaseOrderEntries.list,
            (o: IPurchaseOrderItem) => {
              if (item.IdTPPartidaPedido === o.IdTPPartidaPedido) {
                return {...o, isSelected};
              }
              return {...o};
            },
          ),
        },
      },
    }),
  ),
  on(
    orderModificationDetailsActions.SET_ITEM_ALLOW_ADD_FILES,
    (state: IOrderModificationDetails, {allowAddFiles}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        allowAddFiles,
        additionalFiles: !allowAddFiles ? [] : state.selectedPurchaseOrder.additionalFiles,
      },
    }),
  ),
  on(
    orderModificationDetailsActions.SET_CODE_POP_PROCEDURE_TYPE,
    (state: IOrderModificationDetails, {procedureType}): IOrderModificationDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        procedureType,
      },
    }),
  ),
  on(orderModificationDetailsActions.DELETE_ITEM_SUCCESS, (state) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      needsToReload: true,
      purchaseOrderEntries: {
        ...state.selectedPurchaseOrder.purchaseOrderEntries,
        listStatus: API_REQUEST_STATUS_LOADING,
      },
    },
  })),
  on(orderModificationDetailsActions.SEGMENT_ORDER_SUCCESS, (state) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      needsToReload: true,
    },
  })),
  on(orderModificationDetailsActions.SAVE_ORDER_SUCCESS, (state) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      needsToReload: true,
    },
  })),
  on(orderModificationDetailsActions.SET_ENTRIES_API_STATUS, (state, {listStatus}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderEntries: {
        ...state.selectedPurchaseOrder.purchaseOrderEntries,
        listStatus,
      },
    },
  })),
  on(orderModificationDetailsActions.SET_ASIDES_API_STATUS, (state, {apiStatus}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        apiStatus,
      },
    },
  })),
  on(orderModificationDetailsActions.SET_BACKUP, (state) => ({
    ...state,
    purchaseOrders: {
      ...state.purchaseOrders,
      list: map(state.purchaseOrders.list, (order) => {
        if (order.IdTPPedido === state.selectedPurchaseOrder.IdTPPedido) {
          return {...state.selectedPurchaseOrder};
        }
        return {...order};
      }),
    },
  })),
  on(orderModificationDetailsActions.GET_CAT_FREIGHT_SUCCESS, (state, {list}) => ({
    ...state,
    freight: list,
  })),
  on(orderModificationDetailsActions.CLEAN_ALL_DETAILS_STATE, (state) =>
    initialOrderModificationDetailsState(),
  ),
  on(orderModificationDetailsActions.GET_CAT_FREIGHT_EXPRESS_SUCCESS, (state, {list}) => ({
    ...state,
    freightProviders: list,
  })),
  // FIXME: Corregir por fletes
  /*on(orderModificationDetailsActions.SET_BACKUP_FREIGHT, (state) => ({
    ...state,
    freightExpressBackUp: state.selectedPurchaseOrder.purchaseOrderDetails.FletesExpress,
    freightOrderBackUp: state.selectedPurchaseOrder.purchaseOrderDetails.Flete,
    tpPedidoBackUp: state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
  })),*/
  on(orderModificationDetailsActions.SET_OPTION_FREIGHT_CONVENTIONAL, (state, {item}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        Flete: item,
        tpPedido: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
          IdFlete: item.IdFlete,
          Precio: 0,
        },
      },
    },
  })),
  on(orderModificationDetailsActions.RESTORE_BACKUP_FREIGHT, (state) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        Flete: state.freightOrderBackUp,
        FletesExpresses: state.freightExpressBackUp,
        tpPedido: state.tpPedidoBackUp,
      },
    },
  })),
  on(orderModificationDetailsActions.SET_ITEMIZED_FREIGHT, (state) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        tpPedido: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
          FleteDesglosado: !state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido
            .FleteDesglosado,
        },
      },
    },
  })),
  on(orderModificationDetailsActions.SET_COMMENT_FREIGHT, (state, {comment}) => ({
    ...state,

    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        tpPedido: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
          ComentariosFlete: comment,
        },
      },
    },
  })),

  // FIXME: El flete ya no existe
  /*on(orderModificationDetailsActions.ADD_FREIGHT_EXPRESS, (state, {freight}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        FletesExpresses: [
          ...state.selectedPurchaseOrder.purchaseOrderDetails.FletesExpress,
          freight,
        ],
      },
    },
  })),*/
  on(orderModificationDetailsActions.DELETE_FREIGHT_EXPRESS, (state, {freight}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        // FIXME: Ya no es un arreglo
        /*FletesExpresses: filter(
          state.selectedPurchaseOrder.purchaseOrderDetails.FletesExpress,
          (o) => o.IdProveedor !== freight.IdProveedor,
        ),*/
      },
    },
  })),

  on(
    orderModificationDetailsActions.SAVE_ADDITIONAL_FILE,
    (state: IOrderModificationDetails, {file}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        additionalFiles:
          findIndex(
            state.selectedPurchaseOrder.additionalFiles,
            (o: IFileUpload) => o.file.name === file.name,
          ) === -1
            ? [...state.selectedPurchaseOrder.additionalFiles, {file}]
            : [...state.selectedPurchaseOrder.additionalFiles],
      },
    }),
  ),
  on(orderModificationDetailsActions.SAVE_OC_FILE, (state: IOrderModificationDetails, {file}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      ocFile: {...state.selectedPurchaseOrder.ocFile, file},
    },
  })),
  on(
    orderModificationDetailsActions.SAVE_OC_FILE_SUCCESS,
    (state: IOrderModificationDetails, {fileDetail}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        ocFile: {...state.selectedPurchaseOrder.ocFile, fileDetail},
      },
    }),
  ),
  on(
    orderModificationDetailsActions.SAVE_ADDITIONAL_FILES_SUCCESS,
    (state: IOrderModificationDetails, {files}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        additionalFiles: map(
          state.selectedPurchaseOrder.additionalFiles,
          (o: IFileUpload, index: number) => ({
            ...o,
            fileDetail: files[index].fileDetail,
          }),
        ),
      },
    }),
  ),
  on(
    orderModificationDetailsActions.REMOVE_ADDITIONAL_FILE,
    (state: IOrderModificationDetails, {name}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        additionalFiles: filter(
          state.selectedPurchaseOrder.additionalFiles,
          (o: IFileUpload) => o.file.name !== name,
        ),
      },
    }),
  ),
  on(orderModificationDetailsActions.REMOVE_OC_FILE, (state: IOrderModificationDetails) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      ocFile: null,
    },
  })),
  on(orderModificationDetailsActions.SET_NOTES, (state: IOrderModificationDetails, {notes}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      notes,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        tpPedido: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
          NotasModificacion: notes,
        },
      },
    },
  })),
  on(
    orderModificationDetailsActions.SET_REFERENCE,
    (state: IOrderModificationDetails, {reference}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          tpPedido: {
            ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
            ReferenciaCliente: reference,
          },
        },
      },
    }),
  ),
  on(orderModificationDetailsActions.SET_STATUS_OPEN_FREIGHT, (state, {active}) => ({
    ...state,
    openFreight: active,
  })),
  on(
    orderModificationDetailsActions.UPDATE_ITEM_LIST,
    (state, {IdTPPartidaPedido, linkedQuotes}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderEntries: {
          ...state.selectedPurchaseOrder.purchaseOrderEntries,
          list: map(state.selectedPurchaseOrder.purchaseOrderEntries.list, (o) => {
            if (o.IdTPPartidaPedido === IdTPPartidaPedido) {
              return {
                ...o,
                isInViewQuotesLinked: linkedQuotes.length > 1,
                quotesLinked: linkedQuotes,
                needsToReloadLinkeds: false,
              };
            } else {
              return {...o, isInViewQuotesLinked: false};
            }
          }),
        },
      },
    }),
  ),
  on(orderModificationDetailsActions.SET_ORDER_UPDATED, (state, {fileData}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      IdArchivo: fileData.order.purchaseOrderDetails.tpPedido.IdArchivo,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        tpPedido: fileData.order.purchaseOrderDetails.tpPedido,
      },
      fileDetail: fileData.fileDetail,
    },
  })),
  on(orderModificationDetailsActions.HANDLE_POP_UP_NOTES, (state, {popUpNotesIsOpen}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      popUpNotesIsOpen,
    },
  })),
  on(orderModificationDetailsActions.VIEW_FILE_IS_LOADING, (state, {value}) => ({
    ...state,
    viewFileIsLoading: value,
  })),
  on(
    orderModificationDetailsActions.SET_NOTES_AND_PROCESS,
    (state, {NotasModificacion, IdCatProceso, IdTPPartidaPedido}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderEntries: {
          ...state.selectedPurchaseOrder.purchaseOrderEntries,
          list: map(state.selectedPurchaseOrder.purchaseOrderEntries.list, (entry) => ({
            ...entry,
            IdCatProceso:
              entry.IdTPPartidaPedido === IdTPPartidaPedido ? IdCatProceso : entry.IdCatProceso,
            NotasModificacion:
              entry.IdTPPartidaPedido === IdTPPartidaPedido
                ? NotasModificacion
                : entry.NotasModificacion,
            tpPartidaPedido: {
              ...entry.tpPartidaPedido,
              IdCatProceso:
                entry.tpPartidaPedido.IdTPPartidaPedido === IdTPPartidaPedido
                  ? IdCatProceso
                  : entry.tpPartidaPedido.IdCatProceso,
              NotasModificacion:
                entry.tpPartidaPedido.IdTPPartidaPedido === IdTPPartidaPedido
                  ? NotasModificacion
                  : entry.tpPartidaPedido.NotasModificacion,
            },
          })),
        },
      },
    }),
  ),
  on(orderModificationDetailsActions.SET_INVOICE_ITEM_SELECTED, (state, {item}) => ({
    ...state,
    invoice: item,
  })),
);
