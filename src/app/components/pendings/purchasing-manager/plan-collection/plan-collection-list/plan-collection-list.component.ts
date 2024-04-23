/*Core imports*/
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
/*Model imports*/
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {
  IBarChart,
  IDoughnutChart,
  InitialIBarChart,
  initialIDoughnutChart,
} from '@appModels/chart/chart';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/*Selectors Imports*/
import {planCollectionSelectors} from '@appSelectors/pendings/payment-manager';
import {selectViewType} from '@appSelectors/utils/utils.selectors';

/*Actions Imports*/
import {planCollectionActions} from '@appActions/pendings/purchasing-manager/manage-back-order';

@Component({
  selector: 'app-plan-collection-list',
  templateUrl: './plan-collection-list.component.html',
  styleUrls: ['./plan-collection-list.component.scss'],
})
export class PlanCollectionListComponent implements OnInit {
  filterBySearch: Observable<Array<DropListOption>> = this.store.select(
    planCollectionSelectors.selectFilterBySearch,
  );
  tapOptionsValue$: Observable<Array<DropListOption>> = this.store.select(
    planCollectionSelectors.selectFilterByValue,
  );
  selectedBySearch$: Observable<DropListOption> = this.store.select(
    planCollectionSelectors.selectedFilterBySearch,
  );
  selectedOptionsValue$: Observable<DropListOption> = this.store.select(
    planCollectionSelectors.selectedFilterByValue,
  );
  viewType$: Observable<string> = this.store.select(selectViewType);

  readonly appViewTypes = AppViewTypes;
  itemStatics: IBarChart = InitialIBarChart();
  itemStatics2: IBarChart = InitialIBarChart();
  itemBarra: IDoughnutChart = initialIDoughnutChart();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.itemStatics.labels = ['.', '.', '.', '.'];
    this.itemStatics.values = [10, 200, 10, 10];
    this.itemStatics.backgroundColor = ['#008894', '#008894', '#008894', '#008894'];
    this.itemStatics2.labels = ['.', '.'];
    this.itemStatics2.values = [10, 200];
    this.itemStatics2.backgroundColor = ['#cc435e', '#4ba92b'];
    this.itemBarra.values = [30, 40, 20, 10];
    this.itemBarra.labels = ['30', '40', '20', '10'];
  }

  providerSelected(): void {
    this.store.dispatch(planCollectionActions.SET_IS_DETAILS({isDetails: true}));
    this.store.dispatch(planCollectionActions.SET_PROVIDER_SELECTED());
  }

  setFilter(event) {}
}
