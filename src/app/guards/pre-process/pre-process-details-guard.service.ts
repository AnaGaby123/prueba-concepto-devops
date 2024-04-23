import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {preProcessingSelectors} from '@appSelectors/pre-processing';
import {take} from 'rxjs/operators';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class PreProcessDetailsGuardService {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isPreProcessDetailComponent: boolean = await lastValueFrom(
      this.store.pipe(select(preProcessingSelectors.selectIsPreProcessDetailsComponent), take(1)),
    );

    if (!isPreProcessDetailComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.preProcessing.preProcess,
        appRoutes.preProcessing.dashboard,
      ]);
    }
    return isPreProcessDetailComponent;
  }
}
