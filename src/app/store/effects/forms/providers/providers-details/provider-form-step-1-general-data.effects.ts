import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, forkJoin, lastValueFrom, Observable, of} from 'rxjs';
import {find, isEmpty, map as _map, toLower} from 'lodash-es';
import {AppState} from '@appCore/core.state';

//  Actions
import {
  generalDataProviderActions,
  providerActions,
  providersListActions,
} from '@appActions/forms/providers';
import {SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';

// Selectors
import {generalDataProviderSelectors, providerSelectors} from '@appSelectors/forms/providers';

// Models
// Services
import {
  CatPais,
  ConfiguracionClientesService,
  ConfiguracionContactosService,
  ConfiguracionDireccionesService,
  ConfiguracionProveedoresRelacionesService,
  ConfiguracionProveedoresService,
  ContactoDetalleProvObj,
  CorreoElectronico,
  Direccion,
  NumeroTelefonico,
  Proveedor,
} from 'api-catalogos';
import {
  GeneralData,
  IContactoDetalleProvObj,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-1-general-data.model';

// Utils
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {extractID} from '@appUtil/util';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {selectCatPaisList} from '@appSelectors/catalogs/catalogs.selectors';
import {buildImageNameSave} from '@appUtil/strings';
import {
  GET_CAT_CUSTOMER_LOAD,
  GET_CAT_DIFICULTAD_LOAD,
  GET_CAT_MANTENIMIENTO_LOAD,
  GET_CAT_MONEDA_LOAD,
  GET_CAT_NIVEL_DECISION_LOAD,
  GET_CAT_NIVEL_PUESTO_LOAD,
  GET_CAT_PAIS_LOAD,
  GET_CAT_ROL_PROVIDERS_LOAD,
  GET_CAT_RUTA_ENTREGA_LOAD,
  GET_CAT_TIPO_TELEFONO_LOAD,
  GET_CAT_ZONA_LOAD,
} from '@appActions/catalogs/catalogos.actions';

const FILE_NAME = 'provider-form-step-1-general-data.effects';

@Injectable({
  providedIn: 'root',
})
export class ProviderFormStep1GeneralDataEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private configuracionProveedoresService: ConfiguracionProveedoresService,
    private configuracionDireccionesService: ConfiguracionDireccionesService,
    private configuracionContactosService: ConfiguracionContactosService,
    private configuracionProveedoresRelacionesService: ConfiguracionProveedoresRelacionesService,
    private configuracionClientesService: ConfiguracionClientesService,
    private logger: NGXLogger,
  ) {}

  getInitialData = createEffect(() =>
    this.actions$.pipe(
      ofType(generalDataProviderActions.GET_INITIAL_STATE),
      withLatestFrom(this.store.select(providerSelectors.selectModeEdit)),
      mergeMap(([action, modeEdit$]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        this.store.dispatch(GET_CAT_ROL_PROVIDERS_LOAD());
        this.store.dispatch(GET_CAT_RUTA_ENTREGA_LOAD());
        this.store.dispatch(GET_CAT_PAIS_LOAD());
        this.store.dispatch(GET_CAT_ZONA_LOAD());
        this.store.dispatch(GET_CAT_CUSTOMER_LOAD());
        this.store.dispatch(GET_CAT_MONEDA_LOAD());
        this.store.dispatch(GET_CAT_TIPO_TELEFONO_LOAD());
        this.store.dispatch(GET_CAT_DIFICULTAD_LOAD());
        this.store.dispatch(GET_CAT_NIVEL_DECISION_LOAD());
        this.store.dispatch(GET_CAT_MANTENIMIENTO_LOAD());
        this.store.dispatch(GET_CAT_NIVEL_PUESTO_LOAD());
        if (modeEdit$) {
          return of(generalDataProviderActions.GET_GENERAL_DATA_PROVIDER_LOAD());
        }
        return of(SET_LOADING({payload: false}));
      }),
    ),
  );

  // DOCS: OBTENER LISTA DE QUERY DE PROVEDORES
  /*getProviderDropQuery = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.GET_FAMILY_DROP_LOAD),
      mergeMap((action) => {
        const body = new FiltersOnlyActive();
        return this.configuracionProveedoresRelacionesService
          .vMarcaDetalleQueryResult(body)
          .pipe(
            map((response: QueryResultVMarcaDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Obtener lista',
                ),
                response,
              );
              return offerActions.GET_FAMILY_DROP_SUCCESS({
                familyList: response.Results,
              });
            }),
          );
      }),
    ),
  );*/

  // DOCS: Obtener datos generales y direccion del proveedor
  getGeneralDataProvider = createEffect(() =>
    this.actions$.pipe(
      ofType(generalDataProviderActions.GET_GENERAL_DATA_PROVIDER_LOAD),
      withLatestFrom(this.store.select(generalDataProviderSelectors.getProviderId)),
      mergeMap(([action, selectedProviderId]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configuracionProveedoresService.ProveedorObtener(selectedProviderId).pipe(
          map((response: Proveedor) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener el proveedor',
              ),
              response,
            );
            this.store.dispatch(
              generalDataProviderActions.GET_GENERAL_DATA_PROVIDER_SUCCESS({
                generalDataProvider: response,
              }),
            );
            return response.IdDireccion;
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener el proveedor',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(generalDataProviderActions.GET_GENERAL_DATA_PROVIDER_FAILED());
          }),
        );
      }),
      switchMap((addressId$: string) => {
        return this.configuracionDireccionesService.DireccionObtener(addressId$).pipe(
          map((response: Direccion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener la dirección del proveedor',
              ),
              response,
            );
            this.store.dispatch(generalDataProviderActions.GET_CONTACTS_DATA_PROVIDER_LOAD());
            return generalDataProviderActions.GET_ADDRESS_DATA_PROVIDER_SUCCESS({
              addressDataProvider: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener la dirección del proveedor',
              ),
              error,
            );
            return of(SET_LOADING({payload: false}));
          }),
        );
      }),
    ),
  );

  // DOCS: Obtener los contactos del proveedor
  getProviderContactList = createEffect(() =>
    this.actions$.pipe(
      ofType(generalDataProviderActions.GET_CONTACTS_DATA_PROVIDER_LOAD),
      withLatestFrom(this.store.select(generalDataProviderSelectors.selectGeneralDataProviderId)),
      mergeMap(([action, providerId$]) => {
        return this.configuracionProveedoresService
          .ProveedorExtensionsObtenerListaContactoDetalle(providerId$)
          .pipe(
            map((response: Array<ContactoDetalleProvObj>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los contactos del proveedor',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              const contacts: Array<IContactoDetalleProvObj> = _map(
                response,
                (o: ContactoDetalleProvObj) => ({
                  ...o,
                  Puesto: o.Puesto || 'N/D',
                  Titulo: o.Titulo || 'N/D',
                  Departamento: o.Departamento || 'N/D',
                  haveChanges: false,
                  editing: false,
                  selectedDifficultyOption:
                    o.IdCatDificultad !== DEFAULT_UUID
                      ? {
                          value: o.IdCatDificultad,
                          label: o.Dificultad,
                        }
                      : null,
                  selectedMaintenanceOption:
                    o.IdCatMantenimiento !== DEFAULT_UUID
                      ? {
                          value: o.IdCatMantenimiento,
                          label: o.Mantenimiento,
                        }
                      : null,
                  selectedDecisionLevelOption:
                    o.IdCatNivelDecision !== DEFAULT_UUID
                      ? {
                          value: o.IdCatNivelDecision,
                          label: o.NivelDecision,
                        }
                      : null,
                  selectedJobLevelOption:
                    o.IdCatNivelPuesto !== DEFAULT_UUID
                      ? {
                          value: o.IdCatNivelPuesto,
                          label: o.NivelPuesto,
                        }
                      : null,
                }),
              );
              return generalDataProviderActions.GET_CONTACTS_DATA_PROVIDER_SUCCESS({contacts});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los contactos del proveedor',
                ),
                error,
              );
              return of(SET_LOADING({payload: false}));
            }),
          );
      }),
    ),
  );

  // DOCS: Guardar o actualizar la direccion del proveedor
  saveProviderAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalDataProviderActions.SAVE_GENERAL_DATA_LOAD),
      withLatestFrom(this.store.select(generalDataProviderSelectors.selectProvidersGeneralData)),
      mergeMap(([action, generalData]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configuracionDireccionesService
          .DireccionGuardarOActualizar(generalData.address)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar la dirección del proveddor.',
                ),
                response,
              );
              const newGeneralData = {
                ...generalData,
                provider: {
                  ...generalData.provider,
                  IdDireccion: extractID(response),
                },
              };
              this.store.dispatch(
                providersListActions.SET_SELECTED_PROVIDER({provider: generalData.provider}),
              );
              this.store.dispatch(providerActions.SET_TITLE({title: 'VER PROVEEDOR'}));
              return generalDataProviderActions.SAVE_GENERAL_DATA_PROVIDER_LOAD({
                generalDataProvider: newGeneralData,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar la dirección del proveddor.',
                ),
                error,
              );
              return of(SET_LOADING({payload: false}));
            }),
          );
      }),
    ),
  );

  // DOCS: Guardar o actualizar el proveedor
  saveProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalDataProviderActions.SAVE_GENERAL_DATA_PROVIDER_LOAD),
      mergeMap(({generalDataProvider}: {generalDataProvider: GeneralData}) => {
        let provider: Proveedor = generalDataProvider.provider;
        if (provider.IdProveedor === DEFAULT_UUID) {
          provider = {
            ...provider,
            NombreImagen: buildImageNameSave(provider.Nombre),
          };
        }
        return this.configuracionProveedoresService.ProveedorGuardarOActualizar(provider).pipe(
          map((response: string) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar el proveddor.',
              ),
              response,
            );
            const newGeneralData = {
              ...generalDataProvider,
              provider: {
                ...generalDataProvider.provider,
                IdProveedor: extractID(response),
              },
            };
            this.store.dispatch(
              providersListActions.SET_SELECTED_PROVIDER({
                provider: newGeneralData.provider,
              }),
            );
            return generalDataProviderActions.DISABLE_CONTACTS_LOAD({
              generalDataProvider: newGeneralData,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar el proveddor.',
              ),
              error,
            );
            return of(SET_LOADING({payload: false}));
          }),
        );
      }),
    ),
  );

  // DOCS: Deshabilitar contactos del proveedor
  disableContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalDataProviderActions.DISABLE_CONTACTS_LOAD),
      mergeMap(({generalDataProvider}: {generalDataProvider: GeneralData}) => {
        if (!isEmpty(generalDataProvider.disableContacts)) {
          const request: Array<Observable<string>> = _map(
            generalDataProvider.disableContacts,
            (o: IContactoDetalleProvObj) =>
              this.configuracionProveedoresRelacionesService.ContactoProveedorDesactivar(
                o.IdContactoProveedor,
              ),
          );
          return forkJoin(request).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al deshabilitar los contactos del proveddor.',
                ),
                response,
              );
              return generalDataProviderActions.SAVE_PROVIDER_CONTACTS_LOAD({
                generalDataProvider,
              });
            }),
            catchError((error) => {
              return of(SET_LOADING({payload: false}));
            }),
          );
        }
        return of(
          generalDataProviderActions.SAVE_PROVIDER_CONTACTS_LOAD({
            generalDataProvider,
          }),
        );
      }),
    ),
  );

  // DOCS: Guardar contactos del proveedor
  saveContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalDataProviderActions.SAVE_PROVIDER_CONTACTS_LOAD),
      withLatestFrom(
        this.store.select(providerSelectors.selectModeEdit),
        this.store.select(generalDataProviderSelectors.selectGeneralDataProviderId),
      ),
      mergeMap(
        async ([{generalDataProvider}, editMode, providerId]: [
          {generalDataProvider: GeneralData},
          boolean,
          string,
        ]) => {
          for (let contact of generalDataProvider.contacts) {
            contact = {
              ...contact,
              Puesto: contact?.Puesto !== 'N/D' ? contact?.Puesto : '',
              Titulo: contact?.Titulo !== 'N/D' ? contact?.Titulo : '',
              Departamento: contact?.Departamento !== 'N/D' ? contact?.Departamento : '',
            };
            // DOCS: Guardar DatosPersona
            const personDataId = extractID(
              await lastValueFrom(
                this.configuracionContactosService.DatosPersonaGuardarOActualizar(contact),
              ),
            );
            contact = {
              ...contact,
              ContactoProveedor: {
                ...contact.ContactoProveedor,
                IdProveedor: generalDataProvider.provider.IdProveedor,
              },
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

            // DOCS: Guardar Correos
            const emailsRequest: Array<Observable<string>> = _map(
              contact.CorreoElectronico,
              (o: CorreoElectronico) =>
                this.configuracionContactosService.CorreoElectronicoGuardarOActualizar(o),
            );
            const emailIds = await lastValueFrom(forkJoin(emailsRequest));
            contact = {
              ...contact,
              CorreoElectronico: _map(
                contact.CorreoElectronico,
                (o: CorreoElectronico, index: number) => ({
                  ...o,
                  IdCorreoElectronico: extractID(emailIds[index]),
                }),
              ),
            };

            // DOCS: Guardar Numeros telefónicos
            if (contact?.NumeroTelefonico?.length > 0) {
              const phonesRequest: Array<Observable<string>> = _map(
                contact.NumeroTelefonico,
                (o: NumeroTelefonico) =>
                  this.configuracionContactosService.NumeroTelefonicoGuardarOActualizar(o),
              );
              const phoneIds = await lastValueFrom(forkJoin(phonesRequest));
              contact = {
                ...contact,
                FechaCaducidadRegistro: DEFAULT_DATE, // FIXME: Quitar cuando venga en el modelo de base de datos
                NumeroTelefonico: _map(
                  contact.NumeroTelefonico,
                  (o: NumeroTelefonico, index: number) => ({
                    ...o,
                    IdNumeroTelefonico: extractID(phoneIds[index]),
                  }),
                ),
              };
            }

            // DOCS: Guardar contacto
            const contactId = await lastValueFrom(
              this.configuracionContactosService.ContactoGuardarOActualizar(contact),
            );
            contact = {
              ...contact,
              IdContacto: extractID(contactId),
              ContactoProveedor: {
                ...contact.ContactoProveedor,
                IdContacto: extractID(contactId),
              },
            };

            // DOCS: Guardar ContactoProveedor
            if (contact.ContactoProveedor.IdContactoProveedor) {
              const contactProviderId = await lastValueFrom(
                this.configuracionProveedoresRelacionesService.ContactoProveedorGuardarOActualizar(
                  contact.ContactoProveedor,
                ),
              );
              contact = {
                ...contact,
                IdContactoProveedor: extractID(contactProviderId),
                ContactoProveedor: {
                  ...contact.ContactoProveedor,
                  IdContactoProveedor: extractID(contactProviderId),
                },
              };
            }
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar o actualizar un contacto del proveddor.',
              ),
              contact.IdContactoProveedor,
            );
          }
          this.store.dispatch(SET_LOADING_SUCCESS({active: true, message: 'Has guardado'}));
          this.store.dispatch(providerActions.SET_MODE_EDIT({modeEdit: true}));
          this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
          return generalDataProviderActions.GET_GENERAL_DATA_PROVIDER_LOAD();
        },
      ),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al guardar los contactos del proveedor.',
          ),
          error,
        );
        return of(SET_LOADING({payload: false}));
      }),
    ),
  );

  deleteProviderLoad = createEffect(() =>
    this.actions$.pipe(
      ofType(generalDataProviderActions.DELETE_PROVIDER_LOAD),
      withLatestFrom(this.store.select(generalDataProviderSelectors.selectGeneralDataProviderId)),
      mergeMap(([action, providerId$]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configuracionProveedoresService.ProveedorDesactivar(providerId$).pipe(
          map((response) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return generalDataProviderActions.DELETE_PROVIDER_SUCCESS();
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS: Comprueba si el RFC es valido
  checkValidRFC$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalDataProviderActions.SET_FORM_DATA_BY_FIELD_NAME),
      withLatestFrom(
        this.store.select(generalDataProviderSelectors.selectGeneralDataProviderObject),
        this.store.select(generalDataProviderSelectors.selectAddress),
        this.store.select(selectCatPaisList),
      ),
      mergeMap(([action, provider, address, catCountryList]) => {
        if (!provider || (action.fieldName !== 'TaxId' && action.fieldName !== 'IdCatPais')) {
          return EMPTY;
        }
        const rfc = provider.TaxId;
        const idPais = address.IdCatPais;
        const mxCountry: CatPais = find(catCountryList, (o: CatPais) => toLower(o.Codigo) === 'mx');

        if (idPais !== mxCountry?.IdCatPais) {
          this.store.dispatch(
            generalDataProviderActions.SET_RFC_VALIDATION({
              value: true,
            }),
          );
        } else if (provider.TaxId) {
          return this.configuracionClientesService.ClienteExtensionsValidaRFC(rfc).pipe(
            map((response: boolean) => {
              this.logger.debug(servicesLogger.generateMessage(FILE_NAME, 'Al validar RFC'), rfc);
              return generalDataProviderActions.SET_RFC_VALIDATION({
                value: response,
              });
            }),
            catchError((error) => {
              return of(generalDataProviderActions.SET_RFC_VALIDATION({value: false}));
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );
}
