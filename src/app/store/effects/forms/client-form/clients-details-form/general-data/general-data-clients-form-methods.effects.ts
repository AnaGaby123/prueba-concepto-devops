import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {
  GET_CAT_DIFICULTAD_LOAD,
  GET_CAT_MANTENIMIENTO_LOAD,
  GET_CAT_NIVEL_DECISION_LOAD,
  GET_CAT_NIVEL_PUESTO_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {of} from 'rxjs';
import * as clientsGeneralDataActions from '@appActions/forms/client-form/clients-details-form/general-data-clients-form/general-data-clients-form.actions';
import {GET_CAT_TERCEROS_AUTORIZADOS_LOAD} from '@appActions/forms/client-form/clients-details-form/general-data-clients-form/general-data-clients-form.actions';
import {clientsGeneralDataSelectors} from '@appSelectors/forms/clients-form';
import {ClientTerceroAutorizadoRelacion} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
import {Cliente, UsuariosCartera} from 'api-catalogos';
import {find, includes} from 'lodash-es';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {selectUser} from '@appSelectors/auth/auth.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {DEFAULT_UUID, ENUM_USER_FUNCTIONS} from '@appUtil/common.protocols';
import {
  selectedClient,
  selectListSellersForDropDown,
  selectUsersCommercialLeader,
  selectUsersCoordinatorESAC,
  selectUsersEsac,
} from '@appSelectors/forms/clients-form/clients-details/clients-form-general-data.selectors';
import {
  selectListCommercialLeader,
  selectListCoordinatorESAC,
} from '@appSelectors/catalogs/catalogs.selectors';

@Injectable()
export class GeneralDataClientsFormMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  ngOnInit$ = createEffect(() =>
    this.action$.pipe(
      ofType(clientsGeneralDataActions.INIT_GENERAL_DATA_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(selectUser),
        this.store.select(selectListSellersForDropDown),
        this.store.select(selectUsersEsac),
        this.store.select(selectUsersCommercialLeader),
        this.store.select(selectUsersCoordinatorESAC),
        this.store.select(selectedClient),
        this.store.select(selectListCommercialLeader),
        this.store.select(selectListCoordinatorESAC),
      ),
      mergeMap(
        ([
          action,
          currentUser,
          sellers,
          esacs,
          commercialLeaders,
          coordinatorEsacs,
          selectedClient,
          listCommercialLeader,
          listCoordinatorESAC,
        ]) => {
          this.store.dispatch(clientsGeneralDataActions.FETCH_ACTIVE_CONTACTS_LOAD());
          this.store.dispatch(GET_CAT_DIFICULTAD_LOAD());
          this.store.dispatch(GET_CAT_MANTENIMIENTO_LOAD());
          this.store.dispatch(GET_CAT_NIVEL_DECISION_LOAD());
          this.store.dispatch(GET_CAT_NIVEL_PUESTO_LOAD());
          this.store.dispatch(GET_CAT_TERCEROS_AUTORIZADOS_LOAD());
          const isUserEvi = includes(currentUser.Funciones, ENUM_USER_FUNCTIONS.functionEvi);
          const isUserEsac = includes(currentUser.Funciones, ENUM_USER_FUNCTIONS.functionEsac);
          const idUserCoordinatorESAC = includes(
            currentUser.Funciones,
            ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente,
          );
          const isUserCommercialLeader = includes(
            currentUser.Funciones,
            ENUM_USER_FUNCTIONS.functionCoordinadorDeVentaInterna,
          );
          if (
            ((isUserEvi && !selectedClient?.IdUsuarioVendedor) ||
              (isUserEsac && !selectedClient?.IdUsuarioESAC)) &&
            selectedClient?.IdCliente === DEFAULT_UUID
          ) {
            this.store.dispatch(
              clientsGeneralDataActions.SET_DROP_DATA({
                value: isUserEvi
                  ? find(sellers, (o: DropListOption) => o.value === currentUser.IdUsuario)
                  : find(esacs, (o: DropListOption) => o.value === currentUser.IdUsuario),
                idInput: isUserEvi ? 'IdUsuarioVendedor' : 'IdUsuarioESAC',
                stringInput: isUserEvi ? 'UsuarioVendedor' : 'ESAC',
              }),
            );
            if (isUserEvi) {
              const commercialLeader = listCommercialLeader.find((o: UsuariosCartera) =>
                o.ListaUsuarioRelacion.some((u) => u.IdUsuario === currentUser.IdUsuario),
              );
              const coordinatorDropdown = commercialLeaders.find(
                (o: DropListOption) => o.value === commercialLeader?.Usuario?.IdUsuario,
              );
              this.store.dispatch(
                clientsGeneralDataActions.SET_DROP_DATA({
                  value: coordinatorDropdown,
                  idInput: 'IdUsuarioCoordinadorDeVentaInterna',
                  stringInput: '',
                }),
              );
            }
            if (isUserEsac) {
              const coordinatorEsac = listCoordinatorESAC.find((o: UsuariosCartera) =>
                o.ListaUsuarioRelacion.some((u) => u.IdUsuario === currentUser.IdUsuario),
              );
              const coordinatorDropdown = coordinatorEsacs.find(
                (o: DropListOption) => o.value === coordinatorEsac?.Usuario?.IdUsuario,
              );
              this.store.dispatch(
                clientsGeneralDataActions.SET_DROP_DATA({
                  value: coordinatorDropdown,
                  idInput: 'IdUsuarioCoordinadorDeServicioAlCliente',
                  stringInput: '',
                }),
              );
            }
          }
          if (
            (idUserCoordinatorESAC || isUserCommercialLeader) &&
            !selectedClient?.IdUsuarioCoordinadorDeServicioAlCliente &&
            !selectedClient?.IdUsuarioCoordinadorDeVentaInterna
          ) {
            this.store.dispatch(
              clientsGeneralDataActions.SET_DROP_DATA({
                value: idUserCoordinatorESAC
                  ? find(coordinatorEsacs, (o: DropListOption) => o.value === currentUser.IdUsuario)
                  : find(
                      commercialLeaders,
                      (o: DropListOption) => o.value === currentUser.IdUsuario,
                    ),
                idInput: idUserCoordinatorESAC
                  ? 'IdUsuarioCoordinadorDeServicioAlCliente'
                  : 'IdUsuarioCoordinadorDeVentaInterna',
                stringInput: '',
              }),
            );
          }
          return of(RETURN_EMPTY());
        },
      ),
    ),
  );
  openModal$ = createEffect(() =>
    this.action$.pipe(
      ofType(clientsGeneralDataActions.OPEN_MODAL_COMPONENT_EFFECT),
      mergeMap(({value}) => {
        if (value) {
          this.store.dispatch(clientsGeneralDataActions.SET_CONTACT_FORM());
        } else {
          this.store.dispatch(clientsGeneralDataActions.CLEAN_CONTACT_FORM());
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );
  addThird$ = createEffect(() =>
    this.action$.pipe(
      ofType(clientsGeneralDataActions.ADD_THIRD_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(clientsGeneralDataSelectors.selectCatClientsTercerosAutorizados),
        this.store.select(clientsGeneralDataSelectors.selectAuthorizedThirdSelected),
      ),
      mergeMap(([action, authorizedThirdList, authorizedThirdselected]) => {
        let selectedTercero: ClientTerceroAutorizadoRelacion = find(
          authorizedThirdList.listTercerosAutorizados,
          (o: Cliente) => o.IdCliente === authorizedThirdselected.value,
        );
        selectedTercero = {
          ...selectedTercero,
          NombreTerceroAutorizado: selectedTercero.Alias,
        };
        this.store.dispatch(
          clientsGeneralDataActions.SET_TERCERO_AUTORIZADO({
            terceroAutorizado: selectedTercero,
          }),
        );
        this.store.dispatch(
          clientsGeneralDataActions.SET_AUTHORIZED_THIRD_SELECTED({
            value: null,
          }),
        );
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
