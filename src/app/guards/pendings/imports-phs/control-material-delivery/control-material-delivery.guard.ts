import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {AppState} from '@appCore/core.state';
/*Selectors Imports*/
import {controlMaterialDeliverySelectors} from '@appSelectors/pendings/imports-phs/control-material-delivery';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class ControlMaterialDeliveryGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const allowedToDetailsComponent: boolean = await lastValueFrom(
      this.store.pipe(select(controlMaterialDeliverySelectors.selectIsDetails), take(1)),
    );

    if (!allowedToDetailsComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.controlMaterialDelivery.controlMaterialDelivery,
      ]);
    }
    return allowedToDetailsComponent;
  }
}
