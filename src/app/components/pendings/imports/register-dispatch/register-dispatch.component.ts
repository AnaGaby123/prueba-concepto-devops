/* Core Imports */
import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Selectors Imports */
import {registerDispatchSelectors} from '@appSelectors/pendings/imports/register-dispatch';

@Component({
  selector: 'app-register-dispatch',
  templateUrl: './register-dispatch.component.html',
  styleUrls: ['./register-dispatch.component.scss'],
})
export class RegisterDispatchComponent {
  isDetails$: Observable<boolean> = this.store.select(registerDispatchSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(registerDispatchSelectors.selectTitleRD);

  constructor(private store: Store, private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
