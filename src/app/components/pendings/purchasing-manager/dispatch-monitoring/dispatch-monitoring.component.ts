/*Core imports */
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/*Selctors imports */
import {dispatchMonitoringSelectors} from '@appSelectors/pendings/purchasing-manager/dispatch-monitoring';

/*Utils imports */
import {Location} from '@angular/common';

@Component({
  selector: 'app-dispatch-monitoring',
  templateUrl: './dispatch-monitoring.component.html',
  styleUrls: ['./dispatch-monitoring.component.scss'],
})
export class DispatchMonitoringComponent {
  isInDetailsView$: Observable<boolean> = this.store.select(
    dispatchMonitoringSelectors.selectIsInDetailsView,
  );
  title$: Observable<string> = this.store.select(dispatchMonitoringSelectors.selectTitle);

  constructor(private store: Store, private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
