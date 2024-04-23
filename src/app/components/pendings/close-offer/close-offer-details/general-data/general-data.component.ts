import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Models
import {ICard} from '@appModels/card/card';
import {ClientsListItemForCloseOffer} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {
  IClientTotals,
  IQuotation,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';

// Actions
import {closeOfferDetailsActions} from '@appActions/pendings/close-offer';

// Selectors
import {closeOfferDetailsSelector} from '@appSelectors/pendings/close-offer';

// Utils
import {RESPONSIVE_MENU_WIDTH_LIMIT} from '@appUtil/common.protocols';
import {Observable} from 'rxjs';
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
})
export class GeneralDataComponent implements OnInit {
  client$: Observable<ClientsListItemForCloseOffer> = this.store.select(
    closeOfferDetailsSelector.selectClient,
  );
  clientTotals$: Observable<IClientTotals> = this.store.select(
    closeOfferDetailsSelector.selectClientTotals,
  );
  quotesForCards$: Observable<Array<ICard>> = this.store.select(
    closeOfferDetailsSelector.selectQuotesForTabs,
  );
  quote$: Observable<IQuotation> = this.store.select(closeOfferDetailsSelector.selectedQuote);
  percentageBarTotal$: Observable<Array<IPercentageBarItems>> = this.store.select(
    closeOfferDetailsSelector.selectPercentagesBar,
  );

  leftContainerIsOpen;
  viewType = 'iPad';
  actualRoute: string;
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();

  @HostListener('window:resize')
  onResize(): void {
    this.viewType = window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? 'iPad' : 'macBookAir';
  }

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.onResize();
    this.leftContainerIsOpen = this.viewType !== 'iPad';
    this.getRoute();
  }

  handleLeftContainer(): void {
    this.leftContainerIsOpen = !this.leftContainerIsOpen;
  }

  getRoute(): void {
    const route = this.router.url.split('/');
    this.actualRoute = route[route.length - 1];
  }

  selectQuote(selectedCard: ICard): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_SELECTED_QUOTE({
        quoteId: selectedCard.value,
      }),
    );
  }
  downloadQuotation(): void {
    this.store.dispatch(closeOfferDetailsActions.SET_LOAD_QUOTATION_FILE());
  }
}
