import {Component} from '@angular/core';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {debounce, map as _map} from 'lodash-es';

import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentationComponent {
  tabs = [
    {
      id: 1,
      label: 'Todos',
      activeSubtitle: true,
      labelSubtitle: 'Documentos',
      totalSubtitle: 41,
    },
    {
      id: 2,
      label: 'Cargados',
      activeSubtitle: true,
      labelSubtitle: 'Documentos',
      totalSubtitle: 4,
    },
    {
      id: 3,
      label: 'Faltantes',
      activeSubtitle: true,
      labelSubtitle: 'Documentos',
      totalSubtitle: 41,
    },
  ];
  guides = [
    {
      Index: 1,
      Folio: 'E4018558',
      Cantidad: 4000099,
      Pedimento: '1618-1001269',
      OD: 'OD-123456-1234',
      Bultos: 2,
      isSelected: false,
    },
  ];
  guidesResults = [];
  documents = [
    {
      Index: 1,
      type: 'Proforma',
      isSelected: true,
    },
    {
      Index: 2,
      type: 'Packing List',
      isSelected: false,
    },
    {
      Index: 3,
      type: 'Carta de uso químicos',
      isSelected: false,
    },
    {
      Index: 4,
      type: 'Factura',
      isSelected: false,
    },
    {
      Index: 5,
      type: 'OC',
      isSelected: false,
    },
    {
      Index: 6,
      type: 'Adicional',
      isSelected: false,
    },
  ];
  documentsResults = [];
  documentSelected = {
    Index: 1,
    type: 'Proforma',
    isSelected: false,
  };
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store<AppState>) {}

  setTab(tabSelected: ITabOption): void {}

  changeSearchTerm(searchTerm: string): void {}

  handleTrackBy(index: number, guide: any): string {
    return guide.Index;
  }

  selectDocument(document: any): void {
    this.documents = _map(this.documents, (doc) => ({
      ...doc,
      isSelected: document.Index === doc.Index,
    }));
    this.documentSelected = document;
  }
}
