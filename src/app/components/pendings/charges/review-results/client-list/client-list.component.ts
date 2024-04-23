import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {PAGING_LIMIT} from '@appUtil/common.protocols';
/*Selector Imports*/
import * as selectors from '@appSelectors/pendings/charges/review-results/review-results.selectors';
import {reviewResultsListSelectors} from '@appSelectors/pendings/charges/review-results';
/*Actions Imports*/
import {reviewResultsListActions} from '@appActions/pendings/charges/review-results';

/*Models Imports*/
import {ResultadosRevisionTotales, VRevisionFactura} from 'api-finanzas';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IReviewInvoice} from '@appModels/store/pendings/charges/review-results/review-results-list/review-results-list.models';
import {IChip} from '@appModels/chip/chip';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  tabs$: Observable<Array<ITabOption>> = this.store.select(selectors.selectTabs);
  tab$: Observable<ITabOption> = this.store.select(selectors.selectedTab);
  reviews$: Observable<Array<IReviewInvoice>> = this.store.select(
    reviewResultsListSelectors.selectReviews,
  );
  isLoading$: Observable<boolean> = this.store.select(
    reviewResultsListSelectors.selectIsLoadingApi,
  );
  listChip$: Observable<Array<IChip>> = this.store.select(
    reviewResultsListSelectors.selectListChip,
  );
  activePop$: Observable<boolean> = this.store.select(reviewResultsListSelectors.selectIsShowPop);
  reviewCustomer$: Observable<IReviewInvoice> = this.store.select(
    reviewResultsListSelectors.selectReviewCustomer,
  );
  totals$: Observable<ResultadosRevisionTotales> = this.store.select(
    reviewResultsListSelectors.selectTotals,
  );
  reviewsScroller: Array<IReviewInvoice> = [];
  activePopP = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchReviews(true);
    this.store.dispatch(reviewResultsListActions.GET_TOTALS_LOAD());
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const reviews: Array<VRevisionFactura> = await lastValueFrom(
      this.store.pipe(select(reviewResultsListSelectors.selectReviews), take(1)),
    );
    if (event.endIndex !== reviews.length - 1) {
      return;
    }
    const listStatus = await lastValueFrom(
      this.store.pipe(select(reviewResultsListSelectors.selectIsLoadingApi), take(1)),
    );
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(reviewResultsListSelectors.selectTotalReviews), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(reviewResultsListSelectors.selectCurrentPage), take(1)),
    );
    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;

      if (currentPage > totalPages || reviews.length > currentTotal || listStatus) {
        return;
      }
      this.fetchReviews(false);
    }
  }

  fetchReviews(isFirstPage: boolean): void {
    this.store.dispatch(reviewResultsListActions.FETCH_REVIEWS_LOAD({isFirstPage}));
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(reviewResultsListActions.SET_OPTION_TAB({tab}));
  }

  setChip(chip: IChip): void {
    this.store.dispatch(reviewResultsListActions.SELECTED_OPTION_CHIP({chip}));
  }

  statusPopUp(isShow: boolean): void {
    this.store.dispatch(reviewResultsListActions.SET_STATUS_POP_UP({isShow}));
  }

  selectedReviewC(customer: IReviewInvoice): void {
    this.store.dispatch(reviewResultsListActions.SELECTED_CUSTOMER({customer}));
  }

  emitPopUp(value): void {
    this.statusPopUp(false);
    if (value) {
      this.store.dispatch(reviewResultsListActions.PRINT_TO_REVIEW_LOAD());
    }
  }
}
