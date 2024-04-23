import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {AppState} from '@appCore/core.state';
import {customAgentsSelectors} from '@appSelectors/forms/custom-agents-form';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class CustomsAgentsGuardService implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const allowedToDetailsComponent: boolean = await lastValueFrom(
      this.store.pipe(select(customAgentsSelectors.selectAllowToDetails), take(1)),
    );
    if (!allowedToDetailsComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.catalogs.catalogs,
        appRoutes.catalogs.customsAgents.customsAgents,
      ]);
    }
    return allowedToDetailsComponent;
  }
}
