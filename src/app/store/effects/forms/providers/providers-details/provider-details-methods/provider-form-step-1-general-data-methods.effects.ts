import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {generalDataProviderActions} from '@appActions/forms/providers';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {generalDataProviderSelectors} from '@appSelectors/forms/providers';
import {
  selectTypeMobile,
  selectTypePhone1,
  selectTypePhone2,
} from '@appSelectors/catalogs/catalogs.selectors';
import {EMPTY, of} from 'rxjs';

@Injectable()
export class ProviderFormStep1GeneralDataMethodsEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  fomHandler$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalDataProviderActions.FORM_HANDLER_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(generalDataProviderSelectors.selectContactToEdit),
        this.store.select(generalDataProviderSelectors.selectContactToEditEmail),
        this.store.select(selectTypePhone1),
        this.store.select(selectTypePhone2),
        this.store.select(selectTypeMobile),
      ),
      mergeMap(([action, contactToEdit, emailToEdit, phone1, phone2, mobile]) => {
        if (contactToEdit) {
          let objectId = null;
          let phoneTypeId = null;
          if (action.fieldName === 'email') {
            objectId = emailToEdit?.IdCorreoElectronico;
          } else if (action.fieldName === 'phone1' || action.fieldName === 'ext1') {
            phoneTypeId = phone1?.IdCatTipoNumeroTelefonico;
          } else if (action.fieldName === 'phone2' || action.fieldName === 'ext2') {
            phoneTypeId = phone2?.IdCatTipoNumeroTelefonico;
          } else if (action.fieldName === 'mobile') {
            phoneTypeId = mobile?.IdCatTipoNumeroTelefonico;
          }
          return of(
            generalDataProviderActions.SET_CONTACT_DATA_BY_FIELD_NAME({
              fieldName: action.fieldName,
              fieldValue: action.fieldValue,
              objectId,
              phoneTypeId,
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
}
