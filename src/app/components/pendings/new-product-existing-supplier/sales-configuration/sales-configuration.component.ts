import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {salesConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/sales-configuration';
import {salesConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/sales-configuration';

@Component({
  selector: 'app-sales-configuration',
  templateUrl: './sales-configuration.component.html',
  styleUrls: ['./sales-configuration.component.scss'],
})
export class SalesConfigurationComponent implements OnDestroy {
  title$: Observable<string> = this.store.select(
    salesConfigurationDetailsSelectors.selectTitleHeader,
  );

  constructor(private store: Store) {}

  ngOnDestroy() {
    this.store.dispatch(salesConfigurationDetailsActions.SET_INITIAL_STATE());
  }
}
