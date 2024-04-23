// Core imports
import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from '@appCore/core.state';
// Selectors
import {selectIsInDetails, selectTitle} from '@appSelectors/forms/brand-form/brand-form.selectors';
// Dev Tools
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {brandFormAction, brandFormListAction} from '@appActions/forms/brand-form';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnDestroy {
  title$: Observable<string> = this.store.select(selectTitle);
  isInDetails$: Observable<boolean> = this.store.select(selectIsInDetails);

  constructor(private router: Router, private store: Store<AppState>) {}

  async returnMainPage(): Promise<void> {
    await this.router.navigate(['/protected/catalogs/']);
  }

  goBack(): void {
    this.store.dispatch(brandFormAction.GO_BACK());
  }

  ngOnDestroy(): void {
    this.store.dispatch(brandFormListAction.SET_INITIAL_STATE());
  }
}
