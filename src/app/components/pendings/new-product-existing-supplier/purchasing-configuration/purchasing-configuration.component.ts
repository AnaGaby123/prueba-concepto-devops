import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {purchasingConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/purchasing-configuration';
import {purchasingConfigurationActions} from '@appActions/pendings/new-product-existing-supplier/purchasing-configuration';

@Component({
  selector: 'app-purchasing-configuration',
  templateUrl: './purchasing-configuration.component.html',
  styleUrls: ['./purchasing-configuration.component.scss'],
})
export class PurchasingConfigurationComponent implements OnDestroy {
  title$: Observable<string> = this.store.select(
    purchasingConfigurationDetailsSelectors.selectTitleHeader,
  );

  constructor(private store: Store) {}

  ngOnDestroy() {
    this.store.dispatch(purchasingConfigurationActions.SET_INITIAL_STATE());
  }
}
