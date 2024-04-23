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

import {capitalize} from 'lodash-es';

@Component({
  selector: 'app-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.scss'],
})
export class MultiselectDropdownComponent implements OnInit {
  @Output() valueDropList: EventEmitter<any> = new EventEmitter();
  @Input() items;
  @Input() align: string = '';
  @Input() itemSelect: any;
  @Input() widthContent: any = '100%';
  @Input() marginLeftContent: any = '0px';
  @Input() valImg: string = 'flechaRellena';
  @Input() heightLi: string = '25px';
  @Input() size = '16px';
  clickListener: Function;
  showDropList: boolean;
  dropListClass: string;
  @Input() title = 'Seleccionar';
  @Input() activeMinWidth: boolean = true;
  arrayAux: any = [];
  srcImagen: string;
  titleSelect: any[] = [];
  checkImg = 'assets/Images/check1.svg';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.clickListener = renderer.listen('document', 'click', (event: MouseEvent) =>
      this.handleGlobalClick(event),
    );
  }

  ngOnInit() {
    this.showDropList = false;
    this.dropListClass = 'dropList';
    this.getImage(this.valImg);
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentValue) {
      this.items = changes.currentValue;
    }
    if (changes.items.currentValue !== undefined) {
      this.items = changes.items.currentValue;
      if (this.items !== null) this.fillArrayAux();
    }
    if (changes.itemSelect !== undefined) {
      if (changes.itemSelect.currentValue !== undefined && !changes.firstChange) {
        this.selectItem(false, this.itemSelect, 0);
      }
    }
  }

  /* Llenar el arreglo auxiliar */
  fillArrayAux(): void {
    this.arrayAux = [];
    for (let item of this.items) {
      this.arrayAux.push({
        nombre: capitalize(item.nombre),
        key: item.key,
        checked: item.checked,
        checkImg: this.checkImg,
        disable: item.disable,
      });
    }
  }

  /* Selecciona opcion del drop list */
  selectItem(check: boolean, item: any, i: number): void {
    if (check) {
      this.arrayAux[i].checkImg = 'assets/Images/check2.svg';
      this.titleSelect.push(item.nombre);
      this.valueDropList.emit(this.titleSelect);
    } else {
      this.arrayAux[i].checkImg = 'assets/Images/check1.svg';
      this.removeItemFromArr(item.nombre);
    }
  }

  removeItemFromArr(item): void {
    const value = this.titleSelect.indexOf(item);

    if (value !== -1) {
      this.titleSelect.splice(value, 1);
    }
    this.valueDropList.emit(this.titleSelect);
  }

  /* Cierra el drop list */
  closeDropList(): void {
    this.showDropList = false;
  }

  /* Abre el drop list */
  openDropList(): void {
    this.showDropList = !this.showDropList;
  }

  /* Escucha el evento click globalmente */
  handleGlobalClick(event: MouseEvent): void {
    const withinElement = this.elementRef.nativeElement.contains(event.target);
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropList();
    }
  }
}
