import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {brandFormSelectors} from '@appSelectors/forms/brand-form';
import {take} from 'rxjs/operators';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class BrandFormDetailsGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const allowToDetails: boolean = await lastValueFrom(
      this.store.pipe(select(brandFormSelectors.selectAllowToDetails), take(1)),
    );
    if (!allowToDetails) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.catalogs.catalogs,
        appRoutes.catalogs.brands.brands,
        appRoutes.catalogs.brands.list,
      ]);
    }
    return allowToDetails;
  }
}
