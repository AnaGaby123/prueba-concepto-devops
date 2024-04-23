/*CORE*/
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {find} from 'lodash-es';
/*MODELS*/
/*ACTIONS*/
import {customAgentActions, customAgentDetailsActions} from '@appActions/forms/custom-agent-form';
import {GET_CAT_PAIS_LOAD} from '@appActions/catalogs/catalogos.actions';
/*SELECTORS*/
import {
  customAgentsDetailsSelectors,
  customAgentsSelectors,
} from '@appSelectors/forms/custom-agents-form';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {CatTipoNumeroTelefonico} from 'api-catalogos';
import {AppState} from '@appCore/core.state';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmDialogComponent} from '@appComponents/shared/confirm-dialog/confirm-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';

@Injectable()
export class CustomAgentDetailsFormMethodsEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private location: Location,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  ngOnInit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(customAgentDetailsActions.INIT_DETAILS_COMPONENT_EFFECT),
        mergeMap(() => {
          this.store.dispatch(customAgentActions.SET_IS_IN_DETAILS({isInDetails: true}));
          this.store.dispatch(customAgentDetailsActions.GET_CAT_TIPO_TELEFONO_LOAD());
          this.store.dispatch(GET_CAT_PAIS_LOAD());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  ngOnDestroy$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(customAgentDetailsActions.ON_DESTROY_DETAILS_COMPONENT_EFFECT),
        mergeMap(() => {
          this.store.dispatch(customAgentActions.SET_IS_IN_DETAILS({isInDetails: false}));
          this.store.dispatch(customAgentActions.SET_ALLOW_TO_DETAILS({allowToDetails: false}));
          this.store.dispatch(
            customAgentActions.SET_TITLE({
              title: 'CATÁLOGO DE AGENTES ADUANALES',
            }),
          );
          this.store.dispatch(customAgentDetailsActions.RESET_DETAILS());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // EFECTOS PARA EL COMPORTAMIENTO DE LAS TABS
  changeTab$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(customAgentDetailsActions.CHANGE_TAB_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(customAgentsDetailsSelectors.haveChangesGD),
          this.store.select(customAgentsSelectors.selectEnableEdit),
        ),
        mergeMap(([action, hasChanges, enableEdit]) => {
          if (hasChanges && enableEdit) {
            this.store.dispatch(
              customAgentDetailsActions.SHOW_CONFIRM_DIALOG({
                currentTab: action.option,
                origin: 'changeTab',
              }),
            );
          } else {
            this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: false}));
            this.store.dispatch(
              customAgentDetailsActions.SET_TAB_SELECTED({option: action.option}),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  changeDispatchPoint$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(customAgentDetailsActions.CHANGE_DISPATCH_POINT_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(customAgentsDetailsSelectors.haveChangesToSave),
          this.store.select(customAgentsSelectors.selectEnableEdit),
        ),
        mergeMap(([{option}, hasChanges, enableEdit]) => {
          if (hasChanges && enableEdit) {
            this.store.dispatch(
              customAgentDetailsActions.SHOW_CONFIRM_DIALOG({
                origin: 'changeDispatchPoint',
              }),
            );
            this.store.dispatch(
              customAgentDetailsActions.SET_PRESELECTED_DISPATCH_POINT({value: option}),
            );
          } else {
            this.store.dispatch(customAgentDetailsActions.SET_OPTION_BAR_SELECTED({option}));
            this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: false}));
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  addNewDispatchPoint$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.ADD_NEW_DISPATCH_POINT_EFFECT),
      withLatestFrom(
        this.store.select(customAgentsDetailsSelectors.haveChangesToSave),
        this.store.select(customAgentsSelectors.selectEnableEdit),
        this.store.select(customAgentsDetailsSelectors.selectInitialDispatchPoint),
        this.store.select(customAgentsDetailsSelectors.selectedTabOption),
      ),
      mergeMap(([action, hasChanges, enableEdit, initialDispatchPoint, selectedTab]) => {
        if (hasChanges && enableEdit) {
          this.store.dispatch(
            customAgentDetailsActions.SHOW_CONFIRM_DIALOG({
              origin: 'addNewDispatchPoint',
            }),
          );
        } else {
          this.store.dispatch(customAgentActions.SET_ALLOW_TO_DETAILS({allowToDetails: true}));
          this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: true}));
          this.store.dispatch(customAgentDetailsActions.GENERATE_BACKUP({tabOption: selectedTab}));
          this.store.dispatch(customAgentActions.SET_TITLE({title: 'VER AGENTE ADUANAL'}));
          this.store.dispatch(
            customAgentDetailsActions.SET_DISPATCH_POINT_TO_LIST({
              dispatchPoint: initialDispatchPoint,
            }),
          );
        }

        return of(RETURN_EMPTY());
      }),
    ),
  );

  // EFECTO PARA EL COMPORTAMIENTO DEL POP PARA CANCELAR
  cancelPopEvent$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(customAgentDetailsActions.CANCEL_POP_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(customAgentsDetailsSelectors.selectCancelMessage),
          this.store.select(customAgentsDetailsSelectors.selectPreSelectedDispatchPoint),
          this.store.select(customAgentsDetailsSelectors.selectInitialDispatchPoint),
          this.store.select(customAgentsDetailsSelectors.selectedTabOption),
        ),
        mergeMap(([action, origenPop, barOption, initialDispatchPoint, selectedTab]) => {
          if (action.event) {
            switch (origenPop.origen) {
              case 'editCancel':
                this.store.dispatch(customAgentDetailsActions.SET_CANCEL_FORM());
                this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(customAgentDetailsActions.CLEAN_BACKUP());
                break;
              case 'addCancel':
                this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(customAgentDetailsActions.CLEAN_BACKUP());
                this.location.back();
                break;
              case 'changeTab':
                this.store.dispatch(customAgentDetailsActions.SET_CANCEL_FORM());
                this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(
                  customAgentDetailsActions.SET_TAB_SELECTED({
                    option: action.tab,
                  }),
                );
                this.store.dispatch(customAgentDetailsActions.CLEAN_BACKUP());
                break;
              case 'changeDispatchPoint':
                this.store.dispatch(customAgentDetailsActions.SET_CANCEL_FORM());
                this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(
                  customAgentDetailsActions.SET_OPTION_BAR_SELECTED({option: barOption}),
                );
                this.store.dispatch(
                  customAgentDetailsActions.SET_PRESELECTED_DISPATCH_POINT({value: null}),
                );
                this.store.dispatch(customAgentDetailsActions.CLEAN_BACKUP());
                break;
              case 'addNewDispatchPoint':
                this.store.dispatch(customAgentDetailsActions.SET_CANCEL_FORM());
                this.store.dispatch(customAgentDetailsActions.CLEAN_BACKUP());
                this.store.dispatch(
                  customAgentActions.SET_ALLOW_TO_DETAILS({allowToDetails: true}),
                );
                this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: true}));
                this.store.dispatch(
                  customAgentDetailsActions.GENERATE_BACKUP({tabOption: selectedTab}),
                );
                this.store.dispatch(
                  customAgentDetailsActions.SET_DISPATCH_POINT_TO_LIST({
                    dispatchPoint: initialDispatchPoint,
                  }),
                );
                break;
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // EFECTO PARA LAS ACCIONES DEL COMPONENTE BAR ACTIVITY
  nextStep$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(customAgentDetailsActions.NEXT_STEP_COMPONENT_EFFECT),
        mergeMap((action) => {
          this.store.dispatch(customAgentDetailsActions.SEND_GENERAL_DATA());
          this.store.dispatch(customAgentDetailsActions.NEXT_STEP({step: action.step}));
          this.store.dispatch(customAgentActions.SET_EDIT_MODE({editMode: true}));
          this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: false}));
          this.store.dispatch(customAgentDetailsActions.CLEAN_BACKUP());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // EFECTOS DE AYUDA EN DESADUANAJE

  // EFECTO PARA AGREGAR UNA TARIFA
  addNewRate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(customAgentDetailsActions.ADD_NEW_RATE_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(customAgentsDetailsSelectors.addRateButton)),
        mergeMap(([action, addFee]) => {
          if (addFee) {
            this.store.dispatch(customAgentDetailsActions.ADD_NEW_RATE());
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  /*DOCS: Guarda un número telefónico en el arreglo de números telefónicos*/
  setPhoneNumber$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.SET_PHONE_NUMBER_LOAD),
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectCatPhones)),
      switchMap(([{field, phoneType, value}, phoneTypesList]) => {
        const phoneTypeObject = find(
          phoneTypesList,
          (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === phoneType,
        );
        this.store.dispatch(
          customAgentDetailsActions.SET_PHONE_NUMBER({
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

  // DOCS: EFFEC TO SHOW CONFIRM DIALOG
  showConfirmDialog$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.SHOW_CONFIRM_DIALOG),
      mergeMap(({currentTab, origin}) => {
        const dialogRef = this.dialog.open(
          ConfirmDialogComponent,
          buildDialogConfig({
            message: this.translateService.instant('formProduct.general.titleModal'),
          }),
        );

        dialogRef.afterClosed().subscribe((value: boolean) => {
          this.store.dispatch(
            customAgentDetailsActions.SET_CANCEL_POP({
              value,
              origen: origin,
            }),
          );

          this.store.dispatch(
            customAgentDetailsActions.CANCEL_POP_COMPONENT_EFFECT({
              event: value,
              tab: currentTab,
            }),
          );
        });
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
