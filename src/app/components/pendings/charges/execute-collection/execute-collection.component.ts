/* Core Imports */
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/* Selectors Imports */
import {
  executeCollectionDetailsSelectors,
  executeCollectionSelectors,
} from '@appSelectors/pendings/charges/execute-collection';
import {Location} from '@angular/common';
import {selectCurrentChildRoute} from '@appSelectors/router/router.selectors';
import {VFacturaClienteCalendarioTotales} from 'api-finanzas';

@Component({
  selector: 'app-execute-collection',
  templateUrl: './execute-collection.component.html',
  styleUrls: ['./execute-collection.component.scss'],
})
export class ExecuteCollectionComponent {
  title$: Observable<string> = this.store.select(executeCollectionSelectors.selectTile);
  isDetails$: Observable<boolean> = this.store.select(executeCollectionSelectors.selectIsDetails);
  isInRebillView$: Observable<boolean> = this.store.select(
    executeCollectionSelectors.selectIsInRebillView,
  );
  name$: Observable<VFacturaClienteCalendarioTotales> = this.store.select(
    executeCollectionDetailsSelectors.selectedClient,
  );
  actualRoute$: Observable<string> = this.store.select(selectCurrentChildRoute);

  constructor(private store: Store, private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
