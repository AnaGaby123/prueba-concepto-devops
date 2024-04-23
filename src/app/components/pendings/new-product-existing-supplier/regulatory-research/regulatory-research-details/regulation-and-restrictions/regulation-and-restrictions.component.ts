import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable} from 'rxjs';
import {
  regulatoryResearchDetailsSelectors,
  regulatoryResearchSelectors,
} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-index';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {take} from 'rxjs/operators';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {Producto, VProductoDetalle} from 'api-catalogos';
import {dateFormatISO} from '@appUtil/dates';
import {regulatoryResearchDetailsActions} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';

@Component({
  selector: 'app-regulation-and-non-tariff-restrictions',
  templateUrl: './regulation-and-restrictions.component.html',
  styleUrls: ['./regulation-and-restrictions.component.scss'],
})
export class RegulationAndRestrictionsComponent {
  readonly inputValidators = InputValidators;

  isLabware$: Observable<boolean> = this.store.select(regulatoryResearchDetailsSelectors.isLabware);
  enableEdit$: Observable<boolean> = this.store.select(
    regulatoryResearchSelectors.selectEnableEdit,
  );

  nodeProduct$: Observable<Producto> = this.store.select(
    regulatoryResearchDetailsSelectors.nodeProduct,
  );
  nodeTypeProductDetails$: Observable<any> = this.store.select(
    regulatoryResearchDetailsSelectors.nodeTypeProductDetails,
  );
  productDetails$: Observable<VProductoDetalle> = this.store.select(
    regulatoryResearchDetailsSelectors.productDetails,
  );

  selectCatClassificationList$: Observable<Array<DropListOptionPqf>> = this.store.select(
    regulatoryResearchDetailsSelectors.selectCatClassificationList,
  );
  selectCatClassification$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectCatClassification,
  );
  sanitaryDate$: Observable<Date> = this.store.select(
    regulatoryResearchDetailsSelectors.sanitaryDate,
  );

  nameFileArchiveLetterAvailble$: Observable<string> = this.store.select(
    regulatoryResearchDetailsSelectors.nameFileArchiveLetterAvailble,
  );

  constructor(private store: Store<AppState>) {}

  async changeValueNode(key, event, nodeProduct = false) {
    let nodeValue = null;
    if (nodeProduct) {
      nodeValue = 'Producto';
    } else {
      nodeValue = await lastValueFrom(
        this.store.pipe(select(regulatoryResearchDetailsSelectors.selectTypeProduct), take(1)),
      );
    }
    const params: {node: string; key: string; value: any} = {
      node: nodeValue,
      key,
      value: event?.id ? event.id : event,
    };
    this.store.dispatch(regulatoryResearchDetailsActions.CHANGE_NODE_DETAILS(params));
  }

  deleteValueNodeFile(key) {
    this.store.dispatch(
      regulatoryResearchDetailsActions.CHANGE_NODE_DETAILS_PRODUCT_DETAILS({
        newFile: null,
        node: key,
      }),
    );
  }

  setDate(date): void {
    this.store.dispatch(
      regulatoryResearchDetailsActions.SET_DATE({
        date: dateFormatISO(date),
        dateFormat: date,
      }),
    );
  }

  getExternalFile(node: string): void {
    this.store.dispatch(regulatoryResearchDetailsActions.FETCH_EXTERNAL_FILE_LOAD({node}));
  }

  setNewFile(newFile: Array<File>, node: string): void {
    this.store.dispatch(
      regulatoryResearchDetailsActions.CHANGE_NODE_DETAILS_PRODUCT_DETAILS({
        newFile: newFile[0],
        node,
      }),
    );
  }
}
