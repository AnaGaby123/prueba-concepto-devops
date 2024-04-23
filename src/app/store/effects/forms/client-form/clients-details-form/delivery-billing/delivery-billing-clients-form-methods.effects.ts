import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {deliveryBillingActions} from '@appActions/forms/client-form';
import {
  clientDeliveryBillingSelectors,
  clientsDetailsSelectors,
} from '@appSelectors/forms/clients-form';
import {AuthorizationTypesClave, DEFAULT_UUID} from '@appUtil/common.protocols';
import * as actionsUtils from '@appActions/utils/utils.action';
import {CatPais} from 'api-catalogos';
import {selectCatPaisList} from '@appSelectors/catalogs/catalogs.selectors';
import {find, toLower} from 'lodash-es';
import {AppState} from '@appCore/core.state';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {RequestAuthCodeDialogComponent} from '@appComponents/shared/request-auth-code-dialog/request-auth-code-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {ParametroAutorizacion} from 'api-logistica';
import {authDialogActions} from '@appActions/dialogs';

@Injectable()
export class DeliveryBillingClientsFormMethodsEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private translateService: TranslateService,
    private dialog: MatDialog,
  ) {}

  // DOCS EFECTO PARA EDITAR UNA DIRECCIÓN
  editAddress$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(deliveryBillingActions.EDIT_ADDRESS_COMPONENT_EFFECT),
        mergeMap(() => {
          this.store.dispatch(
            deliveryBillingActions.SET_ADDRESS_MODAL_TITLE({
              value: 'EDITAR DIRECCIÓN',
            }),
          );
          this.store.dispatch(deliveryBillingActions.SET_OPEN_ADDRESS_MODAL({value: true}));
          this.store.dispatch(deliveryBillingActions.SET_BACKUP_ADDRESS());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS EFECTO PARA AGREGAR UNA DIRECCIÓN
  addNewAddress$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(deliveryBillingActions.ADD_NEW_ADDRESS_COMPONENT_EFFECT),
        mergeMap(() => {
          this.store.dispatch(
            deliveryBillingActions.SET_ADDRESS_MODAL_TITLE({
              value: 'AGREGAR DIRECCIÓN',
            }),
          );
          this.store.dispatch(deliveryBillingActions.SET_OPEN_ADDRESS_MODAL({value: true}));
          this.store.dispatch(deliveryBillingActions.SET_BACKUP_ADDRESS());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS EFECTO PARA MANDAR LOS DATOS DE FACTURACIÓN AL ESTADO
  setDataBilling$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(deliveryBillingActions.SET_DATA_BILLING_COMPONENT_EFFECT),
        mergeMap(({value, node}) => {
          this.store.dispatch(deliveryBillingActions.SET_DATA_BILLING({payload: value, node}));
          if (node === 'RFC') {
            this.store.dispatch(deliveryBillingActions.VALIDATE_RFC());
          }
          if (node === 'EnviarPorCorreo') {
            if (!value) {
              this.store.dispatch(
                deliveryBillingActions.SET_DATA_BILLING({
                  payload: '',
                  node: 'Correo',
                }),
              );
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS VALIDAR RFC CUANDO EL POP DE DIRECCIÓN FISCAL SE LE PRESIONE EL BOTÓN "ACEPTAR" O CUANDO ESCIBRE SOBRE EL INPUT RFC
  setValidateRFC$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(deliveryBillingActions.VALIDATE_RFC),
        withLatestFrom(
          this.store.select(clientDeliveryBillingSelectors.selectBilling),
          this.store.select(clientDeliveryBillingSelectors.selectClientAddress),
          this.store.select(selectCatPaisList),
        ),
        mergeMap(([action, billing, clientAddress, catCountryList]) => {
          const idCatPais = clientAddress?.Direccion?.IdCatPais;
          const mxCountry: CatPais = find(
            catCountryList,
            (o: CatPais) => toLower(o.Codigo) === 'mx',
          );
          /* DOCS: Si el país es diferente de México entonces no se validará el rfc */
          if (idCatPais !== mxCountry?.IdCatPais) {
            this.store.dispatch(deliveryBillingActions.SET_RFC_VALIDATION({value: true}));
          } else if (billing.RFC !== null && billing.RFC !== '') {
            this.store.dispatch(deliveryBillingActions.SET_CHECK_RFC_LOAD());
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS EFECTO PARA MANDAR LOS DATOS DE DIRECCION AL ESTADO
  setDirectionDataInput$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(deliveryBillingActions.SET_DIRECTION_DATA_COMPONENT_EFFECT),
        mergeMap(({payload, node}) => {
          this.store.dispatch(deliveryBillingActions.SET_DIRECTION_DATA({payload, node}));
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS EFECTO PARA CERRAR EL POP DE DIRECCIÓN
  closeModal$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(deliveryBillingActions.CLOSE_MODAL_COMPONENT_EFFECT),
        mergeMap(({value}) => {
          if (!value) {
            this.store.dispatch(deliveryBillingActions.SET_RESTORE_BACKUP_ADDRESS());
          } else {
            this.store.dispatch(deliveryBillingActions.SET_ADDRESS_DATA_POP());
          }
          this.store.dispatch(deliveryBillingActions.SET_OPEN_ADDRESS_MODAL({value: false}));
          this.store.dispatch(deliveryBillingActions.VALIDATE_ZIP_CODE_SUCCESS({value: true}));
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  //DOCS: Efecto para enviar data necesaria para la solicitud de un código de autorización
  setAuthorization$ = createEffect(() =>
    this.action$.pipe(
      ofType(deliveryBillingActions.SET_AUTHORIZATION_DATA),
      withLatestFrom(this.store.select(clientDeliveryBillingSelectors.selectBilling)),
      mergeMap(([action, billing]) => {
        return of(
          actionsUtils.REQUEST_VALIDATION_CODE_LOAD({
            authorizationType: AuthorizationTypesClave.tipoDeCambioDOf,
            IdOperacion: billing.IdDatosFacturacionCliente,
          }),
        );
      }),
    ),
  );

  // DOCS: SHOW REQUEST AUTHORIZATION CODE DIALOG
  showRequestAuthCode$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(deliveryBillingActions.SHOW_REQUEST_AUTH_CODE),
        withLatestFrom(
          this.store.select(clientsDetailsSelectors.selectedClient),
          this.store.select(clientDeliveryBillingSelectors.selectBilling),
        ),
        mergeMap(([action, client, billing]) => {
          const changeType = `
          ${
            billing?.TipoDeCambioDiarioOficial
              ? this.translateService.instant('clientCatalog.officialDiary')
              : ''
          } ${
            billing?.TipoDeCambioBanamex
              ? this.translateService.instant('clientCatalog.interbank')
              : ''
          }`;

          const resume = `${this.translateService.instant(
            'clientCatalog.changeType',
          )} · ${changeType}`;

          const description = `${this.translateService.instant(
            'clientCatalog.deliveryCodeMessage',
          )} · ${changeType}`;

          const authCodeDialogRef = this.dialog.open(
            RequestAuthCodeDialogComponent,
            buildDialogConfig({
              customerName: client?.Nombre,
              description,
              resume,
            }),
          );

          authCodeDialogRef.afterClosed().subscribe((value: boolean) => {
            if (value) {
              this.store.dispatch(deliveryBillingActions.GENERATE_AUTHORIZATION_CODE());
            }
          });
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: SHOW DIALOG TO GENERATE AUTHORIZATION CODE
  generateAuthCode$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(deliveryBillingActions.GENERATE_AUTHORIZATION_CODE),
        withLatestFrom(
          this.store.select(clientsDetailsSelectors.selectedClient),
          this.store.select(clientDeliveryBillingSelectors.selectBilling),
        ),
        mergeMap(([action, client, billing]) => {
          const resume = this.translateService.instant('clientCatalog.deliveryCodeMessage');
          const description = `${this.translateService.instant(
            'clientCatalog.deliveryCodeMessage',
          )} ${
            billing?.TipoDeCambioDiarioOficial
              ? this.translateService.instant('clientCatalog.officialDiary')
              : ''
          } ${
            billing?.TipoDeCambioDiarioOficial
              ? this.translateService.instant('clientCatalog.interbank')
              : ''
          }`;

          const authCodeDialogData = {
            customerName: client?.Nombre,
            description,
            resume,
          };

          const payload: ParametroAutorizacion = {
            IdOperacion: billing.IdDatosFacturacionCliente,
            IdAutorizacion: DEFAULT_UUID,
            IdUsuarioAutoriza: null,
            CodigoAutorizacion: '',
            Descripcion:
              'Se solicita código de autorización para tramitar pedido con errores del cliente ' +
              client?.Nombre.toUpperCase(),
          };

          this.store.dispatch(
            authDialogActions.GENERATE_AUTH_CODE({
              actionAfterValid: deliveryBillingActions.SET_SAVE_BILLING_LOAD(),
              authCodeDialogData,
              payload,
            }),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
