/* Core Imports */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {isEmpty} from 'lodash-es';
/* Models Imports */
import {AppState} from '@appCore/core.state';
import {ClientsListItemForQuotation} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {ICard} from '@appModels/card/card';

/*Actions Imports */
import {
  quotationActions,
  quotationDetailsActions,
  totalQuotePdfActions,
} from '@appActions/quotation';

/* Selectors Imports */
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {IQuotation} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {appRoutes} from '@appHelpers/core/app-routes';
import {CatQuotationState} from '@appHelpers/pending/quotation/quotation.helpers';
import {CatEstadoCotizacion} from 'api-catalogos';

/* Tools Imports */

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  selectedClient$: Observable<ClientsListItemForQuotation> = this.store.select(
    quotationDetailsSelectors.selectedClient,
  );
  selectedQuotation$: Observable<IQuotation> = this.store.select(
    quotationDetailsSelectors.selectedQuotation,
  );
  quotationsList$: Observable<Array<ICard>> = this.store.select(
    quotationDetailsSelectors.selectQuotationsListForCards,
  );
  isNewContactPopUpOpen$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsLinkNewContactOpen,
  );
  isNewAddContactPopUpOpen$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsLinkAddNewContactOpen,
  );
  isNewAddContactPopUpSuccess$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectIsLinkAddNewContactSuccess,
  );
  selectedQuotationStatus$: Observable<CatEstadoCotizacion> = this.store.select(
    quotationDetailsSelectors.selectedQuotationStatus,
  );
  totalSentQuotations: Observable<number> = this.store.select(
    quotationDetailsSelectors.totalSentQuotations,
  );
  selectedTotalItems$: Observable<number> = this.store.select(
    quotationDetailsSelectors.selectedTotalItems,
  );
  readonly catQuotationState = CatQuotationState;
  lodashIsEmpty = isEmpty;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(quotationActions.HIDDE_BACK({hiddeBack: false}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(quotationActions.HIDDE_BACK({hiddeBack: true}));
  }

  handleOptionSelected(option: ICard): void {
    this.store.dispatch(
      quotationDetailsActions.SET_SELECTED_QUOTATION({
        quotationId: option.value,
      }),
    );
  }

  onClickViewQuotationPdf(): void {
    this.store.dispatch(
      totalQuotePdfActions.NAVIGATE_TO_PDF_OF_SELECTED_QUOTATION_INIT_EFFECT({
        isLinkedQuote: false,
        quotation: null,
        navigate: true,
      }),
    );
  }

  redirectToCheckout(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.quoter.quoter,
      appRoutes.quoter.details,
      appRoutes.quoter.saved,
    ]);
  }
}
