import {Component, Inject, OnInit} from '@angular/core';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {Observable} from 'rxjs';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {CalendarDay} from '@appModels/calendario/calendar';
import {filter, forEach, map as _map} from 'lodash-es';
import {CotPartidaCotizacionCapacitacionFecha} from 'api-logistica';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-realization-dates-pop-up',
  templateUrl: './add-realization-dates-pop-up.component.html',
  styleUrls: ['./add-realization-dates-pop-up.component.scss'],
})
export class AddRealizationDatesPopUpComponent implements OnInit {
  viewType$: Observable<string> = this.store.select(selectViewType);
  readonly viewTypes = AppViewTypes;
  newDate = null;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<AddRealizationDatesPopUpComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      datesArray?: CotPartidaCotizacionCapacitacionFecha[];
      nonWorkingDays?: CalendarDay[];
    },
  ) {
    this.data.datesArray = [];
    this.data.nonWorkingDays = [];
  }

  /* DOCS: Obtiene la lista de días inhabiles al cargar el componente y si
   *   hay elementos en la lista de días seleccionados, recorre los días inhabiles
   *   para deshabilitar los que coincidan
   * */
  ngOnInit() {
    if (this.data?.datesArray?.length > 0) {
      forEach(this.data?.datesArray, (o: CotPartidaCotizacionCapacitacionFecha) => {
        this.data?.nonWorkingDays.push({
          day: new Date(o.Fecha),
          enable: false,
        });
      });
    }
  }

  // DOCS: Guarda localmente el día seleccionado en el calendario
  setDates(date: Date): void {
    this.newDate = date;
  }

  /* DOCS: Agrega la fecha almacenada en newDate y la agrega al arrego de los días
   * inhábiles, al igual que al arreglo defechas seleccionadas
   * */
  addDate(): void {
    if (this.data?.datesArray?.length < 5 && this.newDate !== null) {
      this.data?.nonWorkingDays.push({
        day: this.newDate,
        enable: false,
        color: '#008894',
      });
      this.data.datesArray = [
        ...this.data?.datesArray,
        {
          Activo: true,
          Fecha: this.newDate.toISOString(),
          FechaRegistro: DEFAULT_DATE,
          FechaUltimaActualizacion: DEFAULT_DATE,
          IdCotPartidaCotizacion: DEFAULT_UUID,
          IdCotPartidaCotizacionCapacitacionFecha: DEFAULT_UUID,
        },
      ];
      if (this.data?.datesArray?.length > 1) {
        this.data?.datesArray.sort((a, b) => {
          const fechaA = new Date(a.Fecha);
          const fechaB = new Date(b.Fecha);

          if (fechaA < fechaB) {
            return -1;
          }
          if (fechaA > fechaB) {
            return 1;
          }
          return 0;
        });
      }
      this.newDate = null;
    }
  }

  /* DOCS: Remueve la fecha deseada, si tiene un ID por defecto, solo lo retira
   * del arreglo. Si por el contrario tiene un ID valido, recorre la lista de
   * fechas guardadas y cambia la bandera de "Activo" en false.
   * También retira esta fecha del arreglo de días inhábiles
   * */
  removeDate(date: CotPartidaCotizacionCapacitacionFecha): void {
    if (date.IdCotPartidaCotizacionCapacitacionFecha === DEFAULT_UUID) {
      this.data.datesArray = filter(
        this.data?.datesArray,
        (o: CotPartidaCotizacionCapacitacionFecha) => o !== date,
      );
    } else {
      this.data.datesArray = _map(
        this.data?.datesArray,
        (o: CotPartidaCotizacionCapacitacionFecha): CotPartidaCotizacionCapacitacionFecha => {
          if (
            o.IdCotPartidaCotizacionCapacitacionFecha ===
            date.IdCotPartidaCotizacionCapacitacionFecha
          ) {
            return {
              ...o,
              Activo: false,
            };
          }
          return {
            ...o,
          };
        },
      );
    }
    this.data.nonWorkingDays = filter(
      this.data?.nonWorkingDays,
      (o: CalendarDay) => new Date(o.day).toISOString().split('T')[0] !== date.Fecha.split('T')[0],
    );
  }

  /*DOCS: Filtra el arreglo de fechas seleccionadas para mostrar unicamente
   * las que cuentan con la bandera "Activo" en true
   * */
  showOnlyActives(
    dates: Array<CotPartidaCotizacionCapacitacionFecha>,
  ): Array<CotPartidaCotizacionCapacitacionFecha> {
    return filter(dates, (o: CotPartidaCotizacionCapacitacionFecha) => o.Activo);
  }

  onClose(event: boolean): void {
    this.data.nonWorkingDays = [];
    if (event) {
      this.dialog.close({event, datesArray: this.data?.datesArray});
    } else {
      this.dialog.close({event, datesArray: null});
    }
  }
}
