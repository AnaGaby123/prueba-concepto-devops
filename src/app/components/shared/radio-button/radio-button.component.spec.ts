import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RadioButtonComponent} from '@appComponents/shared/radio-button/radio-button.component';

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponent;
  let fixture: ComponentFixture<RadioButtonComponent>;
  let compiled: HTMLElement;

  const imgDirectory = 'http://localhost/assets/Images';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RadioButtonComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.clearAllMocks();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The radio image should exist', () => {
    const img: HTMLImageElement = compiled.querySelector('[data-test=unselected]');

    expect(img).toBeTruthy();
  });

  it('Should emit the "emitValue" property upon clicking the radio button', () => {
    // DOCS: ESCUCHA UNICAMENTE UNA ACCION DEL COMPONENTE (EN ESTE CASO EL EMIT DE emitValue)
    jest.spyOn(component.emitValue, 'emit');
    // DOCS: SELECCIONA DEL HTML EL ID, CLASS,ETIQUETA O DATA CON X NOMBRE
    const uncheked = compiled.querySelector('[data-test=unselected]');
    // DOCS: SIMULA UN EVENTO CLICK SOBRE EL ITEM SELECICONADO PREVIAMENTE
    uncheked?.dispatchEvent(new Event('click'));

    expect(component.emitValue.emit).toHaveBeenCalled();
  });

  it('Should emit the "emitSelected" property upon clicking the radio button', () => {
    jest.spyOn(component.emitSelected, 'emit');
    const uncheked = compiled.querySelector('[data-test=unselected]');
    uncheked?.dispatchEvent(new Event('click'));
    expect(component.emitSelected.emit).toHaveBeenCalled();
  });

  it('An image should exist if radio is enabled for editing', () => {
    component.enableEdit = true;
    component.label = 'I am a label';
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#enabled-radio-label');

    expect(img).toBeTruthy();
  });

  it('The enabled radio label should invoke the function "handleSelectRadioButton()" upon a click event', () => {
    component.enableEdit = true;
    component.label = 'I am a label';
    fixture.detectChanges();

    jest.spyOn(component, 'handleSelectRadioButton');

    const img: HTMLImageElement = compiled.querySelector('#enabled-radio-label');

    img.dispatchEvent(new Event('click'));

    expect(component.handleSelectRadioButton).toHaveBeenCalled();
  });

  it('The radio image should change to "selected"', () => {
    component.handleSelectRadioButton(true);
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('[data-test=unselected]');

    expect(img.src).toEqual(`${imgDirectory}/radio_selected.svg`);
  });

  it('The radio image should change from "selected" to "unselected"', () => {
    const img: HTMLImageElement = compiled.querySelector('[data-test=unselected]');

    component.handleSelectRadioButton(true);
    fixture.detectChanges();

    component.handleSelectRadioButton(false);
    fixture.detectChanges();

    expect(img.src).toEqual(`${imgDirectory}/radio_unselected.svg`);
  });

  it('An image should exist when the radio is not enabled for editing', () => {
    component.enableEdit = false;
    fixture.detectChanges();

    const img = compiled.querySelector('#disabled-radio-img');

    expect(img).toBeTruthy();
  });

  it('Disable radio image should be check.svg if property "value" is true', () => {
    component.enableEdit = false;
    component.value = true;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#disabled-radio-img');

    expect(img.src).toEqual(`${imgDirectory}/check.svg`);
  });

  it('Disable radio image should be radio_unselected.svg if property "value" is false', () => {
    component.enableEdit = false;
    component.value = false;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#disabled-radio-img');

    expect(img.src).toEqual(`${imgDirectory}/radio_unselected.svg`);
  });

  it('A label should exist when the radio is not enabled for editing', () => {
    component.enableEdit = false;
    component.label = 'I am a label';
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#disabled-radio-label');

    expect(label).toBeTruthy();
  });

  it('Disable radio label should have class "disabledBtn" if property "disabled" is true', () => {
    component.enableEdit = false;
    component.label = 'I am a label';
    component.disabled = true;
    fixture.detectChanges();

    const label: HTMLLabelElement = compiled.querySelector('#disabled-radio-label');

    expect(label.classList).toContain('disabledBtn');
  });
});
