import {AppState} from '@appCore/core.state';
import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

// Actions
import {
  workArrivalDocumentsActions,
  workArrivalDocumentsDetailsActions,
} from '@appActions/pendings/work-arrival-documents';

// Selectors
import {workArrivalDocumentsSelectors} from '@appSelectors/pendings/work-arrival-documents';

@Component({
  selector: 'app-work-arrival-documents',
  templateUrl: './work-arrival-documents.component.html',
  styleUrls: ['./work-arrival-documents.component.scss'],
})
export class WorkArrivalDocumentsComponent {
  isInDetails$: Observable<boolean> = this.store.select(
    workArrivalDocumentsSelectors.selectIsDetails,
  );
  title$: Observable<string> = this.store.select(workArrivalDocumentsSelectors.selectTitle);

  constructor(private store: Store<AppState>, private location: Location) {}

  goBack(): void {
    this.store.dispatch(workArrivalDocumentsDetailsActions.CLEAN_ALL_DETAILS_STATE());
    this.store.dispatch(
      workArrivalDocumentsActions.SET_IS_IN_DETAILS_VIEW({
        detailsMode: false,
      }),
    );
    this.store.dispatch(
      workArrivalDocumentsActions.SET_ALLOWED_TO_DETAILS({
        allowToDetails: false,
      }),
    );
    this.location.back();
  }
}
