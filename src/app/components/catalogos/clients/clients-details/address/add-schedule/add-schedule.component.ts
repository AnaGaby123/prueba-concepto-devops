// CORE
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// SELECTORS
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {clientsAddressSelectors, clientsDetailsSelectors} from '@appSelectors/forms/clients-form';

// ACTIONS
// MODELS
import {DatosDireccionClienteComentario, VCliente} from 'api-catalogos';
import {
  IDireccion,
  IHorarioAtencion,
  initialIHorarioAtencion,
} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
// UTILS
import * as moment from 'moment';
import {find, isEqual, map as _map} from 'lodash-es';

import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-schedule',
  styleUrls: ['./add-schedule.component.scss'],
  templateUrl: './add-schedule.component.html',
})
export class AddScheduleComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('imageElement') imageElement: ElementRef;

  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  selectedClient$: Observable<VCliente> = this.store.select(clientsDetailsSelectors.selectedClient);
  selectedAddress$: Observable<IDireccion> = this.store.select(
    clientsAddressSelectors.selectedAddress,
  );

  readonly FIELD_HORA_INICIO_PRIMER_HORARIO = 'HoraInicioPrimerHorario';
  readonly FIELD_HORA_FIN_PRIMER_HORARIO = 'HoraFinPrimerHorario';
  readonly FIELD_HORA_INICIO_SEGUNDO_HORARIO = 'HoraInicioSegundoHorario';
  readonly FIELD_HORA_FIN_SEGUNDO_HORARIO = 'HoraFinSegundoHorario';
  readonly viewTypes = AppViewTypes;
  horarioMatutinoI: DropListOption[] = [];
  horarioMatutinoF: DropListOption[] = [];
  horarioVespertinoI: DropListOption[] = [];
  horarioVespertinoF: DropListOption[] = [];
  listHorarios: any[] = [];
  loadSuccess = false;
  active = 0;
  itemsTipo: any[] = [
    {nombre: 'Entrega', checked: false, key: 0, disable: false},
    {nombre: 'Revision', checked: false, key: 1, disable: false},
    {nombre: 'Cobro', checked: false, key: 2, disable: false},
    {nombre: 'Visita', checked: false, key: 3, disable: false},
  ];
  scheduleList: Array<IHorarioAtencion> = [];
  scheduleListBackup: Array<IHorarioAtencion> = [];
  checkAll = false;
  stylePointerDisabledCheckAll = true;
  styleActiveButtonAdd = false;
  errors = [];
  addressData: IDireccion;
  enableBtn = false;
  defaultImageSource = 'assets/Images/cargar_foto.svg';
  imageNativeElement;
  errorImageNativeElement = false;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialogRef<AddScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.obtenerHorario(8, 0, 21, 'matutino');
    this.obtenerHorario(8, 1, 21, 'matutino2');
    this.store.select(clientsAddressSelectors.selectedAddress).subscribe((data) => {
      this.addressData = data;
    });
    this.initialDataRegisterSchedule();
    if (this.data.edit) {
      this.initialDataEditSchedule();
    } else {
      this.filterDataItemsScheduleType();
    }
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  ngAfterViewInit() {
    this.loadSuccess = true;
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  ngOnDestroy() {
    this.horarioMatutinoI = [];
    this.horarioMatutinoF = [];
    this.horarioVespertinoI = [];
    this.horarioVespertinoF = [];
    this.listHorarios = [];
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }

  setImage(src?: string) {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }

  onClose(value: boolean): void {
    const data: {
      event: boolean;
      scheduleList: IHorarioAtencion[];
    } = {
      event: value,
      scheduleList: this.scheduleList,
    };
    this.dialog.close(data);
  }

  // DOCS: CHECKS DE LOS DIAS (LUNES, MARTES , MIERCOLES, JUEVES, VIERNES)
  cambiarValor(value: boolean, item: DatosDireccionClienteComentario, index: number): void {
    const scheduleListPreviousValue = this.scheduleList.filter((it) => it.checked);
    this.scheduleList = _map(this.scheduleList, (schedule: IHorarioAtencion, i: number) => {
      return index === i
        ? {
            ...schedule,
            checked: value,
          }
        : {
            ...schedule,
          };
    });
    this.enableDisableMarkAll();
    const scheduleLiistCurrentValue = this.scheduleList.filter((it) => it.checked);
    if (scheduleListPreviousValue.length === 2 && scheduleLiistCurrentValue.length === 1) {
      this.checkAll = false;
    }
    this.validateForm();
  }

  // DOCS: VALIDACIÓN DEL BOTON ACEPTAR
  validateForm(): void {
    //DOCS: Valida si existe algun segundo horario incompleto en los dias seleccionados
    const containsNull = find(
      this.scheduleList,
      (o) =>
        (o.HoraInicioSegundoHorario !== null
          ? !!!o.HoraFinSegundoHorario
          : o.HoraFinSegundoHorario !== null
          ? !!!o.HoraInicioSegundoHorario
          : null) && o.checked,
    );
    //DOCS: Obtener los horarios de los dias seleccinados
    const listScheduleChecked = this.scheduleList.filter((it) => it.checked);
    //DOCS: Se compara el  backup , se Valida si existe algun horario incompleto, y que almenos exista un dia seleccionado
    this.enableBtn =
      !isEqual(JSON.stringify(this.scheduleList), JSON.stringify(this.scheduleListBackup)) &&
      !!!containsNull &&
      listScheduleChecked.length > 0;
  }

  // DOCS: Metodo que se ejecuta al seleccionar un valor del drop
  formHandle(value: DropListOption, field: string, index: number) {
    //DOCS:
    this.scheduleList = _map(this.scheduleList, (schedule: IHorarioAtencion, i: number) => {
      return index === i
        ? {
            ...schedule,
            [field]: value.value,
          }
        : {
            ...schedule,
          };
    });
    switch (field) {
      case this.FIELD_HORA_INICIO_PRIMER_HORARIO:
        this.validateSchedules(index, 'mat');
        break;
      case this.FIELD_HORA_FIN_PRIMER_HORARIO:
        this.validateSchedules(index, 'mat2');
        break;
      case this.FIELD_HORA_INICIO_SEGUNDO_HORARIO:
        this.validateSchedules(index, 'vesp');
        break;
      case this.FIELD_HORA_FIN_SEGUNDO_HORARIO:
        this.validateSchedules(index, 'vesp2');
        break;
    }
    this.validateForm();
  }

  marcarTodos(event: boolean): void {
    this.loadSuccess = false;
    const result = this.scheduleList.filter((item) => item.checked === true)[0];
    if (event) {
      this.scheduleList = this.scheduleList.map((item) => {
        item.HoraInicioPrimerHorario = result.HoraInicioPrimerHorario;
        item.HoraFinPrimerHorario = result.HoraFinPrimerHorario;
        item.HoraInicioSegundoHorario = result.HoraInicioSegundoHorario;
        item.HoraFinSegundoHorario = result.HoraFinSegundoHorario;
        item.checked = event;
        return item;
      });
    } else {
      this.scheduleList = this.scheduleList.map((item) => {
        item.checked = event;
        return item;
      });
    }
    this.enableDisableMarkAll();
    this.validateForm();
  }

  //DOCS: Obtener el rango de horas del primer horario
  obtenerHorario(valueInitial: number, initial: number, iter: number, type: string): void {
    let horario: string;
    let hora = valueInitial;
    for (let i = initial; i < iter; i++) {
      if (i % 2 === 0) {
        horario = hora.toString() + ':00';
      } else {
        horario = hora.toString() + ':30';
        hora++;
      }
      const option: DropListOption = {
        label: horario,
        value: moment(horario, 'h:mm').format('H:mm'),
      };
      if (type === 'matutino') {
        this.horarioMatutinoI.push(option);
      } else if (type === 'matutino2') {
        this.horarioMatutinoF.push(option);
      }
    }
  }

  //DOCS: Obtner el rango de horas del segundo horario, (a partir la hora final del primer horario
  obtenerHorarioVespertino(
    indexHours: number,
    valueInitial: number,
    initial: number,
    iter: number,
    type: string,
  ): void {
    let horario: string;
    let hora = valueInitial;
    if (type === 'vesp') {
      this.listHorarios[indexHours].hVI = [];
    }
    if (type === 'vesp2') {
      this.listHorarios[indexHours].hVF = [];
    }
    for (let i = initial; i < iter; i++) {
      if (i % 2 === 0) {
        horario = hora.toString() + ':00';
      } else {
        horario = hora.toString() + ':30';
        hora++;
      }
      if ((horario === '18:30' && type === 'vesp2') || (horario === '18:00' && type === 'vesp')) {
        break;
      }
      const option: DropListOption = {
        label: horario,
        value: moment(horario, 'h:mm').format('H:mm'),
      };
      if (type === 'vesp') {
        this.listHorarios[indexHours].hVI.push(option);
      } else if (type === 'vesp2') {
        this.listHorarios[indexHours].hVF.push(option);
      }
    }
  }

  initialDataRegisterSchedule(): void {
    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    dias.forEach((item: string) => {
      const object: IHorarioAtencion = {
        ...initialIHorarioAtencion(),
        HoraInicioPrimerHorario: '8:00',
        HoraFinPrimerHorario: '8:30',
        HoraInicioSegundoHorario: null,
        HoraFinSegundoHorario: null,
        Dia: item,
        checked: false,
      };
      const listH = {
        dia: item,
        hMI: this.horarioMatutinoI,
        hMF: this.horarioMatutinoF,
        hVI: this.horarioVespertinoI,
        hVF: this.horarioVespertinoF,
      };
      this.listHorarios.push(listH);
      this.scheduleList.push(object);
    });
    this.scheduleListBackup = this.scheduleList;
    _map(this.scheduleList, (o, index) => this.resetEveningSchedule(index, false));
  }

  //DOCS: METODO INICIALIZADOR CUANDO SE QUIERE EDITAR EL HORARIO
  initialDataEditSchedule(): void {
    const schedules = {
      Entrega: this.addressData.horariosEntrega,
      Revision: this.addressData.horariosRevision,
      Cobro: this.addressData.horariosCobro,
      Visita: this.addressData.horariosVisita,
    };
    this.scheduleList = this.findSchedule(schedules[this.data.type]);
    this.scheduleListBackup = this.findSchedule(schedules[this.data.type]);
  }

  findSchedule(schedules: Array<IHorarioAtencion>): Array<IHorarioAtencion> {
    _map(this.scheduleList, (o, index) => this.resetEveningSchedule(index, true));
    return _map(this.scheduleList, (item: IHorarioAtencion, index) => {
      const found = find(schedules, (o: IHorarioAtencion) => o.Dia === item.Dia);
      return found ?? item;
    });
  }

  filterDataItemsScheduleType(): void {
    if (this.addressData.horariosEntrega.length > 0) {
      this.disableItems('Entrega');
    }
    if (this.addressData.horariosRevision.length > 0) {
      this.disableItems('Revision');
    }
    if (this.addressData.horariosCobro.length > 0) {
      this.disableItems('Cobro');
    }
    if (this.addressData.horariosVisita.length > 0) {
      this.disableItems('Visita');
    }
  }

  disableItems(scheduleType: string) {
    this.itemsTipo = this.itemsTipo.map((item) => {
      if (item.nombre === scheduleType) {
        item = {...item, disable: true};
      }
      return item;
    });
  }

  enableDisableMarkAll() {
    const allCheckets = this.scheduleList.filter((item) => item.checked);
    this.stylePointerDisabledCheckAll = !(allCheckets.length > 0 && allCheckets.length < 2);
    this.styleActiveButtonAdd = allCheckets.length > 0;
  }

  //DOCS: saber que hora a sido cambiada a partir del drop, para validar los horarios
  validateSchedules(index: number, type: string) {
    let hourSelected;
    let schedule;
    if (type === 'mat') {
      hourSelected = moment(this.scheduleList[index].HoraInicioPrimerHorario, 'h:mm');
      schedule = this.listHorarios[index].hMF;
    }
    if (type === 'mat2') {
      hourSelected = moment(this.scheduleList[index].HoraFinPrimerHorario, 'h:mm');
      schedule = this.listHorarios[index].hMI;
    }
    if (type === 'vesp') {
      hourSelected = moment(this.scheduleList[index].HoraInicioSegundoHorario, 'h:mm');
      schedule = this.listHorarios[index].hVF;
    }
    if (type === 'vesp2') {
      hourSelected = moment(this.scheduleList[index].HoraFinSegundoHorario, 'h:mm');
      schedule = this.listHorarios[index].hVI;
    }
    this.getSchudelesDisable(schedule, hourSelected, index, type);
  }

  //DOCS: Agregar los nuevos valores de los horarios a los drop y objeto de IHorariosAtencion
  getSchudelesDisable(
    scheduleList: DropListOption[],
    hourSelected: any,
    index: number,
    type: string,
  ) {
    //DOCS: Obtener las horas que actualmente estan seleccionadas
    const horaInicioPrimerHorario = moment(
      this.scheduleList[index].HoraInicioPrimerHorario,
      'h:mm',
    );
    const horaInicioSegundoHorario = moment(
      this.scheduleList[index].HoraInicioSegundoHorario,
      'h:mm',
    );
    const horaFinSegundoHorario = moment(this.scheduleList[index].HoraFinSegundoHorario, 'h:mm');

    //DOCS: obtner el indice de la hora seleccionada
    const indexHourSelected = scheduleList.findIndex((option: DropListOption) =>
      isEqual(moment(option.value, 'h:mm'), hourSelected),
    );

    //DOCS: a partir del drop seleccionado, se validará si las horas de inicio o fin de los horarios deben ser modificadas
    if (type === 'mat') {
      if (hourSelected >= horaInicioPrimerHorario) {
        this.scheduleList[index].HoraFinPrimerHorario = scheduleList[indexHourSelected + 1].value;
      }
      this.resetEveningSchedule(index, false);
    }

    if (type === 'mat2') {
      if (hourSelected <= horaInicioPrimerHorario) {
        this.scheduleList[index].HoraInicioPrimerHorario =
          scheduleList[indexHourSelected - 1].value;
      }
      this.resetEveningSchedule(index, false);
    }

    if (type === 'vesp' && hourSelected >= horaFinSegundoHorario) {
      this.scheduleList[index].HoraFinSegundoHorario = scheduleList[indexHourSelected + 1].value;
    }

    if (type === 'vesp2' && hourSelected <= horaInicioSegundoHorario) {
      this.scheduleList[index].HoraInicioSegundoHorario = scheduleList[indexHourSelected - 1].value;
    }
  }

  //DOCS: Metodo que validará a partir de la HoraInicioPrimerHorario el inicio del segundo horario
  resetEveningSchedule(index: number, isEdit: boolean) {
    //DOCS: Si el horario no es nuevo no se van inicializarán las horas de los segundos horarios en null
    if (!isEdit) {
      this.scheduleList[index].HoraInicioSegundoHorario = null;
      this.scheduleList[index].HoraFinSegundoHorario = null;
    }

    if (
      this.scheduleList[index].HoraFinPrimerHorario !== '17:30' &&
      this.scheduleList[index].HoraFinPrimerHorario !== '18:00'
    ) {
      const hourComplete = this.scheduleList[index].HoraFinPrimerHorario.split(':');
      const hour = parseInt(hourComplete[0], 10);
      const minutes = parseInt(hourComplete[1], 10);

      //DOCS: obtener el rango inicial para el drop de la primera hora del segundo horario, ejemplo: (14:30) y  (16:00), (leer con atencion el ejemplo de las horas)
      const valueInitialVesp = minutes === 30 ? hour + 1 : hour; //DOCS: si los minutos de la HoraFinPrimerHorario seleccionada es 30, se aumentará  una hora -> (15:??) y  (16:??)
      const initialVesp = minutes === 30 ? 0 : 1; //DOCS: Evalua si los minutos de la HoraFinPrimerHorario son 30 o no ->  final 15:00 y 16:30

      //DOCS: obtener el rango inicial para el drop de la primera hora del segundo horario
      const valueInitialVesp2 = valueInitialVesp > hour ? valueInitialVesp : hour + 1; //DOCS: Evalua si la hora del primer drop aumentó o no  -> (15:??) y (17:??)
      const initialVesp2 = initialVesp === 0 ? 1 : 0; //DOCS: Evalua si los minutos del primer horario comienzarán en 30 min o no ->  final 15:30 y (17:30)

      this.obtenerHorarioVespertino(index, valueInitialVesp, initialVesp, 21, 'vesp');
      this.obtenerHorarioVespertino(index, valueInitialVesp2, initialVesp2, 21, 'vesp2');
    } else {
      this.listHorarios[index].hVI = [];
      this.listHorarios[index].hVF = [];
    }
  }
}
