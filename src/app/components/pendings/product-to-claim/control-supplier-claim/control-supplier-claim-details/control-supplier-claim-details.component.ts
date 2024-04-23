import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {controlSupplierClaimDetailsSelectors} from '@appSelectors/pendings/product-to-claim/control-supplier-claim';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IUploadFileCustom} from '@appModels/files/files.models';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {debounce} from 'lodash-es';

import {controlSupplierClaimDetailsActions} from '@appActions/pendings/product-to-claim/control-supplier-claim';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-control-supplier-claim-details',
  templateUrl: './control-supplier-claim-details.component.html',
  styleUrls: ['./control-supplier-claim-details.component.scss'],
})
export class ControlSupplierClaimDetailsComponent implements OnInit {
  rbSelected = false;
  front: boolean;
  up: boolean;
  down: boolean;
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    controlSupplierClaimDetailsSelectors.selectTabs,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(
    controlSupplierClaimDetailsSelectors.selectSelectedTab,
  );
  sortOptions$: Observable<Array<DropListOption>> = this.store.select(
    controlSupplierClaimDetailsSelectors.selectSortOptions,
  );
  sortSelected$: Observable<DropListOption> = this.store.select(
    controlSupplierClaimDetailsSelectors.selectSortSelected,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  constructor(private store: Store<AppState>) {}

  files = [
    'Archivo.jpg',
    'foto_evidencia.jpg',
    'foto_evidencia.jpg',
    'Archivo.jpg',
    'foto_evidencia.jpg',
    'Archivo.jpg',
    'ArchivoDeTextoLargoParaPrueba.jpg',
    'foto.png',
  ];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  ngOnInit(): void {
    this.front = true;
  }

  selectImage(value: string): void {
    this.up = false;
    this.front = false;
    this.down = false;
    this[value] = true;
  }

  addFile(file: File): void {
    const customFile: IUploadFileCustom = {file, name: file.name};
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(controlSupplierClaimDetailsActions.SET_TAB_SELECTED({tab}));
  }

  setSort(sort: DropListOption): void {
    this.store.dispatch(controlSupplierClaimDetailsActions.SET_SORT_SELECTED({sort}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(controlSupplierClaimDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  changeColor(): void {
    this.rbSelected = true;
  }
}
