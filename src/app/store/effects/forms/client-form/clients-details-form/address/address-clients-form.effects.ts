import {Injectable} from '@angular/core';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {find, isEmpty, map as _map} from 'lodash-es';

import {SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {EMPTY, forkJoin, lastValueFrom, of} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';
import * as helpers from '@appHelpers/catalogs/clients/address.helper';
import {extractID} from '@appUtil/util';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
// ACTIONS
import * as clientsActions from '@appActions/forms/client-form/clients-form.actions';
import * as clientsAddressActions from '@appActions/forms/client-form/clients-details-form/address-clients-form/address-clients-form.actions';
// MODELS
import {IDireccion} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import * as api from 'api-catalogos';
import {DatosDireccionClienteComentario, Location} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
// SELECTORS
import {clientsAddressSelectors, clientsDetailsSelectors} from '@appSelectors/forms/clients-form';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

const FILE_NAME = 'address-clients-form.effects.ts';

@Injectable()
export class AddressClientsFormEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private configuracionClientesDireccionesService: api.ConfiguracionClientesDireccionesService,
    private configuracionDireccionesService: api.ConfiguracionDireccionesService,
    private configuracionesGoogleService: api.ConfiguracionDireccionesGoogleService,
  ) {}

  // DOCS: OBTIENE DIRECCIONES DEL CLIENTE
  getClientAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsAddressActions.GET_ADDRESS_CLIENT_LOAD, clientsAddressActions.SET_SEARCH_TERM),
      withLatestFrom(
        this.store.select(clientsDetailsSelectors.selectedClient),
        this.store.select(clientsAddressSelectors.selectSearchTerm),
      ),
      mergeMap(([action, client, searchTerm]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdCliente',
          ValorFiltro: client?.IdCliente,
        });
        if (searchTerm !== '') {
          body.Filters.push({
            NombreFiltro: 'DireccionCompleta',
            ValorFiltro: searchTerm,
          });
        }
        return this.configuracionClientesDireccionesService
          .DireccionClienteDetalleQueryResult(body)
          .pipe(
            map((response) => {
              const addresses: Array<IDireccion> = _map(
                helpers.getAddressFiltered(response),
                (o: IDireccion, i: number): IDireccion => {
                  return {
                    ...o,
                    isSelected: false,
                    index: i + 1,
                  };
                },
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return clientsAddressActions.GET_DATA_ADDRESS_SUCCESS({
                payload: addresses,
              });
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return of<any>(clientsAddressActions.GET_ADDRESS_CLIENT_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: EFECTO PARA DESHABILITAR DIRECCIONES
  disableAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsAddressActions.SAVE_ADDRESS_CLIENT_LOAD),
      withLatestFrom(this.store.select(clientsAddressSelectors.selectAddressToDelete)),
      mergeMap(([action, address]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (address.length > 0) {
          const request = _map(address, (a: IDireccion) => {
            return this.configuracionClientesDireccionesService.DireccionClienteDesactivar(
              a.clienteDireccion.IdDireccionCliente,
            );
          });
          return forkJoin(request).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(FILE_NAME, 'Al consultar deshabilitar direcciones'),
                response,
              );
              return clientsAddressActions.DELETE_ADDRESS_SUCCESS();
            }),
          );
        }
        return of(clientsAddressActions.DELETE_ADDRESS_SUCCESS());
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(FILE_NAME, 'Al deshabilitar direcciones'),
          error,
        );
        this.store.dispatch(SET_LOADING({payload: false}));
        return EMPTY;
      }),
    ),
  );

  // DOCS: EFECTO PARA OBTENER LOGITUD Y LATITUD
  fetchMatLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsAddressActions.FETCH_MAP_LOCATION_LOAD),
      withLatestFrom(
        this.store.select(clientsAddressSelectors.selectGeoCodingInfo),
        this.store.select(clientsAddressSelectors.selectAddressForm),
        this.store.select(catalogsSelectors.selectvCatRutasEntregaForDropDownList),
      ),
      mergeMap(([action, geoCodingInfo, form, routes]) => {
        const idLocal = find(routes, (o: DropListOption) => o.label === 'Local');
        const idGuadalajara = find(routes, (o: DropListOption) => o.label === 'Guadalajara');
        if (
          form.IdCatRutaEntrega === idLocal.value ||
          form.IdCatRutaEntrega === idGuadalajara.value
        ) {
          return this.configuracionesGoogleService.GeocodingProcess(geoCodingInfo).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(FILE_NAME, 'Al consultar coordenadas'),
                response,
              );
              if (response?.lat && response?.lng) {
                this.store.dispatch(
                  clientsAddressActions.FETCH_MAP_LOCATION_SUCCESS({
                    lat: response?.lat,
                    lng: response?.lng,
                  }),
                );
                return clientsAddressActions.SHOW_MAP({value: true});
              }
              return clientsAddressActions.FETCH_MAP_LOCATION_FAILED();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(FILE_NAME, 'Al consultar coordenadas'),
                error,
              );
              return EMPTY;
            }),
          );
        }
        return of(clientsAddressActions.SHOW_MAP({value: true}));
      }),
    ),
  );

  // DOCS: EFECTO PARA OBTENER LA DISTANCIA EN KM
  fetchDistance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsAddressActions.FETCH_DISTANCE),
      withLatestFrom(this.store.select(clientsAddressSelectors.selectAddressForm)),
      mergeMap(([actions, addressForm]) => {
        const coords: Location = {
          lat: addressForm.Latitud,
          lng: addressForm.Longitud,
        };
        return this.configuracionesGoogleService.DirectionsProcess(coords).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(FILE_NAME, 'Al obtener distancia'),
              response,
            );
            return clientsAddressActions.FETCH_DISTANCE_SUCCESS({
              DistanciaCartaPorte: response.TotalDistanceInKm / 1000,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(FILE_NAME, 'Al Obtener distancia'),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS: EFECTO PARA GUARDAR TODAS LAS DIRECCIONES
  saveAddressclient$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clientsAddressActions.DELETE_ADDRESS_SUCCESS),
        withLatestFrom(
          this.store.select(clientsAddressSelectors.selectAddressOnly),
          this.store.select(clientsAddressSelectors.selectAddress),
        ),
        mergeMap(async ([action, address, addressNode]) => {
          for (let item of address) {
            const cont = address.indexOf(item);
            // GUARDA Direccion
            try {
              const IdDireccion = await lastValueFrom(
                this.configuracionDireccionesService.DireccionGuardarOActualizar(item),
              );
              this.store.dispatch(
                clientsAddressActions.SET_ADDRESS_ID({
                  IdDireccion: extractID(IdDireccion),
                  index: cont,
                }),
              );
              item = {
                ...item,
                IdDireccion: extractID(IdDireccion),
                clienteDireccion: {
                  ...item.clienteDireccion,
                  IdDireccion: extractID(IdDireccion),
                  IdCliente: addressNode.IdClient,
                  PagaGuiaEnvio: item.PagaGuiaEnvio,
                },
              };
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(FILE_NAME, 'Al guardar direcciones'),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }
            item.clienteDireccion = await this.setSchedules(item.clienteDireccion, item, cont);
            if (!isEmpty(item.horariosEntrega)) {
              try {
                const IdDatosDireccionCliente = await lastValueFrom(
                  this.configuracionClientesDireccionesService.DatosDireccionClienteGuardarOActualizar(
                    item.DeliveryData,
                  ),
                );
                item = {
                  ...item,
                  DeliveryData: {
                    ...item.DeliveryData,
                    IdDatosDireccionCliente: extractID(IdDatosDireccionCliente),
                  },
                  clienteDireccion: {
                    ...item.clienteDireccion,
                    IdDatosDireccionCliente: extractID(IdDatosDireccionCliente),
                  },
                };
                this.store.dispatch(
                  clientsAddressActions.SET_DELIVERY_DATA_ID({
                    IdDatosDireccionCliente: extractID(IdDatosDireccionCliente),
                    index: cont,
                  }),
                );
              } catch (error) {
                this.logger.debug(
                  servicesLogger.generateMessage(FILE_NAME, 'Al guardar DatosDireccioncliente'),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }
            }
            // GUARDA HorarioAtencion
            try {
              const clienteDireccion = await lastValueFrom(
                this.configuracionClientesDireccionesService.DireccionClienteGuardarOActualizar(
                  item.clienteDireccion,
                ),
              );
              item.clienteDireccion = {
                ...item.clienteDireccion,
                IdDireccionCliente: extractID(clienteDireccion),
              };
              this.store.dispatch(
                clientsAddressActions.SET_CLIENTE_DIRECCION_ID({
                  IdClienteDireccion: extractID(clienteDireccion),
                  index: cont,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(FILE_NAME, 'Al guardar DirecccionCliente'),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }
            if (addressNode.deleteComments.length > 0) {
              try {
                for (const comment of addressNode.deleteComments) {
                  const commentToDelete = await lastValueFrom(
                    this.configuracionClientesDireccionesService.DatosDireccionClienteComentarioDesactivar(
                      comment.IdDatosDireccionClienteComentario,
                    ),
                  );
                }
                this.store.dispatch(clientsAddressActions.DELETED_COMMENT_SUCCESS());
              } catch (error) {
                this.logger.debug(
                  servicesLogger.generateMessage(FILE_NAME, 'Al eliminar comentarios'),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }
            }
            if (item.DeliveryDataComments.length > 0) {
              try {
                item = {
                  ...item,
                  DeliveryDataComments: _map(
                    item.DeliveryDataComments,
                    (c: DatosDireccionClienteComentario) => {
                      return {
                        ...c,
                        IdDatosDireccionCliente: item.clienteDireccion.IdDatosDireccionCliente,
                      };
                    },
                  ),
                };
                const updateComments = [];
                for (let comment of item.DeliveryDataComments) {
                  const cont1 = address.indexOf(comment);
                  const IdDatosDireccionClienteComentario = await lastValueFrom(
                    this.configuracionClientesDireccionesService.DatosDireccionClienteComentarioGuardarOActualizar(
                      comment,
                    ),
                  );
                  comment = {
                    ...comment,
                    IdDatosDireccionClienteComentario: extractID(IdDatosDireccionClienteComentario),
                  };
                  updateComments.push(comment);
                }
                this.store.dispatch(
                  clientsAddressActions.SET_COMMENTS_ID({
                    comments: updateComments,
                    index: cont,
                  }),
                );
              } catch (error) {
                this.logger.debug(
                  servicesLogger.generateMessage(FILE_NAME, 'Al guardar comentarios'),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }
            }
          }
          this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: false}));
          this.store.dispatch(SET_LOADING_SUCCESS({active: true, message: 'Has guardado'}));
          this.store.dispatch(SET_LOADING({payload: false}));
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  async saveHorariosType(item, type, typeValue, serviceType, i, nameItemSchedule) {
    let response = null;
    if (item !== undefined && item.length > 0) {
      if (typeValue === null) {
        typeValue = DEFAULT_UUID;
      }
      const horarioAtencionTipo = {
        ...(await this.getRequestBodyHorariosType(item, i, nameItemSchedule)),
        [type]: typeValue,
      };

      response = await lastValueFrom(
        this.configuracionClientesDireccionesService[serviceType](horarioAtencionTipo),
      );
    }
    return extractID(response);
  }

  async setSchedules(objectAddressService, item, i) {
    objectAddressService = {
      ...objectAddressService,
      IdHorarioAtencionCobro: await this.saveHorariosType(
        item.horariosCobro,
        'IdHorarioAtencionCobro',
        objectAddressService.IdHorarioAtencionCobro,
        'HorarioAtencionCobroGuardarOActualizar',
        i,
        'horariosCobro',
      ),
    };
    objectAddressService = {
      ...objectAddressService,
      IdHorarioAtencionRevision: await this.saveHorariosType(
        item.horariosRevision,
        'IdHorarioAtencionRevision',
        objectAddressService.IdHorarioAtencionRevision,
        'HorarioAtencionRevisionGuardarOActualizar',
        i,
        'horariosRevision',
      ),
    };
    objectAddressService = {
      ...objectAddressService,
      IdHorarioAtencionVisita: await this.saveHorariosType(
        item.horariosVisita,
        'IdHorarioAtencionVisita',
        objectAddressService.IdHorarioAtencionVisita,
        'HorarioAtencionVisitaGuardarOActualizar',
        i,
        'horariosVisita',
      ),
    };
    objectAddressService = {
      ...objectAddressService,
      IdHorarioAtencionEntrega: await this.saveHorariosType(
        item.horariosEntrega,
        'IdHorarioAtencionEntrega',
        objectAddressService.IdHorarioAtencionEntrega,
        'HorarioAtencionEntregaGuardarOActualizar',
        i,
        'horariosEntrega',
      ),
    };
    return objectAddressService;
  }

  async getRequestBodyHorariosType(item, i, nameItemScheduleList) {
    const horarioAtencionTipo = {
      IdHorarioAtencionLunes: null,
      IdHorarioAtencionMartes: null,
      IdHorarioAtencionMiercoles: null,
      IdHorarioAtencionJueves: null,
      IdHorarioAtencionViernes: null,
      IdHorarioAtencionSabado: null,
      IdHorarioAtencionDomingo: null,
    };
    for (const itemH of item) {
      const iSchedule = item.indexOf(itemH);
      try {
        const response = await lastValueFrom(
          this.configuracionClientesDireccionesService.HorarioAtencionGuardarOActualizar(itemH),
        );
        switch (itemH.Dia) {
          case 'Lunes': {
            horarioAtencionTipo.IdHorarioAtencionLunes = extractID(response);
            break;
          }
          case 'Martes': {
            horarioAtencionTipo.IdHorarioAtencionMartes = extractID(response);
            break;
          }
          case 'Miercoles': {
            horarioAtencionTipo.IdHorarioAtencionMiercoles = extractID(response);
            break;
          }
          case 'Jueves': {
            horarioAtencionTipo.IdHorarioAtencionJueves = extractID(response);
            break;
          }
          case 'Viernes': {
            horarioAtencionTipo.IdHorarioAtencionViernes = extractID(response);
            break;
          }
        }
        this.store.dispatch(
          clientsAddressActions.SET_SCHEDULE_ID({
            scheduleType: nameItemScheduleList,
            value: extractID(response),
            index: i,
            indexSchedule: iSchedule,
          }),
        );
      } catch (error) {}
    }
    return horarioAtencionTipo;
  }
}
