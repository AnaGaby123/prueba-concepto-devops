import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {capitalize, filter, forEach, isEmpty, isEqual} from 'lodash-es';
import {
  DEFAULT_UUID,
  RESPONSIVE_MENU_WIDTH_LIMIT,
  VIEW_IPAD,
  VIEW_MACBOOKAIR,
} from '@appUtil/common.protocols';
import {NGXLogger} from 'ngx-logger';
import {generateMessage} from '@appUtil/logger';

@Component({
  selector: 'app-drop-list',
  templateUrl: './drop-list.component.html',
  styleUrls: ['./drop-list.component.scss'],
})
export class DropListComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() activeMinWidth = true;
  @Input() align = '';
  @Input() borderColor = '#D8D9DD';
  @Input() capitalize = true;
  @Input() colorPrincipal = '#008894';
  @Input() colorSecundario = '#242424';
  @Input() controlInLine = false;
  @Input() disable = false; /// Desactivar drop-list
  @Input() disableBorderColor = '#C2C3C9';
  @Input() disableFontColor = '#C2C3C9';
  @Input() display = '';
  @Input() enableEdit = true; // Estado para visualizar la informacion en tipo etiqueta
  @Input() font = 'Roboto-Regular';
  @Input() fontColor = '#424242';
  @Input() fontSize = 'l6px';
  @Input() height = '25px';
  @Input() heightLi = '25px';
  @Input() isSearchable = false;
  @Input() isCategory = false;
  @Input() items;
  @Input() itemSelect: any;
  @Input() justify = '';
  @Input() label = '';
  @Input() labelFontColor = '#424242';
  @Input() labelDisableFontColor = '#C2C3C9';
  @Input() marginLeft = '15px';
  @Input() marginLeftContent: any = '0px';
  @Input() marginRigth = 'auto';
  @Input() reducePadding = false; // Reduce el padding al minimo cuando el droplist es muy pequeño.
  @Input() required = false;
  @Input() showAsterisk = true;
  @Input() size = '14px';
  @Input() subtitle: string;
  @Input() subtitleActive = true;
  @Input() textAlign = 'left';
  @Input() title = 'Seleccionar';
  @Input() tooltip = false;
  @Input() validationDouble = false; // Para validaciones que necesiten el Value y Key concatenados
  @Input() valImg = 'flechaRellena';
  @Input() value = '';
  @Input() widthContent: any = '100%';
  @Output() errorData: EventEmitter<any> = new EventEmitter();
  @Output() valueDropList: EventEmitter<any> = new EventEmitter();
  clickListener: any;
  showDropList: boolean;
  dropListClass: string;
  arrayAux: any = [];
  resetSearch: boolean;
  srcImage: string;
  srcDisableImage = 'assets/Images/drop_list_disable.svg';
  colorSelected = '#ECEEF0';
  selectedId: string;
  errors = false;
  primaryClick = false;
  searchTerm = '';
  viewType;
  VIEW_IPAD = VIEW_IPAD;
  VIEW_MACBOOKAIR = VIEW_MACBOOKAIR;

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= RESPONSIVE_MENU_WIDTH_LIMIT) {
      this.viewType = this.VIEW_MACBOOKAIR;
      if (this.height === '25px') {
        this.height = '30px';
      }
    } else {
      this.viewType = this.VIEW_IPAD;
      if (this.height === '30px') {
        this.height = '25px';
      }
    }
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private logger: NGXLogger,
  ) {
    this.logger.warn(
      generateMessage(
        'DropListComponent',
        'Componente obsoleto, usa en su lugar DropDownListComponent',
      ),
    );
    this.clickListener = renderer.listen('document', 'click', (event: MouseEvent) =>
      this.handleGlobalClick(event),
    );
  }

  ngOnInit(): void {
    this.showDropList = false;
    this.dropListClass = 'dropList';
    this.getImage(this.valImg);
    if (this.value !== undefined && this.value !== null && this.value !== '' && this.items) {
      this.selectItem(
        this.items.filter((item) =>
          this.validationDouble
            ? item.id + '|' + item.key === this.value
              ? item
              : null
            : item.id === this.value
            ? item
            : null,
        )[0],
      );
    } else {
      this.errorData.emit({
        error: this.errors,
        data: '',
        required: this.required,
      });
    }
  }

  ngAfterViewInit(): void {
    // DOCS: Se ajusta el height si es el tamaño por default "25px" en modo responsivo
    this.onResize();
    // DOCS: Si es buscador y de inicio ya tiene un valor seleccionado,
    //  se asigna a las variables correspondientes
    if (this.isSearchable && this.value) {
    }
  }

  ngOnDestroy(): void {
    this.clickListener();
  }

  /*Se coloca la imagen*/
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

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.value &&
      !isEqual(changes.value.previousValue, changes.value.currentValue) &&
      this.items
    ) {
      this.selectItem(
        this.items.filter((item) =>
          this.validationDouble
            ? item.id + '|' + item.key === this.value
              ? item
              : null
            : item.id === this.value
            ? item
            : null,
        )[0],
      );
    }
    if (changes.disable) {
      this.disable = changes.disable.currentValue;
    }
    if (changes.enableEdit) {
      this.enableEdit = changes.enableEdit.currentValue;
    }
    if (changes.currentValue) {
      this.items = changes.currentValue;
    }
    if (changes.items !== undefined) {
      this.items = changes.items.currentValue;
      if (this.items !== null) {
        this.fillArrayAux();
      }
    }
    if (changes.itemSelect !== undefined) {
      if (changes.itemSelect.currentValue !== undefined && !changes.firstChange) {
        this.selectItem(this.itemSelect);
      }
    }
  }

  /* Llenar el arreglo auxiliar */
  fillArrayAux(): void {
    this.arrayAux = [];
    /*transformamos elarreglo*/
    if (!isEmpty(this.items)) {
      const newItems = this.items.map((item) => {
        if (item.disable !== undefined) {
          item = {
            ...item,
            nombre: this.capitalize ? capitalize(item.nombre) : item.nombre,
            disable: item.disable,
          };
        } else {
          item = {
            ...item,
            nombre: this.capitalize ? capitalize(item.nombre) : item.nombre,
          };
        }
        return item;
      });
      for (const item of newItems) {
        this.arrayAux.push(item);
      }
    }

    /* Si tenemos opciones y un value diferente al default, entonces selecciono la opción*/
    if (
      (this.value && this.value !== DEFAULT_UUID) ||
      this.value !== DEFAULT_UUID + '|' + DEFAULT_UUID
    ) {
      this.selectItem(
        filter(this.items, (item) =>
          this.validationDouble
            ? item.id + '|' + item.key === this.value
              ? item
              : null
            : item.id === this.value
            ? item
            : null,
        )[0],
      );
    }
  }

  /* Selecciona opcion del drop list */
  selectItem(item: any): void {
    if (item !== undefined) {
      if (this.isSearchable) {
        this.searchTerm = this.title;
      }
      this.selectedId = this.validationDouble ? item.id + '|' + item.key : item.id;
      this.title = item.nombre;
      if (this.subtitleActive) {
        this.title += ' ·';
      }
      this.subtitle = item.puesto;
      this.closeDropList();
      this.resetSearch = !this.resetSearch;
      this.dropListClass = 'dropListSelect';
      this.valueDropList.emit(item);
      this.errorData.emit({
        error: this.errors,
        data: item,
        required: this.required,
      });
      this.errors = false;
    } else {
      this.selectedId = undefined;
      this.title = 'Seleccionar';
      this.dropListClass = 'dropList';
    }
  }

  /* Cierra el drop list */
  closeDropList(): void {
    this.searchTerm = this.title;
    this.showDropList = false;
  }

  /* Abre el drop list */
  openDropList(): void {
    if (this.disable) {
      return;
    }
    this.searchTerm = '';
    this.primaryClick = true;
    this.showDropList = !this.showDropList;
  }

  /* Escucha el evento click globalmente */
  handleGlobalClick(event: MouseEvent): void {
    const withinElement = this.elementRef.nativeElement.contains(event.target);
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // validacion requerido
      if (
        this.primaryClick &&
        this.required &&
        (this.selectedId === undefined || this.selectedId === '')
      ) {
        this.errors = true;
      }
      this.closeDropList();
    }
  }

  /* Busqueda de search bar */
  changeSearchTerm($event): void {
    this.arrayAux = [];
    if ($event !== '') {
      forEach(this.items, (item) => {
        if (item.nombre?.toLowerCase().indexOf($event.toLowerCase()) !== -1) {
          this.arrayAux.push(item);
        }
      });
    } else {
      this.arrayAux = [...this.items];
    }
  }
}
