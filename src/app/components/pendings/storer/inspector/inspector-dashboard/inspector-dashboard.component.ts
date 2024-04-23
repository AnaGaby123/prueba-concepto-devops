import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {inspectorsDashboardSelectors} from '@appSelectors/pendings/storer/inspector';
import {inspectorActions, inspectorDashboardActions} from '@appActions/pendings/storer/inspector';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-inspector-dashboard',
  templateUrl: './inspector-dashboard.component.html',
  styleUrls: ['./inspector-dashboard.component.scss'],
})
export class InspectorDashboardComponent implements OnDestroy {
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    inspectorsDashboardSelectors.selectTabOptions,
  );
  selectedTab$: Observable<ITabOption> = this.store.select(
    inspectorsDashboardSelectors.selectedTab,
  );

  constructor(private store: Store, private router: Router) {}

  setTab(tab: ITabOption): void {
    this.store.dispatch(inspectorDashboardActions.SET_SELECTED_TAB({tab}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(inspectorDashboardActions.RESTORE_ALL());
  }

  goToDetails(): void {
    this.store.dispatch(inspectorActions.SET_ALLOWED_TO_DETAILS_VALUE({allowedToDetails: true}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.inspector.inspector,
      appRoutes.inspector.details,
    ]);
  }
}
