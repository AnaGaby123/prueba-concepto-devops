import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {IToggleSwitch, IToggleSwitchOption} from '@appModels/toggle-switch/toggle-switch';
import {SWITCH_DEFAULT, SWITCH_LEFT, SWITCH_RIGHT} from '@appUtil/common.protocols';
import {NGXLogger} from 'ngx-logger';
import {generateMessage} from '@appUtil/logger';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
})
export class ToggleSwitchComponent implements OnInit, OnChanges {
  @Input() items: IToggleSwitch = {
    leftOptionText: 'red',
    rightOptionText: 'blue',
    selected: 'default',
    fontSize: '14px',
  };
  @Input() value: string;
  @Input() backgroundColor: string;
  @Input() disable = false;
  @Input() activeEmitterObject = false;
  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private logger: NGXLogger) {
    this.logger.warn(
      generateMessage(
        'ToggleSwitchComponent',
        'Componente obsoleto, usa en su lugar PqfToggleSwitchComponent',
      ),
    );
  }

  ngOnInit(): void {
    this.items = {...this.items};
    this.toggleSwitch(this.items.selected, true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.items.selected = changes.value.currentValue;
    }
  }

  toggleSwitch(value: string, isInit: boolean = false): void {
    let valorEmit: string;
    let optionObject: IToggleSwitchOption = {} as IToggleSwitchOption;
    this.items.selected = value;
    switch (value) {
      case SWITCH_LEFT:
        valorEmit = this.items.leftOptionText;
        optionObject = {
          value: this.items.leftOptionValue,
          label: this.items.leftOptionText,
        };
        break;
      case SWITCH_RIGHT:
        valorEmit = this.items.rightOptionText;
        optionObject = {
          value: this.items.rightOptionValue,
          label: this.items.rightOptionText,
        };
        break;
      default:
        valorEmit = SWITCH_DEFAULT;
    }
    if (!isInit) {
      if (this.activeEmitterObject) {
        this.optionSelected.emit(optionObject);
      } else {
        this.optionSelected.emit(valorEmit);
      }
    }
  }
}
