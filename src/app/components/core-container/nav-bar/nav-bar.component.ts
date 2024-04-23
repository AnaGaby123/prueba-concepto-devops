/* Core Imports */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '@appCore/core.state';

/* Selectors Imports */
/* Models Imports */
import {AppViewTypes, IMenuOption} from '@appModels/store/utils/utils.model';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {SET_MENU_IS_OPEN} from '@appActions/utils/utils.action';
import {filter, isEmpty} from 'lodash-es';

const FILE_NAME = 'nav-bar.component.ts';

export interface IEmitSelectSubOption {
  subMenu: IMenuOption;
  index: number;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements AfterViewInit {
  @ViewChildren('submenuOptions') submenuOptions: QueryList<ElementRef>;
  @ViewChildren('navOptions') navOptions: QueryList<ElementRef>;
  @ViewChildren('firstLevel') firstLevel: QueryList<ElementRef>;
  @Input() mainMenuOptions: Array<IMenuOption> = []; // Opciones del menu
  @Input() secondMenuOptions: Array<IMenuOption> = []; // Submenu seleccionado
  @Input() optionSelected: Array<IMenuOption> = []; // Opción seleccionada
  @Input() containSubmenu = false; // Bandera para indicar si el menu seleccionado tiene un submenu
  @Input() menuIsOpen = true; // Bandera para abrir/cerrar menu
  @Input() submenuIsOpen = false; // Bandera para abrir/cerrar submenu
  @Input() menuWidth: number = 0;
  @Output()
  handleCloseMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  handleCloseSubmenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  handleSelectOptionFromMenu: EventEmitter<IMenuOption> = new EventEmitter<IMenuOption>();
  @Output()
  handleSelectOptionFromSubMenu: EventEmitter<boolean> = new EventEmitter();
  @Output() handleOpenSubmenu: EventEmitter<IMenuOption> = new EventEmitter<IMenuOption>();
  @Output()
  handleSelectOptionFromOption: EventEmitter<IMenuOption> = new EventEmitter<IMenuOption>();
  @Output()
  handleSelectSubOption: EventEmitter<IEmitSelectSubOption> = new EventEmitter<
    IEmitSelectSubOption
  >();
  viewType$: Observable<string> = this.store.select(selectViewType);
  height: Array<number> = [];
  isFirstLoad = true;
  navContentNative;
  navContentWidth = '0px';
  navContentHeight = '0px';
  fistLevelNative;
  readonly viewTypes = AppViewTypes;

  constructor(
    private store: Store<AppState>,
    private logger: NGXLogger,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.calculateSpace();
  }

  ngAfterViewInit(): void {
    this.renderer.selectRootElement(this.submenuOptions.toArray()).forEach((o) => o.nativeElement);
    this.calculateSpace();
  }

  // DOCS: Selecciona una opción del primer nivel
  selectFirstLevelOptionFromMenu(selectedOption: IMenuOption): void {
    this.logger.debug(
      servicesLogger.generateMessage(FILE_NAME, '@redirectTo: Index'),
      selectedOption.url,
    );
    this.handleSelectOptionFromMenu.emit(selectedOption);
  }

  // DOCS: Evento que selecciona una opción del segundo nivel (pendientes)
  selectSecondLevelOptionFromMenu(selectedOption: IMenuOption): void {
    this.isFirstLoad = true;
    this.logger.debug(
      servicesLogger.generateMessage(FILE_NAME, '@handleOpenSubmenu: Index'),
      selectedOption.url,
    );
    this.handleOpenSubmenu.emit(selectedOption);
    setTimeout(() => {
      this.store.dispatch(SET_MENU_IS_OPEN({isOpen: false}));
    }, 600);
  }

  handleTrackBy(index: number, product: IMenuOption): string {
    return product.title;
  }
  handleSubmenuTrackBy(index: number, product: IMenuOption) {
    return product.order;
  }

  calculateSpace() {
    this.navContentNative = this.renderer.selectRootElement(this.navOptions).first.nativeElement;
    this.fistLevelNative = this.renderer.selectRootElement(this.firstLevel).first.nativeElement;
    this.navContentWidth = `${this.navContentNative.clientWidth}px`;
    this.navContentHeight = `${
      this.navContentNative.offsetHeight - this.fistLevelNative.offsetHeight * 7
    }px`;
    this.cdr.detectChanges();
  }
  // DOCS: VALIDACIÓN PARA MOSTRAR EL INDICADOR DE PENDIENTES
  showIndicator(options: Array<IMenuOption>): boolean {
    return !isEmpty(filter(options, (o: IMenuOption) => o.total !== null && o.total > 0));
  }
}
