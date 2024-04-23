import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {planDispatchDetailsSelectors} from '@appSelectors/pendings/imports/plan-dispatch';
import {Aduana, AgenteAduanal, CatIncoterm, Empresa} from 'api-catalogos';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {IDispatchOrder} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.models';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {planDispatchDetailsActions} from '@appActions/pendings/imports/plan-dispatch';

@Component({
  selector: 'app-import-settings',
  templateUrl: './import-settings.component.html',
  styleUrls: ['./import-settings.component.scss'],
})
export class ImportSettingsComponent {
  selectedDispatchOrder$: Observable<IDispatchOrder> = this.store.select(
    planDispatchDetailsSelectors.selectedDispatchOrder,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  customsAgentsList$: Observable<Array<AgenteAduanal>> = this.store.select(
    planDispatchDetailsSelectors.selectCustomsAgentsList,
  );
  exportersList$: Observable<Array<Empresa>> = this.store.select(
    planDispatchDetailsSelectors.selectExportersList,
  );
  importersList$: Observable<Array<Empresa>> = this.store.select(
    planDispatchDetailsSelectors.selectImportersList,
  );
  customsListByAgent$: Observable<Array<Aduana>> = this.store.select(
    planDispatchDetailsSelectors.selectCustomsListByAgent,
  );
  incotermList$: Observable<Array<CatIncoterm>> = this.store.select(
    planDispatchDetailsSelectors.selectCatIncoterm,
  );

  constructor(private store: Store<AppState>) {}

  selectRadioButton(node: string, radioButtonId: string | boolean): void {
    this.store.dispatch(planDispatchDetailsActions.SET_RADIO_BUTTON_ID({node, radioButtonId}));
  }
}
