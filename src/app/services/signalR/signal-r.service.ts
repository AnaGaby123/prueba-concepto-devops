import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import * as pendingsActions from '@appActions/pendings/pendings.actions';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '@env/environment';
import {pengingsCounter, synchronizersSignalR} from '@appModels/store/utils/utils.model';
import {Connection, hubConnection, Proxy} from 'signalr-asp-net';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  /**
   * Url de conexión al servidor con signalR.
   * Toma la url según el ambiente en el que se está ejecutando.
   **/
  connection: Connection = hubConnection(`${environment.serverUrl}/logistica/signalr/hubs`, {
    logging: true,
  });
  proquifaNetHubProxy: Proxy = this.connection.createHubProxy('proquifaNetHub');
  private mailbox = new BehaviorSubject<number>(0); // contador en buzones
  private quoter = new BehaviorSubject<number>(0); // contador en cotizar lo cotizable
  private strategy = new BehaviorSubject<number>(0); // contador en atender cierre
  private dailyMeeting = new BehaviorSubject<number>(0); // contador en junta diaria
  private closeOffer = new BehaviorSubject<number>(0); // contador en cerrar oferta
  private offerAdjustment = new BehaviorSubject<number>(0); // contador en ajustar oferta
  private followPurchasePromise = new BehaviorSubject<number>(0); // contado en seguimiento a promesa
  private purchasePromise = new BehaviorSubject<number>(0); // contador en promesa de compra
  private preProcess = new BehaviorSubject<number>(0); // contador en pretramitar
  private notProcessed = new BehaviorSubject<number>(0); // contador en intramitable
  private generalSummary = new BehaviorSubject<number>(0); // contador en resumen general
  private validateAdjustment = new BehaviorSubject<number>(0); // contador en validar ajuste
  private checkout = new BehaviorSubject<number>(0); // contador en tramitar pedido
  private attendInvestigation = new BehaviorSubject<number>(0); // contador en atender investigación
  private regulatoryResearch = new BehaviorSubject<number>(0); // contador en determinar familia
  private purchasingConfiguration = new BehaviorSubject<number>(0); // contador en determinar costo de venta
  private logisticConfiguration = new BehaviorSubject<number>(0); // contador en determinar riempo logistico
  private salesConfiguration = new BehaviorSubject<number>(0); // contador en determinar rentabilidad

  constructor(private store: Store<AppState>) {}
  startConnection() {
    // DOCS: Sincronizadores de pendientes
    this.proquifaNetHubProxy.on(synchronizersSignalR.mailbox, () =>
      this.store.dispatch(pendingsActions.UPDATE_MAILBOX_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.quoter, () =>
      this.store.dispatch(pendingsActions.UPDATE_QUOTER_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.strategy, () =>
      this.store.dispatch(pendingsActions.UPDATE_ATTEND_CLOSING_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.closeOffer, () =>
      this.store.dispatch(pendingsActions.UPDATE_CLOSE_OFFER_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.dailyMeeting, () =>
      this.store.dispatch(pendingsActions.UPDATE_DAILY_MEETING_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.followPurchasePromise, () =>
      this.store.dispatch(pendingsActions.UPDATE_FOLLOW_PURCHASE_PROMISE_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.preProcess, () =>
      this.store.dispatch(pendingsActions.UPDATE_PRE_PROCESS_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.notProcessed, () =>
      this.store.dispatch(pendingsActions.UPDATE_NOT_PROCESSED_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.checkout, () =>
      this.store.dispatch(pendingsActions.UPDATE_CHECKOUT_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.purchasePromise, () =>
      this.store.dispatch(pendingsActions.UPDATE_PURCHASE_PROMISE_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.offerAdjustment, () =>
      this.store.dispatch(pendingsActions.UPDATE_OFFER_ADJUSTMENT_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.validateAdjustment, () =>
      this.store.dispatch(pendingsActions.UPDATE_VALIDATE_ADJUSTMENT_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.attendInvestigation, () =>
      this.store.dispatch(pendingsActions.UPDATE_ATTEND_INVESTIGATION_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.salesConfiguration, () =>
      this.store.dispatch(pendingsActions.UPDATE_SALES_CONFIGURATION_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.purchasingConfiguration, () =>
      this.store.dispatch(pendingsActions.UPDATE_PURCHASING_CONFIGURATION_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.regulatoryResearch, () =>
      this.store.dispatch(pendingsActions.UPDATE_REGULATORY_RESEARCH_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.logisticConfiguration, () =>
      this.store.dispatch(pendingsActions.UPDATE_LOGISTIC_CONFIGURATION_COUNTER()),
    );
    this.proquifaNetHubProxy.on(synchronizersSignalR.generalSummary, () =>
      this.store.dispatch(pendingsActions.UPDATE_GENERAL_SUMMARY_COUNTER()),
    );

    // DOCS: Contadores de pendientes
    this.proquifaNetHubProxy.on(pengingsCounter.mailbox, (response) => this.mailbox.next(response));
    this.proquifaNetHubProxy.on(pengingsCounter.quoter, (response) => this.quoter.next(response));
    this.proquifaNetHubProxy.on(pengingsCounter.strategy, (response) =>
      this.strategy.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.closeOffer, (response) =>
      this.closeOffer.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.dailyMeeting, (response) =>
      this.dailyMeeting.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.followPurchasePromise, (response) =>
      this.followPurchasePromise.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.preProcess, (response) =>
      this.preProcess.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.notProcessed, (response) =>
      this.notProcessed.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.purchasePromise, (response) =>
      this.purchasePromise.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.validateAdjustment, (response) =>
      this.validateAdjustment.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.checkout, (response) =>
      this.checkout.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.offerAdjustment, (response) =>
      this.offerAdjustment.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.attendInvestigation, (response) => {
      this.attendInvestigation.next(response);
    });
    this.proquifaNetHubProxy.on(pengingsCounter.salesConfiguration, (response) =>
      this.salesConfiguration.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.purchasingConfiguration, (response) =>
      this.purchasingConfiguration.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.regulatoryResearch, (response) =>
      this.regulatoryResearch.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.logisticConfiguration, (response) =>
      this.logisticConfiguration.next(response),
    );
    this.proquifaNetHubProxy.on(pengingsCounter.generalSummary, (response) =>
      this.generalSummary.next(response),
    );

    this.connection.start().done(() => {
      console.log('Now connected, connection ID=' + this.connection.id);
      this.store.dispatch(pendingsActions.INIT_INVOKE_PENDINGS());
    });
  }
  stopConnection() {
    this.connection.stop();
  }
  getMailboxCounter(): Observable<number> {
    return this.mailbox.asObservable();
  }
  getQuoterCounter(): Observable<number> {
    return this.quoter.asObservable();
  }
  getAttendCloserCounter(): Observable<number> {
    return this.strategy.asObservable();
  }
  getDailyMeetingCounter(): Observable<number> {
    return this.dailyMeeting.asObservable();
  }
  getCloseOfferCounter(): Observable<number> {
    return this.closeOffer.asObservable();
  }
  getOfferAdjustmentCounter(): Observable<number> {
    return this.offerAdjustment.asObservable();
  }
  getFollowPurchasePromiseCounter(): Observable<number> {
    return this.followPurchasePromise.asObservable();
  }
  getPurchasePromiseCounter(): Observable<number> {
    return this.purchasePromise.asObservable();
  }
  getPreProcessCounter(): Observable<number> {
    return this.preProcess.asObservable();
  }
  getNotProcessedCounter(): Observable<number> {
    return this.notProcessed.asObservable();
  }
  getGeneralSummaryCounter(): Observable<number> {
    return this.generalSummary.asObservable();
  }
  getValidateAdjustmentCounter(): Observable<number> {
    return this.validateAdjustment.asObservable();
  }
  getCheckoutCounter(): Observable<number> {
    return this.checkout.asObservable();
  }
  getAttendInvestigationCounter(): Observable<number> {
    return this.attendInvestigation.asObservable();
  }
  getRegulatoryResearchCounter(): Observable<number> {
    return this.regulatoryResearch.asObservable();
  }
  getPurchasingConfigurationCounter(): Observable<number> {
    return this.purchasingConfiguration.asObservable();
  }
  getLogisticConfigurationCounter(): Observable<number> {
    return this.logisticConfiguration.asObservable();
  }
  getSalesConfigurationCounter(): Observable<number> {
    return this.salesConfiguration.asObservable();
  }
}
