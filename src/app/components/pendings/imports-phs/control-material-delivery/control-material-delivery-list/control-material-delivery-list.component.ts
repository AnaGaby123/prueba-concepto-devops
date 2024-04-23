import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {lastValueFrom, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {debounce} from 'lodash-es';

/*Selectors Import*/
import {controlMaterialDeliveryListSelectors} from '@appSelectors/pendings/imports-phs/control-material-delivery';
/*Actions Imports*/
import {
  controlMaterialDeliveryActions,
  controlMaterialDeliveryDetailsActions,
  controlMaterialDeliveryListActions,
} from '@appActions/pendings/imports-phs/control-material-delivery';
/*utils Imports*/
import {DEFAULT_TIME_DEBOUNCE_SEARCH, PAGING_LIMIT} from '@appUtil/common.protocols';
/*Models Imports*/
import {AsistenteImportacionAcuseReciboGraficaTotales} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICustomAgent} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.models';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';

@Component({
  selector: 'app-control-material-delivery-list',
  templateUrl: './control-material-delivery-list.component.html',
  styleUrls: ['./control-material-delivery-list.component.scss'],
})
export class ControlMaterialDeliveryListComponent implements OnInit {
  agentTotal$: Observable<number> = this.store.select(
    controlMaterialDeliveryListSelectors.selectTotalAgents,
  );
  customsAgents$: Observable<Array<ICustomAgent>> = this.store.select(
    controlMaterialDeliveryListSelectors.selectCustomsAgents,
  );
  dataDonutChart$: Observable<IDoughnutChart> = this.store.select(
    controlMaterialDeliveryListSelectors.selectDataProviders,
  );
  dataDonutChartAgent$: Observable<IDoughnutChart> = this.store.select(
    controlMaterialDeliveryListSelectors.selectDataAgent,
  );
  dataDonutChartDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    controlMaterialDeliveryListSelectors.selectDataDetailsProviders,
  );
  dataDonutChartDetailsAgent$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    controlMaterialDeliveryListSelectors.selectDataDetailsAgent,
  );
  dataDonutDetailsHover$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    controlMaterialDeliveryListSelectors.selectDataDetailsHoverProviders,
  );
  dataDonutDetailsHoverAgent$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    controlMaterialDeliveryListSelectors.selectDataDetailsHoverAgent,
  );
  isLoading$: Observable<boolean> = this.store.select(
    controlMaterialDeliveryListSelectors.selectIsLoadingApi,
  );
  optionsOrder$: Observable<Array<DropListOption>> = this.store.select(
    controlMaterialDeliveryListSelectors.selectOptionsOrderList,
  );
  selectedOrder$: Observable<DropListOption> = this.store.select(
    controlMaterialDeliveryListSelectors.selectOrderList,
  );
  totals$: Observable<AsistenteImportacionAcuseReciboGraficaTotales> = this.store.select(
    controlMaterialDeliveryListSelectors.selectTotalsList,
  );
  agentsScroller: Array<ICustomAgent> = [];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.getCustomsAgent(true);
    this.store.dispatch(controlMaterialDeliveryListActions.FETCH_TOTALS_AGENT_LOAD());
    this.store.dispatch(controlMaterialDeliveryListActions.FETCH_DONUT_AGENT_LOAD());
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      controlMaterialDeliveryListActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  openDetail(agent: ICustomAgent): void {
    this.store.dispatch(controlMaterialDeliveryActions.SET_IS_DETAILS({isDetails: true}));
    this.store.dispatch(controlMaterialDeliveryDetailsActions.INITIAL_VIEW_DETAILS_LOAD({agent}));
  }

  setFilter(filter: DropListOption): void {
    this.store.dispatch(controlMaterialDeliveryListActions.SET_FILTER_ORDER({filter}));
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const agents: Array<ICustomAgent> = await lastValueFrom(
      this.store.pipe(select(controlMaterialDeliveryListSelectors.selectCustomsAgents), take(1)),
    );
    if (event.endIndex !== agents.length - 1) {
      return;
    }
    const listStatus = await lastValueFrom(
      this.store.pipe(select(controlMaterialDeliveryListSelectors.selectIsLoadingApi), take(1)),
    );
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(controlMaterialDeliveryListSelectors.selectTotalAgents), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(controlMaterialDeliveryListSelectors.selectCurrentPage), take(1)),
    );
    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;

      if (currentPage > totalPages || agents.length > currentTotal || listStatus) {
        return;
      }
      this.getCustomsAgent(false);
    }
  }

  getCustomsAgent(isFirstPage: boolean): void {
    this.store.dispatch(
      controlMaterialDeliveryListActions.FETCH_CUSTOMS_AGENTS_LOAD({
        isFirstPage,
      }),
    );
  }
}
