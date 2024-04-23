/* Core Imports */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

/* Models Imports */
import {ITabOption} from '@appModels/botonera/botonera-option';

/* Selectors Imports */
import {warehouseDashboardSelectors} from '@appSelectors/pendings/assorting-manager/warehouse';

/* Actions Imports */
import {warehouseActions} from '@appActions/pendings/assorting-manager/warehouse';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-warehouse-dashboard',
  templateUrl: './warehouse-dashboard.component.html',
  styleUrls: ['./warehouse-dashboard.component.scss'],
})
export class WarehouseDashboardComponent {
  tabs$: Observable<Array<ITabOption>> = this.store.select(warehouseDashboardSelectors.selectTabs);
  tabSelected$: Observable<ITabOption> = this.store.select(
    warehouseDashboardSelectors.selectTabSelected,
  );

  constructor(private router: Router, private store: Store<AppState>) {}

  navigate(): void {
    this.store.dispatch(warehouseActions.SET_IS_IN_DETAILS_VIEW({detailsMode: true}));
    this.store.dispatch(
      warehouseActions.SET_ALLOWED_TO_DETAILS({
        allowToDetails: true,
      }),
    );
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.warehouse.warehouse,
      appRoutes.warehouse.details,
    ]);
  }
}
