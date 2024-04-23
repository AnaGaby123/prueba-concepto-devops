import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GenericInputComponent} from '@appComponents/shared/generic-input/generic-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('GenericInputComponent', () => {
  let component: GenericInputComponent;
  let fixture: ComponentFixture<GenericInputComponent>;
  let mockMouseEvent: MouseEvent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericInputComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericInputComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();

    // DOCS: CREA UN MOCK PARA SIMULAR EL EVENTO DE CLICK
    mockMouseEvent = ({
      stopPropagation: jest.fn(),
    } as unknown) as MouseEvent; // DOCS: INDICA A TYPESCRIPT QUE NO SE PREOCUPE POR VERIFICACIÓN DE LOS TIPOS Y CONFIRMAMOS QUE EL OBJETO TIENE LA ESTRUCTURA CORRECTA
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No debe de prevenir al precionar tecla cuando el carácter es válido', () => {
    const eventMock = ({data: 'B', preventDefault: jest.fn()} as unknown) as InputEvent;

    component.handleBeforeInputEvent(eventMock);

    expect(eventMock.preventDefault).not.toHaveBeenCalled();
  });

  it('Debe emitir el valor al realizar el evento blur', () => {
    // DOCS: OBTIENE LA REFERENCIA DEL INPUT Y CREO EL EVENTO BLUR
    const input: Element = compiled.querySelector('input');
    const event: InputEvent = new InputEvent('blur');
    // DOCS: CREA ESPÍA PARA EL @OUTPUT blurTextData
    const blurTextDataSpy = jest.spyOn(component.blurTextData, 'emit');

    // DOCS: VERIFICAR QUE SE HA OBTENIDO EL INPUT
    expect(input).toBeTruthy();

    // DOCS: ESTABLECE EL VALOR AL INPUT
    component.formGroup.patchValue({
      genericInput: 'HELLO',
    });
    fixture.detectChanges();

    // DOCS: REALIZA EL EVENTO blur
    input.dispatchEvent(event);

    // DOCS: SE ESPERA QUE EL OUTPUT SE HAYA HECHO CON EL MISMO VALID DEL INPUT
    expect(blurTextDataSpy).toHaveBeenCalledWith('HELLO');
  });

  it('Debe ejecutar preventDefault si la validación de regex del texto falla', () => {
    const pasteEvent = ({
      clipboardData: {
        getData: jest.fn().mockReturnValue('text'),
      },
      preventDefault: jest.fn(),
    } as unknown) as ClipboardEvent;

    // DOCS: HACE LA SIMULACIÓN QUE EL TEXTO NO ES VÁLIDO
    jest.spyOn(component, 'executeRegexValidatorForString').mockReturnValue(false);

    component.handlePasteEvent(pasteEvent);

    // DOCS: Debería haber llamado a preventDefault
    expect(pasteEvent.preventDefault).toHaveBeenCalled();
  });

  it('No debe ejecutar preventDefault si la validación de regex del texto es correcta', () => {
    const pasteEvent = ({
      clipboardData: {
        getData: jest.fn().mockReturnValue('text'),
      },
      preventDefault: jest.fn(),
    } as unknown) as ClipboardEvent;

    // DOCS: HACE LA SIMULACIÓN QUE EL TEXTO ES VÁLIDO
    jest.spyOn(component, 'executeRegexValidatorForString').mockReturnValue(true);

    component.handlePasteEvent(pasteEvent);

    // DOCS: Debería haber llamado a preventDefault
    expect(pasteEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('No debe mostrar el texto si label es vacío', () => {
    const label: Element = compiled.querySelector('#input-label');

    expect(label).toBeFalsy();
  });

  it('Debe mostrar el label cuando no esté vacío', () => {
    component.label = 'i am a text';
    fixture.detectChanges();

    const label: Element = compiled.querySelector('#input-label');

    expect(label).toBeTruthy();
  });

  it('Debe cambiar el texto del label', () => {
    const text = 'i am a text';
    component.label = text;
    fixture.detectChanges();

    const label: Element = compiled.querySelector('#input-label');

    expect(label).toBeTruthy(); // DOCS: COMPRUEBA QUE EL LABEL SE ESTÉ MOSTRANDO
    expect(label.textContent).not.toBeFalsy(); // DOCS: COMPRUEBA QUE NO SEA DIFERENTE A VACÍO O NULL
    expect(label.textContent).toEqual(text); // DOCS: COMPRUEBA QUE SEA IGUAL AL TEXTO INGRESADO POR @INPUT
  });

  const convertRgbToHex = (color: string): string => {
    return color.replace(
      /rgb\((\d+), (\d+), (\d+)\)/,
      (_, r, g, b) =>
        '#' +
        Number(r).toString(16).padStart(2, '0') +
        Number(g).toString(16).padStart(2, '0') +
        Number(b).toString(16).padStart(2, '0'),
    );
  };

  it('Debe cambiar el color de texto a labelFontColor dependiendo si está habilitado', () => {
    component.label = 'i am a text';
    component.isDisable = false;
    fixture.detectChanges();

    const label: HTMLInputElement = compiled.querySelector('#input-label');

    expect(label).toBeTruthy();

    // DOCS: EL COLOR ES DEVUELVO COMO RGB, ES NECESARIO CONVERTIRLO A HEXADECIMAL
    expect(convertRgbToHex(label.style.color)).toBe(component.labelFontColor);
  });

  it('Debe cambiar el color de de texto a labelDisableFontColor si está inhabilitado', () => {
    component.label = 'i am a text';
    component.isDisable = true;
    fixture.detectChanges();

    const label: HTMLInputElement = compiled.querySelector('#input-label');

    expect(label).toBeTruthy();

    // DOCS: EL COLOR ES DEVUELVO COMO RGB, ES NECESARIO CONVERTIRLO A HEXADECIMAL
    expect(convertRgbToHex(label.style.color)).toBe(component.labelDisableFontColor);
  });
});
