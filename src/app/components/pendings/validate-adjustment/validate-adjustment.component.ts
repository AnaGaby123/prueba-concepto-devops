import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

// Models
import {ICustomer} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';

// Actions
import {validateAdjustmentActions} from '@appActions/pendings/validate-adjustment';
import {GET_CAT_MONEDA_LOAD} from '@appActions/catalogs/catalogos.actions';

// Selectors
import {
  validateAdjustmentDetailsSelectors,
  validateAdjustmentSelectors,
} from '@appSelectors/pendings/validate-adjustment';

// Utils

@Component({
  selector: 'app-validate-adjustment',
  templateUrl: './validate-adjustment.component.html',
  styleUrls: ['./validate-adjustment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateAdjustmentComponent implements OnInit, AfterContentChecked {
  customer$: Observable<ICustomer> = this.store.select(
    validateAdjustmentDetailsSelectors.selectCustomer,
  );
  isInDetailsView$: Observable<boolean> = this.store.select(
    validateAdjustmentSelectors.selectIsInDetailsView,
  );
  title$: Observable<string> = this.store.select(validateAdjustmentSelectors.selectTitle);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_MONEDA_LOAD());
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  goBack(): void {
    this.store.dispatch(validateAdjustmentActions.GO_BACK());
  }
}
