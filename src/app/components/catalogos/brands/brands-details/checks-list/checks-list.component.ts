import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {
  CatControlObj,
  CatIndustriaObj,
  CatSectorObj,
  CatSubTipoObj,
  CatTipoObj,
} from 'api-catalogos';
import {brandFormSelectorsDetails} from '@appSelectors/forms/brand-form';
import {Store} from '@ngrx/store';
import {brandFormDetailsAction} from '@appActions/forms/brand-form';

@Component({
  selector: 'app-checks-list',
  templateUrl: './checks-list.component.html',
  styleUrls: ['./checks-list.component.scss'],
})
export class ChecksListComponent {
  $controlFilterList: Observable<Array<CatControlObj>> = this.store.select(
    brandFormSelectorsDetails.selectControlFilterList,
  );
  $industryFilterList: Observable<Array<CatIndustriaObj>> = this.store.select(
    brandFormSelectorsDetails.selectIndustryFilterList,
  );
  $sectorFilterList: Observable<Array<CatSectorObj>> = this.store.select(
    brandFormSelectorsDetails.selectSectorFilterList,
  );
  $subtypeFilterList: Observable<Array<CatSubTipoObj>> = this.store.select(
    brandFormSelectorsDetails.selectSubtypeFilterList,
  );
  $typeFilterList: Observable<Array<CatTipoObj>> = this.store.select(
    brandFormSelectorsDetails.selectTypeFilterList,
  );
  $selectCheckAll: Observable<boolean> = this.store.select(
    brandFormSelectorsDetails.selectCheckAll,
  );

  constructor(private store: Store) {}

  handleCheckAll(value: boolean): void {
    this.store.dispatch(brandFormDetailsAction.CHECK_ALL({value}));
  }

  handleCheckFilter(node: string, idName: string, id: string, value: boolean): void {
    this.store.dispatch(
      brandFormDetailsAction.HANDLE_FILTER_CHECKED({
        node,
        idName,
        id,
        value,
      }),
    );
  }
}
