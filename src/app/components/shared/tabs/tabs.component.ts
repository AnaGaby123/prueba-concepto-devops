/* Core Imports */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
/* Interfaces Imports */
import {ITabOption} from '@appModels/botonera/botonera-option';
import {LevelConfigurationData} from '@appModels/catalogos/offerSegmentation/offerSegmentation';
import {isEmpty, isEqual} from 'lodash-es';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, OnChanges {
  @Input() options: Array<ITabOption | LevelConfigurationData> = [];
  @Input() containIndex = false;
  @Input() tapSelected: ITabOption | LevelConfigurationData;
  @Input() enableSup = false;
  @Output() onSelectOption: EventEmitter<any> = new EventEmitter<any>();
  with: string;
  lodashIsEmpty = isEmpty;

  ngOnInit(): void {
    this.with = this.options?.length > 0 ? `${100 / this.options?.length}%` : '100%';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tapSelected && this.tapSelected?.id !== changes.tapSelected.currentValue?.id) {
      this.tapSelected = {...changes.tapSelected.currentValue};
      this.handleSelectOption(
        this.options.filter((item) => item.id === changes.tapSelected.currentValue?.id)[0],
        null,
      );
    }
    if (changes.options && !isEqual(this.options, changes.options.previousValue)) {
      this.with =
        changes.options.currentValue?.length > 0
          ? `${100 / changes.options.currentValue?.length}%`
          : '100%';
    }
  }

  handleSelectOption(option, event: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.tapSelected?.id !== option.id) {
      this.onSelectOption.emit(option);
    }
  }

  onMouseEnter(element: HTMLDivElement, id: string): void {
    // DOCS: OBTIENE EL PRIMER ELEMENTO CON LA CLASE TITLE Y VALIDA SI EXISTE
    const title = element.querySelectorAll('.title')[0] as HTMLLabelElement | null;
    if (title) {
      const tabItem: HTMLElement = document.getElementById(`option_${id}`);
      if (title.offsetWidth >= element.scrollWidth - 4 && tabItem) {
        tabItem.classList.add('tabTooltip');
      }
    }
  }

  onMouseLeave(id: string): void {
    const tabItem = document.getElementById(`option_${id}`);
    if (tabItem) {
      tabItem.classList.remove('tabTooltip');
    }
  }
}
