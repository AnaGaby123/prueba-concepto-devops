import {Component, OnInit} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Actions
import {
  planDispatchActions,
  planDispatchDetailsActions,
  planDispatchListActions,
} from '@appActions/pendings/imports/plan-dispatch';

// Selectors
import {planDispatchListSelectors} from '@appSelectors/pendings/imports/plan-dispatch';

// Utils
import {debounce, isEmpty} from 'lodash-es';

import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IProvider} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.models';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-plan-dispatch-list',
  templateUrl: './plan-dispatch-list.component.html',
  styleUrls: ['./plan-dispatch-list.component.scss'],
})
export class PlanDispatchListComponent implements OnInit {
  providersList$: Observable<Array<IProvider>> = this.store.select(
    planDispatchListSelectors.selectProvidersList,
  );
  dataBarChart$: Observable<IBarChart> = this.store.select(
    planDispatchListSelectors.selectBarsChart,
  );
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    planDispatchListSelectors.selectDataDonutChart,
  );
  doughnutChartOptionDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    planDispatchListSelectors.selectDataDonutOptionsDetails,
  );
  burgerOptions$: Observable<Array<DropListOption>> = this.store.select(
    planDispatchListSelectors.selectBurgerOptions,
  );
  selectedBurgerOption$: Observable<DropListOption> = this.store.select(
    planDispatchListSelectors.selectedBurgerOption,
  );
  searchTerm$: Observable<string> = this.store.select(planDispatchListSelectors.selectSearchTerm);
  providersStatus$: Observable<number> = this.store.select(
    planDispatchListSelectors.selectProvidersStatus,
  );
  barsChartStatus$: Observable<number> = this.store.select(
    planDispatchListSelectors.selectBarsChartStatus,
  );
  donutChartStatus$: Observable<number> = this.store.select(
    planDispatchListSelectors.selectDonutChartStatus,
  );
  handleSearchTerm = debounce(
    (value: string) => this.setSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  lodashIsEmpty = isEmpty;
  providersScrollItems: Array<IProvider> = [];

  constructor(private route: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(planDispatchListActions.FETCH_PROVIDERS_LOAD());
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(planDispatchListActions.SET_SEARCH_TERM({searchTerm}));
  }

  setBurgerOption(selectedBurgerOption: DropListOption): void {
    this.store.dispatch(
      planDispatchListActions.SET_SELECTED_BURGER_OPTION({
        selectedBurgerOption,
      }),
    );
  }

  selectProvider(selectedProvider: IProvider): void {
    if (selectedProvider) {
      this.store.dispatch(
        planDispatchActions.SET_ALLOWED_TO_DETAILS_VALUE({
          allowedToDetails: true,
        }),
      );
      this.store.dispatch(planDispatchDetailsActions.SET_SELECTED_PROVIDER({selectedProvider}));
    }
  }

  initNewDispatchOrder(): void {
    this.store.dispatch(
      planDispatchActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: true,
      }),
    );
    this.store.dispatch(
      planDispatchActions.SET_ALLOWED_TO_STEPS_VALUE({
        allowedToSteps: true,
      }),
    );
    this.store.dispatch(planDispatchDetailsActions.INIT_NEW_DISPATCH_ORDER());
  }

  handleTrackByItem(index: number, item: IProvider): string {
    return item.IdProveedor;
  }
}
