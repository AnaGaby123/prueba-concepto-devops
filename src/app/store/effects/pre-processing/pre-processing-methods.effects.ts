import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {
  preProcessDetailsActions,
  preProcessingActions,
  preProcessOrderDashboardActions,
} from '@appActions/pre-processing';
import {
  GET_CAT_ESTADO_COTIZACION,
  GET_CAT_MONEDA_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {preProcessOrderDetailsSelectors} from '@appSelectors/pre-processing';
import {EMPTY} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AvailabilityLettersDialogComponent} from '@appComponents/shared/availability-letters-dialog/availability-letters-dialog.component';
import {availabilityActions} from '@appActions/dialogs';
import {AvailabilityLetterData} from '@appModels/store/dialogs/availability-letter/availability-letter.model';

@Injectable()
export class PreProcessingMethodsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  //DOCS: INICIALIZADOR DEL COMPONENTE DASHBOARD PRETRAMITAR PEDIDO
  ngOnInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(preProcessOrderDashboardActions.INIT_PRE_PROCESSING_DASHBOARD_COMPONENT_EFFECT),
      map(() => {
        this.store.dispatch(preProcessOrderDashboardActions.FETCH_TOTAL_TABS_LOAD());
        this.store.dispatch(preProcessOrderDashboardActions.FETCH_CLIENTS_LOAD());
        this.store.dispatch(GET_CAT_MONEDA_LOAD());
        this.store.dispatch(GET_CAT_ESTADO_COTIZACION());
        return preProcessingActions.SET_DETAILS_COMPONENT({
          detailsComponent: false,
        });
      }),
    ),
  );

  //DOCS: REGRESAR LA ORDEN ACTUAL A LA LISTA DE ORDENES DE COMPRA (VISTA DETALLES)
  returnSelectedOrden$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(preProcessDetailsActions.RETURN_ORDER_SELECTED_TO_LIST),
        withLatestFrom(this.store.select(preProcessOrderDetailsSelectors.selectOrderSelected)),
        mergeMap(([{item, index}, selectedOrder]) => {
          ///DOCS: REGRESAR LA ORDEN ACTUAL A LA LISTA
          this.store.dispatch(preProcessDetailsActions.SET_PURCHASE_ORDER_BACKUP({selectedOrder}));

          //DOCS: SELECCIONAR LA NUEVA ORDEN AL NODO PurchaseOrderSelected
          this.store.dispatch(preProcessDetailsActions.SET_PURCHASE_ORDER_SELECTED({item, index}));

          this.router.navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.preProcessing.preProcess,
            appRoutes.preProcessing.orderDetails,
          ]);

          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  //DOCS: VALIDAR SI LA ORDEN DE COMPRA TIENE PARTIDAS CONTROLADAS

  validateItemsControlled$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(preProcessDetailsActions.VALIDATE_ITEMS_ORDER_CONTROLLED),
        withLatestFrom(
          this.store.select(preProcessOrderDetailsSelectors.selectTotalControlledEntries),
          this.store.select(preProcessOrderDetailsSelectors.selectOrderSelected),
        ),
        mergeMap(([action, totalProductControlled, selectedOrder]) => {
          if (totalProductControlled) {
            //DOCS: MOSTRAR POP UP DE CONTROLADOS
            const dialogRef = this.dialog.open(AvailabilityLettersDialogComponent, {
              backdropClass: 'mat-dialog-background',
              data: {
                idPedido: selectedOrder.IdPPPedido,
                inPreprocess: true,
                onlyOneButton: false,
              } as AvailabilityLetterData,
              panelClass: 'mat-dialog-style',
            });

            dialogRef.afterClosed().subscribe((value: boolean) => {
              if (value) {
                this.store.dispatch(preProcessDetailsActions.PROCESS_ENTRIES_LOAD());
              }
              this.store.dispatch(availabilityActions.SET_INITIAL_STATE());
            });
          } else {
            //DOCS: EJEUCTAR LA TRANSACCIÓN DE TRAMITAR
            this.store.dispatch(preProcessDetailsActions.PROCESS_ENTRIES_LOAD());
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
