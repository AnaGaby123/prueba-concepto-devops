import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {addressesActions} from '@appActions/forms/client-form';
import {dropTiposDireccion} from '@appSelectors/catalogs/catalogs.selectors';
import {find} from 'lodash-es';
import {clientsAddressSelectors} from '@appSelectors/forms/clients-form';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import * as clientsAddressActions from '@appActions/forms/client-form/clients-details-form/address-clients-form/address-clients-form.actions';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';

@Injectable()
export class AddressClientsFormMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  onInit$ = createEffect(() =>
    this.action$.pipe(
      ofType(addressesActions.ON_INIT_COMPONENT_EFFECT),
      mergeMap((action) => {
        this.store.dispatch(catalogsActions.GET_CAT_ADDRESS_TYPE_LOAD());
        this.store.dispatch(addressesActions.GET_ADDRESS_CLIENT_LOAD({payload: true}));
        this.store.dispatch(catalogsActions.GET_CAT_PAIS_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_ZONA_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_RUTA_ENTREGA_LOAD());
        return of(RETURN_EMPTY());
      }),
    ),
  );
  // DOCS EFECTO PARA EDITAR UNA DIRECCION
  editAddress$ = createEffect(() =>
    this.action$.pipe(
      ofType(addressesActions.EDIT_ADDRESS_COMPONENT_EFFECT),
      mergeMap(({address, index, isEdit}) => {
        this.store.dispatch(addressesActions.EDIT_ADDRESS_SELECTED({address, index, isEdit}));
        this.store.dispatch(clientsAddressActions.ADDRESS_POP_OPEN({value: true}));
        this.store.dispatch(addressesActions.FETCH_ADDRESS_CONFIG_VALIDATION_LOAD());
        return of(RETURN_EMPTY());
      }),
    ),
  );
  // DOCS EFECTO PARA AGREGAR UN COMENTARIO EN LOS HORARIOS
  addComment$ = createEffect(() =>
    this.action$.pipe(
      ofType(addressesActions.ADD_COMMENT_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(dropTiposDireccion),
        this.store.select(clientsAddressSelectors.selectDeliveryComment),
        this.store.select(clientsAddressSelectors.selectReviewDataComment),
        this.store.select(clientsAddressSelectors.selectChargesDataComment),
        this.store.select(clientsAddressSelectors.selectVisitComment),
      ),
      mergeMap(
        ([
          {addressType},
          addressTypes,
          deliveryComment,
          reviewDataComment,
          chargesDataComment,
          visitComment,
        ]) => {
          switch (addressType) {
            case 'Entrega':
              deliveryComment = {
                ...deliveryComment,
                IdCatTipoDireccion: find(addressTypes, (a) => a.Tipo === 'Entrega')
                  .IdCatTipoDireccion,
              };
              this.store.dispatch(addressesActions.SET_COMMENT({comment: deliveryComment}));
              this.store.dispatch(
                addressesActions.SET_INITIAL_COMMENT_SCHEDULE_TYPE({
                  node: 'deliveryComment',
                }),
              );
              break;
            case 'Revision':
              reviewDataComment = {
                ...reviewDataComment,
                IdCatTipoDireccion: find(addressTypes, (a) => a.Tipo === 'Revision')
                  .IdCatTipoDireccion,
              };
              this.store.dispatch(addressesActions.SET_COMMENT({comment: reviewDataComment}));
              this.store.dispatch(
                addressesActions.SET_INITIAL_COMMENT_SCHEDULE_TYPE({
                  node: 'reviewDataComment',
                }),
              );
              break;
            case 'Cobro':
              chargesDataComment = {
                ...chargesDataComment,
                IdCatTipoDireccion: find(addressTypes, (a) => a.Tipo === 'Cobro')
                  .IdCatTipoDireccion,
              };
              this.store.dispatch(
                addressesActions.SET_COMMENT({
                  comment: chargesDataComment,
                }),
              );
              this.store.dispatch(
                addressesActions.SET_INITIAL_COMMENT_SCHEDULE_TYPE({
                  node: 'chargesDataComment',
                }),
              );

              break;
            case 'Visita':
              visitComment = {
                ...visitComment,
                IdCatTipoDireccion: find(addressTypes, (a) => a.Tipo === 'Visita')
                  .IdCatTipoDireccion,
              };
              this.store.dispatch(addressesActions.SET_COMMENT({comment: visitComment}));
              this.store.dispatch(
                addressesActions.SET_INITIAL_COMMENT_SCHEDULE_TYPE({
                  node: 'visitComment',
                }),
              );
              break;
          }
          return of(RETURN_EMPTY());
        },
      ),
    ),
  );

  // DOCS EFECTO PARACERRAR EL POP DE DIRECCIONES
  closeModal$ = createEffect(() =>
    this.action$.pipe(
      ofType(addressesActions.CLOSE_MODAL_COMPONENT_EFFECT),
      mergeMap(({value}) => {
        if (value) {
          this.store.dispatch(addressesActions.SAVE_OR_UPDATE_FORM());
        }
        this.store.dispatch(clientsAddressActions.ADDRESS_POP_OPEN({value: false}));
        this.store.dispatch(addressesActions.RESET_ADDRESS_FORM());
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS EFECTO PARA CERRAR EL MAPA Y ACTUALIZAR LA LAY Y LNG
  closeMap$ = createEffect(() =>
    this.action$.pipe(
      ofType(addressesActions.CLOSE_MAP_COMPONENT_EFFECT),
      mergeMap(({lat, lng}) => {
        this.store.dispatch(
          clientsAddressActions.UPDATE_LAT_LNG({
            lat,
            lng,
          }),
        );
        this.store.dispatch(clientsAddressActions.FETCH_DISTANCE());
        this.store.dispatch(clientsAddressActions.SHOW_MAP({value: false}));
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
