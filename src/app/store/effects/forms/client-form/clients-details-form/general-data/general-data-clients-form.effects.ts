import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import * as api from 'api-catalogos';
import {
  CatTipoNumeroTelefonico,
  ContactoDetalleObj,
  CorreoElectronico,
  NumeroTelefonico,
  QueryResultCliente,
} from 'api-catalogos';
import * as clientsDetailsActions from '@appActions/forms/client-form/clients-form.actions';
import * as clientsActions from '@appActions/forms/client-form/clients-form.actions';
import * as clientsGeneralDataActions from '@appActions/forms/client-form/clients-details-form/general-data-clients-form/general-data-clients-form.actions';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {
  clientsDetailsSelectors,
  clientsGeneralDataSelectors,
} from '@appSelectors/forms/clients-form';
import {forkJoin, lastValueFrom, Observable, of} from 'rxjs';
import {concat, find, isEmpty, isEqual, map as _map, omit} from 'lodash-es';
import {RETURN_EMPTY, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import * as selectorsCatalogs from '@appSelectors/catalogs/catalogs.selectors';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
import {extractID} from '@appUtil/util';
import {
  ClientTerceroAutorizadoRelacion,
  IContactoDetalleObj,
} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
import {buildImageNameSave} from '@appUtil/strings';

const FILE_NAME = 'Clients-Forms-General-Data';

@Injectable({
  providedIn: 'root',
})
export class GeneralDataClientsFormEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private configuracionContactosService: api.ConfiguracionContactosService,
    private configuracionClientesService: api.ConfiguracionClientesService,
    private configuracionClientesRelacionesService: api.ConfiguracionClientesRelacionesService,
  ) {}

  /*DOCS: Guarda un número telefónico en el arreglo de números telefónicos*/

  setPhoneNumber$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsGeneralDataActions.SET_PHONE_NUMBER_LOAD),
      withLatestFrom(this.store.select(selectorsCatalogs.selectTipoTelefono)),
      switchMap(([{field, phoneType, value}, phoneTypesList]) => {
        const phoneTypeObject = find(
          phoneTypesList,
          (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === phoneType,
        );
        this.store.dispatch(
          clientsGeneralDataActions.SET_PHONE_NUMBER({
            field,
            value,
            phoneType,
            phoneTypeId: phoneTypeObject?.IdCatTipoNumeroTelefonico,
          }),
        );
        return of(RETURN_EMPTY());
      }),
    ),
  );
  fetchActiveContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsGeneralDataActions.FETCH_ACTIVE_CONTACTS_LOAD),
      withLatestFrom(
        this.store.select(clientsGeneralDataSelectors.selectSortedClientContacts),
        this.store.select(clientsGeneralDataSelectors.contactsFilter),
        this.store.select(clientsGeneralDataSelectors.selectedClient),
      ),
      switchMap(([action, contacts, filter, client]) => {
        if (!isEmpty(contacts)) {
          return of(RETURN_EMPTY());
        }
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configuracionContactosService.ContactoDetalleQueryResult(filter).pipe(
          map((response) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return clientsGeneralDataActions.FETCH_ACTIVE_CONTACTS_SUCCESS({
              contacts: _map(response.Results, (o: ContactoDetalleObj) => ({
                ...o,
                NumerosTelefonicosEliminados: [],
                IdCliente: client.IdCliente,
              })),
            });
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(clientsGeneralDataActions.FETCH_ACTIVE_CONTACTS_FAILED());
          }),
        );
      }),
    ),
  );

  /*DOCS: Obtener lista de clientes para mostrar en el drop de Terceros Autorizados*/
  getCatTercerosAutorizados$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsGeneralDataActions.GET_CAT_TERCEROS_AUTORIZADOS_LOAD),
      mergeMap((action) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Nombre',
        };
        body.Filters.push({
          NombreFiltro: 'EsTerceroAutorizado',
          ValorFiltro: true,
        });
        return this.configuracionClientesService.ClienteQueryResult(body).pipe(
          map((response: QueryResultCliente) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los clientes terceros autorizados.',
              ),
              response,
            );
            this.store.dispatch(
              clientsGeneralDataActions.GET_CAT_TERCEROS_ATUORIZADOS_SUCCESS({
                listTercerosAutorizados: response.Results,
              }),
            );
            return clientsGeneralDataActions.GET_TERCEROS_AUTORIZADOS_CLIENT_LOAD();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los clientes terceros autorizados.',
              ),
              error,
            );
            this.store.dispatch(clientsGeneralDataActions.GET_CAT_TERCEROS_AUTORIZADOS_FAILED());
            return of(SET_LOADING({payload: false}));
          }),
        );
      }),
    ),
  );

  /*DOCS: Obtener lista de Terceros Autorizados asociados al cliente*/
  getTercertosAutorizadosClient = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsGeneralDataActions.GET_TERCEROS_AUTORIZADOS_CLIENT_LOAD),
      withLatestFrom(this.store.select(clientsGeneralDataSelectors.selectedClient)),
      mergeMap(([action, client]) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdCliente',
          ValorFiltro: client.IdCliente,
        });
        return this.configuracionClientesRelacionesService
          .vClienteTerceroAutorizadoQueryResult(body)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los terceros autorizados.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return clientsGeneralDataActions.GET_TERCEROS_AUTORIZADOS_CLIENT_SUCCESS({
                tercerosAutorizadosSelected: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los terceros autorizados.',
                ),
                error,
              );
              this.store.dispatch(
                clientsGeneralDataActions.GET_TERCEROS_AUTORIZADOS_CLIENT_FAILED(),
              );
              return of(SET_LOADING({payload: false}));
            }),
          );
      }),
    ),
  );

  /*DOCS: Inicia el guardado de la sección Datos Generales del cliente
     Guardar el cliente (Cliente)*/
  saveOrUpdateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsGeneralDataActions.SAVE_GENERAL_DATA_LOAD),
      withLatestFrom(
        this.store.select(clientsGeneralDataSelectors.selectGeneralDataToSave),
        this.store.select(clientsDetailsSelectors.selectedClient),
      ),
      mergeMap(([action, generalDataToSave, selectedClient]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (generalDataToSave.client.IdCliente === DEFAULT_UUID) {
          generalDataToSave = {
            ...generalDataToSave,
            client: {
              ...generalDataToSave.client,
              NombreImagen: buildImageNameSave(generalDataToSave.client.Nombre),
            },
          };
        }
        return this.configuracionClientesService
          .ClienteGuardarOActualizar(generalDataToSave.client)
          .pipe(
            map((response: string) => {
              this.store.dispatch(
                clientsGeneralDataActions.UPDATE_CLIENT({
                  idClient: extractID(response),
                }),
              );
              this.store.dispatch(
                clientsGeneralDataActions.UPDATE_NAME_CLIENT({
                  name: generalDataToSave.client.Nombre,
                }),
              );
              generalDataToSave = {
                ...generalDataToSave,
                client: {
                  ...generalDataToSave.client,
                  IdCliente: extractID(response),
                },
                selectedClientsAuthorized: _map(
                  generalDataToSave.selectedClientsAuthorized,
                  (o) => ({...o, IdCliente: extractID(response)}),
                ),
              };
              if (selectedClient === null) {
                this.store.dispatch(
                  clientsDetailsActions.SET_SELECTED_CLIENT({client: generalDataToSave.client}),
                );
              }
              return clientsGeneralDataActions.DELETE_TERCEROS_AUTORIZADOS({
                generalDataToSave,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar el cliente.',
                ),
                error,
              );
              return of(SET_LOADING({payload: false}));
            }),
          );
      }),
      catchError((error) => of(SET_LOADING({payload: false}))),
    ),
  );

  /*DOCS: Eliminar los clientes terceros autorizados*/
  deleteTercerosAutorizados = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsGeneralDataActions.DELETE_TERCEROS_AUTORIZADOS),
      mergeMap(({generalDataToSave}) => {
        if (!isEmpty(generalDataToSave.selectedClientsAuthorizedToDelete)) {
          const body: Array<any> = _map(
            generalDataToSave.selectedClientsAuthorizedToDelete,
            (o: ClientTerceroAutorizadoRelacion) => {
              return this.configuracionClientesRelacionesService.ClienteTerceroAutorizadoRelacionDesactivar(
                o.IdClienteTerceroAutorizadoRelacion,
              );
            },
          );
          return forkJoin(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al elimnar los clientes terceros autorizados.',
                ),
                response,
              );
              generalDataToSave = {
                ...generalDataToSave,
                selectedClientsAuthorizedToDelete: [],
              };
              return clientsGeneralDataActions.SAVE_TERCER0S_AUTORIZADOS({
                generalDataToSave,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar los clientes terceros autorizados.',
                ),
                error,
              );
              return of(SET_LOADING({payload: false}));
            }),
          );
        } else {
          return of(
            clientsGeneralDataActions.SAVE_TERCER0S_AUTORIZADOS({
              generalDataToSave,
            }),
          );
        }
      }),
    ),
  );

  /*DOCS: Guarda los clientes terceros autorizados*/
  saveTercerosAutorizados$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsGeneralDataActions.SAVE_TERCER0S_AUTORIZADOS),
      mergeMap(({generalDataToSave}) => {
        if (!isEmpty(generalDataToSave.selectedClientsAuthorized)) {
          const body: Array<any> = _map(
            generalDataToSave.selectedClientsAuthorized,
            (o: ClientTerceroAutorizadoRelacion) => {
              return this.configuracionClientesRelacionesService.ClienteTerceroAutorizadoRelacionGuardarOActualizar(
                omit(o, ['Alias']),
              );
            },
          );
          return forkJoin(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar los clientes terceros autorizados.',
                ),
                response,
              );
              generalDataToSave = {
                ...generalDataToSave,
                selectedClientsAuthorized: _map(
                  generalDataToSave.selectedClientsAuthorized,
                  (o: ClientTerceroAutorizadoRelacion, index: number) => ({
                    ...o,
                    IdClienteTerceroAutorizadoRelacion: extractID(response[index]),
                  }),
                ),
              };
              this.store.dispatch(
                clientsGeneralDataActions.SAVE_GENERAL_DATA_CLIENT_SUCCESS({
                  generalDataToSave,
                }),
              );
              return clientsGeneralDataActions.DISABLE_CONTACTS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar los clientes terceros autorizados.',
                ),
                error,
              );
              return of(SET_LOADING({payload: false}));
            }),
          );
        } else {
          this.store.dispatch(
            clientsGeneralDataActions.SAVE_GENERAL_DATA_CLIENT_SUCCESS({
              generalDataToSave,
            }),
          );
          return of(clientsGeneralDataActions.DISABLE_CONTACTS());
        }
      }),
    ),
  );

  /*DOCS: Elimina los contactos*/
  disableContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsGeneralDataActions.DISABLE_CONTACTS),
      withLatestFrom(this.store.select(clientsGeneralDataSelectors.selectContactsToDelete)),
      mergeMap(([action, contacts]) => {
        if (contacts.length > 0) {
          const request = _map(contacts, (o, index) => {
            return this.configuracionClientesRelacionesService.ContactoClienteDesactivar(
              o.IdContactoCliente,
            );
          });
          return forkJoin(request).pipe(
            map((response: Array<any>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar contactos',
                ),
                response,
              );
              return clientsGeneralDataActions.SAVE_OR_UPDATE_CONTACT();
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
              return of(SET_LOADING({payload: false}));
            }),
          );
        }
        return of(clientsGeneralDataActions.SAVE_OR_UPDATE_CONTACT());
      }),
    ),
  );

  saveOrUpdateContacts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clientsGeneralDataActions.SAVE_OR_UPDATE_CONTACT),
        withLatestFrom(
          this.store.select(clientsGeneralDataSelectors.selectClientContacts),
          this.store.select(clientsGeneralDataSelectors.selectBackUp),
        ),
        switchMap(async ([action, clientContacts, backUp]) => {
          if (clientContacts.length > 0) {
            let indexContact = 0;
            const newContacts: Array<IContactoDetalleObj> = [];
            for (let contact of clientContacts) {
              // DOCS: guardado contacto
              const contactFound = find(
                backUp.contacts,
                (o) => o.IdContacto === contact.IdContacto,
              );
              if (
                (contactFound && !isEqual(JSON.stringify(contactFound), JSON.stringify(contact))) ||
                contact.IdDatosPersona === DEFAULT_UUID
              ) {
                contact = {
                  ...contact,
                  Puesto: contact?.Puesto !== 'N/D' ? contact?.Puesto : '',
                  Titulo: contact?.Titulo !== 'N/D' ? contact?.Titulo : '',
                  Departamento: contact?.Departamento !== 'N/D' ? contact?.Departamento : '',
                };
                /*DOCS: Guarda DatosPersona*/
                const personDataId = extractID(
                  await lastValueFrom(
                    this.configuracionContactosService.DatosPersonaGuardarOActualizar(
                      this.patchContact(contact),
                    ),
                  ),
                );
                contact = {
                  ...contact,
                  IdDatosPersona: personDataId,
                  CorreoElectronico: _map(contact.CorreoElectronico, (o: CorreoElectronico) => ({
                    ...o,
                    IdDatosPersona: personDataId,
                  })),
                  NumeroTelefonico: _map(contact.NumeroTelefonico, (o: NumeroTelefonico) => ({
                    ...o,
                    IdDatosPersona: personDataId,
                  })),
                };

                // DOCS: GUARDADO EMAIL
                const emailId: any = extractID(
                  await lastValueFrom(
                    this.configuracionContactosService.CorreoElectronicoGuardarOActualizar(
                      contact.CorreoElectronico[0],
                    ),
                  ),
                );
                contact = {
                  ...contact,
                  CorreoElectronico: _map(contact.CorreoElectronico, (o: CorreoElectronico) => ({
                    ...o,
                    IdCorreoElectronico: emailId,
                  })),
                };

                /*DOCS: Guarda y/o elimina los teléfonos*/
                if (
                  contact.NumeroTelefonico.length > 0 ||
                  contact.NumerosTelefonicosEliminados.length > 0
                ) {
                  const request: Observable<string>[] = _map(
                    concat(contact.NumeroTelefonico, contact.NumerosTelefonicosEliminados),
                    (o: NumeroTelefonico): Observable<string> =>
                      this.configuracionContactosService.NumeroTelefonicoGuardarOActualizar(o),
                  );
                  const phones: string[] = await lastValueFrom(forkJoin(request));

                  contact = {
                    ...contact,
                    NumeroTelefonico: _map(
                      contact.NumeroTelefonico,
                      (o: NumeroTelefonico, index: number) => ({
                        ...o,
                        IdNumeroTelefonico: extractID(phones[index]),
                      }),
                    ),
                    NumerosTelefonicosEliminados: [],
                  };
                }

                // DOCS: GUARDA LA RELACION DE LA TABLA DATOS PERSONA Y CONTACTO
                let idContact: any = extractID(
                  await lastValueFrom(
                    this.configuracionContactosService.ContactoGuardarOActualizar(contact),
                  ),
                );
                contact = {
                  ...contact,
                  IdContacto: idContact,
                };
                idContact = extractID(idContact);
                let idContactClient: any = extractID(
                  await lastValueFrom(
                    this.configuracionClientesRelacionesService.ContactoClienteGuardarOActualizar(
                      contact,
                    ),
                  ),
                );
                idContactClient = extractID(idContactClient);
                contact = {
                  ...contact,
                  IdContactoCliente: idContactClient,
                };
              }
              indexContact++;
              newContacts.push(contact);
            }
            this.store.dispatch(
              clientsGeneralDataActions.SAVE_OR_UPDATE_CONTACT_SUCCESS({
                contacts: newContacts,
              }),
            );
            this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: false}));
            this.store.dispatch(clientsActions.SET_EDIT_MODE({value: true}));
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(SET_LOADING_SUCCESS({active: true, message: 'Has guardado'}));
          }
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
          return of(RETURN_EMPTY());
        }),
      ),
    {dispatch: false},
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
}
