import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {isEmpty, map as _map} from 'lodash-es';

// ACTIONS
import {SET_LOADING, SET_LOADING_ERROR, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
// Models
import {
  Aduana,
  AduanaDetalle,
  CatalogosService,
  ConceptoAgenteAduanal,
  ConfiguracionAduanasService,
  ConfiguracionContactosService,
  ConfiguracionDireccionesService,
  CorreoElectronico,
  NumeroTelefonico,
  ParametroValidarCodigoPostal,
  QueryInfo,
  QueryResultAduana,
} from 'api-catalogos';
import * as servicesLogger from '@appUtil/logger';
import {customAgentActions, customAgentDetailsActions} from '@appActions/forms/custom-agent-form';
import {customAgentsDetailsSelectors} from '@appSelectors/forms/custom-agents-form';
import {extractID} from '@appUtil/util';
import {ICustomAgentContact} from '@appModels/store/forms/custom-agents-forms/custom-agents-details-forms/custom-agents-details-forms.models';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {ICustomAgent} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.models';
import {DEFAULT_UUID} from '@appUtil/common.protocols';

const FILE_NAME = '[Customs-Agents-details]';

@Injectable()
export class CustomAgentDetailsFormEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private addressService: ConfiguracionDireccionesService,
    private customsService: ConfiguracionAduanasService,
    private contactsService: ConfiguracionContactosService,
    private catalogsService: CatalogosService,
  ) {}

  // DOCS: OBTIENE LOS CONTACTOS DEL AGENTE SELECCIONADO
  fetchContacts$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.FETCH_CONTACTS_LOAD),
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectCustomAgentSelected)),
      mergeMap(([action, customAgent]) => {
        if (!isEmpty(customAgent)) {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.customsService
            .AgenteAduanalExtensionsObtenerListaContactoDetalle(customAgent.IdAgenteAduanal)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Consulta lista de contactos',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                const contacts = _map(response, (c: ICustomAgentContact) => {
                  return {
                    ...c,
                    Puesto: c.Puesto || 'N/D',
                    Titulo: c.Titulo || 'N/D',
                    Departamento: c.Departamento || 'N/D',
                    haveChanges: false,
                  };
                });
                return customAgentDetailsActions.FETCH_CONTACTS_SUCCESS({
                  contacts,
                });
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Consulta Agentes Aduanales Error',
                  ),
                  error,
                );
                this.store.dispatch(customAgentDetailsActions.FETCH_CONTACTS_FAILED());
                return EMPTY;
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  // DOCS: VALIDACIÓN PARA EL CODIGO POSTAL EN DATOS GENERALES
  checkValidZipCode = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.SET_ZIP_CODE),
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectGeneralDataTab)),
      mergeMap(([action, generalData]) => {
        const params: ParametroValidarCodigoPostal = {
          IdCatPais: generalData.customAgentSelected.IdCatPais,
          CodigoPostal: generalData.customAgentSelected.CodigoPostal,
        };
        return this.addressService.DireccionExtensionsValidarCodigoPostalPais(params).pipe(
          map((response: boolean) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al validar el código postal',
              ),
              generalData.customAgentSelected.CodigoPostal,
            );
            return customAgentDetailsActions.VALIDATE_ZIP_SUCCESS({
              value: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al validar el código postal',
              ),
              error,
            );
            return of(customAgentDetailsActions.VALIDATE_ZIP_SUCCESS({value: false}));
          }),
        );
      }),
    ),
  );

  // DOCS: OBTIENE CAT DE NUMEROS TELEFONICOS
  getCatTipoTelefono$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.GET_CAT_TIPO_TELEFONO_LOAD),
      withLatestFrom(
        this.store.select(customAgentsDetailsSelectors.selectNeedsToReloadCatTelefonos),
      ),
      mergeMap(([action, needsToReloadCatTipoTelefono]) => {
        const body = new FiltersOnlyActive();
        if (needsToReloadCatTipoTelefono) {
          return this.catalogsService.catTipoNumeroTelefonicoQueryResult(body).pipe(
            map((response) =>
              customAgentDetailsActions.GET_CAT_TIPO_TELEFONO_SUCCESS({
                lisCatTIipoTelefono: response.Results,
              }),
            ),
            catchError((error) => of(customAgentDetailsActions.GET_CAT_TIPO_TELEFONO_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS: SE COMENTÓ POR QUE YA NO SE USA (eliminar si esto ya no se vuelve a usar)
  /*  checkExistingEmail = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.CHECK_EXISTING_EMAIL),
      withLatestFrom(
        this.store.select(customAgentsDetailsSelectors.selectContactForm),
        this.store.select(customAgentsDetailsSelectors.selectClientContactsMail),
      ),
      mergeMap(([action, contactForm, contactMails]) => {
        this.logger.debug(
          servicesLogger.generateMessage(FILE_NAME, '@checkExistingEmail: Email'),
          action.email,
        );
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'Correo',
          ValorFiltro: action.email,
        });
        return this.contactsService.CorreoElectronicoQueryResult(body).pipe(
          map((response) => {
            const existInMailsToSave = !isEmpty(
              find(contactMails.mailsContactToSaveString, (o: string) => o === action.email),
            );

            const existInMailsToDelete = !isEmpty(
              find(contactMails.mailsContactToDelete, (o: string) => o === action.email),
            );

            const duplicateMail =
              response.TotalResults > 0 &&
              !isEmpty(response.Results) &&
              (contactForm.IdDatosPersona === DEFAULT_UUID ||
                (contactForm.IdDatosPersona !== DEFAULT_UUID &&
                  response.Results[0]?.IdDatosPersona !== contactForm.IdDatosPersona));

            return customAgentDetailsActions.VERIFY_EMAIL({
              value: duplicateMail ? !existInMailsToDelete : existInMailsToSave,
            });
          }),
          catchError((error) => {
            return of(customAgentDetailsActions.VERIFY_EMAIL({value: false}));
          }),
        );
      }),
    ),
  );*/

  // DOCS: GUARDA CAMBIOS // DATOS GENERALES

  // DOCS: GUARDA LA DIRECCIÓN
  sendAddress$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.SEND_GENERAL_DATA),
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectGeneralDataTab)),
      mergeMap(([action, generalData]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.addressService
          .DireccionGuardarOActualizar(generalData.customAgentSelected)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar la dirección del agente aduanal',
                ),
                response,
              );
              return customAgentDetailsActions.SET_ADDRESS_SUCCESS({
                IdDireccion: extractID(response),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar la dirección del agente aduanal',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message: 'Ha ocurrido un error al guardar la dirección',
                }),
              );
              return of(customAgentDetailsActions.SET_ADDRESS_ERROR());
            }),
          );
      }),
    ),
  );

  // DOCS: GUARDA EN SERVICIO AGENTE ADUANAL
  saveCustomAgent$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.SET_ADDRESS_SUCCESS),
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectGeneralDataTab)),
      mergeMap(([action, generalData]) => {
        if (generalData.customAgentSelected.IdAgenteAduanal === DEFAULT_UUID) {
          generalData = {
            ...generalData,
            customAgentSelected: {
              ...generalData.customAgentSelected,
              NombreImagen: generalData.customAgentSelected.NombreComercial,
            },
          };
        }
        return this.customsService
          .AgenteAduanalGuardarOActualizar(generalData.customAgentSelected)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar información del agente aduanal',
                ),
                response,
              );
              return customAgentDetailsActions.SET_CUSTOM_AGENT_SUCCESS({
                IdAgenteAduanal: extractID(response),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar información del agente aduanal',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message: 'Ha ocurrido un error al guardar la información del agente aduanal',
                }),
              );
              return of(customAgentDetailsActions.SET_CUSTOM_AGENT_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: INICIO DE CADENA DE EFECTOS PARA GUARDAR LOS CONTACTOS

  // DOCS: DESHABILITA CONTACTOS
  disableContacts$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.SET_CUSTOM_AGENT_SUCCESS),
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectDisabledContacts)),
      mergeMap(([action, disableContacts]) => {
        if (disableContacts.length > 0) {
          const request: Observable<string>[] = _map(disableContacts, (o) => {
            return this.customsService.ContactoAduanaDesactivar(o.IdContactoAduana);
          });
          return forkJoin(request).pipe(
            map((response: Array<string>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar contactos',
                ),
                response,
              );
              this.store.dispatch(customAgentDetailsActions.DISABLE_CONTACTS_SUCCESS());

              return customAgentDetailsActions.SAVE_CONTACTS_LOAD({
                updateState: false,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar contactos',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message:
                    'Ha ocurrido un error al guardar la información de los contactos del agente aduanal',
                }),
              );
              return of(customAgentDetailsActions.DISABLE_CONTACTS_FAILED);
            }),
          );
        }
        return of(customAgentDetailsActions.SAVE_CONTACTS_LOAD({updateState: false}));
      }),
    ),
  );

  saveContacts$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.SAVE_CONTACTS_LOAD),
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectNextContactToSave)),
      // DOCS: ENVIA DATOS PERSONA Y OBTIENE IdDatosPersona
      mergeMap(([action, contact]) => {
        if (contact) {
          contact = {
            ...contact,
            Puesto: contact?.Puesto !== 'N/D' ? contact?.Puesto : '',
            Titulo: contact?.Titulo !== 'N/D' ? contact?.Titulo : '',
            Departamento: contact?.Departamento !== 'N/D' ? contact?.Departamento : '',
          };
          // TODO: Cambiar por DatosPersona recuperado de servicio
          return this.contactsService.DatosPersonaGuardarOActualizar(contact).pipe(
            map((response: string) => {
              const newContact: ICustomAgentContact = {
                ...contact,
                Titulo: contact?.Titulo,
                Departamento: contact?.Departamento,
                Puesto: contact?.Puesto,
                IdDatosPersona: extractID(response),
                CorreoElectronico: _map(contact.CorreoElectronico, (c: CorreoElectronico) => {
                  return {
                    ...c,
                    IdDatosPersona: extractID(response),
                  };
                }),
                NumeroTelefonico: _map(contact.NumeroTelefonico, (n: NumeroTelefonico) => {
                  return {
                    ...n,
                    IdDatosPersona: extractID(response),
                  };
                }),
              };
              return newContact;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar contactos',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message:
                    'Ha ocurrido un error al guardar la información de los contactos del agente aduanal',
                }),
              );
              return EMPTY;
            }),
          );
        }
        this.store.dispatch(SET_LOADING({payload: false}));
        this.store.dispatch(
          SET_LOADING_SUCCESS({
            active: true,
            message: 'Has guardado',
          }),
        );
        this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: false}));
        this.store.dispatch(customAgentActions.SET_EDIT_MODE({editMode: true}));
        return EMPTY;
      }),
      // DOCS: GUARDA ARREGLO DE CORREOS
      switchMap((contact: ICustomAgentContact) => {
        if (!isEmpty(contact.CorreoElectronico)) {
          const request: Array<any> = _map(contact.CorreoElectronico, (o: CorreoElectronico) => {
            return this.contactsService.CorreoElectronicoGuardarOActualizar(o);
          });
          return forkJoin(request).pipe(
            map((response: Array<any>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar correo',
                ),
                response,
              );
              const newContact: ICustomAgentContact = {
                ...contact,
                CorreoElectronico: _map(
                  contact.CorreoElectronico,
                  (c: CorreoElectronico, index) => {
                    return {
                      ...c,
                      IdCorreoElectronico: extractID(response[index]),
                    };
                  },
                ),
              };
              return newContact;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar correo',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message:
                    'Ha ocurrido un error al guardar la información de los contactos del agente aduanal',
                }),
              );

              return EMPTY;
            }),
          );
        }
        return of({...contact});
      }),
      // DOCS: GUARDA ARREGLO DE NUMEROS TELEFONICOS
      switchMap((contact: ICustomAgentContact) => {
        if (!isEmpty(contact.NumeroTelefonico)) {
          const request: Array<any> = _map(contact.NumeroTelefonico, (o: NumeroTelefonico) => {
            return this.contactsService.NumeroTelefonicoGuardarOActualizar(o);
          });
          return forkJoin(request).pipe(
            map((response: Array<any>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar numero telefonico',
                ),
                response,
              );
              const newContact: ICustomAgentContact = {
                ...contact,
                NumeroTelefonico: _map(contact.NumeroTelefonico, (n: NumeroTelefonico, index) => {
                  return {
                    ...n,
                    IdNumeroTelefonico: extractID(response[index]),
                  };
                }),
              };
              return newContact;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar telefonico',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message:
                    'Ha ocurrido un error al guardar la información de los contactos del agente aduanal',
                }),
              );
              return EMPTY;
            }),
          );
        }
        return of({...contact});
      }),
      // DOCS: GUARDA EN CATALOGO DE CONTACTOS
      switchMap((contact: ICustomAgentContact) => {
        if (contact.Contacto) {
          contact = {
            ...contact,
            Contacto: {
              ...contact.Contacto,
              IdDatosPersona: contact.IdDatosPersona,
            },
          };
          return this.contactsService.ContactoGuardarOActualizar(contact.Contacto).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar contacto del agente aduanal',
                ),
                response,
              );
              const newContact: ICustomAgentContact = {
                ...contact,
                IdContacto: extractID(response),
                Contacto: {
                  ...contact.Contacto,
                  IdContacto: extractID(response),
                },
                ContactoAduana: {
                  ...contact.ContactoAduana,
                  IdContacto: extractID(response),
                },
              };
              return newContact;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar contactos',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message:
                    'Ha ocurrido un error al guardar la información de los contactos del agente aduanal',
                }),
              );
              return EMPTY;
            }),
          );
        }
        return of({...contact});
      }),
      // DOCS: GUARDA EN CATALOGO DE CONTACTO ADUANA /
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectCustomAgentSelected)),
      switchMap(([contact, customAgent]: [ICustomAgentContact, ICustomAgent]) => {
        if (contact.ContactoAduana) {
          contact = {
            ...contact,
            ContactoAduana: {
              ...contact.ContactoAduana,
              IdAgenteAduanal: customAgent.IdAgenteAduanal,
              IdContacto: contact.Contacto.IdContacto,
            },
          };
          return this.customsService.ContactoAduanaGuardarOActualizar(contact.ContactoAduana).pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar contacto del agente aduanal',
                ),
                response,
              );
              const newContact: ICustomAgentContact = {
                ...contact,
                IdContactoAduana: extractID(response),
                ContactoAduana: {
                  ...contact.ContactoAduana,
                  IdContactoAduana: extractID(response),
                },
                haveChanges: false,
              };
              return customAgentDetailsActions.SAVE_CONTACTS_LOAD({
                updateState: true,
                contact: newContact,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar contacto del agente aduanal',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message:
                    'Ha ocurrido un error al guardar la información de los contactos del agente aduanal',
                }),
              );
              return EMPTY;
            }),
          );
        } else {
          contact = {
            ...contact,
            haveChanges: false,
          };
          return of(
            customAgentDetailsActions.SAVE_CONTACTS_LOAD({
              updateState: true,
              contact,
            }),
          );
        }
      }),
    ),
  );

  // DOCS: EFECTOS PARA DESADUANAJE

  // DOCS: OBTIENE LOS PUNTOS DE DESPACHO

  fetchDispatchPoints$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.FETCH_DISPATCH_POINTS_LOAD),
      withLatestFrom(
        this.store.select(customAgentsDetailsSelectors.selectGeneralDataTab),
        this.store.select(customAgentsDetailsSelectors.selectDispatchPointOptions),
        this.store.select(customAgentsDetailsSelectors.selectNeedsToReload),
      ),
      mergeMap(([action, generalData, dispatchPoints, needsToReload]) => {
        if (needsToReload) {
          const customAgent = generalData.customAgentSelected;
          const filter: QueryInfo = {
            Filters: [],
          };
          filter.Filters.push({
            NombreFiltro: 'IdAgenteAduanal',
            ValorFiltro: customAgent.IdAgenteAduanal,
          });
          return this.customsService.AduanaQueryResult(filter).pipe(
            map((response: QueryResultAduana) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener lista de aduanas',
                ),
                response,
              );
              dispatchPoints = _map(response.Results, (o: Aduana, index) => {
                return {
                  id: o.IdAduana,
                  label: o.NombreLugar,
                  isSelected: index === 0,
                  isEnable: o.Activo,
                };
              });
              this.store.dispatch(
                customAgentDetailsActions.SET_DISPATCH_POINT_OPTIONS({
                  dispatchPoints,
                }),
              );
              return response.Results;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener lista de aduanas',
                ),
                error,
              );
              return of(customAgentDetailsActions.FETCH_DISPATCH_POINTS_FAILED());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
      switchMap((dispatchPoints: Array<Aduana>) => {
        if (isEmpty(dispatchPoints)) {
          this.store.dispatch(
            customAgentDetailsActions.FETCH_DISPATCH_POINT_DETAILS_SUCCESS({
              dispatchPointList: [],
            }),
          );
          return EMPTY;
        } else {
          const request: Array<any> = _map(dispatchPoints, (o) => {
            return this.customsService.AduanaDetalleQueryResult(o.IdAduana);
          });
          return forkJoin(request).pipe(
            map((response: Array<any>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar numero telefonico',
                ),
                response,
              );
              return customAgentDetailsActions.FETCH_DISPATCH_POINT_DETAILS_SUCCESS({
                dispatchPointList: _map(response, (o: AduanaDetalle) => ({
                  ...o,
                  RequiereFacturasComerciales: true,
                })),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener lista de aduanas',
                ),
                error,
              );
              return EMPTY;
            }),
          );
        }
      }),
    ),
  );

  // DOCS: GUARDADO DE ADUANA

  saveAddress$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.SAVE_DISPATCH_POINT),
      withLatestFrom(
        this.store.select(customAgentsDetailsSelectors.selectedDispatchPoint),
        this.store.select(customAgentsDetailsSelectors.selectCustomAgentSelected),
      ),
      mergeMap(([action, selectedDispatchPoint, customAgent]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        selectedDispatchPoint = {
          ...selectedDispatchPoint,
          IdAgenteAduanal: customAgent.IdAgenteAduanal,
          ConceptosAgenteAduanal: _map(
            selectedDispatchPoint.ConceptosAgenteAduanal,
            (c: ConceptoAgenteAduanal) => {
              return {
                ...c,
                IdAgenteAduanal: customAgent.IdAgenteAduanal,
              };
            },
          ),
        };
        return this.addressService
          .DireccionGuardarOActualizar(selectedDispatchPoint.Direccion)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar dirección',
                ),
                response,
              );
              selectedDispatchPoint = {
                ...selectedDispatchPoint,
                Direccion: {
                  ...selectedDispatchPoint.Direccion,
                  IdDireccion: extractID(response),
                },
              };
              return customAgentDetailsActions.SAVE_ADDRESS_DISPATCH_POINT_SUCCESS({
                IdDireccion: extractID(response),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar dirección',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message: 'Ha ocurrido un error al guardar la dirección',
                }),
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  saveDispatchPoint$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.SAVE_ADDRESS_DISPATCH_POINT_SUCCESS),
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectedDispatchPoint)),
      mergeMap(([action, selectedDispatchPoint]) => {
        return this.customsService.AduanaGuardarOActualizar(selectedDispatchPoint).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar Aduana',
              ),
              response,
            );

            return customAgentDetailsActions.SAVE_DISPATCH_POINT_SUCCESS({
              IdAduana: extractID(response),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar Aduana',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_ERROR({
                active: true,
                message: 'Ha ocurrido un error al guardar la Aduana',
              }),
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );
  deleteFee$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.SAVE_DISPATCH_POINT_SUCCESS),
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectDispatchPointTab)),
      mergeMap(([action, dispatchPoint]) => {
        const feesToDelete: Array<ConceptoAgenteAduanal> = dispatchPoint.deleteRate;
        if (feesToDelete.length > 0) {
          const request: Array<any> = _map(feesToDelete, (o: ConceptoAgenteAduanal) => {
            return this.customsService.ConceptoAgenteAduanalDesactivar(o.IdConceptoAgenteAduanal);
          });
          return forkJoin(request).pipe(
            map((response: Array<any>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar Conceptos',
                ),
                response,
              );
              this.store.dispatch(customAgentDetailsActions.DELETE_FEE_SUCCESS());
              return customAgentDetailsActions.SAVE_FEE();
            }),
          );
        }
        return of(customAgentDetailsActions.SAVE_FEE());
      }),
    ),
  );
  saveFee$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.SAVE_FEE),
      withLatestFrom(
        this.store.select(customAgentsDetailsSelectors.selectedDispatchPoint),
        this.store.select(customAgentsDetailsSelectors.selectedTabOption),
        this.store.select(customAgentsDetailsSelectors.selectDispatchPointTab),
      ),
      mergeMap(([action, dispatchPoint, tabOption, dispatchPointTab]) => {
        const request: Array<any> = _map(
          dispatchPoint.ConceptosAgenteAduanal,
          (o: ConceptoAgenteAduanal) => {
            return this.customsService.ConceptoAgenteAduanalGuardarOActualizar(o);
          },
        );
        return forkJoin(request).pipe(
          map((response: Array<any>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar Conceptos',
              ),
              response,
            );
            const fees: Array<ConceptoAgenteAduanal> = _map(
              dispatchPoint.ConceptosAgenteAduanal,
              (o: ConceptoAgenteAduanal, index) => {
                return {
                  ...o,
                  IdConceptoAgenteAduanal: extractID(response[index]),
                };
              },
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: 'Has guardado',
              }),
            );
            this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: false}));
            return customAgentDetailsActions.SAVE_FEE_SUCCESS({fees});
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar Conceptos',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_ERROR({
                active: true,
                message: 'Ha ocurrido un error al guardar conceptos',
              }),
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS: VALIDACIÓN PARA EL CODIGO POSTAL EN PUNTOS DE DESPACHO

  checkZipCodeValid = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.CHECK_ZIP_CODE_VALIDATE),
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectAddress)),
      mergeMap(([action, address]) => {
        const params: ParametroValidarCodigoPostal = {
          IdCatPais: address.IdCatPais,
          CodigoPostal: address.CodigoPostal,
        };
        return this.addressService.DireccionExtensionsValidarCodigoPostalPais(params).pipe(
          map((response: boolean) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al validar el código postal',
              ),
              address.CodigoPostal,
            );
            return customAgentDetailsActions.ZIP_CODE_VALIDATE_SUCCESS({
              value: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al validar el código postal',
              ),
              error,
            );
            return of(customAgentDetailsActions.ZIP_CODE_VALIDATE_SUCCESS({value: false}));
          }),
        );
      }),
    ),
  );
}
