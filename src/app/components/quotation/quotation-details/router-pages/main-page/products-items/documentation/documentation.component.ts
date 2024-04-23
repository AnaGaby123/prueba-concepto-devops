import {Component, Input, OnInit} from '@angular/core';
import {quotationDetailsActions} from '@appActions/quotation';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {isEmpty, map as _map, replace} from 'lodash-es';
import {VProductoDetalle} from 'api-catalogos';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentationComponent implements OnInit {
  @Input() product: ProductSearchResult | VProductoDetalle;
  @Input() location: string;
  filesNames: string[];
  lodashIsEmpty = isEmpty;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.filesNames = this.getCoincidencesOfFileNames();
  }

  getCoincidencesOfFileNames() {
    const coincidences = this.getCoincidences(this.product);

    return this.getFilesAttributesWithId(coincidences);
  }

  getCoincidences(product: ProductSearchResult | VProductoDetalle): string[] {
    return Object.keys(product).filter((attribute: string) => attribute.includes('IdArchivo'));
  }

  getFilesAttributesWithId(attributes: string[]): string[] {
    const filesAttributes: string[] = [];
    _map(attributes, (attribute: string) => {
      if (attribute in this.product && this.product[attribute]) {
        if (
          attribute === 'IdArchivoCertificado' ||
          attribute === 'IdArchivoEstructuraMolecular' ||
          attribute === 'IdArchivoHojaSeguridad' ||
          attribute === 'IdArchivoCartaDeDisponibilidad'
        ) {
          return filesAttributes.push(this.fileNameFormat(attribute));
        }
      }
    });
    return filesAttributes;
  }

  fileNameFormat(word: string): string {
    let fileName = replace(word, /([a-z])([A-Z])/g, '$1 $2');
    fileName = replace(fileName, 'Id Archivo ', '');
    fileName = replace(fileName, 'De', 'de');
    fileName = replace(fileName, 'En', 'en');
    return fileName;
  }

  downloadFile(node: string, location: string): void {
    this.store.dispatch(quotationDetailsActions.FETCH_EXTERNAL_FILE_LOAD({node, location}));
  }
}
