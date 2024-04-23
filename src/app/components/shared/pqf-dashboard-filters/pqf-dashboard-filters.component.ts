import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';

@Component({
  selector: 'pqf-dashboard-filters',
  templateUrl: './pqf-dashboard-filters.component.html',
  styleUrls: ['./pqf-dashboard-filters.component.scss'],
})
export class PqfDashboardFiltersComponent implements OnInit {
  readonly inputValidators = InputValidators;
  readonly viewTypes = AppViewTypes;
  @Input() filterText: string = ''; // Texto den filtro PqfFilterOptions (Input: filterText)
  @Input() filterOptionsFlexDirection: string = 'row'; // Direccion que tienen los elementos del componente PqfFilterOptions (Input: flexDirection)
  @Input() onlyOneOption: boolean = false; // Solo una opcion puede ser seleccionada en componente PQfFilterOption (Input: onlyOneOption)
  @Input() options: Array<FilterOptionPqf> = []; // Arreglo de opciones que se mandan al componente PqfFilterOption (Input: Options)
  @Input() searchPlaceholder: string = 'Buscar'; // Placeholder en componente PqfSearch (Input: placeholder)
  @Input() searchTerm: string = ''; // Termino de busqueda en componente PqdSearch (Input: searchTerm)
  @Input() searchTypeValidation: string = this.inputValidators.AcceptAll; // Tipo de validacion en componente PqfSearchTerm (Input: typeValidation)
  @Input() showOptions: boolean = false; // Muestra opciones de filtros en componente PqfFilterOptions (Input: showOptions)
  @Output() selectedOptionEmitter: EventEmitter<Array<FilterOptionPqf>> = new EventEmitter<
    Array<FilterOptionPqf>
  >(); // Emite la seleccion de filtros del componente PqfFilterOptions (Input: selectedOptionEmitter)
  @Output() textSearch: EventEmitter<string> = new EventEmitter<string>(); // Emite el termino de busqueda del componente PqfSearch (Input: textSearch)
  viewType$: Observable<string> = this.store.select(selectViewType);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  handleTextSearch(textSearch: string) {
    this.textSearch.emit(textSearch);
  }

  emitOptions(event) {
    this.selectedOptionEmitter.emit(event);
  }
}
