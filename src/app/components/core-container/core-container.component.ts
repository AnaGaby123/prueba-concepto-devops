/* Core Imports */
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {
  AppViewTypes,
  IMenuOption,
  IModel,
  IPopFile,
  IPopNotes,
  moduleMethodCounter,
} from '@appModels/store/utils/utils.model';

/* Actions Imports */
import {authLogout} from '@appActions/auth/auth.actions';
import * as actionsUtils from '@appActions/utils/utils.action';
import {DOWLOAD_FILE_LOAD} from '@appActions/utils/utils.action';

/* Selectors Imports */
import * as selectUtils from '@appSelectors/utils/utils.selectors';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import {
  RESPONSIVE_MENU_WIDTH_LIMIT,
  SESSION_IDLE,
  SESSION_TIMEOUT,
} from '@appUtil/common.protocols';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import * as servicesLogger from '@appUtil/logger';
import {CoreContainerService} from './core-container.service';
import {FilesData} from '@appComponents/catalogos/core-container/fileData';
import {SignalRService} from '@appServices/signalR/signal-r.service';
import {map} from 'lodash-es';

const FILE_NAME = 'core.container.component.ts';

@Component({
  selector: 'app-core-container',
  templateUrl: './core-container.component.html',
  styleUrls: ['./core-container.component.scss'],
})
export class CoreContainerComponent implements OnInit, AfterContentChecked {
  loading$: Observable<boolean> = this.store.select(selectUtils.selectUtilsLoading);
  menuIsOpen$: Observable<boolean> = this.store.select(selectUtils.selectMenuIsOpen);
  menuOptions$: Observable<Array<IMenuOption>> = this.store.select(
    selectUtils.selectMainMenuOptionsByUserPermissions,
  );
  messageError$: Observable<string> = this.store.select(selectUtils.selectMessageError);
  modalError$: Observable<boolean> = this.store.select(selectUtils.selectUtilsLoadingError);
  modalSuccess$: Observable<IModel> = this.store.select(selectUtils.selectUtilsLoadingSuccess);
  modalPopFile$: Observable<IPopFile> = this.store.select(selectUtils.selectUtilModalFile);
  notespop$: Observable<IPopNotes> = this.store.select(selectUtils.selectNotesPop);
  optionSelected$: Observable<Array<IMenuOption>> = this.store.select(
    selectUtils.selectOptionsOfSecondLevelSelectedMenuOption,
  );
  selectContainSubmenu$: Observable<boolean> = this.store.select(selectUtils.selectShowSubmenu);
  submenuIsOpen$: Observable<boolean> = this.store.select(selectUtils.selectSubmenuIsOpen);
  submenusSelected$: Observable<Array<IMenuOption>> = this.store.select(
    selectUtils.selectOptionsOfFirstLevelSelectedMenuOption,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  readonly viewTypes = AppViewTypes;
  activeFullScreen = false;
  blockScreen;
  element: any;
  index = 0;
  //modalLoading = false; //DOCS: REVISAR SE TIENE QUE ELIMNAR
  viewType;
  file: FilesData | null = null;
  target: HTMLElement | null = null;
  moduleCounter = moduleMethodCounter;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: any,
    private logger: NGXLogger,
    private _idle: Idle,
    private appService: CoreContainerService,
    private signalR: SignalRService,
  ) {
    this.signalR.startConnection();
    this.configureIdle();
    /*    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (
          confirm(
            '¡Versión Desactualizada!\n' +
              'Estas usando una versión desactualizada, por lo que podrías experimentar errores en el sistema\n' +
              '¿Deseas descargar la versión más reciente del sistema?',
          )
        ) {
          window.location.reload();
        }
      });
    }*/
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT) {
      this.viewType = this.viewTypes.small;
    } else {
      this.viewType = this.viewTypes.standard;
    }
    this.store.dispatch(
      actionsUtils.SET_VIEW_TYPE({
        viewType: this.viewType,
        screenSize: window.innerWidth,
      }),
    );
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullScreenModes(event) {
    this.checkScreenMode();
  }

  ngOnInit(): void {
    // DOCS: Iniciamos la detección de inactividad
    this.initIdle();

    // Detectamos status de pantalla completa
    this.checkScreenMode();

    // Asignamos DOM al estado local
    this.element = document.documentElement;

    this.onResize();

    // Obtiene los dias inhabiles
    this.store.dispatch(actionsUtils.FETCH_NON_WORKING_DAYS_LOAD());

    this.initSubscriptionFile();
  }

