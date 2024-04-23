/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {PendingsComponent} from '@appComponents/pendings/pendings.component';

/* Guards Imports */
import {GeneralRouteGuard} from '@appGuards/core/general-route.guard';

/* Routes Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: PendingsComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.pendings.home,
            pathMatch: 'full',
          },
          {
            path: appRoutes.mails.mailbox,
            loadChildren: () => import('../mailbox/mailbox.module').then((m) => m.MailboxModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.quoter.quoter,
            loadChildren: () =>
              import('../quotation/quotation.module').then((m) => m.QuotationModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.attendInvestigation.attendInvestigation,
            loadChildren: () =>
              import(
                './new-product-existing-supplier/attend-investigation/attend-investigation.module'
              ).then((m) => m.AttendInvestigationModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.logisticConfiguration.logisticConfiguration,
            loadChildren: () =>
              import(
                './new-product-existing-supplier/logistic-configuration/logistic-configuration.module'
              ).then((m) => m.LogisticConfigurationModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.regulatoryResearch.regulatoryResearch,
            loadChildren: () =>
              import(
                './new-product-existing-supplier/regulatory-research/regulatory-research.module'
              ).then((m) => m.RegulatoryResearchModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.purchasingConfiguration.purchasingConfiguration,
            loadChildren: () =>
              import(
                './new-product-existing-supplier/purchasing-configuration/purchasing-configuration.module'
              ).then((m) => m.PurchasingConfigurationModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.salesConfiguration.salesConfiguration,
            loadChildren: () =>
              import(
                './new-product-existing-supplier/sales-configuration/sales-configuration.module'
              ).then((m) => m.SalesConfigurationModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.preProcessing.preProcess,
            loadChildren: () =>
              import('../pre-processing/pre-processing.module').then((m) => m.PreProcessingModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.pendings.home,
            loadChildren: () =>
              import('./pendings-home/pendings-home.module').then((m) => m.PendingsHomeModule),
          },
          {
            path: appRoutes.strategy.strategy,
            loadChildren: () => import('./strategy/strategy.module').then((m) => m.StrategyModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.notProcessed.notProcessed,
            loadChildren: () =>
              import('./not-processed/not-processed.module').then((m) => m.NotProcessedModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.validateAdjustment.validateAdjustment,
            loadChildren: () =>
              import('./validate-adjustment/validate-adjustment.module').then(
                (m) => m.ValidateAdjustmentModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.deliveryManager.deliveryManager,
            loadChildren: () =>
              import('./delivery-manager/delivery-manager.module').then(
                (m) => m.DeliveryManagerModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.dailyMeeting.dailyMeeting,
            loadChildren: () =>
              import('./daily-meeting/daily-meeting.module').then((m) => m.DailyMeetingModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.generalSummary.generalSummary,
            loadChildren: () =>
              import('../general-summary/general-summary.module').then(
                (m) => m.GeneralSummaryModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.checkout.checkout,
            loadChildren: () => import('./checkout/checkout.module').then((m) => m.CheckoutModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.closeOffer.closeOffer,
            loadChildren: () =>
              import('./close-offer/close-offer.module').then((m) => m.CloseOfferModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.offerAdjustment.offerAdjustment,
            loadChildren: () =>
              import('./offer-adjustment/offer-adjustment.module').then(
                (m) => m.OfferAdjustmentModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.purchasePromise.purchasePromise,
            loadChildren: () =>
              import('./purchase-promise/purchase-promise.module').then(
                (m) => m.PurchasePromiseModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.followPurchasePromise.followPurchasePromise,
            loadChildren: () =>
              import('./follow-purchase-promise/follow-purchase-promise.module').then(
                (m) => m.FollowPurchasePromiseModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.orderModification.orderModification,
            loadChildren: () =>
              import('./order-modification/order-modification.module').then(
                (m) => m.OrderModificationModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.changeNotice.changeNotices,
            loadChildren: () =>
              import('./change-notices/change-notices.module').then((m) => m.ChangeNoticesModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.processPurchase.orderPurchase,
            loadChildren: () =>
              import('./purchasing-manager/process-purchase/process-purchase.module').then(
                (m) => m.ProcessPurchaseModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.uploadInvoice.uploadInvoice,
            loadChildren: () =>
              import('./purchasing-manager/upload-invoice/upload-invoice.module').then(
                (m) => m.UploadInvoiceModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.attendNotArrived.attendNotArrived,
            loadChildren: () =>
              import('./purchasing-manager/attend-not-arrived/attend-not-arrived.module').then(
                (m) => m.AttendNotArrivedModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.planCollection.planCollection,
            loadChildren: () =>
              import('@purchasing-manager/plan-collection/plan-collection.module').then(
                (m) => m.PlanCollectionModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.secureShipment.secureShipment,
            loadChildren: () =>
              import('./purchasing-manager/secure-shipment/secure-shipment.module').then(
                (m) => m.SecureShipmentModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.registerConfirmation.registerConfirmation,
            loadChildren: () =>
              import(
                './purchasing-manager/register-confirmation/register-confirmation.module'
              ).then((m) => m.RegisterConfirmationModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.confirmDispatch.confirmDispatch,
            loadChildren: () =>
              import('./purchasing-manager/confirm-dispatch/confirm-dispatch.module').then(
                (m) => m.ConfirmDispatchModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.checkOcNotArrived.checkOcNotArrived,
            loadChildren: () =>
              import('./purchasing-manager/check-oc-not-arrived/check-oc-not-arrived.module').then(
                (m) => m.CheckOcNotArrivedModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.manageBackOrder.manageBackOrder,
            loadChildren: () =>
              import('./purchasing-manager/manage-back-order/manage-back-order.module').then(
                (m) => m.ManageBackOrderModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.declareArrival.declareArrival,
            loadChildren: () =>
              import('./purchasing-manager/declare-arrival/declare-arrival.module').then(
                (m) => m.DeclareArrivalModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.dispatchMonitoring.dispatchMonitoring,
            loadChildren: () =>
              import('./purchasing-manager/dispatch-monitoring/dispatch-monitoring.module').then(
                (m) => m.DispatchMonitoringModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.registerArrival.registerArrival,
            loadChildren: () =>
              import('./purchasing-manager/register-arrival/register-arrival.module').then(
                (m) => m.RegisterArrivalModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.planDispatch.planDispatch,
            loadChildren: () =>
              import('./imports/plan-dispatch/plan-dispatch.module').then(
                (m) => m.PlanDispatchModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.loadMissing.loadMissing,
            loadChildren: () =>
              import('./imports/load-missing/load-missing.module').then((m) => m.LoadMissingModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.registerDispatch.registerDispatch,
            loadChildren: () =>
              import('./imports/register-dispatch/register-dispatch.module').then(
                (m) => m.RegisterDispatchModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.attendReview.attendReview,
            loadChildren: () =>
              import('./charges/attend-review/attend-review.module').then(
                (m) => m.AttendReviewModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.attendReview.results,
            loadChildren: () =>
              import('./charges/review-results/review-results.module').then(
                (m) => m.ReviewResultsModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.executeCollection.executeCollection,
            loadChildren: () =>
              import('./charges/execute-collection/execute-collection.module').then(
                (m) => m.ExecuteCollectionModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.manageAdvancePayment.manageAdvancePayment,
            loadChildren: () =>
              import('./charges/manage-advance-payment/manage-advance-payment.module').then(
                (m) => m.ManageAdvancePaymentModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.rebill.rebill,
            loadChildren: () =>
              import('./charges/attend-review/attend-review-details/rebill/rebill.module').then(
                (m) => m.RebillModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.indirectPayment.indirectPayment,
            loadChildren: () =>
              import('./payment-manager/indirect-payment/indirect-payment.module').then(
                (m) => m.IndirectPaymentModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.attendReviewPayment.attendReviewPayment,
            loadChildren: () =>
              import('./payment-manager/attend-review-payment/attend-review-payment.module').then(
                (m) => m.AttendReviewPaymentModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.executePayment.executePayment,
            loadChildren: () =>
              import('./payment-manager/execute-payment/execute-payment.module').then(
                (m) => m.ExecutePaymentModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.paymentOrder.paymentOrder,
            loadChildren: () =>
              import('./payment-manager/payment-order/payment-order.module').then(
                (m) => m.PaymentOrderModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.collectionMonitoring.collectionMonitoring,
            loadChildren: () =>
              import('./charges/collection-monitoring/collection-monitoring.module').then(
                (m) => m.CollectionMonitoringModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.declareTransitArrival.declareTransitArrival,
            loadChildren: () =>
              import('./imports-phs/declare-transit-arrival/declare-transit-arrival.module').then(
                (m) => m.DeclareTransitArrivalModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.uploadReceipt.uploadReceipt,
            loadChildren: () =>
              import('./imports-phs/upload-receipt/upload-receipt.module').then(
                (m) => m.UploadReceiptModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.controlMaterialDelivery.controlMaterialDelivery,
            loadChildren: () =>
              import(
                './imports-phs/control-material-delivery/control-material-delivery.module'
              ).then((m) => m.ControlMaterialDeliveryModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.shipping.shipping,
            loadChildren: () =>
              import('./assorting-manager/shipping/shipping.module').then((m) => m.ShippingModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.shipping.paidByCustomer,
            loadChildren: () =>
              import(
                './assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer.module'
              ).then((m) => m.ShippingPaidByCustomerModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.warehouse.warehouse,
            loadChildren: () =>
              import('./assorting-manager/warehouse/warehouse.module').then(
                (m) => m.WarehouseModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.declareArrivalGuide.declareArrivalGuide,
            loadChildren: () =>
              import('./material-receiver/declare-arrival-guide/declare-arrival-guide.module').then(
                (m) => m.DeclareArrivalGuideModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.priorityConsole.priorityConsole,
            loadChildren: () =>
              import('./operations-manager/priority-console/priority-console.module').then(
                (m) => m.PriorityConsoleModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.shipping.console,
            loadChildren: () =>
              import('./operations-manager/shipping-console/shipping-console.module').then(
                (m) => m.ShippingConsoleModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.quarantineManager.quarantineManager,
            loadChildren: () =>
              import('./resource-manager/quarantine-manager/quarantine-manager.module').then(
                (m) => m.QuarantineManagerModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.workArrivalDocuments.workArrivalDocuments,
            loadChildren: () =>
              import('./work-arrival-documents/work-arrival-documents.module').then(
                (m) => m.WorkArrivalDocumentsModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.productToClaim.productToClaim,
            loadChildren: () =>
              import('./product-to-claim/product-to-claim/product-to-claim.module').then(
                (m) => m.ProductToClaimModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.loadBalanceInFavor.loadBalanceInFavor,
            loadChildren: () =>
              import('./load-balance-in-favor/load-balance-in-favor.module').then(
                (m) => m.LoadBalanceInFavorModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.eventConsole.eventConsole,
            loadChildren: () =>
              import('./event-console/event-console.module').then((m) => m.EventConsoleModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.controlSupplierClaim.controlSupplierClaim,
            loadChildren: () =>
              import(
                './product-to-claim/control-supplier-claim/control-supplier-claim.module'
              ).then((m) => m.ControlSupplierClaimModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.guideClient.guideClient,
            loadChildren: () =>
              import('./guide-client/guide-client/guide-client.module').then(
                (m) => m.GuideClientModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.orderStoppedByCredit.orderStoppedByCredit,
            loadChildren: () =>
              import('./order-stopped-by-credit/order-stopped-by-credit.module').then(
                (m) => m.OrderStoppedByCreditModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.inspector.inspector,
            loadChildren: () =>
              import('./storer/inspector/inspector.module').then((m) => m.InspectorModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },

          {
            path: appRoutes.packaging.packaging,
            loadChildren: () =>
              import('./storer/packaging/packaging.module').then((m) => m.PackagingModule),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
          {
            path: appRoutes.securityGuard.securityGuard,
            loadChildren: () =>
              import('./storer/security-guard/security-guard.module').then(
                (m) => m.SecurityGuardModule,
              ),
            canLoad: [GeneralRouteGuard],
            canActivate: [GeneralRouteGuard],
          },
        ],
      },
    ]),
  ],
})
export class PendingsRoutingModule {}
