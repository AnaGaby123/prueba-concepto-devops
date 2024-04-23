import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {validateAdjustmentActions} from '@appActions/pendings/validate-adjustment';

@Component({
  selector: 'app-validate-adjustment-details',
  templateUrl: './validate-adjustment-details.component.html',
  styleUrls: ['./validate-adjustment-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateAdjustmentDetailsComponent implements AfterContentChecked, OnDestroy {
  requestIsOpen = true;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.store.dispatch(validateAdjustmentActions.SET_DETAILS_MODE({detailsMode: false}));
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  handleRequest(): void {
    this.requestIsOpen = !this.requestIsOpen;
  }
}
