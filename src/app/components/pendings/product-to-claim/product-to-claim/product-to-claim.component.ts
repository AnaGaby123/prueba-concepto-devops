/* Core Imports */
import {AppState} from '@appCore/core.state';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

/* Selectors Imports */
import {confirmProductToClaimSelectors} from '@appSelectors/pendings/product-to-claim/product-to-claim';

/*Actions imports*/
import {productToClaimActions} from '@appActions/pendings/product-to-claim/product-to-claim';

/*Utils imports*/
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-product-to-claim',
  templateUrl: './product-to-claim.component.html',
  styleUrls: ['./product-to-claim.component.scss'],
})
export class ProductToClaimComponent {
  detailsMode$: Observable<boolean> = this.store.select(
    confirmProductToClaimSelectors.selectIsInDetailsView,
  );
  title$: Observable<string> = this.store.select(confirmProductToClaimSelectors.selectTitle);

  constructor(private store: Store<AppState>, private router: Router) {}

  returnMainPage(): void {
    this.store.dispatch(productToClaimActions.SET_IS_IN_DETAILS_VIEW({detailsMode: false}));
    this.store.dispatch(productToClaimActions.SET_ALLOWED_TO_DETAILS({allowToDetails: false}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.productToClaim.productToClaim,
      appRoutes.productToClaim.list,
    ]);
  }
}
