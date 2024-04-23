// CORE
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// MODELS
import {IRadioButton} from '@appModels/radio-button/radio-button.models';
import {
  Archivo,
  ArchivoTratadosOtrosDetalle,
  ProductoTarifaAgenteAduanal,
  VProductoDetalle,
} from 'api-catalogos';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
// ACTIONS
// SELECTORS
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {
  productDetailsSelectors,
  productLogisticSelectors,
  productSelectors,
} from '@appSelectors/forms/product-form';
import {productDetailsActions, productLogisticActions} from '@appActions/forms/product-form';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {getOnlyFileName} from '@appUtil/files';

@Component({
  selector: 'app-logistic',
  templateUrl: './logistic.component.html',
  styleUrls: ['./logistic.component.scss'],
})
export class LogisticComponent implements OnInit {
  enableEdit$: Observable<boolean> = this.store.select(productSelectors.selectEnableEdit);
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  vProduct$: Observable<VProductoDetalle> = this.store.select(
    productDetailsSelectors.selectProductDetails,
  );
  radioOptions$: Observable<Array<IRadioButton>> = this.store.select(
    productLogisticSelectors.selectRadioOptions,
  );
  otherFiles$: Observable<Array<ArchivoTratadosOtrosDetalle | File>> = this.store.select(
    productDetailsSelectors.selectOtherFiles,
  );
  freightRestrictions$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectRestriccionesFleteForDropDown,
  );
  securitySheetFile$: Observable<File> = this.store.select(
    productDetailsSelectors.selectSecuritySheetFile,
  );
  certificate$: Observable<File> = this.store.select(productDetailsSelectors.selectCertificate);
  dataSheet$: Observable<File> = this.store.select(productDetailsSelectors.selectDatasheet);
  archivoTratado$: Observable<File> = this.store.select(
    productDetailsSelectors.selectArchivoTratado,
  );
  selectedFreight$: Observable<DropListOption> = this.store.select(
    productLogisticSelectors.selectSelectedRestrictionFreight,
  );
  customAgent$: Observable<ProductoTarifaAgenteAduanal> = this.store.select(
    productLogisticSelectors.selectCustomAgentData,
  );
  viewTypes = AppViewTypes;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(productLogisticActions.FETCH_CUSTOM_AGENT_LOAD());
  }

  getFileName(file) {
    return getOnlyFileName(file);
  }

  setRadioOption(option: IRadioButton): void {
    this.store.dispatch(productLogisticActions.SET_RADIOBUTTON({option}));
  }

  getExternalFile(node: string, file?: Archivo): void {
    if (node === 'OtrosTratados') {
      this.store.dispatch(productDetailsActions.FETCH_EXTERNAL_FILE_LOAD({node, file}));
    } else {
      this.store.dispatch(productDetailsActions.FETCH_EXTERNAL_FILE_LOAD({node}));
    }
  }

  setNewFile(newFile: File, node: string): void {
    this.store.dispatch(productLogisticActions.SET_NEW_PRODUCT_FILE({newFile, node}));
  }

  addNewFile(file: File): void {
    this.store.dispatch(productLogisticActions.ADD_OTHER_FILE({file}));
  }

  setdropOption(option: DropListOption): void {
    this.store.dispatch(productLogisticActions.SET_DROP_OPTION({option}));
  }

  setIdFileToDelete(idFile: string, node: string): void {
    this.store.dispatch(productDetailsActions.SET_ID_FILE_TO_DELETE({idFile, tabId: 3, node}));
  }

  setOtherFileToDelete(index?: number, IdArchivoTratadosOtros?: string): void {
    if (index !== null) {
      this.store.dispatch(
        productLogisticActions.SET_OTHER_FILE_TO_DELETE({
          index,
          IdArchivoTratadosOtros: null,
        }),
      );
    } else {
      this.store.dispatch(
        productLogisticActions.SET_OTHER_FILE_TO_DELETE({
          index: null,
          IdArchivoTratadosOtros,
        }),
      );
    }
  }
}
