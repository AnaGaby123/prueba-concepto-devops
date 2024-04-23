// Core
import {AppState} from '@appCore/core.state';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// Actions
import {brandFormAction, brandFormListAction} from '@appActions/forms/brand-form';
// Selectors
import {brandFormSelectorsList} from '@appSelectors/forms/brand-form';
// Models
import {IItemCatalogData} from '@appModels/item-card-catalog/item-card-catalog';
import {VMarca} from 'api-logistica';
import {IVMarca} from '@appModels/store/forms/brand-form/brand-form-list/brand-form-list.models';
// Dev tools
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
// Utils
import {isEmpty} from 'lodash-es';
import {appRoutes} from '@appHelpers/core/app-routes';
import {TITLE_BRAND_ADD_FORM} from '@appModels/store/forms/brand-form/brand-form.models';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss'],
})
export class BrandsListComponent implements OnInit {
  totalBrands$: Observable<number> = this.store.select(brandFormSelectorsList.selectTotalBrands);
  listBrands$: Observable<Array<VMarca>> = this.store.select(
    brandFormSelectorsList.selectBrandsResults,
  );
  lodashIsEmpty = isEmpty;

  scrollItems: Array<VMarca> = [];
  apiStatus$ = this.store.select(brandFormSelectorsList.selectApiStatus);

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(brandFormListAction.INIT_BRAND_FORM_LIST_COMPONENT_EFFECT());
  }

  fetchMoreBrands(event: IPageInfo): void {
    this.store.dispatch(brandFormListAction.FETCH_MORE_BRANDS_EFFECT({event}));
  }

  buildItem(brand: IVMarca): IItemCatalogData {
    return {
      title: brand.Nombre || 'N/D',
      subtitle: 'Productos: ' + brand.TotalProductos,
      image: brand.image,
      imageHover: brand.imageHover,
      active: brand.Activo,
    } as IItemCatalogData;
  }

  handleTrackBy(index: number, item: VMarca): string {
    return item.IdMarca;
  }

  setBrand(brand: VMarca): void {
    this.store.dispatch(brandFormListAction.SET_BRAND_EFFECT({brand}));
  }

  handleNewBrand(): void {
    this.store.dispatch(brandFormAction.SET_ALLOW_TO_DETAILS({allowToDetails: true}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.catalogs.catalogs,
      appRoutes.catalogs.brands.brands,
      appRoutes.catalogs.brands.details,
    ]);
    this.store.dispatch(brandFormAction.SET_TITLE({title: TITLE_BRAND_ADD_FORM}));
  }
}
