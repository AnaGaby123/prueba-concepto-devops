/*CORE*/
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {Router} from '@angular/router';
/*MODELS*/
import {ProvidersTabsOptions} from '@appModels/store/forms/providers/providers-details/providers-details.models';
/*ACTIONS*/
import {
  GET_CAT_EMPRESAS_LOAD,
  GET_CAT_MONEDA_LOAD,
  GET_CAT_UNIDAD_TIEMPO_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {
  buySaleProviderActions,
  campaingsProviderActions,
  classificationActions,
  generalDataProviderActions,
  logisticAndPaymentActions,
  offerActions,
  providerActions,
  providersDetailsActions,
  trademarkProviderActions,
} from '@appActions/forms/providers';
/*SELECTORS*/
import {
  campaignsProviderSelectors,
  providersDetailsSelectors,
  providerSelectors,
} from '@appSelectors/forms/providers';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {appRoutes} from '@appHelpers/core/app-routes';
import {MatDialog} from '@angular/material/dialog';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {ConfirmDialogComponent} from '@appComponents/shared/confirm-dialog/confirm-dialog.component';
import {TranslateService} from '@ngx-translate/core';
import {buyLicenseFieldToShowConfirm} from '@appSelectors/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.selectors';

@Injectable()
export class ProviderDetailsMethodsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  readonly tabsOptions = ProvidersTabsOptions;

  onInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providersDetailsActions.ON_INIT_COMPONENT_EFFECT),
      mergeMap((action) => {
        this.store.dispatch(GET_CAT_EMPRESAS_LOAD());
        this.store.dispatch(GET_CAT_MONEDA_LOAD());
        this.store.dispatch(providerActions.SET_ACTUAL_STEP({step: 0}));
        this.store.dispatch(GET_CAT_UNIDAD_TIEMPO_LOAD());
        return of(RETURN_EMPTY());
      }),
    ),
  );

  saveSteps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providersDetailsActions.SAVE_STEPS_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(buyLicenseFieldToShowConfirm)),
      mergeMap(([action, buyLicenseFieldRequiredChanged]) => {
        switch (action.stepId) {
          case '1':
            this.store.dispatch(providersDetailsActions.SAVE_PROVIDER_DATA());
            break;
          case '2':
            this.store.dispatch(trademarkProviderActions.SAVE_ASSOCIATES_TRADEMARK_FAMILY_LOAD());
            break;
          case '3':
            this.store.dispatch(campaingsProviderActions.SET_DELETE_CAMPAIGN_LOAD());
            break;
          case '4':
            this.store.dispatch(logisticAndPaymentActions.SAVE_PAYMENT_CONDITIONS_LOAD());
            break;
          case '5':
            if (buyLicenseFieldRequiredChanged) {
              this.store.dispatch(providersDetailsActions.SHOW_CONFIRM_DIALOG({isEdit: false}));
            } else {
              this.store.dispatch(buySaleProviderActions.SAVE_PROVIDER_DATA_LOAD());
            }
            break;
          case '6':
            this.store.dispatch(classificationActions.SAVE_CONCEPTS_LOAD());
            break;
          case '8':
            this.store.dispatch(offerActions.SAVE_CONFIGURATION_LOAD());
            break;
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  restoreBackUpSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providersDetailsActions.RESTORE_BACKUP_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(providersDetailsSelectors.selectIsInTrademarkPage),
        this.store.select(providersDetailsSelectors.selectedStepsOptionsITabOptions),
      ),
      mergeMap(([action, isInTrademark, selectedStep]) => {
        let {label} = selectedStep;
        label =
          label === this.tabsOptions.TrademarkOffer
            ? isInTrademark
              ? this.tabsOptions.Trademark
              : this.tabsOptions.Offer
            : label;
        const restoreStepsBackup = {
          [this.tabsOptions.GeneralData]: () =>
            this.store.dispatch(generalDataProviderActions.RESTORE_PROVIDER_BACKUP()),
          [this.tabsOptions.Trademark]: () =>
            this.store.dispatch(trademarkProviderActions.RESTORE_TRADEMARK_BACKUP()),
          [this.tabsOptions.Offer]: () =>
            this.store.dispatch(offerActions.RESTORE_BACKUP_CONFIGURATION()),
          [this.tabsOptions.Campaign]: () =>
            this.store.dispatch(campaingsProviderActions.RESTORE_CAMPAIGNS_BACKUP()),
          [this.tabsOptions.LogisticPayment]: () =>
            this.store.dispatch(logisticAndPaymentActions.RESTORE_LOGISTIC_AND_PAYMENT_BACKUP()),
          [this.tabsOptions.BuySale]: () =>
            this.store.dispatch(buySaleProviderActions.RESTORE_BUY_SALE_LICENSES_BACKUP()),
          [this.tabsOptions.FeatureGroup]: () =>
            this.store.dispatch(classificationActions.RESTORE_CLASSIFICATION_BACKUP()),
        };
        restoreStepsBackup[label]();
        return of(RETURN_EMPTY());
      }),
    ),
  );

  editButtonHandler$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providersDetailsActions.EDIT_BUTTON_HANDLER_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(providersDetailsSelectors.selectIsInTrademarkPage),
        this.store.select(providersDetailsSelectors.selectedStepsOptionsITabOptions),
      ),
      mergeMap(([action, isInTrademark, selectedStep]) => {
        let {label} = selectedStep;
        label =
          label === this.tabsOptions.TrademarkOffer
            ? isInTrademark
              ? this.tabsOptions.Trademark
              : this.tabsOptions.Offer
            : label;
        this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: true}));
        const makeStepsBackup = {
          [this.tabsOptions.GeneralData]: () =>
            this.store.dispatch(generalDataProviderActions.SET_PROVIDER_BACKUP()),
          [this.tabsOptions.Trademark]: () =>
            this.store.dispatch(trademarkProviderActions.SET_TRADEMARK_BACKUP()),
          [this.tabsOptions.Offer]: () =>
            this.store.dispatch(offerActions.SET_BACKUP_CONFIGURATION()),
          [this.tabsOptions.Campaign]: () =>
            this.store.dispatch(campaingsProviderActions.SET_CAMPAIGNS_BACKUP()),
          [this.tabsOptions.LogisticPayment]: () =>
            this.store.dispatch(logisticAndPaymentActions.SET_LOGISTIC_AND_PAYMENT_BACKUP()),
          [this.tabsOptions.BuySale]: () =>
            this.store.dispatch(buySaleProviderActions.SET_BUY_SALE_LICENSES_BACKUP()),
          [this.tabsOptions.FeatureGroup]: () =>
            this.store.dispatch(classificationActions.SET_CLASSIFICATION_BACKUP()),
        };
        makeStepsBackup[label]();
        return of(RETURN_EMPTY());
      }),
    ),
  );

  saveHandler$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providersDetailsActions.SAVE_HANDLER_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(providersDetailsSelectors.selectIsInTrademarkPage),
        this.store.select(providersDetailsSelectors.selectedStepsOptionsITabOptions),
        this.store.select(campaignsProviderSelectors.getAddCampaing),
      ),
      mergeMap(([action, isInTrademark, selectedStep, addCampaignIsActive]) => {
        if (addCampaignIsActive) {
          return of(campaingsProviderActions.SAVE_CAMPAIGN_LOAD());
        } else {
          let {id} = selectedStep;
          if (id === '2' && !isInTrademark) {
            id = '8';
          }
          return of(
            providersDetailsActions.SAVE_STEPS_COMPONENT_EFFECT({
              stepId: id,
            }),
          );
        }
      }),
    ),
  );

  closeAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providersDetailsActions.CLOSE_ALERT_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(providersDetailsSelectors.selectPreSelectedTab),
        this.store.select(providerSelectors.selectModeEdit),
      ),
      mergeMap(([action, preSelectedTab, modeEdit]) => {
        if (action.status) {
          if (!modeEdit) {
            // DOCS: ACCESSES WHEN FORM IS FOR NEW PROVIDER
            this.router.navigate([
              appRoutes.protected,
              appRoutes.catalogs.catalogs,
              appRoutes.catalogs.providers.providers,
              appRoutes.catalogs.providers.listProviders,
            ]);
            return of(RETURN_EMPTY());
          }
          if (preSelectedTab) {
            this.store.dispatch(providersDetailsActions.SET_TAB_SELECTED({tab: preSelectedTab}));
          }
          this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
          this.store.dispatch(providersDetailsActions.SET_PRESELECTED_TAB({preSelectedTab: null}));
          return of(providersDetailsActions.RESTORE_BACKUP_COMPONENT_EFFECT());
        } else {
          this.store.dispatch(providersDetailsActions.SET_PRESELECTED_TAB({preSelectedTab: null}));
          this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: true}));
          return of(RETURN_EMPTY());
        }
      }),
    ),
  );

  cancelHandler$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providersDetailsActions.CANCEL_HANDLER_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(providerSelectors.selectDiscardChanges)),
      mergeMap(([action, changes]) => {
        if (changes) {
          return of(providersDetailsActions.SHOW_CONFIRM_DIALOG({isEdit: true}));
        } else {
          return of(
            providersDetailsActions.CLOSE_ALERT_COMPONENT_EFFECT({
              status: true,
            }),
          );
        }
      }),
    ),
  );
  tabEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(providersDetailsActions.TAB_EFFECT),
        withLatestFrom(
          this.store.select(providerSelectors.selectEnableEdit),
          this.store.select(providerSelectors.selectDiscardChanges),
        ),
        mergeMap(([{tab}, enableEdit, hasChanges]) => {
          if (hasChanges && enableEdit) {
            // this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
            this.store.dispatch(providersDetailsActions.SHOW_CONFIRM_DIALOG({isEdit: true}));
            this.store.dispatch(providersDetailsActions.SET_PRESELECTED_TAB({preSelectedTab: tab}));
          } else {
            // DOCS: Solamente se quita el modo edición si está en modo edición
            if (enableEdit) {
              this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
            }
            this.store.dispatch(
              providersDetailsActions.SET_TAB_SELECTED({
                tab,
              }),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  trademarkCheckChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providersDetailsActions.TRADEMARK_CHECK_CHANGES),
      withLatestFrom(
        this.store.select(providerSelectors.selectEnableEdit),
        this.store.select(providerSelectors.selectDiscardChanges),
      ),
      mergeMap(([{option}, enableEdit, hasChanges]) => {
        if (enableEdit && hasChanges) {
          const dialogRef = this.dialog.open(
            ConfirmDialogComponent,
            buildDialogConfig({
              message: this.translateService.instant(
                'formProvider.step8.continueWithoutChangesMessage',
              ),
            }),
          );

          dialogRef.afterClosed().subscribe((value: boolean) => {
            if (value) {
              this.store.dispatch(trademarkProviderActions.RESTORE_TRADEMARK_BACKUP());
              this.store.dispatch(
                providersDetailsActions.SET_TRADEMARK_PAGE_BAR_OPTION({
                  option,
                }),
              );
              this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
            }
          });
          return of(RETURN_EMPTY());
        } else {
          return of(
            providersDetailsActions.SET_TRADEMARK_PAGE_BAR_OPTION({
              option,
            }),
          );
        }
      }),
    ),
  );

  // DOCS: EFFECT TO SHOW CONFIRM TO CANCEL EDITION OR SAVE DATA
  showConfirmDialog = createEffect(() =>
    this.actions$.pipe(
      ofType(providersDetailsActions.SHOW_CONFIRM_DIALOG),
      mergeMap(({isEdit}) => {
        const dialog = this.dialog.open(
          ConfirmDialogComponent,
          buildDialogConfig({
            message: isEdit
              ? this.translateService.instant('formProduct.general.titleModal')
              : this.translateService.instant('formProduct.general.updatePricesMessage'),
            greenText: !isEdit
              ? this.translateService.instant('formProduct.general.areYouSureToContinue')
              : '',
            onlyOneButton: false,
          }),
        );

        dialog.afterClosed().subscribe((value: boolean): void => {
          if (value) {
            if (isEdit) {
              this.store.dispatch(
                providersDetailsActions.CLOSE_ALERT_COMPONENT_EFFECT({status: value}),
              );
            } else {
              // DOCS: SAVE DATA FOR PURCHASE, SALE AND LICENSES SECTION
              this.store.dispatch(buySaleProviderActions.SAVE_PROVIDER_DATA_LOAD());
            }
          }
        });
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
