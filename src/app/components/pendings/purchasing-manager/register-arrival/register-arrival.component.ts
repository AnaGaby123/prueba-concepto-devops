/* Core Imports */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/* Selectors Imports */
import {registerArrivalSelectors} from '@appSelectors/pendings/purchasing-manager/register-arrival';
import {selectCurrentRoute} from '@appSelectors/router/router.selectors';

/* Routes Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-register-arrival',
  templateUrl: './register-arrival.component.html',
  styleUrls: ['./register-arrival.component.scss'],
})
export class RegisterArrivalComponent {
  isDetails$: Observable<boolean> = this.store.select(registerArrivalSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(registerArrivalSelectors.selectTitle);

  constructor(private store: Store, private router: Router) {}

  async goBack(): Promise<void> {
    const currentRoute: string = await lastValueFrom(
      this.store.pipe(select(selectCurrentRoute), take(1)),
    );

    const splitRoute = currentRoute.split('/');

    if (splitRoute[splitRoute.length - 1] === appRoutes.registerArrival.barcode) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.registerArrival.registerArrival,
      ]);
    } else if (splitRoute[splitRoute.length - 1] === appRoutes.registerArrival.stepsToFinalize) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.registerArrival.registerArrival,
        appRoutes.registerArrival.details,
        appRoutes.registerArrival.barcode,
      ]);
    }
  }
}
