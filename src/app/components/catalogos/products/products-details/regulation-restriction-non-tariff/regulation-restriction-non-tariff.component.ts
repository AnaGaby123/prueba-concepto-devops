// CORE
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
// MODELS
import {
  Archivo,
  Producto,
  ProductoEstandar,
  ProductoLabware,
  ProductoReactivo,
  VProductoDetalle,
} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
// ACTIONS
import {productDetailsActions, productRegulationActions} from '@appActions/forms/product-form';
// SELECTORS
import {
  productLogisticSelectors,
  productRegulationSelectors,
  productSelectors,
} from '@appSelectors/forms/product-form';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {dateFormatISO} from '@appUtil/dates';
import {getOnlyFileName} from '@appUtil/files';

@Component({
  selector: 'app-regulation-restriction-non-tariff',
  templateUrl: './regulation-restriction-non-tariff.component.html',
  styleUrls: ['./regulation-restriction-non-tariff.component.scss'],
})
export class RegulationRestrictionNonTariffComponent {
  enableEdit$: Observable<boolean> = this.store.select(productSelectors.selectEnableEdit);
  configurationType$: Observable<string> = this.store.select(
    productRegulationSelectors.selectConfigurationType,
  );
  vProduct$: Observable<VProductoDetalle> = this.store.select(
    productRegulationSelectors.selectProduct,
  );
  producto$: Observable<Producto> = this.store.select(productRegulationSelectors.selectProducto);
  catClassificationRegulation$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatClasificacionRegulatoriaForDropDrown,
  );
  selectedClassification$: Observable<DropListOption> = this.store.select(
    productRegulationSelectors.selectedRegulatoryClassification,
  );
  configuration$: Observable<
    ProductoEstandar | ProductoReactivo | ProductoLabware
  > = this.store.select(productLogisticSelectors.selectProductType);
  sanitaryDate$: Observable<Date> = this.store.select(productRegulationSelectors.sanitaryDate);
  readonly inputValidators = InputValidators;

  constructor(private store: Store<AppState>) {}

  setNewFile(file: File, node: string): void {
    this.store.dispatch(productRegulationActions.SET_NEW_FILE({file, node}));
  }

  setProductData(data: string, node: string): void {
    this.store.dispatch(productRegulationActions.SET_PRODUCT_DATA({data, node}));
  }

  setSelectedClassification(value: DropListOption): void {
    this.store.dispatch(productRegulationActions.SET_SELECTED_CLASSIFICATION({value}));
  }

  setLetterRegulatory(data: string): void {
    this.store.dispatch(productRegulationActions.SET_LETTER_REGULATORY({data}));
  }

  getFileName(file) {
    return getOnlyFileName(file);
  }

  getExternalFile(node: string, file?: Archivo): void {
    this.store.dispatch(productDetailsActions.FETCH_EXTERNAL_FILE_LOAD({node}));
  }

  setIdFileToDelete(idFile: string, node: string): void {
    this.store.dispatch(productDetailsActions.SET_ID_FILE_TO_DELETE({idFile, tabId: 2, node}));
  }

  setLabwareData(data: string): void {
    this.store.dispatch(productRegulationActions.SET_LABWARE_DATA({data}));
  }

  setDate(date): void {
    this.store.dispatch(
      productRegulationActions.SET_DATE({
        date: dateFormatISO(date),
        dateFormat: date,
      }),
    );
  }
}
