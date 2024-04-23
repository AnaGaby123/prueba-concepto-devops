import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {
  attendInvestigationActions,
  attendInvestigationAddProductActions,
  attendInvestigationDetailsActions,
  attendInvestigationListActions,
} from '@appActions/pendings/attend-investigation';
import {map, mergeMap, withLatestFrom} from 'rxjs/operators';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {appRoutes} from '@appHelpers/core/app-routes';
import {of} from 'rxjs';
import {attendInvestigationDetailsSelectors} from '@appSelectors/pendings/attend-investigation';
import {initialProductDetails} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {isEqual} from 'lodash-es';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '@appComponents/shared/confirm-dialog/confirm-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class AttendInvestigationMethodsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  //DOCS: INICIALIZADOR DEL COMPONENTE DASHBOARD
  ngOnInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationListActions.INIT_ATTEND_INVESTIGATION_DASHBOARD_COMPONENT_EFFECT),
      map(() => {
        this.store.dispatch(attendInvestigationActions.SET_DETAILS_MODE({detailsMode: false}));
        this.store.dispatch(attendInvestigationListActions.SET_ACTIVE_CHART({active: true}));
        return attendInvestigationListActions.FETCH_ATTEND_INVESTIGATION_DASHBOARD_TABS_TOTALS_INIT();
      }),
    ),
  );

  //DOCS: REDIRECCIONAR A LA PANTALLA DE DETALLES
  viewDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsActions.SET_PROVIDER),
      mergeMap(() => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        this.router
          .navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.attendInvestigation.attendInvestigation,
            appRoutes.attendInvestigation.details,
          ])
          .then(() => {
            this.store.dispatch(
              attendInvestigationActions.SET_DETAILS_MODE({
                detailsMode: true,
              }),
            );
            this.store.dispatch(attendInvestigationListActions.SET_ACTIVE_CHART({active: false}));
          });
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS: EFFECT TO SHOW CONFIRM DIALOG FOR DISCARD CHANGES
  showConfirmDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationAddProductActions.SHOW_CONFIRM_DIALOG),
      withLatestFrom(this.store.select(attendInvestigationDetailsSelectors.selectProduct)),
      mergeMap(([action, prodctDetails]) => {
        if (!isEqual(prodctDetails, initialProductDetails())) {
          const dialogRef = this.dialog.open(
            ConfirmDialogComponent,
            buildDialogConfig({
              message: this.translateService.instant('formProduct.general.titleModal'),
            }),
          );

          dialogRef.afterClosed().subscribe((value: boolean) => {
            if (value) {
              this.location.back();
            }
            this.store.dispatch(
              attendInvestigationAddProductActions.HANDLE_OPEN_ALERT_POP({value: false}),
            );
          });
        } else {
          this.location.back();
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
