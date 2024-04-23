import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';
import {map as _map} from 'lodash-es';

import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Store} from '@ngrx/store';
import {ISchedule} from '@appModels/catalogos/direccion/direccion';
import {generateSchedule} from '@appUtil/dates';

@Component({
  selector: 'app-pop-up-add-event',
  templateUrl: './pop-up-add-event.component.html',
  styleUrls: ['./pop-up-add-event.component.scss'],
})
export class PopUpAddEventComponent implements OnInit {
  @Output() emitClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  width = '930px';
  height = '805px';
  optionsTab: Array<ITabOption> = [
    {id: '1', label: 'DATOS GENERALES'},
    {id: '2', label: 'CRITERIOS'},
  ];
  selectedTab: ITabOption = {id: '1', label: 'DATOS GENERALES'};
  typesEvent: Array<IRadioButton> = [
    {value: false, label: 'Entrega Especial'},
    {value: false, label: 'Recolección Especial'},
    {value: false, label: 'Devolución'},
    {value: false, label: 'Entrega en Almacén'},
  ];
  typesDestiny: Array<IRadioButton> = [
    {value: false, label: 'Cliente'},
    {value: false, label: 'Proveedor'},
  ];
  optionsPriority: Array<DropListOption> = [
    {value: '2', label: 'Normal'},
    {value: '2', label: 'Urgente'},
    {value: '2', label: 'Inaplazable'},
  ];
  morningHoursI: Array<DropListOption> = [];
  morningHoursF: Array<DropListOption> = [];
  nightTimeI: Array<DropListOption> = [];
  nightTimeF: Array<DropListOption> = [];
  scheduleList: ISchedule[] = [
    {
      Dia: 'Todos',
      HoraInicioPrimerHorario: null,
      HoraFinPrimerHorario: null,
      HoraInicioSegundoHorario: null,
      HoraFinSegundoHorario: null,
    },
    {
      Dia: 'Lunes',
      HoraInicioPrimerHorario: null,
      HoraFinPrimerHorario: null,
      HoraInicioSegundoHorario: null,
      HoraFinSegundoHorario: null,
    },
    {
      Dia: 'Martes',
      HoraInicioPrimerHorario: null,
      HoraFinPrimerHorario: null,
      HoraInicioSegundoHorario: null,
      HoraFinSegundoHorario: null,
    },
    {
      Dia: 'Miércoles',
      HoraInicioPrimerHorario: null,
      HoraFinPrimerHorario: null,
      HoraInicioSegundoHorario: null,
      HoraFinSegundoHorario: null,
    },
    {
      Dia: 'Jueves',
      HoraInicioPrimerHorario: null,
      HoraFinPrimerHorario: null,
      HoraInicioSegundoHorario: null,
      HoraFinSegundoHorario: null,
    },
    {
      Dia: 'Viernes',
      HoraInicioPrimerHorario: null,
      HoraFinPrimerHorario: null,
      HoraInicioSegundoHorario: null,
      HoraFinSegundoHorario: null,
    },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.morningHoursI = generateSchedule('7:00', '13:30', 30);
    this.morningHoursF = generateSchedule('7:30', '14:00', 30);
    this.nightTimeI = generateSchedule('15:00', '17:30', 30);
    this.nightTimeF = generateSchedule('15:30', '18:00', 30);
  }

  setTypeEvent(item: IRadioButton): void {
    if (item.value) {
      this.typesEvent = _map(this.typesEvent, (radio) => ({
        ...radio,
        value: radio.label === item.label,
      }));
    }
  }

  setOptionTab(tab: ITabOption): void {
    this.selectedTab = tab;
  }

  actionPop(value: boolean): void {
    this.emitClose.emit(false);
  }
}
