import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';

@Component({
  selector: 'app-drop-down-multilabel-list',
  templateUrl: './drop-down-multilabel-list.component.html',
  styleUrls: ['./drop-down-multilabel-list.component.scss'],
})
export class DropDownMultilabelListComponent implements OnInit {
  @Output() valueDropList: EventEmitter<any> = new EventEmitter();
  @Output() errorData: EventEmitter<any> = new EventEmitter();
  @Input() font = 'Roboto-Regular';
  @Input() fontSize = '16px';
  @Input() borderColor = '#D8D9DD';
  @Input() textAlign = 'left';
  @Input() required = false;
  @Input() showAsterisk = true;
  @Input() label = '';
  @Input() items: IDropListMulti[];
  @Input() selectedItem: IDropListMulti = {} as IDropListMulti;
  @Input() align = '';
  @Input() widthContent = '100%';
  @Input() marginLeftContent = '0px';
  @Input() valImg = 'flechaRellena';
  @Input() heightLi = '25px';
  @Input() secondaryColor = '#242424';
  @Input() marginRigth = 'auto';
  @Input() display = '';
  @Input() justify = '';
  @Input() placeholder = 'Seleccionar';
  @Input() subtitleActive = false;
  @Input() activeMinWidth = true;
  @Input() disable = false; /// Desactivar drop-list
  @Input() enableEdit = true; // Estado para visualizar la informacion en tipo etiqueta
  @Input() controlInLine = false;
  @Input() capitalize = true;
  @Input() activeResetTitle = false;
  @Input() height = '49px';

  clickListener: any;
  showDropList: boolean;
  dropListClass: string;
  resetSearch: boolean;
  selectedId: string;
  srcImagen: string;
  srcImagenDisable = 'assets/Images/drop_list_disable.svg';
  colorSelected = '#ECEEF0';
  errors = false;
  primaryClick = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.clickListener = renderer.listen('document', 'click', (event: MouseEvent) =>
      this.handleGlobalClick(event),
    );
  }

  ngOnInit(): void {
    this.showDropList = false;
    this.dropListClass = 'dropList';
    this.getImage(this.valImg);
  }

  selectItem(item: IDropListMulti): void {
    if (item !== undefined && item.value !== this.selectedItem.value) {
      this.selectedId = item.value.toString();
      this.closeDropList();
      this.resetSearch = !this.resetSearch;
      this.dropListClass = 'dropListSelect';
      this.valueDropList.emit(item);
    } else {
      this.closeDropList();
      this.dropListClass = 'dropList';
      if (item === undefined) {
        this.selectedId = undefined;
      }
      this.errorData.emit({
        error: this.errors,
        data: item,
        required: this.required,
      });
    }
  }

  openDropList(): void {
    if (this.disable) {
      return;
    }
    this.primaryClick = true;
    this.showDropList = !this.showDropList;
  }

  closeDropList(): void {
    this.showDropList = false;
  }

  handleGlobalClick(event: MouseEvent): void {
    const withinElement = this.elementRef.nativeElement.contains(event.target);
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // validacion requerido
      if (
        this.primaryClick &&
        this.required &&
        (this.selectedItem?.value === undefined || this.selectedItem?.value === '')
      ) {
        this.errors = true;
      }
      this.closeDropList();
    }
  }

  getImage(value: string): void {
    switch (value) {
      case 'flechaVerde':
        this.srcImagen = 'assets/Images/drop_list_flechaVerde.svg';
        break;
      case 'flechaRellena':
        this.srcImagen = 'assets/Images/drop_list.svg';
        break;
      default:
        this.srcImagen = 'assets/Images/drop_list.svg';
        break;
    }
  }

  handleTrackByFn(index: number, item: IDropListMulti): string | number {
    return item.value;
  }
}
