import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPqfTabOption} from '@appModels/shared-components/pqf-tab-options';
import {map} from 'lodash-es';

@Component({
  selector: 'pqf-tab-options',
  templateUrl: './pqf-tab-options.component.html',
  styleUrls: ['./pqf-tab-options.component.scss'],
})
export class PqfTabOptionsComponent implements OnInit {
  @Input() options: Array<IPqfTabOption> = []; // Arreglo de opciones
  @Output() onSelectOption: EventEmitter<Array<IPqfTabOption>> = new EventEmitter<
    Array<IPqfTabOption>
  >();

  constructor() {}

  ngOnInit(): void {}

  selectedOption(option: IPqfTabOption) {
    if (option.enable && !option.selected) {
      const newOptions = map(
        this.options,
        (o: IPqfTabOption): IPqfTabOption => {
          if (o.id === option.id) {
            return {
              ...o,
              selected: true,
            };
          }
          return {
            ...o,
            selected: false,
          };
        },
      );
      this.onSelectOption.emit(newOptions);
    }
  }
}
