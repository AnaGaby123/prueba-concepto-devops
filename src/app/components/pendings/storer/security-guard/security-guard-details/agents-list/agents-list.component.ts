import {Component} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {securityGuardDetailsSelectors} from '@appSelectors/pendings/security-guard';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {debounce, isEmpty} from 'lodash-es';

import {
  securityGuardActions,
  securityGuardActionsDetails,
} from '@appActions/pendings/security-guard';
import {
  selectActualStep,
  selectCustomAgentList,
  selectDesiredPage,
  selectStatusApi,
  selectTotalVisits,
} from '@appSelectors/pendings/security-guard/security-guard-details/security-guard-details.selectors';
import {ISegVisitaVisitanteDetalle} from '@appModels/store/pendings/security-guard/security-guard-details/security-guard-details.models';
import {SegVisitaVisitanteDetalle} from 'api-logistica';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {take} from 'rxjs/operators';
import {
  API_REQUEST_STATUS_LOADING,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.scss'],
})
export class AgentsListComponent {
  constructor(private store: Store<AppState>) {}

  tabsSteps$: Observable<Array<ITabOption>> = this.store.select(
    securityGuardDetailsSelectors.selectedTabsStep,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(
    securityGuardDetailsSelectors.selectTabSelected,
  );
  searchTerm$: Observable<string> = this.store.select(
    securityGuardDetailsSelectors.selectSearchTerm,
  );
  apiStatus$: Observable<number> = this.store.select(securityGuardDetailsSelectors.selectStatusApi);
  actualStep$: Observable<number> = this.store.select(selectActualStep);
  totalVisits$: Observable<number> = this.store.select(
    securityGuardDetailsSelectors.selectTotalVisits,
  );
  lodashIsEmpty = isEmpty;
  scrollItems: Array<SegVisitaVisitanteDetalle>;
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  agentList$: Observable<Array<any>> = this.store.select(selectCustomAgentList);
  selectItemCustomAgentList$: Observable<ISegVisitaVisitanteDetalle> = this.store.select(
    securityGuardDetailsSelectors.selectItemCustomAgentList,
  );
  apiRequestStatusLoading = API_REQUEST_STATUS_LOADING;

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(securityGuardActionsDetails.SET_SEARCH_TERM({searchTerm}));
  }

  handleTrackBy(index: number, item: ISegVisitaVisitanteDetalle): string {
    return item.IdSegVisitaVisitante;
  }

  onSelectOption(tabOptionSelected: ITabOption): void {
    this.store.dispatch(
      securityGuardActionsDetails.SET_TAB_SELECTED({
        tabSelected: tabOptionSelected,
      }),
    );
    this.store.dispatch(securityGuardActions.SET_NEW_CONTACT({newContact: false}));
    this.store.dispatch(securityGuardActions.SET_EDIT_MODE({editMode: false}));
    this.store.dispatch(securityGuardActionsDetails.CLEAN_FIELDS_VISITOR());
  }

  selectedItem(selectedCustomAgent: ISegVisitaVisitanteDetalle): void {
    this.store.dispatch(
      securityGuardActionsDetails.SET_OPTION_SELECTED({
        selectedCustomAgent,
      }),
    );
    this.store.dispatch(securityGuardActions.SET_NEW_CONTACT({newContact: false}));
    this.store.dispatch(securityGuardActions.SET_EDIT_MODE({editMode: false}));
    this.store.dispatch(securityGuardActionsDetails.CLEAN_FIELDS_VISITOR());
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const visits: SegVisitaVisitanteDetalle[] = await lastValueFrom(
      this.store.pipe(select(selectCustomAgentList), take(1)),
    );
    if (event.endIndex !== visits.length - 1) {
      return;
    }
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(selectTotalVisits), take(1)),
    );

    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(selectDesiredPage), take(1)),
    );

    const isLoading: number = await lastValueFrom(
      this.store.pipe(select(selectStatusApi), take(1)),
    );

    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;

      if (currentPage > totalPages || visits.length > currentTotal) {
        return;
      }

      if (!(isLoading === this.apiRequestStatusLoading)) {
        setTimeout(async () => {
          this.getVisits(false);
        }, 200);
      }
    }
  }

  getVisits(isFirstPage: boolean): void {
    this.store.dispatch(securityGuardActionsDetails.FETCH_CUSTOMS_AGENT_LOAD({isFirstPage}));
  }
}
