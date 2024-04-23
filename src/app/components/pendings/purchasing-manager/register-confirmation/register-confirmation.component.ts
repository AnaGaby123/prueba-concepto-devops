/*Core imports*/
import {AppState} from '@appCore/core.state';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/*Selector imports */
import {registerConfirmationSelectors} from '@appSelectors/pendings/purchasing-manager/register-confirmation';

/*Utils imports*/
import {Location} from '@angular/common';

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.scss'],
})
export class RegisterConfirmationComponent {
  isDetails$: Observable<boolean> = this.store.select(
    registerConfirmationSelectors.selectIsDetails,
  );
  title$: Observable<string> = this.store.select(registerConfirmationSelectors.selectTitle);

  constructor(private store: Store<AppState>, private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
