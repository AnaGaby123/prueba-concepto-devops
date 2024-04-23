import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {take} from 'rxjs/operators';
import {selectAllowedToResume} from '@appSelectors/pendings/close-offer/close-offer-details/close-offer-details.selectors';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class CloseOfferResumeGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const allowedToResumeComponent: boolean = await lastValueFrom(
      this.store.pipe(select(selectAllowedToResume), take(1)),
    );

    if (!allowedToResumeComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.closeOffer.closeOffer,
        appRoutes.closeOffer.details,
      ]);
    }
    return allowedToResumeComponent;
  }
}
