/* Core Imports */
import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Selectors Imports */
import {quotationSelectors} from '@appSelectors/quotation';

/* Tools Imports */
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class QuotationDetailsGuardService implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const isQuotationDetailsComponent: boolean = await lastValueFrom(
      this.store.pipe(select(quotationSelectors.selectQuotationDetailsComponent), take(1)),
    );

    if (!isQuotationDetailsComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.quoter.quoter,
        appRoutes.quoter.dashboard,
      ]);
    }
    return isQuotationDetailsComponent;
  }
}
