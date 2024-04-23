import {Component} from '@angular/core';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {Observable} from 'rxjs';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {AppViewTypes} from '@appModels/store/utils/utils.model';

@Component({
  selector: 'app-attend-not-arrived-details',
  templateUrl: './attend-not-arrived-details.component.html',
  styleUrls: ['./attend-not-arrived-details.component.scss'],
})
export class AttendNotArrivedDetailsComponent {
  readonly viewTypes = AppViewTypes;
  tabOptions$: Array<ITabOption> = [
    {
      id: '1',
      label: 'FUERA DE TIEMPO',
      activeSubtitle: true,
      totalSubtitle: 60,
      labelSubtitle: 'pzas',
    },
    {
      id: '2',
      label: 'HOY',
      activeSubtitle: true,
      totalSubtitle: 60,
      labelSubtitle: 'pzas',
    },
    {
      id: '3',
      label: 'EN TIEMPO',
      activeSubtitle: true,
      totalSubtitle: 60,
      labelSubtitle: 'pzas',
    },
  ];
  selectedTab$: ITabOption = {
    id: '1',
    label: 'FUERA DE TIEMPO',
    activeSubtitle: true,
    totalSubtitle: 60,
    labelSubtitle: 'pzas',
  };
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);

  constructor(private store: Store<AppState>) {}
}
