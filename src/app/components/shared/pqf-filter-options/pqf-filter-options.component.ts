import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {filterFadeInFadeOut} from '@appUtil/animations';
import {find, isEqual, map} from 'lodash-es';

@Component({
  selector: 'pqf-filter-options',
  animations: [filterFadeInFadeOut],
  templateUrl: './pqf-filter-options.component.html',
  styleUrls: ['./pqf-filter-options.component.scss'],
})
export class PqfFilterOptionsComponent {
  @Input() filterText: string = ''; // Texto del filtro
  @Input() flexDirection: string = 'row'; // opciones: row, column
  @Input() onlyOneOption: boolean = false; // Opcion para permitir habilitar una opcion
  @Input() options: Array<FilterOptionPqf> = []; // Arreglo de opciones a mostrar
  @Input() rowGap: string = '8px';
  @Input() showOptions: boolean = false; // Opcion para permitir mostrar las opcioes al iniciar
  @Output() selectedOptionEmitter: EventEmitter<Array<FilterOptionPqf>> = new EventEmitter<
    Array<FilterOptionPqf>
  >();
  show: boolean = true;
  hide: boolean = false;

  getFilterImage() {
    if (this.showOptions) {
      return 'assets/Images/components-src/filter/filter_active.svg';
    } else {
      return 'assets/Images/components-src/filter/filter_inactive.svg';
    }
  }

  handleOptionSelected(option: string) {
    let optionsCopy: Array<FilterOptionPqf> = this.options;
    const actualOption: FilterOptionPqf = find(optionsCopy, (o: FilterOptionPqf) => o.isActive);
    if (this.onlyOneOption) {
      optionsCopy = map(
        optionsCopy,
        (o: FilterOptionPqf): FilterOptionPqf => {
          if (option === o.id) {
            return {
              ...o,
              isActive: o !== actualOption ? !o.isActive : o.isActive,
            };
          }
          return {
            ...o,
            isActive: false,
          };
        },
      );
    } else {
      optionsCopy = map(
        this.options,
        (o: FilterOptionPqf): FilterOptionPqf => {
          if (option === o.id) {
            return {
              ...o,
              isActive: !o.isActive,
            };
          }
          return o;
        },
      );
    }
    if (!isEqual(optionsCopy, this.options)) {
      return this.selectedOptionEmitter.emit(optionsCopy);
    }
  }
}
