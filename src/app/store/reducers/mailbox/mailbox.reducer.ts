import {
  CatClasificacionCorreoRecibidoReferenciaCustom,
  CorreoRecibidoClienteCustom,
  CorreoRecibidoClienteReferenciaCustom,
  initialMailBoxState,
  MailboxState,
  PpPedidoCustom,
  VCorreoClienteCustom,
} from '@appModels/store/mailbox/mailbox.models';
import {createReducer, on} from '@ngrx/store';
import * as mailboxActions from '@appActions/mailbox/mailbox.actions';
import {filter, find, findIndex, isEmpty, map} from 'lodash-es';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {IFilters} from '@appModels/filters/Filters';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {classificationInitializer, setVoidMaill} from '@appHelpers/mailbox/mailbox.helpers';
import {toRound} from '@appUtil/util';

export const mailboxReducer = createReducer(
  initialMailBoxState(),
  on(mailboxActions.CLEAN_ALL_MAILBOX_STATE, (state) => ({
    ...initialMailBoxState(),
  })),
  on(mailboxActions.GET_MAILBOX_LIST_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
    currentPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    needsToReload:
      state.receivedMailsArray.length === 0 ||
      state.receivedMailsArray.length !== state.totalResults,
  })),

  on(mailboxActions.GET_MAILBOX_LIST_SUCCESS, (state, {mails}) => ({
    ...state,
    receivedMailsArray: [...state.receivedMailsArray, ...mails],
  })),
  on(mailboxActions.GET_MAILBOX_LIST_LENGHT_SUCCESS, (state, {totalResults}) => {
    return {
      ...state,
      totalResults,
    };
  }),
  on(mailboxActions.SET_SUCCESS_TOTAL_FOOTER, (state, {totalFooter}) => ({
    ...state,
    totalFooter,
  })),
  on(mailboxActions.GET_MAILBOX_CLASSIFICATIONS_SUCCESS, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: classificationInitializer(
          action.classifications,
          action.IdCorreoRecibido,
        ),
      },
    };
  }),
  on(
    mailboxActions.GET_MAILBOX_CLASSIFICATIONS_REFERENCES_SUCCESS,
    (state: MailboxState, {referenceClassifications}): MailboxState => {
      return {
        ...state,
        selectedMail: {
          ...state.selectedMail,
          CorreoRecibidoCliente: map(
            state.selectedMail.CorreoRecibidoCliente,
            (o: CorreoRecibidoClienteCustom): CorreoRecibidoClienteCustom => {
              if (
                o.IdCatClasificacionCorreoRecibido ===
                referenceClassifications[0].IdCatClasificacionCorreoRecibido
              ) {
                return {
                  ...o,
                  CatClasificacionCorreoRecibidoReferencia: map(
                    referenceClassifications,
                    (
                      i: CatClasificacionCorreoRecibidoReferenciaCustom,
                    ): CatClasificacionCorreoRecibidoReferenciaCustom => {
                      return {
                        IsSelected: false,
                        IdCorreoRecibidoClienteReferencia: '',
                        IdCorreoRecibidoCliente: '',
                        Referencia: '',
                        ...i,
                      };
                    },
                  ),
                  CatClasificacionCorreoRecibidoReferenciaTemp:
                    !state.selectedMail.Cliente.TramitarConOrdenDeCompraInterna ||
                    state.selectedMail.vCorreoCliente.SinCredito ||
                    state.selectedMail.vCorreoCliente.SinCredito === null
                      ? ({
                          value:
                            referenceClassifications[1].IdCatClasificacionCorreoRecibidoReferencia,
                          label: referenceClassifications[1].Nombre,
                          subtitle: referenceClassifications[1].PrefijoComentario,
                        } as DropListOption)
                      : ({
                          value:
                            referenceClassifications[0].IdCatClasificacionCorreoRecibidoReferencia,
                          label: referenceClassifications[0].Nombre,
                          subtitle: referenceClassifications[0].PrefijoComentario,
                        } as DropListOption),
                };
              } else {
                return {...o};
              }
            },
          ),
        },
      };
    },
  ),
  on(mailboxActions.SET_MAIL_READ_BY_ROL, (state, action) => {
    return {
      ...state,
      receivedMailsArray: map(state.receivedMailsArray, (o) => {
        if (o.IdCorreoRecibido === action.IdCorreoRecibido) {
          return {
            ...o,
            Leido: true,
          };
        } else {
          return {...o};
        }
      }),
      clientsWithSameMail: [],
    };
  }),
  on(mailboxActions.GET_SELECTED_MAIL_SUCCESS, (state, action) => {
    return {
      ...state,
      mailIsSelected: true,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibido: action.mail,
      },
    };
  }),
  on(mailboxActions.GET_MAIL_CONTENT_SUCCESS, (state, {CorreoRecibidoCont}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoContenido: CorreoRecibidoCont,
      },
    };
  }),
  on(mailboxActions.GET_MAIL_CLIENT_MAIL_SUCCESS, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
          if (
            o.IdCatClasificacionCorreoRecibido ===
            action.CorreoRecibidoCliente.IdCatClasificacionCorreoRecibido
          ) {
            return {
              ...o,
              ...action.CorreoRecibidoCliente,
              IsSelected: true,
              IsSelectedPreviously: true,
            };
          } else {
            return {
              ...o,
              IdCliente: action.CorreoRecibidoCliente.IdCliente,
              IdContactoCliente: action.CorreoRecibidoCliente.IdContactoCliente,
              FechaRegistro: o.FechaRegistro,
              FechaUltimaActualizacion: o.FechaUltimaActualizacion,
              IdCorreoRecibidoCliente: action.CorreoRecibidoCliente.IdCorreoRecibidoCliente,
              Leido: action.CorreoRecibidoCliente.Leido,
              Procesado: action.CorreoRecibidoCliente.Procesado,
              Activo: true,
              IdUsuario: action.CorreoRecibidoCliente.IdUsuario,
              IdContacto: action.CorreoRecibidoCliente.IdContacto,
            };
          }
        }),
        correoRecibidoClienteService: action.CorreoRecibidoCliente,
      },
    };
  }),
  on(mailboxActions.GET_MAIL_CLIENT_SUCCESS, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        Cliente: action.Cliente,
      },
    };
  }),
  on(mailboxActions.GET_MAIL_FILES_SUCCESS, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        Archivos: [
          ...state.selectedMail.Archivos,
          {
            ...action.Archivo,
            IdArchivoCorreoRecibido: action.IdArchivoCorreoRecibido,
            active: false,
          },
        ],
      },
    };
  }),
  on(mailboxActions.GET_SELECTED_FULL_MAIL_SUCCESS, (state, action) => {
    return {
      ...state,
      mailIsSelected: true,
      selectedMail: {...action.mail},
    };
  }),
  on(mailboxActions.SET_VIEWED_MAIL_SUCCESS, (state, {mail}) => {
    return {
      ...state,
      mailIsSelected: true,
      viewedEmails:
        state.viewedEmails.length === 0
          ? [mail]
          : findIndex(
              state.viewedEmails,
              (o) => o.CorreoRecibido.IdCorreoRecibido === mail.CorreoRecibido.IdCorreoRecibido,
            ) === -1
          ? [...state.viewedEmails, mail]
          : map(state.viewedEmails, (o) => {
              if (o.CorreoRecibido.IdCorreoRecibido === mail.CorreoRecibido.IdCorreoRecibido) {
                return {...mail};
              } else {
                return {...o};
              }
            }),
    };
  }),
  on(mailboxActions.GET_SELECTED_MAIL_NULL, (state, action) => {
    return {
      ...state,
      selectedMail: setVoidMaill(state.selectedMail.vCorreoCliente),
    };
  }),
  on(mailboxActions.SET_MAILBOX_TO_DELETE, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoClienteToDelete: [
          ...state.selectedMail.CorreoRecibidoClienteToDelete,
          action.CorreoRecibidoClienteCustom,
        ],
      },
    };
  }),
  on(mailboxActions.QUIT_MAILBOX_TO_DELETE, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoClienteToDelete: filter(
          state.selectedMail.CorreoRecibidoClienteToDelete,
          (o) =>
            o.IdCatClasificacionCorreoRecibido !==
            action.CorreoRecibidoClienteCustom.IdCatClasificacionCorreoRecibido,
        ),
      },
    };
  }),
  on(mailboxActions.GET_MAILBOX_LIST_NULL, (state, action) => {
    return {
      ...state,
      receivedMailsArray: [],
    };
  }),
  on(mailboxActions.SET_MAILBOX_TITLE, (state, {title}) => {
    return {...state, title};
  }),
  on(mailboxActions.SET_MAILBOX_NAME, (state, {name}) => {
    return {...state, name};
  }),
  on(mailboxActions.SET_ORDER_VALUE, (state, action) => {
    return {
      ...state,
      orderValue: action.orderValue,
      receivedMailsArray: [],
      currentPage: 1,
      needsToReload: true,
      totalFooter: {
        Correos: 0,
        Contactos: 0,
        Documentos: 0,
      },
    };
  }),
  on(mailboxActions.SET_CURRENT_PAGE, (state, action) => {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }),
  on(mailboxActions.SET_MAILBOX_SEARCH_TERM, (state, action) => {
    return {
      ...state,
      searchTerm: action.searchTerm,
      receivedMailsArray: [],
      currentPage: 1,
      needsToReload: true,
      totalFooter: {
        Correos: 0,
        Contactos: 0,
        Documentos: 0,
      },
    };
  }),
  on(mailboxActions.SET_MAIL_IS_SELECTED, (state, {mailIsSelected}) => {
    return {
      ...state,
      mailIsSelected,
      clientsWithSameMail: [],
    };
  }),
  on(mailboxActions.SET_IS_LOADING, (state, action) => {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }),
  on(mailboxActions.SET_IS_MESSAGE_LOADING, (state, action) => {
    return {
      ...state,
      isMessageLoading: action.isMessageLoading,
    };
  }),
  on(
    mailboxActions.SET_EMAIL_SELECTED,
    (state: MailboxState, action): MailboxState => {
      return {
        ...state,
        receivedMailsArray: map(state.receivedMailsArray, (o: VCorreoClienteCustom) => {
          if (o.IdCorreoRecibido === action.idEmail) {
            return {
              ...o,
              isSelected: true,
            };
          }
          return {
            ...o,
            isSelected: false,
          };
        }),
        selectedMail: {
          ...state.selectedMail,
          vCorreoCliente: find(
            state.receivedMailsArray,
            (o: VCorreoClienteCustom) => o.IdCorreoRecibido === action.idEmail,
          ),
        },
      };
    },
  ),
  on(mailboxActions.SET_NEEDS_TO_RELOAD, (state, action) => {
    return {
      ...state,
      needsToReload: action.needsToReload,
    };
  }),
  on(mailboxActions.SET_MAILBOX_BACKUP, (state) => {
    return {
      ...state,
      viewedEmails: isEmpty(state.viewedEmails)
        ? [state.selectedMail]
        : findIndex(
            state.viewedEmails,
            (o) =>
              o.CorreoRecibido.IdCorreoRecibido ===
              state.selectedMail.CorreoRecibido.IdCorreoRecibido,
          ) !== -1
        ? map(state.viewedEmails, (o) => {
            if (
              o.CorreoRecibido.IdCorreoRecibido ===
              state.selectedMail.CorreoRecibido.IdCorreoRecibido
            ) {
              return {
                ...state.selectedMail,
              };
            } else {
              return {...o};
            }
          })
        : [...state.viewedEmails, state.selectedMail],
    };
  }),
  on(mailboxActions.SET_LINK_MAIL_ACTIVATE, (state, action) => {
    return {
      ...state,
      linkMailActivate: action.linkMailActive,
    };
  }),
  on(mailboxActions.SET_MAILBOX_WALLET_ERROR, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
          if (o.IdCatClasificacionCorreoRecibido === action.IdCatClasificacionCorreoRecibido) {
            return {
              ...o,
              ErrorDeCartera: action.value,
              IdUsuario: action.value ? o.IdUsuario : null,
              UsuarioErrorCarteraSelect: action.value
                ? o.UsuarioErrorCarteraSelect
                : ({} as DropListOption),
            };
          } else {
            return {...o};
          }
        }),
      },
    };
  }),
  on(mailboxActions.SET_MAILBOX_USER_WALLET_ERROR, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
          if (o.IdCatClasificacionCorreoRecibido === action.IdCatClasificacionCorreoRecibido) {
            return {
              ...o,
              IdUsuario: action.user.value,
              UsuarioErrorCarteraSelect: action.user,
            };
          } else {
            return {...o};
          }
        }),
      },
    };
  }),
  on(
    mailboxActions.SET_MAILBOX_CLASSIFICATION,
    (state: MailboxState, action): MailboxState => {
      return {
        ...state,
        selectedMail: {
          ...state.selectedMail,
          CorreoRecibidoCliente: map(
            state.selectedMail.CorreoRecibidoCliente,
            (o: CorreoRecibidoClienteCustom, index): CorreoRecibidoClienteCustom => {
              if (o.IdCatClasificacionCorreoRecibido === action.IdCatClasificacionCorreoRecibido) {
                let selectedClassification = {} as DropListOption;
                switch (index) {
                  case 0:
                    selectedClassification = action.value
                      ? state.selectedMail.vCorreoCliente.SinCredito ||
                        (state.selectedMail.vCorreoCliente.SinCredito === null && index === 0)
                        ? ({
                            value:
                              state.selectedMail.CorreoRecibidoCliente[0]
                                .CatClasificacionCorreoRecibidoReferencia[1]
                                .IdCatClasificacionCorreoRecibidoReferencia,
                            label:
                              state.selectedMail.CorreoRecibidoCliente[0]
                                .CatClasificacionCorreoRecibidoReferencia[1].Nombre,
                            subtitle:
                              state.selectedMail.CorreoRecibidoCliente[0]
                                .CatClasificacionCorreoRecibidoReferencia[1].PrefijoComentario,
                          } as DropListOption)
                        : ({
                            value:
                              state.selectedMail.CorreoRecibidoCliente[0]
                                .CatClasificacionCorreoRecibidoReferencia[0]
                                .IdCatClasificacionCorreoRecibidoReferencia,
                            label:
                              state.selectedMail.CorreoRecibidoCliente[0]
                                .CatClasificacionCorreoRecibidoReferencia[0].Nombre,
                            subtitle:
                              state.selectedMail.CorreoRecibidoCliente[0]
                                .CatClasificacionCorreoRecibidoReferencia[0].PrefijoComentario,
                          } as DropListOption)
                      : ({} as DropListOption);
                    break;
                  case 1:
                    selectedClassification =
                      action.value && o.ArchivoTempName === ''
                        ? ({
                            value:
                              state.selectedMail.CorreoRecibidoCliente[1]
                                .CatClasificacionCorreoRecibidoReferencia[1]
                                .IdCatClasificacionCorreoRecibidoReferencia,
                            label:
                              state.selectedMail.CorreoRecibidoCliente[1]
                                .CatClasificacionCorreoRecibidoReferencia[1].Nombre,
                          } as DropListOption)
                        : ({} as DropListOption);
                }
                return {
                  ...o,
                  IsSelected: action.value,
                  ComentariosTemp: '',
                  ComentariosReferenciasTemp: '',
                  ArchivoTempName: action.value ? o.ArchivoTempName : '',
                  ArchivoTemp: action.value ? o.ArchivoTemp : null,
                  CorreoRecibidoClienteReferencia: action.value
                    ? [...o.CorreoRecibidoClienteReferencia]
                    : [],
                  CorreoRecibidoComentarios: action.value ? [...o.CorreoRecibidoComentarios] : [],
                  ErrorDeCartera: action.value ? o.ErrorDeCartera : false,
                  UsuarioErrorCarteraSelect: action.value
                    ? o.UsuarioErrorCarteraSelect
                    : ({} as DropListOption),
                  IdUsuario: action.value ? o.IdUsuario : null,
                  Subtotal: 0,
                  Total: 0,
                  Iva: 0,
                  CatClasificacionCorreoRecibidoReferenciaTemp: selectedClassification,
                };
              } else {
                return {...o};
              }
            },
          ),
        },
      };
    },
  ),
  on(mailboxActions.SET_TEMP_FILE, (state, {IdCatClasificacionCorreoRecibido, file, hash}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
          if (o.IdCatClasificacionCorreoRecibido === IdCatClasificacionCorreoRecibido) {
            return {
              ...o,
              ArchivoTemp: file,
              ArchivoTempName: file.name,
              hash,
            };
          } else {
            return {...o};
          }
        }),
      },
    };
  }),
  on(
    mailboxActions.SET_TEMP_FILE_NAME,
    (state, {IdCatClasificacionCorreoRecibido, IdArchivo, IdArchivoCorreoRecibido, filename}) => {
      return {
        ...state,
        selectedMail: {
          ...state.selectedMail,
          CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
            if (o.IdCatClasificacionCorreoRecibido === IdCatClasificacionCorreoRecibido) {
              return {
                ...o,
                IdArchivo,
                IdArchivoCorreoRecibido,
                ArchivoTempName: filename,
              };
            } else {
              return {...o};
            }
          }),
        },
      };
    },
  ),
  on(mailboxActions.GET_URL_TO_DOWNLOAD_FILE_SUCCESS, (state, {IdArchivo, Url}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        tempUrl: Url,
      },
    };
  }),
  on(mailboxActions.GET_CLIENT_OC_PENDING_SUCCESS, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        OCPending: {
          ...state.selectedMail.OCPending,
          OCPending: action.OCPending,
          needsToReload: true,
          info: {desiredPage: 0} as IFilters,
        },
      },
    };
  }),
  on(
    mailboxActions.GET_LIST_CLIENT_OC_PENDING_SUCCESS,
    (state: MailboxState, {OCPendingList}): MailboxState => {
      return {
        ...state,
        selectedMail: {
          ...state.selectedMail,
          OCPending: {
            ...state.selectedMail.OCPending,
            OCPendingList: map(
              OCPendingList,
              (o: PpPedidoCustom): PpPedidoCustom => {
                return {
                  ...o,
                  active: false,
                };
              },
            ),
          },
        },
      };
    },
  ),
  on(mailboxActions.SET_CARD_FILE_ACTIVE, (state, {IdArchivo}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        Archivos: map(state.selectedMail.Archivos, (o) => {
          if (o.IdArchivo === IdArchivo) {
            return {...o, active: true};
          } else {
            return {...o, active: false};
          }
        }),
      },
    };
  }),
  on(mailboxActions.SET_CARD_OC_PENDING_ACTIVE, (state, {IdPPPedido}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        OCPending: {
          ...state.selectedMail.OCPending,
          OCPendingList: map(state.selectedMail.OCPending.OCPendingList, (o) => {
            if (o.IdPPPedido === IdPPPedido) {
              return {...o, active: true};
            } else {
              return {...o, active: false};
            }
          }),
        },
      },
    };
  }),
  on(mailboxActions.SET_CARD_FILES_OC_INACTIVE, (state) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        fileToPreviewIsSelected: false,
        ocToPreviewIsSelected: false,
        ocIsActive: false,
        fileIsActive: false,
        Archivos: map(state.selectedMail.Archivos, (o) => {
          return {...o, active: false};
        }),
        OCPending: {
          ...state.selectedMail.OCPending,
          OCPendingList: map(state.selectedMail.OCPending.OCPendingList, (o) => {
            return {...o, active: false};
          }),
        },
      },
    };
  }),
  on(mailboxActions.SET_OC_PENDING_NEEDS_TO_RELOAD, (state, {needsToReload}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        OCPending: {
          ...state.selectedMail.OCPending,
          needsToReload,
        },
      },
    };
  }),
  on(mailboxActions.SET_OC_LIST_IS_LOADING, (state, {isLoading}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        OCPending: {
          ...state.selectedMail.OCPending,
          isLoading,
        },
      },
    };
  }),
  on(mailboxActions.SET_OC_LIST_CURRENT_PAGE, (state, {currentPage}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        OCPending: {
          ...state.selectedMail.OCPending,
          info: {
            ...state.selectedMail.OCPending.info,
            desiredPage: currentPage,
          },
        },
      },
    };
  }),
  on(mailboxActions.SET_FILE_OC_LOADING, (state, {fileType, value}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        fileToPreviewIsLoading:
          fileType === 'file' ? value : state.selectedMail.fileToPreviewIsLoading,
        ocToPreviewIsLoading: fileType === 'oc' ? value : state.selectedMail.ocToPreviewIsLoading,
      },
    };
  }),
  on(mailboxActions.SET_FILE_OC_IS_PREVIEW, (state, {fileType, value}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        fileToPreviewIsSelected:
          fileType === 'file' ? value : state.selectedMail.fileToPreviewIsSelected,
        ocToPreviewIsSelected: fileType === 'oc' ? value : state.selectedMail.ocToPreviewIsSelected,
      },
    };
  }),
  on(mailboxActions.SET_FILE_OC_IS_ACTIVE, (state, {fileType, value}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        fileIsActive: fileType === 'file' ? value : state.selectedMail.fileIsActive,
        ocIsActive: fileType === 'oc' ? value : state.selectedMail.ocIsActive,
      },
    };
  }),
  on(mailboxActions.SET_FILE_OC_MESSAGE, (state, {fileType, message}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        fileMessage: fileType === 'file' ? message : state.selectedMail.fileMessage,
        ocMessage: fileType === 'oc' ? message : state.selectedMail.ocMessage,
      },
    };
  }),
  on(mailboxActions.GET_URL_FILE_SUCCESS, (state, {IdArchivo, Url}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        Archivos: map(state.selectedMail.Archivos, (o) => {
          if (o.IdArchivo === IdArchivo) {
            return {...o, Url};
          } else {
            return {...o};
          }
        }),
      },
    };
  }),
  on(mailboxActions.GET_URL_OC_PENDING_SUCCESS, (state, {IdArchivo, FileKey, Url}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        OCPending: {
          ...state.selectedMail.OCPending,
          OCPendingList: map(
            state.selectedMail.OCPending.OCPendingList,
            (o: PpPedidoCustom): PpPedidoCustom => {
              if (o.IdArchivo === IdArchivo) {
                return {
                  ...o,
                  Url,
                  FileKey: FileKey ? FileKey : o.FileKey,
                };
              } else {
                return {...o};
              }
            },
          ),
        },
      },
    };
  }),
  on(mailboxActions.SET_OC_CLIENT_LINKED, (state) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        OCPending: {
          ...state.selectedMail.OCPending,
          OCPendingList: map(state.selectedMail.OCPending.OCPendingList, (o) => {
            if (o.active) {
              return {
                ...o,
                isLinked: true,
              };
            } else {
              return {...o};
            }
          }),
        },
      },
    };
  }),
  on(mailboxActions.QUIT_URLS_OF_FILES_OCPENDING, (state) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        Archivos: map(state.selectedMail.Archivos, (o) => {
          return {...o, Url: ''};
        }),
        OCPending: {
          ...state.selectedMail.OCPending,
          OCPendingList: map(state.selectedMail.OCPending.OCPendingList, (o) => {
            return {...o, Url: ''};
          }),
        },
        fileIsActive: false,
        ocIsActive: false,
        fileToPreviewIsSelected: false,
        ocToPreviewIsSelected: false,
      },
    };
  }),
  on(mailboxActions.BLOCK_CLASSIFICATIONS_EDITION, (state, {value}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        BlockClassificationEdition: value,
      },
    };
  }),
  on(mailboxActions.SET_MAILBOX_CLASSIFICATION_DEFAULT_IS_SELECTED, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        DefaultClassificationIsSelected: action.value,
      },
    };
  }),
  on(
    mailboxActions.QUIT_ALL_MAILBOX_CLASSIFICATION,
    (state: MailboxState, action): MailboxState => {
      return {
        ...state,
        selectedMail: {
          ...state.selectedMail,
          CorreoRecibidoClienteToDelete: [
            ...state.selectedMail.CorreoRecibidoClienteToDelete,
            ...filter(
              state.selectedMail.CorreoRecibidoCliente,
              (o) => o.IsSelectedPreviously && o.IsSelected,
            ),
          ],
          CorreoRecibidoCliente: map(
            state.selectedMail.CorreoRecibidoCliente,
            (o: CorreoRecibidoClienteCustom): CorreoRecibidoClienteCustom => {
              return {
                ...o,
                CorreoRecibidoClienteReferencia: [],
                CorreoRecibidoComentarios: [],
                CatClasificacionCorreoRecibidoReferenciaTemp: {} as DropListOption,
                ComentariosTemp: '',
                ArchivoTemp: null,
                ArchivoTempName: '',
                ComentariosReferenciasTemp: '',
                IsSelected: false,
                Subtotal: 0,
                Total: 0,
                Iva: 0,
              };
            },
          ),
          Archivos: map(state.selectedMail.Archivos, (o) => {
            return {...o, isLinked: false};
          }),
        },
      };
    },
  ),
  on(
    mailboxActions.SET_MAILBOX_CLASSIFICATION_COMMENTS,
    (
      state: MailboxState,
      {IdCatClasificacionCorreoRecibido, Comentario, NombreArchivo, IsUnique},
    ): MailboxState => {
      let commentObj;
      return {
        ...state,
        selectedMail: {
          ...state.selectedMail,
          CorreoRecibidoCliente: map(
            state.selectedMail.CorreoRecibidoCliente,
            (o: CorreoRecibidoClienteCustom): CorreoRecibidoClienteCustom => {
              if (o.IdCatClasificacionCorreoRecibido === IdCatClasificacionCorreoRecibido) {
                commentObj = IsUnique
                  ? {
                      IdCorreoRecibidoComentario: DEFAULT_UUID,
                      IdCorreoRecibidoCliente: o.IdCorreoRecibidoCliente,
                      Comentario,
                      FechaRegistro: DEFAULT_DATE,
                      FechaUltimaActualizacion: DEFAULT_DATE,
                      Activo: true,
                    }
                  : {
                      IdCorreoRecibidoComentario: DEFAULT_UUID,
                      IdCorreoRecibidoCliente: o.IdCorreoRecibidoCliente,
                      Comentario,
                      Archivo: o.ArchivoTemp,
                      ArchivoNombre: o.ArchivoTempName,
                      hash: o.hash,
                      FechaRegistro: DEFAULT_DATE,
                      FechaUltimaActualizacion: DEFAULT_DATE,
                      Activo: true,
                    };
                return {
                  ...o,
                  ComentariosTemp: IsUnique ? o.ComentariosTemp : '',
                  CorreoRecibidoComentarios: IsUnique
                    ? [
                        {
                          IdCorreoRecibidoComentario: DEFAULT_UUID,
                          IdCorreoRecibidoCliente: o.IdCorreoRecibidoCliente,
                          Comentario,
                          FechaRegistro: DEFAULT_DATE,
                          FechaUltimaActualizacion: DEFAULT_DATE,
                          Activo: true,
                        },
                      ]
                    : [
                        ...o.CorreoRecibidoComentarios,
                        {
                          IdCorreoRecibidoComentario: DEFAULT_UUID,
                          IdCorreoRecibidoCliente: o.IdCorreoRecibidoCliente,
                          Comentario,
                          Archivo: o.ArchivoTemp,
                          ArchivoNombre: o.ArchivoTempName,
                          hash: o.hash,
                          FechaRegistro: DEFAULT_DATE,
                          FechaUltimaActualizacion: DEFAULT_DATE,
                          Activo: true,
                        },
                      ],
                  ArchivoTemp: null,
                  ArchivoTempName: '',
                  hash: '',
                };
              } else {
                return {...o};
              }
            },
          ),
        },
      };
    },
  ),
  on(mailboxActions.QUIT_MAILBOX_CLASSIFICATION_COMMENTS, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
          if (o.IdCatClasificacionCorreoRecibido === action.IdCatClasificacionCorreoRecibido) {
            return {
              ...o,
              ComentariosTemp: '',
              ComentariosReferenciasTemp: '',
              CorreoRecibidoComentarios: filter(
                o.CorreoRecibidoComentarios,
                (i, index) => index !== action.Index,
              ),
            };
          } else {
            return {...o};
          }
        }),
      },
    };
  }),
  on(mailboxActions.SET_MAILBOX_CLASSIFICATION_TEMP_COMMENTS, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
          if (o.IdCatClasificacionCorreoRecibido === action.IdCatClasificacionCorreoRecibido) {
            return {
              ...o,
              ComentariosTemp: action.Comentario,
            };
          } else {
            return {...o};
          }
        }),
      },
    };
  }),
  on(mailboxActions.SET_MAILBOX_CLASSIFICATION_TOTAL, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
          if (o.IdCatClasificacionCorreoRecibido === action.IdCatClasificacionCorreoRecibido) {
            const Iva: number = state?.selectedMail?.vCorreoCliente?.FacturaPHS
              ? 0
              : Number((action.subtotal * 0.16).toFixed(2));
            return {
              ...o,
              Subtotal: toRound(action.subtotal, 2),
              Iva,
              Total: toRound(Number(action.subtotal + Iva), 2),
            };
          } else {
            return {...o};
          }
        }),
      },
    };
  }),
  on(mailboxActions.SET_MAILBOX_CLASSIFICATION_TEMP_REFERENCE, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(
          state.selectedMail.CorreoRecibidoCliente,
          (o: CorreoRecibidoClienteCustom): CorreoRecibidoClienteCustom => {
            if (o.IdCatClasificacionCorreoRecibido === action.IdCatClasificacionCorreoRecibido) {
              return {
                ...o,
                CatClasificacionCorreoRecibidoReferenciaTemp:
                  action.CatClasificacionCorreoRecibidoReferencia,
              };
            } else {
              return {...o};
            }
          },
        ),
      },
    };
  }),
  on(mailboxActions.SET_MAILBOX_CLASSIFICATION_TEMP_REFERENCE_COMMENTS, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
          if (o.IdCatClasificacionCorreoRecibido === action.IdCatClasificacionCorreoRecibido) {
            return {
              ...o,
              ComentariosReferenciasTemp: action.Comentario,
            };
          } else {
            return {...o};
          }
        }),
      },
    };
  }),
  on(mailboxActions.SET_MAILBOX_CLASSIFICATION_TEMP_REFERENCE_ID_PPPEDIDO, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
          if (o.IdCatClasificacionCorreoRecibido === action.IdCatClasificacionCorreoRecibido) {
            return {
              ...o,
              IdPPPedido: action.IdPPPedido,
            };
          } else {
            return {...o};
          }
        }),
      },
    };
  }),
  on(
    mailboxActions.SET_MAILBOX_CLASSIFICATION_REFERENCE_SELECT,
    (state: MailboxState, {referenciaSelect}): MailboxState => {
      return {
        ...state,
        selectedMail: {
          ...state.selectedMail,
          CorreoRecibidoCliente: map(
            state.selectedMail.CorreoRecibidoCliente,
            (o: CorreoRecibidoClienteCustom): CorreoRecibidoClienteCustom => {
              if (
                o.IdCatClasificacionCorreoRecibido ===
                referenciaSelect.IdCatClasificacionCorreoRecibido
              ) {
                return {
                  ...o,
                  CorreoRecibidoClienteReferencia: [
                    ...o.CorreoRecibidoClienteReferencia,
                    {
                      IdCorreoRecibidoClienteReferencia: DEFAULT_UUID,
                      IdCorreoRecibidoCliente: o.IdCorreoRecibidoCliente,
                      FechaRegistro: DEFAULT_DATE,
                      FechaUltimaActualizacion: DEFAULT_DATE,
                      Activo: true,
                      Archivo: o.ArchivoTemp,
                      ArchivoNombre: o.ArchivoTempName,
                      hash: o.hash,
                      IdArchivo: null,
                      IdPPPedidoOriginal: o.IdPPPedido,
                      IdArchivoCorreoRecibido: o.IdArchivoCorreoRecibido
                        ? o.IdArchivoCorreoRecibido
                        : DEFAULT_UUID,
                      ...referenciaSelect,
                    } as CorreoRecibidoClienteReferenciaCustom,
                  ],
                  ComentariosReferenciasTemp: '',
                  ComentariosTemp: '',
                  ArchivoTemp: null,
                  ArchivoTempName: '',
                  hash: '',
                  IdArchivo: '',
                  IdPPPedido: null,
                  IdArchivoCorreoRecibido: '',
                  Subtotal: 0,
                  Total: 0,
                  Iva: 0,
                };
              } else {
                return {...o};
              }
            },
          ),
          Archivos: map(state.selectedMail.Archivos, (o) => {
            if (o.IdArchivo === referenciaSelect.IdArchivo) {
              return {...o, isLinked: true};
            } else {
              return {...o};
            }
          }),
        },
      };
    },
  ),
  on(mailboxActions.QUIT_MAILBOX_CLASSIFICATION_REFERENCE_SELECT, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
          if (o.IdCatClasificacionCorreoRecibido === action.IdCatClasificacionCorreoRecibido) {
            return {
              ...o,
              CorreoRecibidoClienteReferencia: action.Index
                ? filter(o.CorreoRecibidoClienteReferencia, (i, index) => index !== action.Index)
                : filter(
                    o.CorreoRecibidoClienteReferencia,
                    (i) => i.IdArchivo !== action.IdArchivo,
                  ),
            };
          } else {
            return {...o};
          }
        }),
        Archivos: map(state.selectedMail.Archivos, (o) => {
          if (o.IdArchivo === action.IdArchivo) {
            return {...o, isLinked: false};
          } else {
            return {...o};
          }
        }),
        OCPending: {
          ...state.selectedMail.OCPending,
          OCPendingList: map(state.selectedMail.OCPending.OCPendingList, (o) => {
            if (o.IdPPPedido === action.IdPPPedidoOriginal) {
              return {
                ...o,
                isLinked: false,
              };
            } else {
              return {...o};
            }
          }),
        },
      },
    };
  }),
  on(mailboxActions.QUIT_MAILBOX_TEMP_FILE, (state, action) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        CorreoRecibidoCliente: map(state.selectedMail.CorreoRecibidoCliente, (o) => {
          if (o.IdCatClasificacionCorreoRecibido === action.IdCatClasificacionCorreoRecibido) {
            return {
              ...o,
              ArchivoTemp: null,
              ArchivoTempName: '',
            };
          } else {
            return {...o};
          }
        }),
      },
    };
  }),
  on(mailboxActions.FIND_CLIENTS_WITH_SAME_MAIL_SUCCESS, (state, {clients}) => ({
    ...state,
    selectedMail: {
      ...state.selectedMail,
      clientsWithSameMail: clients,
      selectedClientToDrop: find(
        clients,
        (o: DropListOption) => o.value === state.selectedMail.Cliente.IdCliente,
      ),
    },
  })),
  on(mailboxActions.GET_USER_ERROR_CARTERA_SUCCESS, (state, {usersWalletError}) => {
    return {
      ...state,
      selectedMail: {
        ...state.selectedMail,
        UsuariosErrorCartera: usersWalletError,
      },
    };
  }),
  on(mailboxActions.HANDLE_SELECTED_DROP_CLIENT, (state, {selectedClientToDrop}) => ({
    ...state,
    selectedMail: {
      ...state.selectedMail,
      selectedClientToDrop,
    },
  })),
  on(mailboxActions.SHOW_DELETE_MAIL_POP, (state, {value}) => ({
    ...state,
    deleteMailPop: value,
  })),
  on(mailboxActions.CLEAN_STATE, (state) => ({
    ...initialMailBoxState(),
  })),
);
