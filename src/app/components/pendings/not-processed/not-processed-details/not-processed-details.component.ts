import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {notProcessedActions, notProcessedDetailActions} from '@appActions/pendings/not-processed';

@Component({
  selector: 'app-not-processed-details',
  templateUrl: './not-processed-details.component.html',
  styleUrls: ['./not-processed-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotProcessedDetailsComponent implements OnDestroy, AfterContentChecked {
  requestIsOpen = true;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.store.dispatch(
      notProcessedActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: false,
      }),
    );
    this.store.dispatch(notProcessedActions.SET_IS_IN_DETAILS_VIEW({isInDetailsView: false}));
    this.store.dispatch(notProcessedDetailActions.RESET_ALL());
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  handleRequest(): void {
    this.requestIsOpen = !this.requestIsOpen;
  }
}
