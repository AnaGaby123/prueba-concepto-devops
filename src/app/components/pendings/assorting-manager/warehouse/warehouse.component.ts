/* Core Imports */
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

/* Selectors Imports */
import {warehouseSelectors} from '@appSelectors/pendings/assorting-manager/warehouse';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseComponent {
  title$: Observable<string> = this.store.select(warehouseSelectors.selectTitle);
  isDetails$: Observable<boolean> = this.store.select(warehouseSelectors.selectIsInDetails);
  modal = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  goBack(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.warehouse.warehouse,
      appRoutes.warehouse.dashboard,
    ]);
  }

  handleModal(value: boolean): void {
    this.modal = value;
  }
}
