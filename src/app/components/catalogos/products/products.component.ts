import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as productSelectors from '@appSelectors/forms/product-form';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as productsActions from '@appActions/forms/product-form/product-form-list/product-form-list.actions';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  editMode$: Observable<boolean> = this.store.select(
    productSelectors.productSelectors.selectEditMode,
  );
  enableEdit$: Observable<boolean> = this.store.select(
    productSelectors.productSelectors.selectEnableEdit,
  );
  title$: Observable<string> = this.store.select(productSelectors.productSelectors.selectTitle);
  isInDetails$: Observable<boolean> = this.store.select(
    productSelectors.productSelectors.selectIsInDetails,
  );

  productName$: Observable<string> = this.store.select(
    productSelectors.productSelectors.productName,
  );

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnDestroy(): void {
    this.store.dispatch(productsActions.SET_INITIAL_STATE());
  }

  returnMainPage(): void {
    this.router.navigate([appRoutes.protected, appRoutes.catalogs.catalogs]);
  }

  goBack(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.catalogs.catalogs,
      appRoutes.catalogs.products.products,
    ]);
  }
}
