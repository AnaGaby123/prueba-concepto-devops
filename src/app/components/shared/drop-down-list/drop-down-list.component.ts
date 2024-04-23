import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {capitalize, deburr, forEach, isEmpty, isEqual, lowerCase} from 'lodash-es';

import {
  RESPONSIVE_MENU_WIDTH_LIMIT_2100,
  VIEW_IPAD,
  VIEW_MACBOOKAIR,
} from '@appUtil/common.protocols';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss'],
})
export class DropDownListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() activeCheckItem = false;
  @Input() activeMinWidth = true;
  @Input() align = '';
  @Input() borderColor = '#D8D9DD';
  @Input() colorOnlyInSelected = false;
  @Input() controlInLine = false;
  @Input() capitalize = true;
  @Input() disable = false; // Desactivar drop-list
  @Input() disableBorderColor = '#C2C3C9';
  @Input() disableFontColor = '#C2C3C9';
  @Input() display = '';
  @Input() enableEdit = true; // Estado para visualizar la informacion en tipo etiqueta
  @Input() font = 'Roboto-Regular';
  @Input() fontColor = '#424242';
  @Input() fontSize = '16px';
  @Input() hasBorder = true;
  @Input() height = '25px';
  @Input() heightLi = '25px';
  @Input() justify = '';
  @Input() label = '';
  @Input() labelFontColor = '#424242';
  @Input() labelDisableFontColor = '#C2C3C9';
  @Input() isSearchable = false;
  @Input() items: DropListOption[];
  @Input() itemSelected: DropListOption = {} as DropListOption;
  @Input() marginLeftContent = '0px';
  @Input() marginRight = 'auto';
  @Input() maxHeightOptions = '125px';
  @Input() multiline = 'one';
  @Input() optionsPosition = 'bottom';
  @Input() optionsFontSize = '13px';
  @Input() placeholder = 'Seleccionar';
  @Input() required = false;
  @Input() secondaryColor = '#242424';
  @Input() showAsterisk = true;
  @Input() subtitleActive = false;
  @Input() textAlign = 'left';
  @Input() title = 'Seleccionar';
  @Input() valImg = 'flechaRellena';
  @Input() widthContent = '100%';
  @Output() errorData: EventEmitter<any> = new EventEmitter();
  @Output() valueDropList: EventEmitter<any> = new EventEmitter();
  @Output() itemCheckChange: EventEmitter<DropListOption> = new EventEmitter<DropListOption>();
  showDropList: boolean;
  arrayAux: Array<DropListOption> = [];
  resetSearch: boolean;
  selectedId: string;
  srcImage: string;
  srcDisableImage = 'assets/Images/drop_list_disable.svg';
  colorSelected = '#ECEEF0';
  errors = false;
  showIndicatorOfErrors = false;
  primaryClick = false;
  searchTerm = '';
  viewType;
  VIEW_IPAD = VIEW_IPAD;
  VIEW_MACBOOKAIR = VIEW_MACBOOKAIR;

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= RESPONSIVE_MENU_WIDTH_LIMIT_2100) {
      this.viewType = this.VIEW_MACBOOKAIR;
      if (this.multiline === 'one' && this.height === '25px') {
        this.height = '30px';
      }
    } else {
      this.viewType = this.VIEW_IPAD;
      if (this.multiline === 'one' && this.height === '30px') {
        this.height = '25px';
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickOut(e: MouseEvent): void {
    // DOCS: Detecta si el click global y solo procede si el drop esta abierto
    if (this.showDropList) {
      this.handleGlobalClick(e);
    }
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.showDropList = false;
    this.getImage(this.valImg);
    if (this.items) {
      this.fillArrayAux();
    }
  }

  ngAfterViewInit(): void {
    // DOCS: Se ajusta el height si es el tamaño por default "25px" en modo responsivo
    this.onResize();
    // DOCS: Si es buscador y de inicio ya tiene un valor seleccionado,
    //  se asigna a las variables correspondientes
    if (this.isSearchable && !isEmpty(this.itemSelected)) {
      this.searchTerm = this.itemSelected.label;
      this.title = this.itemSelected.label;
    }

    if (isEmpty(this.itemSelected)) {
      this.emitErrors({
        showIndicators: false,
        errors: true,
        item: this.itemSelected,
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // DOCS: Si existen los items y hubo cambios en ellos se vuelven a llenar las opciones
    if (changes.items && !isEqual(changes.items.previousValue, changes.items.currentValue)) {
      this.fillArrayAux();
    }
    // DOCS: Si es buscador y hay un item seleccionado se lleman los campos a mostrar en el HTML
    if (
      changes.itemSelected &&
      !isEqual(changes.itemSelected?.previousValue, changes.itemSelected?.currentValue)
    ) {
      this.searchTerm = changes.itemSelected?.currentValue?.label ?? '';
      this.title = changes.itemSelected?.currentValue?.label ?? 'Seleccionar';
    }
  }

  selectItem(item: DropListOption): void {
    if (this.activeCheckItem) {
      /*DOCS: Si tiene checks solo emite al que se le dio check y no hace nada más*/
      this.itemCheckChange.emit(item);
    } else {
      if (item !== undefined && item.value !== this.itemSelected?.value) {
        if (this.isSearchable) {
          this.searchTerm = this.title;
        }
        this.title = item.label;
        this.selectedId = item.value.toString();
        this.closeDropList();
        this.resetSearch = !this.resetSearch;
        this.emitErrors({
          showIndicators: false,
          errors: false,
          item,
        });
        this.valueDropList.emit(item);
      } else {
        this.closeDropList();
        if (item === undefined) {
          this.selectedId = undefined;
          this.title = 'Seleccionar';
        }
      }
    }
  }

  showIndicators(value: boolean): void {
    this.showIndicatorOfErrors = value;
  }

  emitErrors({
    showIndicators,
    errors,
    item,
  }: {
    showIndicators: boolean;
    errors: boolean;
    item: DropListOption;
  }) {
    this.showIndicators(showIndicators);
    this.errors = errors;
    this.errorData.emit({
      error: this.errors,
      data: item,
      required: this.required,
    });
  }

  openDropList(event: MouseEvent): void {
    event.stopPropagation();
    if (this.disable) {
      return;
    }
    this.searchTerm = '';
    this.fillArrayAux();
    this.primaryClick = true;
    this.showDropList = this.isSearchable ? true : !this.showDropList;
  }

  closeDropList(): void {
    this.searchTerm = this.title;
    this.showDropList = false;
  }

  handleGlobalClick(event: MouseEvent): void {
    // DOCS: Validar si el click fue fuera del componente
    const withinElement = this.elementRef.nativeElement.contains(event.target);
    if (!withinElement) {
      // DOCS: Valida si existen errores y los emite
      if (this.showDropList && this.required && !this.itemSelected?.value) {
        this.emitErrors({
          showIndicators: true,
          errors: true,
          item: null,
        });
      }
      this.closeDropList();
    }
  }

  changeSearchTerm($event): void {
    this.arrayAux = [];
    if ($event !== '') {
      forEach(this.items, (item) => {
        if (
          deburr(lowerCase(item.label)).indexOf(deburr(lowerCase($event?.toLowerCase()))) !== -1
        ) {
          this.arrayAux.push(item);
        }
      });
    } else {
      this.arrayAux = [...this.items];
    }
  }

  getImage(value: string): void {
    switch (value) {
      case 'flechaVerde':
        this.srcImage = 'assets/Images/drop_list_flechaVerde.svg';
        break;
      case 'flechaRellena':
        this.srcImage = 'assets/Images/drop_list.svg';
        break;
      default:
        this.srcImage = 'assets/Images/drop_list.svg';
        break;
    }
  }

  handleTrackByFn(index: number, item: DropListOption): string | number {
    return item.value;
  }

  /* Llenar el arreglo auxiliar */
  fillArrayAux(): void {
    this.arrayAux = [];
    /*transformamos elarreglo*/
    if (!isEmpty(this.items)) {
      const newItems = this.items.map((item) => {
        item = {
          ...item,
          label: this.capitalize ? capitalize(item.label) : item.label,
        };

        return item;
      });
      for (const item of newItems) {
        this.arrayAux.push(item);
      }
    }
  }

  // DOCS: Valida si el componente tiene la altura por default "25px" en modo iPad o "30px" en modo macBookAir
  //  Es decir, no se le ha enviado una altura personalizada
  checkIsDefaultSize(): boolean {
    return this.checkIsDefaultSizeMacBookAir() || this.checkIsDefaultSizeIpad();
  }

  // DOCS: Valida si el componente tiene la altura por default "25px" en modo iPad
  //  Es decir, no se le ha enviado una altura personalizada
  checkIsDefaultSizeIpad(): boolean {
    return this.viewType === VIEW_IPAD && this.height !== '25px';
  }

  // DOCS: Valida si el componente tiene la altura por default "30px" en modo macBookAir
  //  Es decir, no se le ha enviado una altura personalizada
  checkIsDefaultSizeMacBookAir(): boolean {
    return this.viewType === VIEW_MACBOOKAIR && this.height !== '30px';
  }
}
