/*Core imports*/
import {AppState} from '@appCore/core.state';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

/*Selector imports*/
import {quarantineManagerSelectors} from '@appSelectors/pendings/resource-manager/quarantine-manager';

/*Actions imports*/
import {quarantineManagerActions} from '@appActions/pendings/resource-manager/quarantine-manager';

/*Utils imports*/
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-quarantine-manager',
  templateUrl: './quarantine-manager.component.html',
  styleUrls: ['./quarantine-manager.component.scss'],
})
export class QuarantineManagerComponent {
  detailsMode$: Observable<boolean> = this.store.select(
    quarantineManagerSelectors.selectIsInDetailsView,
  );
  title$: Observable<string> = this.store.select(quarantineManagerSelectors.selectTitle);

  constructor(private store: Store<AppState>, private router: Router) {}

  returnMainPage(): void {
    this.store.dispatch(quarantineManagerActions.SET_IS_IN_DETAILS_VIEW({detailsMode: false}));
    this.store.dispatch(quarantineManagerActions.SET_ALLOWED_TO_DETAILS({allowToDetails: false}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.quarantineManager.quarantineManager,
      appRoutes.quarantineManager.list,
    ]);
  }
}
