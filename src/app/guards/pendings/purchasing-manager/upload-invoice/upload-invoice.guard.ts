import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {AppState} from '@appCore/core.state';
import {selectIsDetails} from '@appSelectors/pendings/purchasing-manager/upload-invoice/upload-invoice.selectors';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class UploadInvoiceGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const allowedToDetailsComponent: boolean = await lastValueFrom(
      this.store.pipe(select(selectIsDetails), take(1)),
    );

    if (!allowedToDetailsComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.uploadInvoice.uploadInvoice,
      ]);
    }
    return allowedToDetailsComponent;
  }
}
