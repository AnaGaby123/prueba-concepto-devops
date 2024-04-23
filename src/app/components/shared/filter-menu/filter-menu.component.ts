/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {forEach} from 'lodash-es';

/* Models Imports */
import {ClientFilter} from '@appModels/filters/ClientFilter';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';

const FILE_NAME = 'filter-menu.component.ts';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})
export class FilterMenuComponent {
  @Input() filters: Array<ClientFilter>;
  @Output() sendValue: EventEmitter<any> = new EventEmitter<any>();

  opened = '';

  constructor(private logger: NGXLogger) {}

  showDrop(index: number, $event, filter: ClientFilter): void {
    this.logger.debug(servicesLogger.generateMessage(FILE_NAME, '@showDrop: Entre'));

    $event.stopPropagation();
    $event.preventDefault();
    if (filter.hasOptions) {
      this.onClick($event);
      document.getElementById('myDropdown' + filter.label).classList.toggle('show');
      this.opened = 'img' + filter.label;
    }
  }

  sendEvent(
    value: string,
    opc: number,
    index: number,
    item: ClientFilter,
    id: string | boolean,
    $event,
  ): void {
    this.logger.debug(servicesLogger.generateMessage(FILE_NAME, '@sendEvent: Entre'));

    $event.stopPropagation();
    $event.preventDefault();
    this.sendValue.emit({option: item, value, id});
    this.onClick($event);
  }

  onClick($event): void {
    if (
      ($event.path && !($event.path[0].id === this.opened)) ||
      ($event.target && !($event.target.id === this.opened))
    ) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      forEach(dropdowns, (item) => {
        if (item.classList.contains('show')) {
          item.classList.remove('show');
        }
      });
    }
  }
}
