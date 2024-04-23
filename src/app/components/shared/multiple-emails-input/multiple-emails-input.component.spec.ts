import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MultipleEmailsInputComponent} from '@appComponents/shared/multiple-emails-input/multiple-emails-input.component';
import {FormsModule} from '@angular/forms';

describe('MultipleEmailsInputComponent', () => {
  let component: MultipleEmailsInputComponent;
  let fixture: ComponentFixture<MultipleEmailsInputComponent>;
  let compiled: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MultipleEmailsInputComponent],
        imports: [FormsModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleEmailsInputComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('El componente debe ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('No debe tener elementos email-item si @Input emails no recibe datos', () => {
    const items = compiled.querySelectorAll('.email-item');

    expect(items.length).toEqual(0);
  });

  it('Debe iterarse los elementos email-item si @Input emails recibe datos', () => {
    const expectedData: string[] = ['john@gmail.com', 'maria@gmail.com'];

    component.emails = expectedData;
    fixture.detectChanges();

    const items = compiled.querySelectorAll('.email-item');

    expect(items.length).toEqual(expectedData.length);
  });

  it('Debe existir el elemento input debe llamar el evento keydown', () => {
    const input: HTMLInputElement = compiled.querySelector('input');

    expect(input);
  });

  it('El input debe llamar la función onKeydown() con el evento keydown', () => {
    const event = new Event('keydown');
    const input: HTMLInputElement = compiled.querySelector('input');

    jest.spyOn(component, 'onKeydown');

    input.dispatchEvent(event);

    expect(component.onKeydown).toHaveBeenCalled();
  });

  it('El input debe emitir la función validate() con el evento ngModelChange', () => {
    const event = new Event('ngModelChange');
    const input: HTMLInputElement = compiled.querySelector('input');

    jest.spyOn(component, 'validate');

    input.dispatchEvent(event);

    expect(component.validate).toHaveBeenCalled();
  });

  it('Debe emitirse la función validate() si el valor del input cambia', () => {
    const text = 'aa';
    const input: HTMLInputElement = compiled.querySelector('input');

    jest.spyOn(component, 'validate');

    input.value = text;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.validate).toHaveBeenCalledWith(text);
  });

  it('Debe llamar la función onBlur() con el evento blur', () => {
    const event = new Event('blur');
    const input: HTMLInputElement = compiled.querySelector('input');

    jest.spyOn(component, 'onBlur');

    input.dispatchEvent(event);

    expect(component.onBlur).toHaveBeenCalled();
  });

  it('La función onBlur() debe llamar la función handleValidate()', () => {
    jest.spyOn(component, 'handleValidate');

    component.onBlur();

    expect(component.handleValidate).toHaveBeenCalled();
  });

  it('Debe existir la img de X cuando existan correos', () => {
    const emails: string[] = ['john@gmail.com', 'maria@gmail.com'];

    component.emails = emails;
    fixture.detectChanges();

    const img = compiled.querySelectorAll('img');

    expect(img.length).toBeGreaterThan(0);
  });

  it('Al dar click a la img de X de algún correo, se debe llamar la función onRemoveEmail();', () => {
    const emails: string[] = ['john@gmail.com', 'maria@gmail.com'];
    const event = new Event('click');

    component.emails = emails;
    fixture.detectChanges();

    const img = compiled.querySelectorAll('img')[0];

    jest.spyOn(component, 'onRemoveEmail');

    img.dispatchEvent(event);

    expect(component.onRemoveEmail).toHaveBeenCalled();
  });
});
