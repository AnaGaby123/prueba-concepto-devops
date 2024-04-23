import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
/*Selectors Imports*/
import {
  attendViewDetailsSelectors,
  attendViewSelectors,
} from '@appSelectors/pendings/charges/attend-review';
/*Models imports*/
import {ICustomerAttend} from '@appModels/store/pendings/charges/attend-review/attend-review-list/attend-review-list.models';

@Component({
  selector: 'app-attend-review',
  templateUrl: './attend-review.component.html',
  styleUrls: ['./attend-review.component.scss'],
})
export class AttendReviewComponent {
  customer$: Observable<ICustomerAttend> = this.store.select(
    attendViewDetailsSelectors.selectedClient,
  );
  inRebill$: Observable<boolean> = this.store.select(attendViewSelectors.selectIsInRebillView);
  isDetails$: Observable<boolean> = this.store.select(attendViewSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(attendViewSelectors.selectTile);

  constructor(private store: Store, private router: Router, private location: Location) {}

  // async goBack(value): Promise<void> {
  //   // Todo: Validar ruta para eliminar el estado detalle (actualRoute)
  //   this.store.dispatch(attendReviewDetailsActions.CLEAN_ALL_DETAILS_STATE());
  //   this.store.dispatch(
  //     attendReviewActions.SET_IS_IN_DETAILS_VIEW({isInDetailsView: false}),
  //   );
  //   this.location.back();
  // }
  goBack(): void {
    this.location.back();
  }
}
