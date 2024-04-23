import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Location} from '@angular/common';

/*Selectors Imports*/
import {collectionMonitoringSelectors} from '@appSelectors/pendings/charges/collection-monitoring';

@Component({
  selector: 'app-collection-monitoring',
  templateUrl: './collection-monitoring.component.html',
  styleUrls: ['./collection-monitoring.component.scss'],
})
export class CollectionMonitoringComponent {
  title$: Observable<string> = this.store.select(collectionMonitoringSelectors.selectTitle);
  isDetails$: Observable<boolean> = this.store.select(
    collectionMonitoringSelectors.selectIsDetails,
  );

  constructor(private store: Store<AppState>, private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
