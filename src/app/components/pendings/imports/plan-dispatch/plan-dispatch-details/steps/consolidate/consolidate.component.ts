import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {planDispatchDetailsSelectors} from '@appSelectors/pendings/imports/plan-dispatch';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Models
import {ImpListaArribo} from 'api-logistica';
import {
  IGroupArrivalList,
  IPlanDispatchArrivalListTotals,
  IQueryResultVPDImpListaArriboPartidaDetalle,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.models';
import {
  IPlanDispatchArrivalList,
  IProvider,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.models';

// Actions
import {planDispatchDetailsActions} from '@appActions/pendings/imports/plan-dispatch';

// Utils
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {debounce, isEmpty} from 'lodash-es';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-consolidate',
  templateUrl: './consolidate.component.html',
  styleUrls: ['./consolidate.component.scss'],
})
export class ConsolidateComponent {
  providersWithoutDispatchOrder$: Observable<Array<IProvider>> = this.store.select(
    planDispatchDetailsSelectors.selectedProvidersWithoutDispatchOrder,
  );
  selectedProvider$: Observable<IProvider> = this.store.select(
    planDispatchDetailsSelectors.selectedStepsProvider,
  );
  arrivalList$: Observable<Array<IPlanDispatchArrivalList>> = this.store.select(
    planDispatchDetailsSelectors.selectArrivalList,
  );
  arrivalListTotals$: Observable<IPlanDispatchArrivalListTotals> = this.store.select(
    planDispatchDetailsSelectors.selectArrivalListTotals,
  );
  providersStatus$: Observable<number> = this.store.select(
    planDispatchDetailsSelectors.selectProvidersStep1Status,
  );
  arrivalListStatus$: Observable<number> = this.store.select(
    planDispatchDetailsSelectors.selectArrivalListStep1Status,
  );
  arrivalListGroup$: Observable<IGroupArrivalList> = this.store.select(
    planDispatchDetailsSelectors.selectArrivalListGroup,
  );
  arrivalListGroupStatus$: Observable<number> = this.store.select(
    planDispatchDetailsSelectors.selectArrivalListGroupStep1Status,
  );
  providersSearchTerm$: Observable<string> = this.store.select(
    planDispatchDetailsSelectors.selectStep1ProvidersSearchTerm,
  );

  handleSearchTerm = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  sideBarIsOpen = false;
  indicator = false;
  selected = false;
  iconSelected = false;
  providersWithoutDispatchOrder: Array<IProvider> = [];
  arrivalList: Array<IPlanDispatchArrivalList> = [];
  lodashIsEmpty = isEmpty;
  arrivalListGroups: Array<IQueryResultVPDImpListaArriboPartidaDetalle> = [];

  constructor(private store: Store<AppState>) {}

  selectProvider(providerId: string): void {
    this.store.dispatch(
      planDispatchDetailsActions.SET_SELECTED_STEP_1_PROVIDER({
        providerId,
      }),
    );
  }

  setSearchTerm(providersSearchTerm: string): void {
    this.store.dispatch(
      planDispatchDetailsActions.SET_PROVIDERS_SEARCH_TERM({
        providersSearchTerm,
      }),
    );
  }

  openItem(arrivalListId: string): void {
    this.store.dispatch(
      planDispatchDetailsActions.SET_ARRIVAL_LIST_IS_OPEN({
        arrivalListId,
      }),
    );
  }

  handleAddToDispatchOrder(event: MouseEvent, arrivalList: ImpListaArribo): void {
    event.stopPropagation();
    this.addToDispatchOrder(arrivalList);
  }

  dropItem(event: CdkDragDrop<Array<IQueryResultVPDImpListaArriboPartidaDetalle>>): void {
    this.addToDispatchOrder(event.item.data);
  }

  addToDispatchOrder(arrivalList: ImpListaArribo): void {
    this.store.dispatch(planDispatchDetailsActions.ADD_TO_DISPATCH_ORDER_LOAD({arrivalList}));
  }

  openProviderDispatchOrder(providerName: string): void {
    this.store.dispatch(
      planDispatchDetailsActions.SET_PROVIDER_DISPATCH_ORDER_IS_OPEN({
        providerName,
      }),
    );
  }

  handleOpenSideBar(): void {
    this.sideBarIsOpen = !this.sideBarIsOpen;
  }

  handleTrackByItem(index: number, item: IProvider): string {
    return item.IdProveedor;
  }

  handleTrackByArrivalList(index: number, item: IPlanDispatchArrivalList): string {
    return item.IdImpListaArribo;
  }

  noReturnPredicate(): boolean {
    return false;
  }
}
