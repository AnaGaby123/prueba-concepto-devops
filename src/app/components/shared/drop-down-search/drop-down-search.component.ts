import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {capitalize, isEmpty, isEqual} from 'lodash-es';

@Component({
  selector: 'app-drop-down-search',
  templateUrl: './drop-down-search.component.html',
  styleUrls: ['./drop-down-search.component.scss'],
})
export class DropDownSearchComponent implements OnInit {
  @Output() valueDropList: EventEmitter<any> = new EventEmitter();
  @Output() errorData: EventEmitter<any> = new EventEmitter();
  @Input() items: any;
  @Input() isSearch = true;
  @Input() isCategory = false;
  @Input() size = '';
  @Input() align = '';
  @Input() itemSelect: any;
  @Input() widthContent: any = '100%';
  @Input() marginLeftContent: any = '0px';
  @Input() tooltip = false;
  @Input() valImg = 'flechaRellena';
  @Input() heightLi = '25px';
  @Input() colorPrincipal = '#424242';
  @Input() colorSecundario = '#424242';
  @Input() title = 'Buscar';
  @Input() subtitle: string;
  @Input() subtitleActive = true;
  @Input() required = false;
  @Input() disable = false;
  @Input() enableEdit = true;
  @Input() controlInLine = false;
  @Input() capitalize = true;
  clickListener: () => void;
  showDropList: boolean;
  dropListClass: string;
  searchTerm: string = null;
  arrayAux: any = [];
  search: string;
  resetSearch: boolean;
  srcImagen: string;
  primaryClick = false;
  selectedId: string;
  errors = false;
  @Input() value = '';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.clickListener = renderer.listen('document', 'click', (event: MouseEvent) =>
      this.handleGlobalClick(event),
    );
  }

  ngOnInit(): void {
    this.dropListClass = 'dropList';
    this.getImage(this.valImg);
    if (this.value !== undefined && this.value !== null && this.value !== '') {
      this.selectItem(this.items.filter((item) => (item.id === this.value ? item : null))[0]);
    } else {
      this.errorData.emit({
        error: this.errors,
        data: '',
        required: this.required,
      });
    }
  }

  ngOnDestroy(): void {
    this.clickListener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.value &&
      !isEqual(changes.value.previousValue, changes.value.currentValue) &&
      this.items
    ) {
      this.selectItem(this.items.filter((item) => (item.id === this.value ? item : null))[0]);
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
      if (this.items !== null) this.fillArrayAux();
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
  }

  /*Se coloca la imagen*/
  getImage(value: string): void {
    switch (value) {
      case 'flechaVerde':
        this.srcImagen = 'assets/Images/drop_list_flechaVerde.svg';
        break;
      case 'flechaRellena':
        this.srcImagen = 'assets/Images/drop_list.svg';
        break;
      default:
        this.srcImagen = 'assets/Images/drop_list_flechaVerde.svg';
        break;
    }
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

  /* Cierra el drop list */
  closeDropList(): void {
    this.showDropList = false;
  }

  /* Abre el drop list */
  openDropList($event): void {
    this.primaryClick = true;
    this.showDropList = !this.showDropList;
    $event.stopPropagation();
  }

  /* Busqueda de search bar */
  changeSearchTerm($event): void {
    this.arrayAux = [];
    if ($event !== '') {
      for (const item of this.items) {
        if (item.nombre.toLowerCase().indexOf($event.toLowerCase()) !== -1) {
          this.arrayAux.push(item);
        }
      }
    } else {
      this.arrayAux = [...this.items];
    }
  }

  /* Selecciona opcion del drop list */
  selectItem(item: any): void {
    if (item !== undefined) {
      this.selectedId = item.id;
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
}
