/* Core Imports */
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/* Actions */
import {dailyMeetingDetailsActions} from '@appActions/pendings/daily-meeting';

/*  Selectors Imports  */
import {dailyMeetingDetailsSelectors} from '@appSelectors/pendings/daily-meeting';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {ICard} from '@appModels/card/card';
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';
import {ITabOption} from '@appModels/botonera/botonera-option';

import {
  IGeneralData,
  IQuotation,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';

@Component({
  selector: 'app-general-data-daily-meeting',
  templateUrl: './general-data-daily-meeting.component.html',
  styleUrls: ['./general-data-daily-meeting.component.scss'],
})
export class GeneralDataDailyMeetingsComponent {
  cardOptions$: Observable<Array<ICard>> = this.store.select(
    dailyMeetingDetailsSelectors.selectCardOptions,
  );
  currency$: Observable<string> = this.store.select(dailyMeetingDetailsSelectors.selectCurrency);
  currentQuotation$: Observable<IQuotation> = this.store.select(
    dailyMeetingDetailsSelectors.currentQuotation,
  );
  currentStrategy$: Observable<string> = this.store.select(
    dailyMeetingDetailsSelectors.currentStrategy,
  );
  percentageBarTotal$: Observable<Array<IPercentageBarItems>> = this.store.select(
    dailyMeetingDetailsSelectors.selectPercentagesBar,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    dailyMeetingDetailsSelectors.selectTabsOptionsSectionSelected,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(
    dailyMeetingDetailsSelectors.selectTabSelectedSections,
  );
  totalQuotes$: Observable<number> = this.store.select(
    dailyMeetingDetailsSelectors.selectTotalQuotes,
  );
  userData$: Observable<IGeneralData> = this.store.select(
    dailyMeetingDetailsSelectors.selectUserData,
  );
  totalUsdQuotes$: Observable<number> = this.store.select(
    dailyMeetingDetailsSelectors.selectTotalUsdQuotes,
  );

  constructor(private store: Store<AppState>) {}

  // async handleOptionSelected(option: ICard): Promise<void> {
  //   const idClient: string = await lastValueFrom(
  //     this.store.pipe(select(dailyMeetingDetailsSelectors.selectIdClient), take(1)),
  //   );
  //   const idAjOfQuotationStrategy: string = await lastValueFrom(
  //     this.store.pipe(select(dailyMeetingDetailsSelectors.selectIdAjOfQuotationStrategy), take(1)),
  //   );
  //
  //   this.store.dispatch(
  //     dailyMeetingDetailsActions.SET_INFO_QUOTATION_SELECTED({
  //       idQuotation: option.value,
  //       idClient,
  //       idAjOfQuotationStrategy,
  //     }),
  //   );
  // }

  handleOptionSelected(option: ICard): void {
    this.store.dispatch(
      dailyMeetingDetailsActions.SET_QUOTATION_SELECTED({idQuotation: option.value}),
    );
  }

  onSelectOption(tab: ITabOption): void {
    this.store.dispatch(dailyMeetingDetailsActions.SET_TAB_OPTION({tab}));
  }
  downloadQuotation(): void {
    this.store.dispatch(dailyMeetingDetailsActions.SET_LOAD_QUOTATION_FILE());
  }
}
