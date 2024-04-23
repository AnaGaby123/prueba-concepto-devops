import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {enterLeave} from '@appHelpers/core/animations';
import {isEmpty, isEqual} from 'lodash-es';

import {
  DropListOptionPqf,
  DropListOptionsPqf,
} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';

@Component({
  animations: enterLeave,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pqf-drop-down-list',
  templateUrl: './pqf-drop-down-list.component.html',
  styleUrls: ['./pqf-drop-down-list.component.scss'],
})
export class PqfDropDownListComponent {
  @Input() forceError: boolean = false; // DOCS Fuerza el error externo
  @Input() isActive: boolean = true; // DOCS Esta activo el drop
  @Input() isRequired: boolean = false; // DOCS Campo requerido
  @Input() label?: string; // DOCS texto a mostrar sobre el drop
  @Input() noOptionsMessage = 'Sin resultados'; // DOCS Mensaje al no contar con opciones disponibles
  @Input() options?: DropListOptionsPqf | null = []; // DOCS Opciones para el llenado del drop
  @Input() isReadonly: boolean = false; // DOCS Modo solo lectura
  @Input() activeCheckItem = false; // DOCS Habilita los checks en las opciones del drop
  @Input() placeholder = 'Selecciona una opción'; // DOCS Text a mostrar en el place holder al no tener una opción seleccionada
  @Input() selectedOption?: DropListOptionPqf | null; // DOCS Opcion seleccionada
  @Output() selectedOptionChangeEmitter: EventEmitter<DropListOptionPqf> = new EventEmitter<
    DropListOptionPqf
  >(); // DOCS Emite la opcion seleccionada
  @ViewChild('boxContainer') boxContainer?: ElementRef;
  @ViewChild('optionsContainer') optionsContainer?: ElementRef;

  public displayedOptions?: DropListOptionsPqf | null = [];
  public error = false; // DOCS validacion de error interna
  public isEmpty = isEmpty;
  public optionsAreOpen = false; // DOCS controla si el drop se desplego

  // DOCS Escucha los clicks fuera del componente
  @HostListener('document:click', ['$event'])
  clickOut(e: MouseEvent): void {
    const withinElement = this.elementRef.nativeElement.contains(e.target);
    if (!withinElement) {
      if (this.optionsAreOpen && this.isRequired && !this.selectedOption?.id) {
        this.error = true;
      }
      this.handleDropOpen(false);
    }
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.options && !isEqual(changes.options.previousValue, changes.options.currentValue)) {
      this.fillDisplayedOptions();
    }
  }

  handleOpenOptions(event: MouseEvent, value: boolean): void {
    if (this.isActive) {
      this.handleDropOpen(value);
    }
  }

  handleSelectOption(event: MouseEvent, option: DropListOptionPqf): void {
    if (
      option &&
      option.id !== this.selectedOption?.id &&
      !option.inActive &&
      !this.activeCheckItem
    ) {
      this.emitValue(option);
      this.handleDropOpen(false);
      this.cdr.detectChanges();
    } else {
      this.emitValue(option);
    }
    event.stopPropagation();
  }

  emitValue(option: DropListOptionPqf): void {
    this.error = false;
    this.selectedOptionChangeEmitter.emit(option);
  }

  // DOCS Abre o cierra las opciones del drop
  handleDropOpen(value: boolean): void {
    this.optionsAreOpen = value;
    this.cdr.detectChanges();
  }

  fillDisplayedOptions(): void {
    this.displayedOptions = this.options;
    this.cdr.detectChanges();
  }

  handleTrackById(index: number, item: DropListOptionPqf): string {
    return item.id;
  }
}
