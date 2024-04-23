import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {Store} from '@ngrx/store';
import {PopUpGenericComponent} from '@appComponents/shared/pop-up-generic/pop-up-generic.component';
import {TranslateModule} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent, PopUpGenericComponent],
      imports: [TranslateModule.forRoot()],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Tiene integrado el componente app-pop-up-generic', () => {
    const popUpGeneric = compiled.querySelector('app-pop-up-generic');

    expect(popUpGeneric).toBeTruthy();
  });

  it('Se muestra el texto de message obtenido por el atributo data', () => {
    const text = '¿Confirm?';
    const label = compiled.querySelector('label');

    expect(label).toBeTruthy();

    component.data.message = text;
    fixture.detectChanges();

    expect(label.textContent).toEqual(text);
  });

  it('Debe existir la img de alerta', () => {
    const img = compiled.querySelector('img');

    expect(img).toBeTruthy();
  });

  it('No debe existir el label para pintar texto de color en verde si no se ha pasado un texto por el atributo greenText', () => {
    const label = compiled.querySelector('.green-text');

    expect(component.data.greenText).toBeFalsy();
    expect(label).toBeFalsy();
  });

  it('Debe existir el label para pintar texto de color en verde si se ha pasado un texto por el atributo greenText', () => {
    component.data.greenText = 'I AM A TEXT';
    fixture.detectChanges();

    const label = compiled.querySelector('.green-text');

    expect(label).toBeTruthy();
  });

  it('Debe mostrar el texto de greenText', () => {
    const text = 'I AM A TEXT';
    component.data.greenText = text;
    fixture.detectChanges();

    const label = compiled.querySelector('.green-text');

    expect(label.textContent).toEqual(text);
  });

  it('Debe ser emitido el evento close', () => {
    const closeSpy = jest.spyOn(component.dialogRef, 'close');

    fixture.detectChanges();

    component.onClose(true);

    expect(closeSpy).toHaveBeenCalledWith(true);
  });
});
