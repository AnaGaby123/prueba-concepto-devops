import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {planCollectionSelectors} from '@appSelectors/pendings/payment-manager';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-plan-collection',
  templateUrl: './plan-collection.component.html',
  styleUrls: ['./plan-collection.component.scss'],
})
export class PlanCollectionComponent {
  isDetails$: Observable<boolean> = this.store.select(planCollectionSelectors.selectIsDetails);

  constructor(private router: Router, private store: Store) {}

  goBackBackPurchasing(event): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.processPurchase.orderPurchase,
    ]);
  }
}
