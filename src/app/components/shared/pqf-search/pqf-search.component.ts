import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {InputValidators, RegexValidators} from '@appHelpers/shared/shared.helpers';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

@Component({
  selector: 'pqf-search',
  templateUrl: './pqf-search.component.html',
  styleUrls: ['./pqf-search.component.scss'],
})
export class PqfSearchComponent implements AfterViewInit {
  readonly inputValidators = InputValidators;
  readonly validator = RegexValidators;
  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;
  @Input() disable = false; // Deshabilita el componente
  @Input() placeholder = 'common.search';
  @Input() searchTerm: string;
  @Input() typeValidation: string = this.inputValidators.AcceptAll;
  @Output() handleSearchTermSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleTypeSelected: EventEmitter<DropListOption> = new EventEmitter<DropListOption>();
  @Output() textSearch: EventEmitter<string> = new EventEmitter<string>();

  isOnFocus = false;
  inputNativeElement;
  resultsIsOpen = false;
  openType = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.inputNativeElement = this.renderer.selectRootElement(this.inputElement).nativeElement;
  }

  handleSearch(search: string): void {
    this.handleEmittedEvent();

    this.searchTerm = search;
    this.textSearch.emit(search);
    this.resultsIsOpen = search !== '' && search !== null;
  }

  private handleEmittedEvent() {
    if (!this.disable) {
      const valueToEmit = this.inputNativeElement.value;
      this.textSearch.emit(valueToEmit);
    }
  }

  onFocus(): void {
    this.resultsIsOpen = this.searchTerm !== '' && this.searchTerm !== null;
  }

  handleKeyPressEvent(event: KeyboardEvent) {
    const key = String.fromCharCode(event.which);
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
    };
    return validator[this.typeValidation]();
  }

  onSelectSearchTerm(): void {
    this.isOnFocus = false;
    this.inputElement.nativeElement.blur();
    if (this.searchTerm) {
      this.inputElement.nativeElement.blur();
      this.handleSearchTermSelected.emit(this.searchTerm);
    }
  }

  handlePasteEvent(event: ClipboardEvent) {
    const value = event.clipboardData.getData('text');
    if (!this.regexValidator(value)) {
      event.preventDefault();
    }
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
