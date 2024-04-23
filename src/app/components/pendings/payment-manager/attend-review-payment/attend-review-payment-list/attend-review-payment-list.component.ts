/*Core imports */
import {AppState} from '@appCore/core.state';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

/*Actions imports*/
import {attendReviewPaymentActions} from '@appActions/pendings/payment-manager';

/*Models imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';

/*Util imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-attend-review-payment-list',
  templateUrl: './attend-review-payment-list.component.html',
  styleUrls: ['./attend-review-payment-list.component.scss'],
})
export class AttendReviewPaymentListComponent {
  tabOptions: Array<ITabOption> = [
    {
      id: '1',
      label: 'TODOS',
      activeSubtitle: true,
      labelSubtitle: 'REVISIONES',
      totalSubtitle: 34,
    },
    {
      id: '2',
      label: 'DIRECTOS',
      activeSubtitle: true,
      labelSubtitle: 'REVISIONES',
      totalSubtitle: 15,
    },
    {
      id: '3',
      label: 'INDIRECTOS',
      activeSubtitle: true,
      labelSubtitle: 'REVISIONES',
      totalSubtitle: 4,
    },
  ];
  tapSelected: ITabOption = this.tabOptions[0];

  filterOptions: DropListOption[] = [
    {
      value: 'desc',
      label: 'Más Nuevos',
    },
    {
      value: 'asc',
      label: 'Más Antiguos',
    },
  ];

  constructor(private router: Router, private store: Store<AppState>) {}

  setProvider(): void {
    this.store.dispatch(
      attendReviewPaymentActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: true,
      }),
    );
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.attendReviewPayment.attendReviewPayment,
      appRoutes.attendReviewPayment.details,
    ]);
  }
}
