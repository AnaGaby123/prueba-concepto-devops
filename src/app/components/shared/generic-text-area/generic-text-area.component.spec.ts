import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GenericTextAreaComponent} from '@appComponents/shared/generic-text-area/generic-text-area.component';
import {FormsModule} from '@angular/forms';
import {convertRgbToHex} from '@appUtil/util';

describe('GenericTextAreaComponent', () => {
  let component: GenericTextAreaComponent;
  let fixture: ComponentFixture<GenericTextAreaComponent>;
  let compiled: HTMLElement;
  const localhost = 'http://localhost/';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GenericTextAreaComponent],
        imports: [FormsModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTextAreaComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe mostrar label-container si @Input title es diferente a vacío', () => {
    component.title = 'I am a title';
    fixture.detectChanges();

    const container = compiled.querySelector('.label-container');

    expect(container).toBeTruthy();
  });

  it('Debe de mostrar la img si required, showAsterisk y enableEdit son verdadero de label-container ', () => {
    component.title = 'I am a title';
    component.required = true;
    component.showAsterisk = true;
    component.enableEdit = true;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#label-container-img');

    expect(img).toBeTruthy();
  });

  it('Debe cambiar la img de label-container dependiendo si hay título y está habilitado', () => {
    component.title = 'I am a title';
    component.required = true;
    component.showAsterisk = true;
    component.enableEdit = true;
    component.isDisable = true;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#label-container-img');

    expect(img).toBeTruthy();
    expect(img.src).toEqual(localhost + component.grayAsteriskImg);
  });

  it('Debe cambiar el color de texto del label de label-container a titleDisableFontColor si hay título y está habilitado', () => {
    component.title = 'I am a title';
    component.isDisable = true;
    fixture.detectChanges();

    const label: HTMLInputElement = compiled.querySelector('#label-container-title');

    expect(label).toBeTruthy();

    expect(component.titleDisableFontColor).toBeTruthy(); // DOCS: COMPRUEBA QUE LA PROPIEDAD SÍ TENGA UN HEXADECIMAL COMO COLOR
    expect(convertRgbToHex(label.style.color)).toEqual(component.titleDisableFontColor);
  });

  it('Debe cambiar el color de texto del label de label-container a titleFontColor si hay título y está habilitado', () => {
    component.title = 'I am a title';
    component.isDisable = false;
    fixture.detectChanges();

    const label: HTMLInputElement = compiled.querySelector('#label-container-title');

    expect(label).toBeTruthy();

    expect(component.titleFontColor).toBeTruthy(); // DOCS: COMPRUEBA QUE LA PROPIEDAD SÍ TENGA UN HEXADECIMAL COMO COLOR
    expect(convertRgbToHex(label.style.color)).toEqual(component.titleFontColor);
  });

  it('Debe cambiar el color del borde a disableBorderColor si está habilitado del input-container', () => {
    component.isDisable = true;
    fixture.detectChanges();
    const container: HTMLDivElement = compiled.querySelector('.input-container');

    expect(container).toBeTruthy();

    // DOCS: LA PROPIEDAD borderColor RETORNA EL COLOR EN MAYÚSUCLA
    expect(container.style.borderColor.toLowerCase()).toEqual(
      component.disableBorderColor.toLowerCase(),
    );
  });

  it('Debe cambiar el color del borde a borderColor si está habilitado del input-container', () => {
    component.isDisable = false;
    fixture.detectChanges();
    const container: HTMLDivElement = compiled.querySelector('.input-container');

    expect(container).toBeTruthy();

    // DOCS: LA PROPIEDAD borderColor RETORNA EL COLOR EN MAYÚSUCLA
    expect(container.style.borderColor.toLowerCase()).toEqual(component.borderColor.toLowerCase());
  });

  it('Debe mostrar el texto de value en el label de input-container cuando enableEdit sea false', () => {
    const text = 'I AM A TEXT';
    component.enableEdit = false;
    component.value = text;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#input-container-label');

    expect(label).toBeTruthy();
    expect(label.textContent).toEqual(text);
  });

  it('Debe mostrar ND en el label de input-container cuando enableEdit sea false y value sea null o vacío', () => {
    component.enableEdit = false;
    component.value = '';
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#input-container-label');

    expect(label).toBeTruthy();
    expect(label.textContent).toEqual('N/D');
  });

  it('Debe mostrar el textarea si enableEdit es verdadero', () => {
    component.enableEdit = true;
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement = compiled.querySelector('textarea');

    expect(textarea).toBeTruthy();
  });

  it('emitValue debe emitir el valor del textarea', () => {
    const value = 'VALUE';
    component.enableEdit = true;
    fixture.detectChanges();

    const validatedMethodSpy = jest.spyOn(component, 'validated');
    const emitSpy = jest.spyOn(component.emitData, 'emit');

    component.emitValue(value);

    expect(validatedMethodSpy).toHaveBeenCalledWith(value); // DOCS: VALIDA SI EL MÉTODO validated ES EJECUTADO
    expect(emitSpy).toHaveBeenCalledWith(value); // DOCS: VALIDA SI SE REALIZA EL EMIT
  });

  // DOCS: PRUEBAS DE ALGUNA DE LAS PROPIEDADES DEL TEXTAREA
  it('EL textarea debe estar en readOnly', () => {
    component.isDisable = true;
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement = compiled.querySelector('textarea');

    expect(textarea.readOnly).toBeTruthy();
  });

  it('Debe mostrar el placeholder del textarea acorde al @Input', () => {
    const placeHolder = 'I AM A PLACEHOLDER';

    component.placeholder = placeHolder;
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement = compiled.querySelector('textarea');

    expect(textarea.placeholder).toBeTruthy(); // DOCS: VALIDA SI TIENE PLACEHOLDER
    expect(textarea.placeholder).toEqual(placeHolder); // DOCS: VALIDA SI EL PLACEHOLDER ES IGUAL AL TEXTO DEL @INPUT
  });
});
