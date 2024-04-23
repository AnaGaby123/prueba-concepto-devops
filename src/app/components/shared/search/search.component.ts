import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {InputValidators, RegexValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnChanges, AfterViewInit {
  readonly inputValidators = InputValidators;
  readonly validator = RegexValidators;
  isOnFocus = false;
  inputNativeElement;
  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;
  @Input() activeRefresh = false;
  @Input() backgroundColor = 'transparent';
  @Input() borderColor = '#D8D9DD';
  @Input() imageFill = 'transparent';
  @Input() isDisable = false;
  @Input() isExpandable = false;
  @Input() isLoading = false;
  @Input() isSearchByType = false;
  @Input() itemSelected: DropListOption;
  @Input() placeholder = 'Ingresa  algo';
  @Input() resultItems: Array<DropListOption> = [];
  @Input() searchTerm: string;
  @Input() typeSelected: DropListOption = {} as DropListOption;
  @Input() typesOfSearch: Array<DropListOption> = [];
  @Input() typeValidation: string = this.inputValidators.AcceptAll;
  @Output() handleClearSearchTerm: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleItemSelected: EventEmitter<DropListOption> = new EventEmitter<DropListOption>();
  @Output() handleSearchTermSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleTypeSelected: EventEmitter<DropListOption> = new EventEmitter<DropListOption>();
  @Output() textSearch: EventEmitter<string> = new EventEmitter<string>();

  resultsIsOpen = false;
  openType = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.inputNativeElement = this.renderer.selectRootElement(this.inputElement).nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.activeRefresh &&
      changes &&
      changes.searsearchTerm &&
      changes.searchTerm.previousValue !== changes.searchTerm.currentValue
    ) {
      this.searchTerm = changes.searchTerm.currentValue;
    }
  }

  handleSearch(search: string): void {
    this.handleEmittedEvent();

    this.searchTerm = search;
    this.textSearch.emit(search);
    this.resultsIsOpen = search !== '' && search !== null;
  }

  private handleEmittedEvent(): void {
    if (!this.isDisable) {
      const valueToEmit = this.inputNativeElement.value;
      this.textSearch.emit(valueToEmit);
    }
  }

  onClearSearchTerm(): void {
    this.searchTerm = '';
    this.textSearch.emit('');
    this.handleClearSearchTerm.emit();
  }

  onFocus(): void {
    this.resultsIsOpen = this.searchTerm !== '' && this.searchTerm !== null;
  }

  handleKeyDownEvent(event: KeyboardEvent): void {
    const key = event?.key;
    if (!this.regexValidator(key)) {
      event.preventDefault();
    }
  }

  private regexValidator(key: string): boolean {
    const validator = {
      [InputValidators.AlphaAndSpaces]: () => this.validator.alphaAndSpaces.test(key),
      [InputValidators.AlphaAndSpacesAndNumbers]: () =>
        this.validator.alphaAndSpacesAndNumbers.test(key),
      [InputValidators.DecimalNumber]: () => this.validator.decimalNumber.test(key),
      [InputValidators.AcceptAll]: () => this.validator.acceptAll.test(key),
      [InputValidators.Number]: () => this.validator.number.test(key),
      [InputValidators.CASNumber]: () => this.validator.CASNumber.test(key),
      [InputValidators.NumberAndDots]: () => this.validator.numberAndDots.test(key),
    };
    return validator[this.typeValidation]();
  }

  // DOCS: Validadores que si acepta, cualquier otro diferente a estos no esta considerado en las validaciones,
  // si es necesario de utilizar uno diferente; revisar en que validaciones deberia de entrar y agregarlo
  private validateByType(): void {
    let regex;
    switch (this.typeValidation) {
      case this.inputValidators.Number:
        regex = this.validator.number;
        break;
      case this.inputValidators.DecimalNumber:
        regex = this.validator.decimalNumber;
        break;
      case this.inputValidators.AlphaAndSpaces:
      case 'text':
        regex = this.validator.alphaAndSpaces;
        break;
      case this.inputValidators.AlphaAndSpacesAndNumbers:
        regex = this.validator.alphaAndSpacesAndNumbers;
        break;
      case this.inputValidators.Alphanumeric:
        regex = this.validator.alphanumeric;
        break;
      case this.inputValidators.AcceptAll:
        regex = this.validator.acceptAll;
        break;
      case this.inputValidators.CASNumber:
        regex = this.validator.CASNumber;
        break;
    }
  }

  onSelectSearchTerm(): void {
    this.isOnFocus = false;
    this.inputElement.nativeElement.blur();
    if (this.searchTerm) {
      this.inputElement.nativeElement.blur();
      this.handleSearchTermSelected.emit(this.searchTerm);
    }
  }

  handlePasteEvent(event: ClipboardEvent): void {
    const value = event.clipboardData?.getData('text');
    if (!this.regexValidator(value)) {
      event.preventDefault();
    }
  }

  /*DOCS: Se seleccionó un elemento de la lista de resultados*/
  onSelectItem(item: DropListOption): void {
    this.handleItemSelected.emit(item);
  }

  openSearchType(event: Event): void {
    event.stopPropagation();
    this.openType = !this.openType;
  }

  handleType(type: DropListOption): void {
    this.openType = false;
    this.handleTypeSelected.emit(type);
  }

  closeCombo(event: Event): void {
    event.stopPropagation();
    this.openType = false;
  }

  onBlur(): void {
    setTimeout(() => {
      this.resultsIsOpen = false;
    }, 200);
  }
}
