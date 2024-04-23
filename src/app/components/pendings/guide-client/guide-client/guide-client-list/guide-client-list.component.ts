import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {selectCatFreightForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
/* Utils Imports */
import {debounce} from 'lodash-es';

/* Actions Imports */
import {guideClientListActions} from '@appActions/pendings/guide-client/guide-client';
import {GET_CAT_FREIGHT_LOAD} from '@appActions/catalogs/catalogos.actions';
/* Selectors Imports */
import {guideClientListSelectors} from '@appSelectors/pendings/guide-client/guide-client';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-guide-client-list',
  templateUrl: './guide-client-list.component.html',
  styleUrls: ['./guide-client-list.component.scss'],
})
export class GuideClientListComponent implements OnInit {
  freightOptions$: Observable<Array<DropListOption>> = this.store.select(
    selectCatFreightForDropDown,
  );
  selectedFrightOption$: Observable<DropListOption> = this.store.select(
    guideClientListSelectors.selectedFreightOption,
  );
  validatorForGenerateButton$: Observable<boolean> = this.store.select(
    guideClientListSelectors.validatorForGenerateButton,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  handleKeySearch = debounce(this.changeSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_FREIGHT_LOAD());
  }

  changeGuideNumber(guideNumber: string): void {
    this.store.dispatch(guideClientListActions.SET_GUIDE_NUMBER({guideNumber}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(guideClientListActions.SET_SEARCH_TERM({searchTerm}));
  }

  setFreightOption(value: DropListOption): void {
    this.store.dispatch(guideClientListActions.SET_FREIGHT_SELECTED({value}));
  }

  register(): void {
    this.store.dispatch(guideClientListActions.REGISTER_LOAD());
  }
}
