/* Core Imports */
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/* Model Imports */
import {AppState} from '@appCore/core.state';
import {ICard} from '@appModels/card/card';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';

/* Selectors Imports */
import {strategyDetailsSelectors} from '@appSelectors/pendings';
import {strategyDetailsActions} from '@appActions/pendings/strategy';
import {IQuotation} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';

@Component({
  selector: 'app-list-strategies',
  templateUrl: './list-strategies.component.html',
  styleUrls: ['./list-strategies.component.scss'],
})
export class ListStrategiesComponent {
  cardOptions$: Observable<Array<ICard>> = this.store.select(
    strategyDetailsSelectors.selectCardOptions,
  );
  currency$: Observable<string> = this.store.select(strategyDetailsSelectors.selectCurrency);
  percentageBarTotal$: Observable<Array<IPercentageBarItems>> = this.store.select(
    strategyDetailsSelectors.selectPercentagesBar,
  );
  selectedQuotation$: Observable<IQuotation> = this.store.select(
    strategyDetailsSelectors.selectedQuotation,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    strategyDetailsSelectors.selectTabsOptions,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(
    strategyDetailsSelectors.selectTabSelected,
  );
  totalAmountQuotes$: Observable<number> = this.store.select(
    strategyDetailsSelectors.selectTotalAmountQuotes,
  );
  totalCharged$: Observable<number> = this.store.select(
    strategyDetailsSelectors.selectTotalCharged,
  );
  totalError$: Observable<number> = this.store.select(strategyDetailsSelectors.selectTotalError);
  totalFundamentalObjective$: Observable<number> = this.store.select(
    strategyDetailsSelectors.selectTotalFundamentalObjective,
  );
  totalPending$: Observable<number> = this.store.select(
    strategyDetailsSelectors.selectTotalPending,
  );
  totalPercentage$: Observable<number> = this.store.select(
    strategyDetailsSelectors.selectPercentageByClient,
  );
  totalQuoted$: Observable<number> = this.store.select(strategyDetailsSelectors.selectTotalQuotes);

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  classNames = CLASS_NAMES;

  options = [
    {
      value: '',
      active: false,
      labels: [
        {
          label: '#1 · F0-03985475',
          color: '#FFFFFF',
        },
        {
          label: 'Valor Total en cierre $ 50,000 Usd',
          color: '#FFFFFF',
        },
        {
          label: '9 Productos',
          color: '#FFFFFF',
        },
      ],
    },
    {
      value: '',
      active: false,
      labels: [
        {
          label: '#1 · F0-03985475',
          color: '#FFFFFF',
        },
        {
          label: 'Valor Total en cierre $ 50,000 Usd',
          color: '#FFFFFF',
        },
        {
          label: '9 Productos',
          color: '#FFFFFF',
        },
      ],
    },
    {
      value: '',
      active: false,
      labels: [
        {
          label: '#1 · F0-03985475',
          color: '#FFFFFF',
        },
        {
          label: 'Valor Total en cierre $ 50,000 Usd',
          color: '#FFFFFF',
        },
        {
          label: '9 Productos',
          color: '#FFFFFF',
        },
      ],
    },
    {
      value: '',
      active: false,
      labels: [
        {
          label: '#1 · F0-03985475',
          color: '#FFFFFF',
        },
        {
          label: 'Valor Total en cierre $ 50,000 Usd',
          color: '#FFFFFF',
        },
        {
          label: '9 Productos',
          color: '#FFFFFF',
        },
      ],
    },
    {
      value: '',
      active: false,
      labels: [
        {
          label: '#1 · F0-03985475',
          color: '#FFFFFF',
        },
        {
          label: 'Valor Total en cierre $ 50,000 Usd',
          color: '#FFFFFF',
        },
        {
          label: '9 Productos',
          color: '#FFFFFF',
        },
      ],
    },
    {
      value: '',
      active: true,
      labels: [
        {
          label: '#1 · F0-03985475',
          color: '#FFFFFF',
        },
        {
          label: 'Valor Total en cierre $ 50,000 Usd',
          color: '#FFFFFF',
        },
        {
          label: '9 Productos',
          color: '#FFFFFF',
        },
      ],
    },
    {
      value: '',
      active: false,
      labels: [
        {
          label: '#1 · F0-03985475',
          color: '#FFFFFF',
        },
        {
          label: 'Valor Total en cierre $ 50,000 Usd',
          color: '#FFFFFF',
        },
        {
          label: '9 Productos',
          color: '#FFFFFF',
        },
      ],
    },
    {
      value: '',
      active: false,
      labels: [
        {
          label: '#1 · F0-03985475',
          color: '#FFFFFF',
        },
        {
          label: 'Valor Total en cierre $ 50,000 Usd',
          color: '#FFFFFF',
        },
        {
          label: '9 Productos',
          color: '#FFFFFF',
        },
      ],
    },
    {
      value: '',
      active: false,
      labels: [
        {
          label: '#1 · F0-03985475',
          color: '#FFFFFF',
        },
        {
          label: 'Valor Total en cierre $ 50,000 Usd',
          color: '#FFFFFF',
        },
        {
          label: '9 Productos',
          color: '#FFFFFF',
        },
      ],
    },
    {
      value: '',
      active: false,
      labels: [
        {
          label: '#1 · F0-03985475',
          color: '#FFFFFF',
        },
        {
          label: 'Valor Total en cierre $ 50,000 Usd',
          color: '#FFFFFF',
        },
        {
          label: '9 Productos',
          color: '#FFFFFF',
        },
      ],
    },
    {
      value: '',
      active: false,
      labels: [
        {
          label: '#1 · F0-03985475',
          color: '#FFFFFF',
        },
        {
          label: 'Valor Total en cierre $ 50,000 Usd',
          color: '#FFFFFF',
        },
        {
          label: '9 Productos',
          color: '#FFFFFF',
        },
      ],
    },
  ];

  items1: Array<IPercentageBarItems> = [
    {
      id: '1',
      percentage: '35%',
      title: 'Originales',
      subtitle: 'valor total $20,000 usd',
      color: '#2fd2e0',
    },
    {
      id: '2',
      percentage: '35%',
      title: 'complementarias',
      subtitle: 'valor total $20,000 usd',
      color: '#12b0bd',
    },
    {
      id: '3',
      percentage: '30%',
      title: 'promoción',
      subtitle: 'valor total $10,000 usd',
      color: '#008894',
    },
  ];
  items2: Array<IPercentageBarItems> = [
    {
      id: '1',
      percentage: '0.1%',
      title: 'Alternativas',
      subtitle: 'valor total $1,500 usd',
      color: '#7fca65',
    },
    {
      id: '2',
      percentage: '99.9%',
      title: 'Ahorro',
      subtitle: 'valor total $500 usd',
      color: '#60bf40',
    },
  ];

  constructor(private store: Store<AppState>) {}

  handleOptionSelected(option: ICard): void {
    this.store.dispatch(
      strategyDetailsActions.SET_QUOTATION_SELECTED({
        idQuotation: option.value,
      }),
    );
  }

  onSelectOption(tab: ITabOption): void {
    this.store.dispatch(strategyDetailsActions.SET_TAB_OPTION({tab}));
  }
  downloadQuotation(): void {
    this.store.dispatch(strategyDetailsActions.SET_LOAD_QUOTATION_FILE());
  }
}
