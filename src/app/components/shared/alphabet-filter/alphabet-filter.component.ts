import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {isEmpty} from 'lodash-es';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {fadeAnimation} from '@appUtil/animations';

@Component({
  selector: 'app-alphabet-filter',
  templateUrl: './alphabet-filter.component.html',
  styleUrls: ['./alphabet-filter.component.scss'],
  animations: [fadeAnimation],
})
export class AlphabetFilterComponent implements OnInit, OnChanges {
  @Input() allowNoSelectedOption = true;
  @Input() label = 'ABC';
  @Input() labelFont = 'Novecento-Bold';
  @Input() labelFontSize = '15px';
  @Input() noSelectedOptionLabel = 'Todos';
  @Input() options: Array<ITabOption> = [
    {id: '1', label: 'A'},
    {id: '2', label: 'B'},
    {id: '3', label: 'C'},
    {id: '4', label: 'D'},
    {id: '5', label: 'E'},
    {id: '6', label: 'F'},
    {id: '7', label: 'G'},
    {id: '8', label: 'H'},
    {id: '9', label: 'I'},
    {id: '10', label: 'J'},
    {id: '11', label: 'K'},
    {id: '12', label: 'L'},
    {id: '13', label: 'M'},
    {id: '14', label: 'N'},
    {id: '15', label: 'Ñ'},
    {id: '16', label: 'O'},
    {id: '17', label: 'P'},
    {id: '18', label: 'Q'},
    {id: '19', label: 'R'},
    {id: '20', label: 'S'},
    {id: '21', label: 'T'},
    {id: '22', label: 'U'},
    {id: '23', label: 'V'},
    {id: '24', label: 'W'},
    {id: '25', label: 'X'},
    {id: '26', label: 'Y'},
    {id: '27', label: 'Z'},
  ];
  @Input() selectedOption: ITabOption;
  @Input() xPosition = 'left';
  @Input() yPosition = 'top';
  @Output() emitSelectedOption: EventEmitter<ITabOption> = new EventEmitter<ITabOption>();
  absoluteStyle: string;
  containerStyle: string;
  labelStyle: string;
  lodashIsEmpty = isEmpty;
  optionsAreOpen = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleGlobalClick(event: MouseEvent): void {
    const withinElement = this.elementRef.nativeElement.contains(event.target);
    if (!withinElement) {
      this.handleOpenOptions(false);
    }
  }

  ngOnInit(): void {
    this.setValues();
  }

  selectOption(item?: ITabOption): void {
    if (!item) {
      this.emitSelectedOption.emit({} as ITabOption);
    } else if (item.id !== this.selectedOption?.id) {
      this.emitSelectedOption.emit(item);
    }
    this.handleOpenOptions(false);
  }

  handleOpenOptions(value: boolean): void {
    this.optionsAreOpen = value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.setValues();
    }
  }

  setValues(): void {
    this.labelStyle = `
      font-family: ${this.labelFont};
      font-size: ${this.labelFontSize};
    `;
    this.absoluteStyle = `
      ${this.yPosition}: 2px;
      ${this.xPosition}: 0;
    `;
    this.containerStyle =
      this.yPosition === 'top'
        ? `
      flex-direction: column;
    `
        : `
      flex-direction: column-reverse;
    `;
  }
}
