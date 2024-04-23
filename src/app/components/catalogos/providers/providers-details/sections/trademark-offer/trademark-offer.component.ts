import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {providersDetailsSelectors} from '@appSelectors/forms/providers';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  providerActions,
  providersDetailsActions,
  trademarkProviderActions,
} from '@appActions/forms/providers';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {OptionBar} from '@appModels/options-bar/options-bar';

@Component({
  selector: 'app-trademark-offer',
  templateUrl: './trademark-offer.component.html',
  styleUrls: ['./trademark-offer.component.scss'],
})
export class TrademarkOfferComponent implements OnDestroy {
  isInTrademarkPage$: Observable<boolean> = this.store.select(
    providersDetailsSelectors.selectIsInTrademarkPage,
  );
  trademarkPageBarOptions$: Observable<Array<OptionBar>> = this.store.select(
    providersDetailsSelectors.selectTrademarkPageBarOptions,
  );
  alertPop$: Observable<boolean> = this.store.select(
    providersDetailsSelectors.selectTradeMarkOfferAlertPop,
  );
  viewType$: Observable<string> = this.store.select(selectViewType);

  readonly viewTypes = AppViewTypes;
  preselectedOption: OptionBar;

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(trademarkProviderActions.CLEAN_TRADEMARK_OFFER_STATE());
    this.store.dispatch(providersDetailsActions.INIT_TRADEMARK_PAGE_BAR_OPTIONS());
  }

  changeOptionBar(): void {
    this.store.dispatch(
      providersDetailsActions.SET_TRADEMARK_PAGE_BAR_OPTION({
        option: this.preselectedOption,
      }),
    );
    this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
    this.preselectedOption = null;
  }

  handleOptionSelected(option: OptionBar): void {
    this.store.dispatch(providersDetailsActions.TRADEMARK_CHECK_CHANGES({option}));
  }

  handleClosePop(value: boolean): void {
    this.store.dispatch(providersDetailsActions.TRADEMARK_OFFER_ALERT_POP({active: false}));
    if (value) {
      this.changeOptionBar();
    }
  }
}
