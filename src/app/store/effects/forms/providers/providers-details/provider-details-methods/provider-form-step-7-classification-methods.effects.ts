import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import * as classifitacionSelector from '@appSelectors/forms/providers/providers-details/provider-form-step-7-classification.selectors';
import * as classificationActions from '@appActions/forms/providers/providers-details/provider-form-step-7-classification.actions';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {providerSelectors} from '@appSelectors/forms/providers';
import {of} from 'rxjs';
import {providerActions} from '@appActions/forms/providers';
import {AppState} from '@appCore/core.state';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {ConfirmDialogComponent} from '@appComponents/shared/confirm-dialog/confirm-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';

@Injectable()
export class ProviderFormStep7ClassificationMethodsEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  handleSelectedFamilyChange$ = createEffect(() =>
    this.action$.pipe(
      ofType(classificationActions.HANDLE_SELECTED_FAMILY_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(classifitacionSelector.selectClassificationsHasChanges),
        this.store.select(providerSelectors.selectEnableEdit),
      ),
      mergeMap(([action, hasChanges, enableEdit]) => {
        this.store.dispatch(
          classificationActions.SET_PRESELECTED_FAMILY({
            selectedFamily: action.selectedFamily,
          }),
        );
        if (hasChanges && enableEdit) {
          const dialogRef = this.dialog.open(
            ConfirmDialogComponent,
            buildDialogConfig({
              message: this.translateService.instant(
                'formProvider.classification.continueWithoutChangesMessage',
              ),
            }),
          );

          dialogRef.afterClosed().subscribe((value: boolean) => {
            this.store.dispatch(classificationActions.HANDLE_CLOSE_POP_COMPONENT_EFFECT({value}));
          });
          return of(RETURN_EMPTY());
        } else {
          return of(classificationActions.SELECT_FAMILY_COMPONENT_EFFECT());
        }
      }),
    ),
  );

  handleClosePop$ = createEffect(() =>
    this.action$.pipe(
      ofType(classificationActions.HANDLE_CLOSE_POP_COMPONENT_EFFECT),
      mergeMap((action) => {
        if (action.value) {
          this.store.dispatch(classificationActions.RESTORE_CLASSIFICATION_BACKUP());
          return of(classificationActions.SELECT_FAMILY_COMPONENT_EFFECT());
        }
      }),
    ),
  );

  selectFamily$ = createEffect(() =>
    this.action$.pipe(
      ofType(classificationActions.SELECT_FAMILY_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(classifitacionSelector.selectPreselectedFamily)),
      mergeMap(([action, preSelectedFamily]) => {
        this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
        this.store.dispatch(
          classificationActions.SELECT_FAMILY_CARD({
            itemId: preSelectedFamily.value,
          }),
        );
        return of(classificationActions.SET_PRESELECTED_FAMILY({selectedFamily: null}));
      }),
    ),
  );
}
