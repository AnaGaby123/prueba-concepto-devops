import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SignalRService} from '@appServices/signalR/signal-r.service';

import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {selectToken} from '@appSelectors/auth/auth.selectors';
import {EMPTY} from 'rxjs';
import * as pendingsActions from '@appActions/pendings/pendings.actions';
import {selectMainMenuOptionsByUserPermissions} from '@appSelectors/utils/utils.selectors';
import {
  actionsMenuCounter,
  IMenuOption,
  pendingsKeys,
  updatePendingsCounter,
} from '@appModels/store/utils/utils.model';
import {forEach, isEmpty} from 'lodash-es';

@Injectable()
export class PendingsCounterEffects {
  private ActionsMenuCounter = actionsMenuCounter;
  constructor(private store: Store, private action$: Actions, private signalR: SignalRService) {}

  /**
   * Inicializador de invocadores de contadores de pendientes.
   * Recibe el arreglo de opciones del menú para la sesión actual y dispara las acciones
   * para invocar solo los contadores de las secciones que puede ver.
   **/
  initInvokePendings$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.INIT_INVOKE_PENDINGS),
        withLatestFrom(this.store.select(selectMainMenuOptionsByUserPermissions)),
        mergeMap(([action, menuOptions]) => {
          forEach(menuOptions, (o: IMenuOption) => {
            if (o.options && !isEmpty(o.options)) {
              forEach(o.options, (it: IMenuOption) => {
                const action = this.ActionsMenuCounter[it.key];
                if (action) {
                  this.store.dispatch(pendingsActions[action]());
                }
              });
            }
          });
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtiene el contador de buzón
  updateMailboxCounter$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_MAILBOX_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.mailbox;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtiene el contador de cotizar lo cotizable
  updateQuoteCounter$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_QUOTER_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.quoter;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Obtiene el contador de atender cierre
  updateAttendCloserCounter$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_ATTEND_CLOSING_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.strategy;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Obtiene el contador de junta diaria
  updateDailyMeetingCounter$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_DAILY_MEETING_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.dailyMeeting;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }

          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  //DOCS: obtener el contador de cerrar oferta
  updateCloseOfferCounter$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_CLOSE_OFFER_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.closeOffer;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Obtener contador de seguimiento a promesa
  updateFollowPurchasePromise$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_FOLLOW_PURCHASE_PROMISE_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.followPurchasePromise;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contador de promesa de compra
  updatePurchasePromise$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_PURCHASE_PROMISE_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.purchasePromise;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contador de pretramitar pedido
  updatePreProcess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_PRE_PROCESS_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.preProcess;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contador de gestionar pedido intramitable
  updateNotProcessed$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_NOT_PROCESSED_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.notProcessed;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contador de validar ajuste a la OC
  updateValidateAdjustment$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_VALIDATE_ADJUSTMENT_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          if (hasOptionEnable(menuOptions, 'validateAdjustment')) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter.validateAdjustment, token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contador de tramitar pedido
  updateCheckOut$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_CHECKOUT_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.checkout;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contador de ajustar oferta
  updateOfferAdjustment$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_OFFER_ADJUSTMENT_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.offerAdjustment;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contador de Determinar costo de venta
  updatePurchasingConfiguration$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_PURCHASING_CONFIGURATION_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.purchasingConfiguration;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contador de Determinar tiempo logistico
  updatelogisticConfiguration$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_LOGISTIC_CONFIGURATION_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.logisticConfiguration;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contador de Determinar rentabilidad
  updateSalesConfiguration$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_SALES_CONFIGURATION_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.salesConfiguration;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contador de Determinar familia
  updateRegulatoryResearch$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_REGULATORY_RESEARCH_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.regulatoryResearch;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contador de Atender investigacion
  updateAttendInvestigation$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_ATTEND_INVESTIGATION_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.attendInvestigation;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Obtener contados de resumen general
  updateGeneralSummary$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(pendingsActions.UPDATE_GENERAL_SUMMARY_COUNTER),
        withLatestFrom(
          this.store.select(selectToken),
          this.store.select(selectMainMenuOptionsByUserPermissions),
        ),
        mergeMap(([action, token, menuOptions]) => {
          const pendingKey = pendingsKeys.generalSummary;
          if (hasOptionEnable(menuOptions, pendingKey)) {
            this.signalR.proquifaNetHubProxy
              .invoke(updatePendingsCounter[pendingKey], token.access_token)
              .then(() => {});
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}

/**
 * Valida si el usuario puede acceder una sección del sistema para permitir escuchar un evento del servidor de signalR.
 * @options: Recibe el arreglo de opciones del menú de tipo IMenuOption
 * @KeyName: Clave del nombre de la sección. Debe ser el mismo que se encuentra en la propiedad Key del módulo
 * en el JSON "functions_structure"
 **/
const hasOptionEnable = (options: Array<IMenuOption>, keyName: string): boolean => {
  let enabled = false;
  forEach(options, (o: IMenuOption) => {
    if (!isEmpty(o.options)) {
      forEach(o.options, (it: IMenuOption) => {
        enabled = it.key && it.key === keyName;
        if (enabled) {
          return false;
        }
      });
    }
    if (enabled) {
      return false;
    }
  });
  return enabled;
};
