/* Core Imports */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Tools Imports */
import {debounce} from 'lodash-es';

/* Selectors Imports */
import {registerArrivalListSelectors} from '@appSelectors/pendings/purchasing-manager/register-arrival';

/* Actions Import */
import {
  registerArrivalDetailsActions,
  registerArrivalListActions,
} from '@appActions/pendings/purchasing-manager/register-arrival';

/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {
  IPorter,
  ITotalPorters,
} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.models';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-register-arrival-list',
  templateUrl: './register-arrival-list.component.html',
  styleUrls: ['./register-arrival-list.component.scss'],
})
export class RegisterArrivalListComponent implements OnInit, OnDestroy {
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    registerArrivalListSelectors.selectDoughnutChartData,
  );
  doughnutChartOptionDetails$: Observable<IDoughnutChartDetails> = this.store.select(
    registerArrivalListSelectors.selectDoughnutChartOptionDetails,
  );
  doughnutChartOptionDetailsHover$: Observable<IDoughnutChartDetails> = this.store.select(
    registerArrivalListSelectors.selectDoughnutChartOptionDetailsHover,
  );
  isLoadingDonutChart$: Observable<boolean> = this.store.select(
    registerArrivalListSelectors.selectIsLoadingDonutChart,
  );
  isLoadingPorters$: Observable<boolean> = this.store.select(
    registerArrivalListSelectors.selectIsLoadingPorters,
  );
  listPortersScrollItems: Array<IPorter> = [];
  porters$: Observable<Array<IPorter>> = this.store.select(
    registerArrivalListSelectors.selectPorters,
  );
  searchTerm$: Observable<string> = this.store.select(
    registerArrivalListSelectors.selectSearchTerm,
  );
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    registerArrivalListSelectors.selectSortList,
  );
  sortOption$: Observable<DropListOption> = this.store.select(
    registerArrivalListSelectors.selectSorOption,
  );
  totals$: Observable<ITotalPorters> = this.store.select(registerArrivalListSelectors.selectTotals);
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(registerArrivalDetailsActions.RESET_DETAILS_VIEWS());
    this.store.dispatch(registerArrivalListActions.FETCH_PORTERS_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(registerArrivalListActions.CLEAN_ALL_REGISTER_ARRIVAL_LIST());
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(registerArrivalListActions.SET_SEARCH_TERM({searchTerm}));
  }

  handleOpenPorter(porter: IPorter): void {
    this.store.dispatch(
      registerArrivalListActions.SET_IS_OPEN_PORTER({
        namePorter: porter.NombreExportador,
      }),
    );
  }

  setOptionSort(sort: DropListOption): void {
    this.store.dispatch(registerArrivalListActions.SET_SORT_OPTION({sort}));
  }

  setPorter(porterSelected: IPorter): void {
    // TODO: Agregar validación cuando los datos estén correctos.
    // if (porterSelected.TotalArribadas > 0) {
    this.store.dispatch(
      registerArrivalDetailsActions.SET_PORTER_SELECTED({
        porterSelected,
      }),
    );
    // }
  }
}
