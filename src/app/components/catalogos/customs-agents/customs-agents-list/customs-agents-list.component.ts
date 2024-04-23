/*CORE*/
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
/*MODELS*/
import {QueryResultVAgenteAduanal, VAgenteAduanal} from 'api-catalogos';
import {IItemCatalogData} from '@appModels/item-card-catalog/item-card-catalog';
/*ACTIONS*/
import {customAgentListActions} from '@appActions/forms/custom-agent-form';
/*SELECTORS*/
import {customAgentsListSelectors} from '@appSelectors/forms/custom-agents-form';

@Component({
  selector: 'app-customs-agents-list',
  templateUrl: './customs-agents-list.component.html',
  styleUrls: ['./customs-agents-list.component.scss'],
})
export class CustomsAgentsListComponent implements OnInit {
  customsAgents$: Observable<QueryResultVAgenteAduanal> = this.store.select(
    customAgentsListSelectors.selectCustomAgentList,
  );
  customAgentsScroll: Array<any>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(customAgentListActions.LIST_INIT_ACTIONS_HELPER_EFFECT());
  }

  setCustomAgent(customAgent): void {
    this.store.dispatch(customAgentListActions.SET_CUSTOM_AGENT_HELPER_EFFECT({customAgent}));
  }

  buildItem(agent: VAgenteAduanal): IItemCatalogData {
    return {
      title: agent.NombreComercial,
      subtitle: agent.DireccionCompleta,
      imageHover: 'assets/Images/clientes/logo_proquifa_hover.svg',
      image: 'assets/Images/clientes/logo_proquifa_default.svg',
      active: agent.Activo,
    } as IItemCatalogData;
  }
}
