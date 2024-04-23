import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Store} from '@ngrx/store';
// Selectors
import * as OPSelectors from '@appSelectors/quotation/quotation-details/details/sections/offline-product.selectors';

// Actions
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {Router} from '@angular/router';
// Models
import {CotPartidaCotizacionInvestigacion, GMPartidaInvestigacionCotizador} from 'api-logistica';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {VMarcaFamilia} from 'api-catalogos';
import {offlineProductActions} from '@appActions/quotation';
import {Location} from '@angular/common';
import {AppViewTypes} from '@appModels/store/utils/utils.model';

@Component({
  selector: 'app-offline-product',
  templateUrl: './offline-product.component.html',
  styleUrls: ['./offline-product.component.scss'],
})
export class OfflineProductComponent {
  constructor(private store: Store, private router: Router, private location: Location) {}

  catUnitSelected$: Observable<DropListOption> = this.store.select(
    OPSelectors.selectCatUnitSelected,
  );
  data$: Observable<GMPartidaInvestigacionCotizador> = this.store.select(
    OPSelectors.selectOfflineProductData,
  );
  listTypeFamily$: Observable<Array<DropListOption>> = this.store.select(
    OPSelectors.selectTypeFamilyDropListOption,
  );
  typeFamilySelected$: Observable<DropListOption> = this.store.select(
    OPSelectors.selectTypeFamilySelected,
  );
  typeBrandSelected$: Observable<DropListOption> = this.store.select(
    OPSelectors.selectBrandSelected,
  );

  cotInvestigation$: Observable<CotPartidaCotizacionInvestigacion> = this.store.select(
    OPSelectors.selectResearchQuotationItem,
  );

  isOfflineProduct$: Observable<boolean> = this.store.select(OPSelectors.selectIsOfflineProduct);
  isActiveAdd$: Observable<boolean> = this.store.select(OPSelectors.selectActiveAdd);
  status$: Observable<boolean> = this.store.select(OPSelectors.selectOfflineProductStatus);
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  viewType = AppViewTypes;

  selectCatUnit$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatUnitForDropDown,
  );

  nameProvider$: Observable<VMarcaFamilia> = this.store.select(
    OPSelectors.selectNameProviderOfYTypeFamilySelected,
  );
  validators = InputValidators;

  ngOnDestroy(): void {
    this.store.dispatch(offlineProductActions.INITIAL_OFFLINE_PRODUCT());
  }

  setCatalog(catalog: string): void {
    this.store.dispatch(offlineProductActions.SET_CATALOG({catalog}));
  }

  setPieces(pieces: number): void {
    this.store.dispatch(offlineProductActions.SET_PIECES({pieces}));
  }

  setTypeFamily(familyOption: DropListOption): void {
    this.store.dispatch(offlineProductActions.SET_TYPE_FAMILY_OPTION({familyOption}));
  }

  setQuantity(quantity: string): void {
    this.store.dispatch(offlineProductActions.SET_QUANTITY({quantity}));
  }

  setUnit(unit: DropListOption): void {
    this.store.dispatch(offlineProductActions.SET_UNIT_PRODUCT({idUnit: unit}));
  }

  setNameProduct(name: string): void {
    this.store.dispatch(offlineProductActions.SET_NAME_PRODUCT({name}));
  }

  setNote(notes: string): void {
    this.store.dispatch(offlineProductActions.SET_NOTES({notes}));
  }

  saveProduct(): void {
    this.store.dispatch(offlineProductActions.SAVE_OFFLINE_PRODUCT_LOAD());
  }

  returnView(): void {
    this.store.dispatch(offlineProductActions.INITIAL_OFFLINE_PRODUCT());
    this.location.back();
  }
}
