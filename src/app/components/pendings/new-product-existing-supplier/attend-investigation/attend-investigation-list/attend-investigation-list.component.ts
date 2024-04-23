/*Core imports*/
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';

/*Selectors imports*/
import {
  attendInvestigationListSelectors,
  attendInvestigationSelectors,
} from '@appSelectors/pendings/attend-investigation';

/*Actions imports*/
import {
  attendInvestigationActions,
  attendInvestigationDetailsActions,
  attendInvestigationListActions,
} from '@appActions/pendings/attend-investigation';

/*Models imports*/
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IProvider} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';

/*Util Imports*/
import {isEmpty} from 'lodash-es';

import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';

@Component({
  selector: 'app-attend-investigation-list',
  templateUrl: './attend-investigation-list.component.html',
  styleUrls: ['./attend-investigation-list.component.scss'],
})
export class AttendInvestigationListComponent {
  activeChart$: Observable<boolean> = this.store.select(
    attendInvestigationListSelectors.selectActiveChart,
  );
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    attendInvestigationListSelectors.selectDoughnutChartData,
  );
  doughnutChartOptionDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    attendInvestigationListSelectors.selectDoughnutChartOptionDetails,
  );
  doughnutChartOptionDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(attendInvestigationListSelectors.selectDoughnutChartOptionDetailsHover);
  isDetails$: Observable<boolean> = this.store.select(
    attendInvestigationSelectors.selectDetailsMode,
  );
  listProviderStatus$: Observable<number> = this.store.select(
    attendInvestigationListSelectors.selectListProviderStatus,
  );
  listProviders$: Observable<Array<IProvider>> = this.store.select(
    attendInvestigationListSelectors.selectListProviderDashboard,
  );
  tabOption$: Observable<ITabOption> = this.store.select(
    attendInvestigationListSelectors.selectTabOptionSelected,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    attendInvestigationListSelectors.selectTabOptions,
  );
  totalProducts$: Observable<number> = this.store.select(
    attendInvestigationListSelectors.selectTotalProducts,
  );
  valuesBarChart$: Observable<IBarChart> = this.store.select(
    attendInvestigationListSelectors.selectDataBarChart,
  );
  lodashIsEmpty = isEmpty;
  clientScroll: Array<IProvider>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      attendInvestigationListActions.INIT_ATTEND_INVESTIGATION_DASHBOARD_COMPONENT_EFFECT(),
    );
  }

  setTabOptionSelected(tabOptionSelected: ITabOption): void {
    this.store.dispatch(
      attendInvestigationListActions.SET_TAB_OPTION_SELECTED({
        tabOptionSelected,
      }),
    );
  }

  selectClient(selectedClient): void {
    if (selectedClient) {
      this.store.dispatch(
        attendInvestigationActions.SET_ALLOW_TO_DETAILS({
          allowToDetails: true,
        }),
      );
      this.store.dispatch(
        attendInvestigationDetailsActions.SET_PROVIDER({
          providerSelected: selectedClient,
        }),
      );
    }
  }
}
