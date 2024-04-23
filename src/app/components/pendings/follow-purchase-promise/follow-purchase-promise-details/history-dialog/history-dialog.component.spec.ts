import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HistoryDialogComponent} from './history-dialog.component';
import {Store} from '@ngrx/store';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PopUpGenericComponent} from '@appComponents/shared/pop-up-generic/pop-up-generic.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ICustomerFPP} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {followPPromiseDetailsSelectors} from '@appSelectors/pendings/follow-purchase-promise';
import {
  IFollowPPromiseClientData,
  IFollowPPromiseDetails,
} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details.models';
import {CotPromesaDeCompraPartida, GMCotFletes, VCotCotizacion} from 'api-logistica';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {of} from 'rxjs';
import {DateFormatModule} from '@appPipes/date-format.module';
import {TranslateTestingModule} from 'ngx-translate-testing';

describe('HistoryDialogComponent', () => {
  let component: HistoryDialogComponent;
  let fixture: ComponentFixture<HistoryDialogComponent>;
  let compiled: HTMLElement;

  // DOCS: SE SIMULA UN STATE CON LOS SIGUIENTES DATOS
  const initialState: IFollowPPromiseDetails = {
    selectedClient: {
      Alias: 'OTimes',
      Folio: 'F0-010824-0561',
      Partidas: 8,
    } as ICustomerFPP,
    clientData: {} as IFollowPPromiseClientData,
    quotation: {} as VCotCotizacion,
    freightsQuotation: {} as GMCotFletes,
    searchTerm: '',
    searchOptions: [
      {
        value: '1',
        label: 'Catálogo',
      },
      {
        value: '2',
        label: 'Concepto',
      },
      {
        value: '3',
        label: 'Marca',
      },
    ],
    selectedSearchOption: {
      value: '1',
      label: 'Catálogo',
    },
    items: {
      TotalResults: 0,
      Results: null,
    },
    apiStatus: API_REQUEST_STATUS_DEFAULT,
    promiseIsSelected: false,
    justification: '',
    justifications: [
      {
        IdCotPromesaDeCompraPartida: 'a48a5045-a1ff-4333-85d9-9563907a7458',
        IdCotPartidaCotizacion: 'c02f581f-e05d-4e14-a422-3c427cbd0bd6',
        FechaPromesaDeCompra: '2024-01-08T00:00:00.000Z',
        Justificacion: 'aaa',
        FechaRegistro: '2024-01-08T16:42:24.997Z',
        FechaUltimaActualizacion: '2024-01-08T17:02:07.530Z',
        Activo: true,
      },
    ],
  };

  const translations = {
    followPPurchase: {
      buyPromises: 'Promesas de compra',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryDialogComponent, PopUpGenericComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
        TranslateTestingModule.withTranslations({es: translations}),
        DateFormatModule,
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            select: () => {},
          },
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryDialogComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe contener el componente app-pop-up-generic', () => {
    const popUpGeneric = compiled.querySelector('app-pop-up-generic');

    expect(popUpGeneric).toBeTruthy();
  });

  it('Debe emitir el evento close', () => {
    const dialogSpy = jest.spyOn(component.dialogRef, 'close');

    component.onClose(true);

    expect(dialogSpy).toHaveBeenCalledWith(true);
  });

  it('Está definido el selector del cliente seleccionado', () => {
    const selectedClient: ICustomerFPP = followPPromiseDetailsSelectors.selectedClient.projector(
      initialState,
    );

    expect(selectedClient).toBeDefined();
    expect(selectedClient).toBeTruthy();
  });

  it('El selector del cliente seleccionado debe devolver el nombre', () => {
    const selectedClient: ICustomerFPP = followPPromiseDetailsSelectors.selectedClient.projector(
      initialState,
    );

    expect(selectedClient?.Alias).toBeTruthy();
    expect(selectedClient?.Alias).toBe('OTimes');
  });

  it('El selector del cliente seleccionado debe devolver el nombre', () => {
    const selectedClient: ICustomerFPP = followPPromiseDetailsSelectors.selectedClient.projector(
      initialState,
    );

    expect(selectedClient).toBeTruthy();
    expect(selectedClient?.Folio).toBeTruthy();
    expect(selectedClient?.Folio).toBe('F0-010824-0561');
  });

  it('El selector del cliente seleccionado debe devolver el total de partidas', () => {
    const selectedClient: ICustomerFPP = followPPromiseDetailsSelectors.selectedClient.projector(
      initialState,
    );

    expect(selectedClient).toBeTruthy();
    expect(selectedClient?.Partidas).toBeTruthy();
    expect(selectedClient?.Partidas).toBe(8);
  });

  it('El selector de justificaciones debe estar definido', () => {
    const selectJustifications: CotPromesaDeCompraPartida[] = followPPromiseDetailsSelectors.selectJustifications.projector(
      initialState,
    );

    expect(selectJustifications).toBeDefined();
    expect(selectJustifications).toBeTruthy();
  });

  it('El arreglo de justificaciones debe tener al menos un valor', () => {
    const justifications: CotPromesaDeCompraPartida[] = followPPromiseDetailsSelectors.selectJustifications.projector(
      initialState,
    );

    expect(justifications.length).toBeGreaterThan(0);
  });

  it('El total de items debe corresponder al mismo que los elementos de justificaciones', () => {
    const expectedData: CotPromesaDeCompraPartida[] = [
      {
        IdCotPromesaDeCompraPartida: 'a48a5045-a1ff-4333-85d9-9563907a7458',
        IdCotPartidaCotizacion: 'c02f581f-e05d-4e14-a422-3c427cbd0bd6',
        FechaPromesaDeCompra: '2024-01-08T00:00:00.000Z',
        Justificacion: 'aaa',
        FechaRegistro: '2024-01-08T16:42:24.997Z',
        FechaUltimaActualizacion: '2024-01-08T17:02:07.530Z',
        Activo: true,
      },
      {
        IdCotPromesaDeCompraPartida: 'a48a5045-a1ff-4333-85d9-9563907a7458',
        IdCotPartidaCotizacion: 'c02f581f-e05d-4e14-a422-3c427cbd0bd6',
        FechaPromesaDeCompra: '2024-01-08T00:00:00.000Z',
        Justificacion: 'aaa',
        FechaRegistro: '2024-01-08T16:42:24.997Z',
        FechaUltimaActualizacion: '2024-01-08T17:02:07.530Z',
        Activo: true,
      },
    ];

    component.justifications$ = of(expectedData);

    fixture.detectChanges();

    const items = compiled.querySelectorAll('.item');

    expect(items.length).toEqual(expectedData.length);
  });

  it('Se muestra el total de justificaciones', () => {
    const expectedData: CotPromesaDeCompraPartida[] = [
      {
        IdCotPromesaDeCompraPartida: 'a48a5045-a1ff-4333-85d9-9563907a7458',
        IdCotPartidaCotizacion: 'c02f581f-e05d-4e14-a422-3c427cbd0bd6',
        FechaPromesaDeCompra: '2024-01-08T00:00:00.000Z',
        Justificacion: 'aaa',
        FechaRegistro: '2024-01-08T16:42:24.997Z',
        FechaUltimaActualizacion: '2024-01-08T17:02:07.530Z',
        Activo: true,
      },
    ];
    component.justifications$ = of(expectedData);

    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('.footer label');
    const expectedLabel = `#${expectedData.length} Promesas de compra`;

    expect(label).toBeTruthy();
    expect(label.textContent).toContain(expectedLabel);
  });
});
