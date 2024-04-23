import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {find, isEmpty, isEqual, omit} from 'lodash-es';

import {lastValueFrom, of} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';
import {RETURN_EMPTY, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';

// ACTIONS
import {
  newClientFormActions,
  quotationActions,
  quotationDashboardActions,
  quotationDetailsActions,
} from '@appActions/quotation';
import {extractID} from '@appUtil/util';
// MODELS
import * as api from 'api-catalogos';
import {
  CatRutaEntrega,
  CatTipoNumeroTelefonico,
  Contacto,
  ContactoCliente,
  CorreoElectronico,
  DirectionsPqfObj,
  Location,
  ParametroValidarCodigoPostal,
  QueryResultCorreoElectronico,
  VNumeroTelefonico,
} from 'api-catalogos';
import * as apiLogistic from 'api-logistica';
import {GMClienteCotizacion, GMContactosCliente} from 'api-logistica';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
// SELECTORS
import * as selectorsCatalogs from '@appSelectors/catalogs/catalogs.selectors';
import {dropListRutasEntrega} from '@appSelectors/catalogs/catalogs.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {newClientFormSelectors, quotationDetailsSelectors} from '@appSelectors/quotation';
import {initialNewClientFormState} from '@appModels/store/quotation/quotation-details/details/sections/new-customer-quotes.models';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {initialAddress} from '@appModels/store/forms/custom-agents-forms/custom-agents-details-forms/custom-agents-details-forms.models';
import {IDireccion} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {appRoutes} from '@appHelpers/core/app-routes';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {ClientsListItemForQuotation} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {SAVE_NEW_CLIENT_NAME} from '@appActions/quotation/quotation-details/details/new-customer-quotes/new-customer-quotes.actions';

const FILE_NAME = 'address-clients-form.effects.ts';

@Injectable()
export class NewCustomerQuotesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private router: Router,
    private configuracionClientesDireccionesService: api.ConfiguracionClientesDireccionesService,
    private configuracionDireccionesService: api.ConfiguracionDireccionesService,
    private configuracionesGoogleService: api.ConfiguracionDireccionesGoogleService,
    private configuracionContactosService: api.ConfiguracionContactosService,
    private configuracionClientesRelacionesService: api.ConfiguracionClientesRelacionesService,
    private configuracionClientesService: api.ConfiguracionClientesService,
    private configurationQuotationClientsContactsService: apiLogistic.ProcesosL01CotizacionContactoClienteService,
    private configurationQuotationClientService: apiLogistic.ProcesosL01CotizacionClienteService,
  ) {}

  // DOCS: EFECTO QUE INICIALIZA EL COMPONENTE CON LOS CATALOGOS
  ngOnInit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newClientFormActions.INIT_LIST_COMPONENT_EFFECT),
      mergeMap(() => {
        this.store.dispatch(
          quotationActions.SET_TITLE({
            title: initialNewClientFormState().title,
          }),
        );
        this.store.dispatch(catalogsActions.GET_CAT_ROL_CLIENTS_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_PAIS_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_ZONA_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_RUTA_ENTREGA_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_INDUSTRIA_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_SECTOR_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_NIVEL_INGRESO_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_ADDRESS_TYPE_LOAD());
        this.store.dispatch(newClientFormActions.GET_CONTACTS_BY_QUOTATION());
        return of(RETURN_EMPTY());
      }),
    );
  });

  // DOCS: EFECTO PARA GUARDAR EN EL ESTADO LOS CAMPOS DE LOS NUMEROS DE TELEFONOS
  setPhoneNumberContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newClientFormActions.SET_PHONE_NUMBER_CONTACT_EFFECT),
      withLatestFrom(this.store.select(selectorsCatalogs.selectTipoTelefono)),
      switchMap(([{field, phoneType, value}, phoneTypesList]) => {
        const phoneTypeObject: CatTipoNumeroTelefonico = find(
          phoneTypesList,
          (o: CatTipoNumeroTelefonico) => o.Clave === phoneType,
        );
        this.store.dispatch(
          newClientFormActions.SET_PHONE_NUMBER({
            field,
            value,
            phoneType,
            phoneTypeId: phoneTypeObject?.IdCatTipoNumeroTelefonico,
          }),
        );
        return of(RETURN_EMPTY());
      }),
    );
  });
  // DOCS: ALERTA DE CAMBIOS REALIZADOS EN EL COMPONENTE
  activateAlertExit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newClientFormActions.ACTIVATE_ALERT_EXIT),
      withLatestFrom(this.store.select(newClientFormSelectors.openAddAlert)),
      switchMap(([action, alert]) => {
        if (alert) {
          this.store.dispatch(
            newClientFormActions.SET_ALERT_EXIT({
              value: true,
            }),
          );
        } else {
          this.navigateDetails();
        }
        return of(RETURN_EMPTY());
      }),
    );
  });
  // DOCS; EFECTO PARA VALIDAR SI SE PUEDE MONSTRAR EL MAPA DE ACUERDO CON LA DIRECCION LOCAL O GUADALAJARA
  ShowMaps$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newClientFormActions.SHOW_MAPS_LOADING),
      withLatestFrom(
        this.store.select(newClientFormSelectors.selectValidateShowMap),
        this.store.select(newClientFormSelectors.selectRecogeEnProquifa),
      ),
      switchMap(([action, showMaps, selectedPickUp]) => {
        if (!selectedPickUp) {
          if (showMaps) {
            this.store.dispatch(
              newClientFormActions.FETCH_MAP_LOCATION_LOAD({
                value: true,
              }),
            );
          }
        }
        return of(RETURN_EMPTY());
      }),
    );
  });
  // DOCS: OBTIENE LAS CORDENADAS Y CALCULA LA DISTANCIA EN KM PARA LUEGO GUARDARLA EN EL ESTADO.
  fetchDistance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newClientFormActions.FETCH_DISTANCE),
      withLatestFrom(this.store.select(newClientFormSelectors.selectAddressForm)),
      mergeMap(([actions, addressForm]) => {
        const coords: Location = {
          lat: addressForm.Latitud,
          lng: addressForm.Longitud,
        };
        if (!isEmpty(coords)) {
          return this.configuracionesGoogleService.DirectionsProcess(coords).pipe(
            map((response: DirectionsPqfObj) => {
              this.logger.debug(
                servicesLogger.generateMessage(FILE_NAME, 'Al obtener distancia'),
                response,
              );
              return newClientFormActions.FETCH_DISTANCE_SUCCESS({
                distanceCartaPorte: response.TotalDistanceInKm / 1000,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(FILE_NAME, 'Al Obtener distancia'),
                error,
              );
              return of(RETURN_EMPTY());
            }),
          );
        }
      }),
    ),
  );
  // DOCS: EFECTO PARA OBTENER LONGITUD Y LATITUD
  fetchMatLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newClientFormActions.FETCH_MAP_LOCATION_LOAD),
      withLatestFrom(
        this.store.select(newClientFormSelectors.selectGeoCodingInfo),
        this.store.select(newClientFormSelectors.selectDirection),
        this.store.select(newClientFormSelectors.selectvCatRutasEntregaForDropDownList),
      ),
      mergeMap(([action, geoCodingInfo, form, routes]) => {
        const idLocal = find(routes, (o: DropListOption) => o.label === 'Local');
        const idGuadalajara = find(routes, (o: DropListOption) => o.label === 'Guadalajara');
        if (
          form.IdCatRutaEntrega === idLocal.value ||
          form.IdCatRutaEntrega === idGuadalajara.value
        ) {
          return this.configuracionesGoogleService.GeocodingProcess(geoCodingInfo).pipe(
            map((response: Location) => {
              this.logger.debug(
                servicesLogger.generateMessage(FILE_NAME, 'Al consultar coordenadas'),
                response,
              );
              this.store.dispatch(
                newClientFormActions.FETCH_MAP_LOCATION_SUCCESS_NEW_CLIENT({
                  lat: response.lat,
                  lng: response.lng,
                }),
              );

              return newClientFormActions.SHOW_MAP_NEW_CLIENT({value: true});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(FILE_NAME, 'Al consultar coordenadas'),
                error,
              );
              return of(RETURN_EMPTY());
            }),
          );
        }
        return of(newClientFormActions.SHOW_MAP_NEW_CLIENT({value: true}));
      }),
    ),
  );
  // DOCS: EFECTO PARA VALIDAR EL CODIGO POSTAL DE LA DIRECCION DEL USUARIO.
  checkValidZipCode = createEffect(() => {
    return this.actions$.pipe(
      ofType(newClientFormActions.VALIDATE_ZIP_CODE_LOAD),
      withLatestFrom(this.store.select(newClientFormSelectors.selectAddressForm)),
      mergeMap(([action, addresss]) => {
        if (!addresss.IdCatPais || !addresss.CodigoPostal) {
          return of(
            newClientFormActions.VALIDATE_ZIP_CODE_SUCCESS_ADDRESS({
              value: false,
            }),
          );
        }
        const params: ParametroValidarCodigoPostal = {
          IdCatPais: addresss.IdCatPais,
          CodigoPostal: addresss.CodigoPostal,
        };
        if (!isEmpty(params)) {
          return this.configuracionDireccionesService
            .DireccionExtensionsValidarCodigoPostalPais(params)
            .pipe(
              map((response: boolean) => {
                this.logger.debug(
                  servicesLogger.generateMessage(FILE_NAME, 'Al validar el código postal'),
                  addresss.CodigoPostal,
                );
                this.store.dispatch(
                  newClientFormActions.VALIDATE_ZIP_CODE_SUCCESS_ADDRESS({
                    value: response,
                  }),
                );
                return newClientFormActions.CHECK_ZIP_CODE_INFO_LOAD();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al checar el codigo postal del usuario',
                  ),
                );
                return of(
                  newClientFormActions.VALIDATE_ZIP_CODE_SUCCESS_ADDRESS({
                    value: false,
                  }),
                );
              }),
            );
        }
        return of(RETURN_EMPTY());
      }),
    );
  });

  // DOCS: EFECTO PARA GUARDAR O ACTULIZAR EL NUEVO CLIENTE
  saveOrUpdateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newClientFormActions.SAVE_FORM_CONTACT_CLIENT),
      withLatestFrom(this.store.select(newClientFormSelectors.selectedNewClient)),
      mergeMap(([action, client]) => {
        try {
          this.store.dispatch(SET_LOADING({payload: true}));
          if (!isEmpty(client)) {
            return this.configuracionClientesService.ClienteGuardarOActualizar(client).pipe(
              map((response) => {
                try {
                  this.store.dispatch(
                    newClientFormActions.UPDATE_CLIENT({
                      idClient: extractID(response),
                    }),
                  );
                  this.store.dispatch(
                    quotationDetailsActions.SET_DATA_SELECTED_CLIENT_QUOTATION_DETAIL({
                      input: 'idClient',
                      value: extractID(response),
                    }),
                  );

                  if (client.RecogeEnProquifa) {
                    this.store.dispatch(
                      quotationDetailsActions.SET_CLIENT_QUOTES_SELECTED_CLIENT_NEW_DIRECTION_DELIVERY(
                        {
                          route: null,
                          name: null,
                        },
                      ),
                    );
                    this.store.dispatch(
                      quotationDetailsActions.SET_CLIENT_QUOTES_SELECTED_CLIENT_NEW_DIRECTION({
                        direction: initialAddress(),
                      }),
                    );
                    this.store.dispatch(newClientFormActions.SAVE_OR_UPDATE_CONTACT());
                  } else {
                    this.store.dispatch(newClientFormActions.SAVE_ADDRESS_CLIENT());
                  }
                } catch (e) {
                  return SET_LOADING({payload: false});
                }
              }),
            );
          }
          return of(RETURN_EMPTY());
        } catch (e) {
          return of(RETURN_EMPTY());
        }
      }),
    ),
  );

  // DOCS: EFECTO PARA GUARDAR O ACTUALIZAR EL NUEVO CONTACTO DEL CLIENTE Y TAMBIEN EL CORREO Y NUMEROS
  // @ts-ignore
  saveOrUpdateContacts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newClientFormActions.SAVE_OR_UPDATE_CONTACT),
      withLatestFrom(
        this.store.select(newClientFormSelectors.selectedNewClient),
        this.store.select(newClientFormSelectors.selectClientContacts),
        this.store.select(newClientFormSelectors.selectBackUpCustomer),
        this.store.select(newClientFormSelectors.selectPhonesContact),
      ),
      switchMap(async ([action, client, clientContacts, backUp, phoneContact]) => {
        try {
          if (clientContacts.length > 0) {
            let indexContact = 0;
            let idPerson;
            let idEmail;
            let idContact;
            if (!isEmpty(clientContacts)) {
              for (const contact of clientContacts) {
                // DOCS: guardado contacto
                const contactFound = find(backUp.contacts);
                if (
                  (contactFound && !isEqual(contactFound, contact)) ||
                  (!contactFound && contact.DatosPersona.IdDatosPersona === DEFAULT_UUID)
                ) {
                  try {
                    idPerson = await lastValueFrom(
                      this.configuracionContactosService.DatosPersonaGuardarOActualizar(
                        this.patchContact(contact),
                      ),
                    );
                    idPerson = extractID(idPerson);
                    this.store.dispatch(
                      newClientFormActions.SET_ID_CONTACT({
                        idPerson,
                        index: indexContact,
                      }),
                    );
                  } catch (error) {
                    this.logger.debug(
                      servicesLogger.generateMessage(
                        FILE_NAME,
                        'Al guardar o actualizar Datos Personas',
                      ),
                      error,
                    );
                    return SET_LOADING({payload: false});
                  }
                  // DOCS: GUARDADO EMAIL
                  try {
                    idEmail = await lastValueFrom(
                      this.configuracionContactosService.CorreoElectronicoGuardarOActualizar(
                        this.patchEmail(contact.CorreoElectronico[0], idPerson),
                      ),
                    );
                    idEmail = extractID(idEmail);
                    this.store.dispatch(
                      newClientFormActions.SET_ID_MAIL({
                        idEmail,
                        index: indexContact,
                      }),
                    );
                  } catch (error) {
                    this.logger.debug(
                      servicesLogger.generateMessage(
                        FILE_NAME,
                        'Al guardar o actualizar el correo del contacto',
                      ),
                      error,
                    );
                    return SET_LOADING({payload: false});
                  }
                  // DOCS: GUARDA LA RELACION DE LA TABLA DATOS PERSONA Y CONTACTO
                  if (
                    contact.ContactoCliente.IdContacto === '' ||
                    contact.ContactoCliente.IdContacto === DEFAULT_UUID
                  ) {
                    try {
                      idContact = await lastValueFrom(
                        this.configuracionContactosService.ContactoGuardarOActualizar(
                          this.patchDataContact(idPerson, contact.ContactoCliente.IdContacto),
                        ),
                      );
                      idContact = extractID(idContact);
                      this.store.dispatch(
                        quotationDetailsActions.SET_DATA_SELECTED_CLIENT_QUOTATION_DETAIL({
                          input: 'IdContacto',
                          value: idContact,
                        }),
                      );
                      this.store.dispatch(
                        newClientFormActions.SET_ID_CONTACT_PERSON({
                          idContact,
                          index: indexContact,
                        }),
                      );
                    } catch (error) {
                      this.logger.debug(
                        servicesLogger.generateMessage(
                          FILE_NAME,
                          servicesLogger.LOG_SUCCEEDED,
                          'Al guardar el id contacto del cliente.',
                        ),
                      );
                      return SET_LOADING({payload: false});
                    }
                    try {
                      let idContactClient = await lastValueFrom(
                        this.configuracionClientesRelacionesService.ContactoClienteGuardarOActualizar(
                          this.patchDataPersonAndContact(
                            client.IdCliente,
                            idContact,
                            contact.ContactoCliente.IdContactoCliente,
                          ),
                        ),
                      );
                      idContactClient = extractID(idContactClient);
                      this.store.dispatch(
                        newClientFormActions.SET_ID_CONTACT_CLIENT({
                          idContactClient,
                          index: indexContact,
                        }),
                      );
                    } catch (error) {
                      this.logger.debug(
                        servicesLogger.generateMessage(
                          FILE_NAME,
                          servicesLogger.LOG_SUCCEEDED,
                          'Al guardar el id contacto cliente.',
                        ),
                      );
                    }
                  }
                }
                indexContact++;
              }
            }

            if (!isEmpty(phoneContact)) {
              for (const phones of phoneContact[0]) {
                if (!isEmpty(phones)) {
                  try {
                    await lastValueFrom(
                      this.configuracionContactosService.NumeroTelefonicoGuardarOActualizar(
                        this.patchPhone(phones, idPerson),
                      ),
                    );
                  } catch (error) {
                    this.logger.debug(
                      servicesLogger.generateMessage(
                        FILE_NAME,
                        servicesLogger.LOG_SUCCEEDED,
                        'Al guardar numero telefonico.',
                      ),
                    );
                    return SET_LOADING({payload: false});
                  }
                }
              }
            }
            this.store.dispatch(SET_LOADING_SUCCESS({active: true, message: 'Has guardado'}));
            return newClientFormActions.ACTIVATE_NEW_CLIENT_QUOTATION();
          } else {
            return SET_LOADING({payload: false});
          }
        } catch (error) {
          return of(SET_LOADING({payload: false}));
        }
      }),
    );
  });
  // DOCS: Guarda la direccion del cliente
  saveAddressclient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newClientFormActions.SAVE_ADDRESS_CLIENT),
      withLatestFrom(
        this.store.select(newClientFormSelectors.selectAddressForm),
        this.store.select(newClientFormSelectors.selectedNewClient),
        this.store.select(dropListRutasEntrega),
      ),
      mergeMap(async ([action, address, newClient, catRoutes]) => {
        let item: IDireccion;
        item = address;
        // GUARDA Direccion
        try {
          if (!isEmpty(item)) {
            const IdDireccion = await lastValueFrom(
              this.configuracionDireccionesService.DireccionGuardarOActualizar(item),
            );
            this.store.dispatch(
              quotationDetailsActions.SET_DATA_SELECTED_CLIENT_QUOTATION_DETAIL({
                input: 'IdDireccion',
                value: extractID(IdDireccion),
              }),
            );
            item = {
              ...address,
              IdDireccion: extractID(IdDireccion),
              clienteDireccion: {
                ...address.clienteDireccion,
                IdDireccion: extractID(IdDireccion),
                IdCliente: newClient.IdCliente,
              },
            };
            // guarda la nueva direccion del cliente
            this.store.dispatch(
              quotationDetailsActions.SET_CLIENT_QUOTES_SELECTED_CLIENT_NEW_DIRECTION({
                direction: item,
              }),
            );
          }
          if (!isEmpty(item.clienteDireccion)) {
            await lastValueFrom(
              this.configuracionClientesDireccionesService.DireccionClienteGuardarOActualizar(
                item.clienteDireccion,
              ),
            );

            const resultCatRoutes: CatRutaEntrega = find(catRoutes, (o: CatRutaEntrega) => {
              return o.IdCatRutaEntrega === address.IdCatRutaEntrega;
            });
            this.store.dispatch(
              quotationDetailsActions.SET_CLIENT_QUOTES_SELECTED_CLIENT_NEW_DIRECTION_DELIVERY({
                route: resultCatRoutes.IdCatRutaEntrega,
                name: resultCatRoutes.RutaEntrega,
              }),
            );
          }
          return newClientFormActions.SAVE_OR_UPDATE_CONTACT();
        } catch (e) {
          return SET_LOADING({payload: false});
        }
      }),
    ),
  );
  // DOCS: EFECTO QUE VALIDA QUE EL CORREO EXISTA EN LA BASE DE DATOS PARA NO REPETIR EL CORREO
  checkExistingEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newClientFormActions.CHECK_EXISTING_EMAIL),
      mergeMap((action) => {
        this.logger.debug(
          servicesLogger.generateMessage(FILE_NAME, '@checkExistingEmail: Email'),
          action.email,
        );
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'Correo',
          ValorFiltro: action.email,
        });
        if (!isEmpty(body)) {
          return this.configuracionContactosService.CorreoElectronicoQueryResult(body).pipe(
            map((response: QueryResultCorreoElectronico) => {
              return newClientFormActions.VERIFY_EMAIL({
                value: response.TotalResults > 0,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al validar en correo',
                ),
              );
              return of(newClientFormActions.VERIFY_EMAIL({value: false}));
            }),
          );
        }
      }),
    ),
  );
  // DOCS: el cliente se guarda en el estado para actualizar los datos
  newClientSelected$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newClientFormActions.ACTIVATE_NEW_CLIENT_QUOTATION),
      withLatestFrom(this.store.select(newClientFormSelectors.selectedNewClient)),
      mergeMap(([action, client]) => {
        try {
          if (client) {
            this.store.dispatch(
              quotationDetailsActions.SET_CLIENT_QUOTES_SELECTED_CLIENT_NEW({
                clients: client,
              }),
            );
            this.store.dispatch(quotationDetailsActions.CLEAN_ALL_QUOTATION_DETAIL());
            this.store.dispatch(
              quotationDetailsActions.SET_CLIENT_QUOTES_SELECTED_QUOTATION({
                client,
              }),
            );
            return of(quotationDetailsActions.SET_CLIENT_QUOTES_SELECTED_QUOTATION_ACTIVATE());
          }
        } catch (e) {
          return of(RETURN_EMPTY());
        }
      }),
    );
  });
  // DOCS: Efecto encargado de ingresar los datos en el estado del cliente y direccion
  setInputAddressClient$ = createEffect(() => {
    this.actions$.pipe(
      ofType(newClientFormActions.SET_INPUT_FORM_ADDRESS_NEW_CLIENT),
      mergeMap((action) => {
        if (action) {
          if (action.input === 'CodigoPostal' && action.value.toString().length >= 4) {
            this.store.dispatch(newClientFormActions.VALIDATE_ZIP_CODE_LOAD());
          }
        }
        return of(RETURN_EMPTY());
      }),
    );
    return of(RETURN_EMPTY());
  });

  // DOCS: EFECTO PARA INGRESAR AL NUEVO CLIENTE EN EL ESTADO EL EL SELECTEDCLIENT Y REGRESAR A COTIZACIONES
  setNewClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(quotationDetailsActions.SET_CLIENT_QUOTES_SELECTED_QUOTATION_ACTIVATE),
      mergeMap((action) => {
        try {
          this.logger.debug(servicesLogger.generateMessage(FILE_NAME, 'Cliente nuevo'), action);
          this.store.dispatch(quotationDashboardActions.SET_ACTIVE_CHART({active: true}));
          this.store.dispatch(quotationActions.SET_DETAILS_MODE({detailsMode: true}));
          this.store.dispatch(
            quotationDetailsActions.SET_QUOTATION_SELECTED({
              idQuotation: DEFAULT_UUID,
            }),
          );
          this.store.dispatch(quotationActions.SET_DETAILS_COMPONENT({detailsComponent: true}));
          this.router.navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.quoter.quoter,
            appRoutes.quoter.details,
          ]);
          return of(SET_LOADING({payload: false}));
        } catch (e) {
          return of(RETURN_EMPTY());
        }
      }),
    );
  });
  // DOCS: AFECTO PARA CERRAR EL POP DE MAPA Y ACTUALIZAR LA LONGITUD Y LATITUD
  closeMap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newClientFormActions.CLOSE_MAP_COMPONENT_EFFECT),
      mergeMap(({lat, lng}) => {
        if (lat && lng) {
          this.store.dispatch(
            newClientFormActions.UPDATE_LAT_LNG({
              lat,
              lng,
            }),
          );
          this.store.dispatch(newClientFormActions.FETCH_DISTANCE());
          return of(newClientFormActions.SHOW_MAP_NEW_CLIENT({value: false}));
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  patchContact(contact: any) {
    return omit(contact, [
      'IdContacto',
      'Dificultad',
      'Mantenimiento',
      'NivelDecision',
      'NivelPuesto',
      'Telefonos',
      'Movil',
      'Email',
      'Correos',
      'Correo',
      'Phone1',
      'Phone2',
      'Mobile',
    ]);
  }

  patchEmail(object: CorreoElectronico, idPerson: string): CorreoElectronico {
    return {
      ...object,
      IdDatosPersona: idPerson,
    };
  }

  patchPhone(object: VNumeroTelefonico, idPerson: string): VNumeroTelefonico {
    return {
      ...object,
      IdDatosPersona: idPerson,
    };
  }

  patchDataContact(idDatosPersona: string, idContacto: string): Contacto {
    return {
      IdContacto: idContacto,
      IdDatosPersona: idDatosPersona,
      Prioridad: 0,
      FechaRegistro: DEFAULT_DATE,
      FechaUltimaActualizacion: DEFAULT_DATE,
      FechaCaducidadRegistro: DEFAULT_DATE,
      Activo: true,
    };
  }

  navigateDetails() {
    this.router
      .navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.quoter.quoter,
        appRoutes.quoter.details,
        appRoutes.quoter.main,
      ])
      .then(() => {
        this.store.dispatch(quotationActions.SHOW_NAV_BAR({isCustomerNew: true}));
        this.store.dispatch(
          quotationActions.SET_TITLE({
            title: 'COTIZAR',
          }),
        );
      });
  }

  patchDataPersonAndContact(
    idClient: string,
    idContact: string,
    idContactClient: string,
  ): ContactoCliente {
    return {
      IdContactoCliente: idContactClient,
      IdCliente: idClient,
      IdContacto: idContact,
      FechaCaducidadRegistro: DEFAULT_DATE,
      FechaRegistro: DEFAULT_DATE,
      FechaUltimaActualizacion: DEFAULT_DATE,
      Activo: true,
    };
  }

  // DOCS: GET CONTACTS BY QUOTATION ID
  getContactsByQuotationId = createEffect(() =>
    this.actions$.pipe(
      ofType(newClientFormActions.GET_CONTACTS_BY_QUOTATION),
      withLatestFrom(this.store.select(quotationDetailsSelectors.selectedQuotation)),
      mergeMap(([action, quotation]) => {
        return this.configurationQuotationClientsContactsService
          .cotCotizacionContactoClienteObtenerContactosClienteCotizacion([
            quotation.IdCotCotizacion,
          ])
          .pipe(
            map((response: GMContactosCliente) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los contactos del cliente.',
                ),
              );
              return newClientFormActions.GET_CONTACTS_BY_QUOTATION_SUCCESS({
                contacts: response.ContactosClientes,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los contactos del cliente.',
                ),
                error,
              );
              return of(newClientFormActions.GET_CONTACTS_BY_QUOTATION_ERROR());
            }),
          );
      }),
    ),
  );
  // DOCS: LINK NEW CONTACT TO CLIENT
  linkNewContactToClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newClientFormActions.LINK_NEW_CONTACT_TO_CLIENT, newClientFormActions.SAVE_NEW_CLIENT),
      withLatestFrom(
        this.store.select(newClientFormSelectors.selectGMClientQuotation),
        this.store.select(newClientFormSelectors.selectSelectedClient),
      ),
      mergeMap(([action, gmClientQuotation, client]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configurationQuotationClientService
          .cotCotizacionCambiarClienteCambiarClienteCotizacion(gmClientQuotation)
          .pipe(
            map((response: GMClienteCotizacion) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al vincular contacto nuevo a cliente existente.',
                ),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              if (action.type === SAVE_NEW_CLIENT_NAME) {
                const selectedClient: ClientsListItemForQuotation = {
                  DescripcionLlave: response.IdCliente,
                  Index: 0,
                  IdCliente: response.IdCliente,
                  Nombre: response.Cliente.Nombre,
                  Total: 1,
                  EstadoCotizacionNueva: 1,
                  EstadoCotizacionGuardada: 0,
                  EstadoCotizacionEnviada: 0,
                  TipoCotizacionTotal: 0,
                  TipoCotizacionParcial: 0,
                  ProductoDisponible: null,
                  Sugerencias: null,
                };
                return newClientFormActions.SAVE_NEW_CLIENT_SUCCESS({selectedClient});
              } else {
                // DOCS: LINK CONTACT TO CLIENT
                this.store.dispatch(quotationDetailsActions.CLEAN_LINK_ADD_NEW_CONTACT_POP_UP());

                const selectedClient: ClientsListItemForQuotation = {
                  DescripcionLlave: client.IdCliente,
                  Index: 0,
                  IdCliente: client.IdCliente,
                  Nombre: client.Nombre,
                };
                return newClientFormActions.LINK_NEW_CONTACT_TO_CLIENT_SUCCESS({selectedClient});
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al vincular contacto nuevo a cliente existente.',
                ),
                error,
              );
              return of(SET_LOADING({payload: false}));
            }),
          );
      }),
    ),
  );
}