  initSubscriptionFile(): void {
    this.appService.files$.subscribe((file: FilesData | null) => {
      this.file = file;
    });
    this.appService.target$.subscribe((target: any) => {
      this.target = target;
    });
  }

  download(): void {
    this.store.dispatch(
      DOWLOAD_FILE_LOAD({IdArchivo: this.file?.IdArchivo, FileKey: this.file?.FileKey}),
    );
  }

  closeViewFile(): void {
    // this.store.dispatch(purchasePromiseDetailsActions.SET_OPEN_VIEW_FILE({active}));
    // DOCS: Si se setea un archivo null se limpia
    this.appService.setFile();
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  // DOCS: Evento que selecciona una opción del primer nivel (pendientes)
  handleSelectFirstLevelOptionFromMenu(selectedOption: IMenuOption): void {
    this.store.dispatch(actionsUtils.SET_FIRST_LEVEL_OPTION_FROM_MENU({selectedOption}));
  }

  // DOCS: Evento que selecciona una opción del segundo nivel (pendientes)
  handleSelectSecondLevelOptionFromMenu(selectedOption: IMenuOption): void {
    this.store.dispatch(actionsUtils.SET_SECOND_LEVEL_OPTION_FROM_MENU({selectedOption}));
  }

  closeModalError(): void {
    this.store.dispatch(actionsUtils.SET_LOADING_ERROR({active: false, message: ''}));
  }

  handleFullScreen(): void {
    this.activeFullScreen = !this.activeFullScreen;
    if (this.activeFullScreen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
  }

  checkScreenMode(): void {
    this.activeFullScreen = !!document.fullscreenElement;
  }

  openFullscreen(): void {
    if (this.element.requestFullscreen) {
      this.element.requestFullscreen();
    } else if (this.element.mozRequestFullScreen) {
      /* Firefox */
      this.element.mozRequestFullScreen();
    } else if (this.element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.element.webkitRequestFullscreen();
    } else if (this.element.msRequestFullscreen) {
      /* IE/Edge */
      this.element.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen(): void {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  closeModalSuccess(): void {
    this.store.dispatch(actionsUtils.SET_LOADING_SUCCESS({active: false, message: ''}));
  }

  closePop(): void {
    this.store.dispatch(actionsUtils.SET_IS_POP_FILE_EMAIL_CLOSE());
  }

  configureIdle() {
    this._idle.setIdle(SESSION_IDLE);
    this._idle.setTimeout(SESSION_TIMEOUT);
    this._idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this._idle.onIdleStart.subscribe(() => {
      this.logger.warn(
        servicesLogger.generateMessage(
          FILE_NAME,
          servicesLogger.LOG_INFO,
          'Se ha cumplido el tiempo de inactividad establecido',
        ),
      );
    });
    this._idle.onIdleEnd.subscribe(() => {
      this.logger.debug(
        servicesLogger.generateMessage(
          FILE_NAME,
          servicesLogger.LOG_INFO,
          'Se ha reanudado la actividad',
        ),
      );
    });
    this._idle.onTimeoutWarning.subscribe((secondsLeft: number) => {
      this.logger.warn(
        servicesLogger.generateMessage(
          FILE_NAME,
          servicesLogger.LOG_INFO,
          'Inicia cuenta regresiva para cerrar la sesión por inactividad',
        ),
      );
    });
    this._idle.onTimeout.subscribe(() => {
      this.logger.debug(
        servicesLogger.generateMessage(
          FILE_NAME,
          servicesLogger.LOG_INFO,
          'Se ha cerrado la sesión por inactividad',
        ),
      );
      this.store.dispatch(authLogout());
    });
  }

  initIdle(): void {
    this._idle.watch();
  }

  isBase64Image(base64String: string): boolean {
    return /^(data:image\/(jpeg|jpg|png|svg\+xml);base64,)/.test(base64String);
  }

  getMenuOptions(menuOptions: Array<IMenuOption>): Array<IMenuOption> {
    return map(menuOptions, (o: IMenuOption) => {
      return {
        ...o,
        options: map(
          o.options,
          (it: IMenuOption): IMenuOption => {
            let pendings = null;
            const methodCounterName = this.moduleCounter[it?.key];
            if (methodCounterName) {
              this.signalR[methodCounterName]().subscribe((value) => {
                pendings = value;
              });
            }
            return {
              ...it,
              total: pendings,
            };
          },
        ),
      };
    });
  }
}
