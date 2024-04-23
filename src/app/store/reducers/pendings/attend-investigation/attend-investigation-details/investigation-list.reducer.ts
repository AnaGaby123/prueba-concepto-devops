import {createReducer, on} from '@ngrx/store';
import {
  initialIAttendInvestigationDetails,
  initialIGmItemAttention,
  IProductInvestigation,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';
import {
  attendInvestigationAddProductActions,
  attendInvestigationDetailsActions,
} from '@appActions/pendings/attend-investigation';
import {map} from 'lodash-es';
import {CotPartidaCotizacionInvestigacionComentario} from 'api-logistica';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {AttendInvestigationProductsStatusKeys} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';

export const productInvestigationListReducer = createReducer(
  {
    ...initialIAttendInvestigationDetails().productInvestigationList,
  },
  // LISTADO DE PRODUCTOS A INVESTIGAR
  on(
    attendInvestigationDetailsActions.FETCH_PROVIDER_PRODUCTS_LIST_SUCCESS,
    (state, {items}) => items,
  ),
  // CAMBIA LA BANDERA DEL PRODUCTO SELECCIONADO
  on(attendInvestigationDetailsActions.SET_SELECTED_PRODUCT, (state, {product}) =>
    map(
      state,
      (p: IProductInvestigation): IProductInvestigation => {
        if (product.index === p.index) {
          return {
            ...p,
            selected: true,
          };
        }
        return {
          ...p,
          selected: false,
          detailsOpen: false,
        };
      },
    ),
  ),
  // CAMBIA LA BANDERA DE LOS DETALLES DEL PRPDUCTO A INVESTIGAR SELECCIONADO
  on(
    attendInvestigationDetailsActions.OPEN_PRODUCT_DETAILS,
    (state, {value, index, isOnlineInvestigation}) =>
      map(
        state,
        (o: IProductInvestigation): IProductInvestigation => {
          if (o.index === index) {
            return {
              ...o,
              detailsOpen: value,
              isOnlineInvestigation,
              gmItemAttention:
                o.EstadoInvestigacion === 'Nueva'
                  ? {
                      ...o.gmItemAttention,
                      cotPartidaCotizacionInvestigacionAtencion: {
                        ...o.gmItemAttention.cotPartidaCotizacionInvestigacionAtencion,
                        IdCotPartidaCotizacionInvestigacion: o.IdCotPartidaCotizacionInvestigacion,
                      },
                    }
                  : o.gmItemAttention,
            };
          }
          return {
            ...o,
            detailsOpen: false,
          };
        },
      ),
  ),
  // CAMBIA LA BANDERA DEL CHECK DEL PRODUCTO A INVESTIGAR SELECCIONADO
  on(attendInvestigationDetailsActions.CHECK_ITEM, (state, {index}) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.index === index) {
          return {
            ...o,
            isChecked: !o.isChecked,
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  // CAMBIA LAS BANDERAS DEL CHECK EN TODOS LOS PRODUCTOS A INVESTIGAR DE LA LISTA
  on(attendInvestigationDetailsActions.CHECK_ALL_ITEMS, (state, {value}) =>
    map(state, (o: IProductInvestigation) => {
      return {
        ...o,
        isChecked:
          o.ClaveEstadoInvestigacion !==
            AttendInvestigationProductsStatusKeys.EnEsperaDeRespuesta && value,
      };
    }),
  ),
  // CAMBIA EL VALOR DEL RADIO BUTTON SEGUN EL SELECCIONADO PARA LOS DETALLES DEL PRODUCTO EN STATUS NUEVO O POR REATENDER
  on(attendInvestigationDetailsActions.SET_RADIO_VALUE, (state, {prop, value}) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.selected) {
          return {
            ...o,
            gmItemAttention: {
              ...o.gmItemAttention,
              cotPartidaCotizacionInvestigacionAtencion: {
                ...o.gmItemAttention.cotPartidaCotizacionInvestigacionAtencion,
                ProductoDisponible: prop === 'ProductoDisponible' ? value : false,
                Sugerencias: prop === 'Sugerencias' ? value : false,
              },
            },
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  // OBTIENE LOS DETALLES DEL PPRDUCTO A INVESTIGAR SELECCIONADO, CAMBIA LA BANDERA PARA RRECARGAR Y GENERA UN BACKUP
  on(attendInvestigationDetailsActions.FETCH_PRODUCT_INVESTIGATION_DETAIL, (state, {details}) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.selected) {
          return {
            ...o,
            needsToReloadAttention: false,
            gmItemAttention: details,
            backup: details,
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  // AGREGA EL PPRDUCTO ENCONTRADO O SUGERIDO DE LA SECCION DEL DETALLE DEL PRODUCTO A INVESTIGAR SELECCIONADO
  on(attendInvestigationDetailsActions.DROP_PRODUCT, (state, {product}) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.selected) {
          return {
            ...o,
            gmItemAttention: {
              ...o.gmItemAttention,
              Producto: product,
              cotPartidaCotizacionInvestigacionAtencion: {
                ...o.gmItemAttention.cotPartidaCotizacionInvestigacionAtencion,
                IdProducto: product.IdProducto,
              },
            },
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  // ELIMINA EL PPRDUCTO ENCONTRADO O SUGERIDO DE LA SECCION DEL DETALLE DEL PRODUCTO A INVESTIGAR SELECCIONADO
  on(attendInvestigationDetailsActions.REMOVE_PRODUCT_TO_ATTEND, (state) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.selected) {
          return {
            ...o,
            gmItemAttention: {
              ...o.gmItemAttention,
              Producto: null,
              cotPartidaCotizacionInvestigacionAtencion: {
                ...o.gmItemAttention.cotPartidaCotizacionInvestigacionAtencion,
                IdProducto: null,
              },
            },
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  // COLOCA EL COMENTARIO DEL EVI DE LA SECCION DE DETALLES DEL PRODUCTO A INVESTIGAR
  on(attendInvestigationDetailsActions.SET_EVI_COMMENT, (state, {comment}) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.selected) {
          return {
            ...o,
            gmItemAttention: {
              ...o.gmItemAttention,
              cotPartidaCotizacionInvestigacionComentario: map(
                o.gmItemAttention.cotPartidaCotizacionInvestigacionComentario,
                (
                  p: CotPartidaCotizacionInvestigacionComentario,
                ): CotPartidaCotizacionInvestigacionComentario => {
                  if (p.IdCotPartidaCotizacionInvestigacionComentario === DEFAULT_UUID) {
                    return {
                      ...p,
                      Comentario: comment,
                    };
                  }
                  return {
                    ...p,
                  };
                },
              ),
            },
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  // ACTUALIZA LA LISTA DE PRODUCTOS A INVESTIGAR
  on(attendInvestigationDetailsActions.UPDATE_ITEMS_ATTENTION_LIST, (state, {items}) => items),
  // CAMBIA EL VALOR DEL RADIO BUTTON SEGUN EL SELECCIONADO PARA LOS DETALLES DEL PRODUCTO EN STATUS EN ESPERA DE RESPUESTA
  on(attendInvestigationDetailsActions.SET_RADIO_BUTTON_VALUE, (state, {prop, value}) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.selected) {
          return {
            ...o,
            gmProviderResponse: {
              ...o.gmProviderResponse,
              cotPartidaInvestigacionProducto: {
                ...o.gmProviderResponse.cotPartidaInvestigacionProducto,
                Encontrado: prop === 'Encontrado' ? value : false,
                NoEncontrado: prop === 'NoEncontrado' ? value : false,
              },
            },
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  // COLOCA LAS NOTAS EN EL DETALLE DEL PPRDUCTO A INVESTIGAR CON STATUS EN ESPERA DE RESPUESTA
  on(attendInvestigationDetailsActions.SET_NOTES, (state, {notes}) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.selected) {
          return {
            ...o,
            gmProviderResponse: {
              ...o.gmProviderResponse,
              cotPartidaInvestigacionProducto: {
                ...o.gmProviderResponse.cotPartidaInvestigacionProducto,
                Notas: notes,
              },
            },
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  // COLOCA EL ARCHIVO EN EL DETALLE DEL PPRDUCTO A INVESTIGAR CON STATUS EN ESPERA DE RESPUESTA
  on(attendInvestigationDetailsActions.SET_FILE, (state, {file}) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.selected) {
          return {
            ...o,
            gmProviderResponse: {
              ...o.gmProviderResponse,
              file,
            },
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  // LIMPIA EL FORMULARIO DEL DETALLE DEL PRODUCTO POR INVESTIGAR EN STATUS NUEVO
  on(attendInvestigationDetailsActions.CANCEL_SELECTED_NEW_STATUS, (state) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.selected) {
          return {
            ...o,
            gmItemAttention: {
              ...initialIGmItemAttention(),
            },
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  // LIMPIA EL FORMULARIO DEL DETALLE Y REGRESA EL BACKUP DEL PRODUCTO POR INVESTIGAR EN STATUS POR REATENDER
  on(attendInvestigationDetailsActions.HANDLE_CANCEL_PRODUCT, (state) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.selected) {
          return {
            ...o,
            gmItemAttention:
              o.EstadoInvestigacion !== 'En Espera De Respuesta' ? o.backup : o.gmItemAttention,
            gmProviderResponse:
              o.EstadoInvestigacion === 'En Espera De Respuesta' ? o.backup : o.gmProviderResponse,
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  // COLOCA EL IDPRODUCTO EN EL OBJ gmProviderResponse  DESPUES DE GUARDAR EL PORDUCTO NUEVO
  on(attendInvestigationAddProductActions.SET_SAVE_PRODUCT_SUCCESS, (state, {payload}) =>
    map(
      state,
      (o: IProductInvestigation): IProductInvestigation => {
        if (o.selected) {
          return {
            ...o,
            gmProviderResponse: {
              ...o.gmProviderResponse,
              cotPartidaInvestigacionProducto: {
                ...o.gmProviderResponse.cotPartidaInvestigacionProducto,
                IdProducto: payload,
              },
            },
          };
        }
        return {
          ...o,
        };
      },
    ),
  ),
  on(attendInvestigationDetailsActions.CHANGE_INVESTIGATION_STATUS, (state) => {
    return map(state, (p) => {
      if (p.isChecked) {
        return {
          ...p,
          ClaveEstadoInvestigacion: AttendInvestigationProductsStatusKeys.EnEsperaDeRespuesta,
          backup: p.gmProviderResponse,
        };
      } else {
        return {...p};
      }
    });
  }),
);
