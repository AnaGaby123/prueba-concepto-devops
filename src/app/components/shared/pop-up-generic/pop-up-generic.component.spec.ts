import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PopUpGenericComponent} from '@appComponents/shared/pop-up-generic/pop-up-generic.component';

describe('PopUpGenericComponent', () => {
  let component: PopUpGenericComponent;
  let fixture: ComponentFixture<PopUpGenericComponent>;
  let compiled: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PopUpGenericComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpGenericComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe emitir el evento de close', () => {
    jest.spyOn(component.evento, 'emit');

    component.onClose(true);

    expect(component.evento.emit).toHaveBeenCalledWith(true);
  });

  it('EL width del pop up debe ser el mismo que se proporciona por el @Input width', () => {
    const modalContent: HTMLDivElement = compiled.querySelector('.modal-content');

    component.width = '300px';
    fixture.detectChanges();

    expect(component.width).toEqual('300px');
    expect(modalContent.style.width).toEqual('300px');
  });

  it('EL height del pop up debe ser el mismo que se proporciona por el @Input height', () => {
    const modalContent: HTMLDivElement = compiled.querySelector('.modal-content');

    component.height = '400px';
    fixture.detectChanges();

    expect(component.height).toEqual('400px');
    expect(modalContent.style.height).toEqual('400px');
  });

  it('Debe cambiar el color del fondo del header', () => {
    const header: HTMLDivElement = compiled.querySelector('.header');

    component.color = 'red';
    fixture.detectChanges();

    expect(header).toBeTruthy();
    expect(header.style.backgroundColor).toBeTruthy();
    expect(header.style.backgroundColor).toEqual('red');
  });

  it('Debe cambiar el texto del header', () => {
    const text = 'I AM THE TITTLE HEADER';
    component.titleHeader = text;
    fixture.detectChanges();

    const title = compiled.querySelector('header h1');

    expect(title).toBeTruthy();
    expect(title.textContent).toEqual(` ${text} `);
  });

  it('Debe ocultarse el botón de cerrar si showClose es falso', () => {
    component.showClose = false;
    fixture.detectChanges();

    const img = compiled.querySelector('.header img');

    expect(img).toBeFalsy();
  });

  it('Debe mostrarse el botón de cerrar si showClose es verdadero', () => {
    component.showClose = true;
    fixture.detectChanges();

    const img = compiled.querySelector('.header img');

    expect(img).toBeTruthy();
  });

  it('Debe mostrar el footer si activeButtons es verdadero', () => {
    component.activeButtons = true;
    fixture.detectChanges();

    const footer = compiled.querySelector('footer');

    expect(footer).toBeTruthy();
  });

  it('Debe haber un sólo botón en el footer si onlyOneButton es true', () => {
    component.activeButtons = true;
    component.onlyOneButton = true;
    fixture.detectChanges();

    const buttons: NodeListOf<Element> = compiled.querySelectorAll('footer button');

    expect(buttons.length).toEqual(1);
  });

  it('El segundo botón del footer debe tener la clase btnOk si activeBtn es verdadero', () => {
    component.activeButtons = true;
    component.activeBtn = true;
    fixture.detectChanges();

    const secondButton: Element = compiled.querySelectorAll('footer button')[1];

    expect(secondButton).toBeTruthy();
    expect(secondButton.classList).toContain('btnOk');
  });

  it('El segundo botón del footer debe tener la clase btnDisable si activeBtn es falso', () => {
    component.activeButtons = true;
    component.activeBtn = false;
    fixture.detectChanges();

    const secondButton: Element = compiled.querySelectorAll('footer button')[1];

    expect(secondButton).toBeTruthy();
    expect(secondButton.classList).toContain('btnDisable');
  });

  it('El primero botón del footer debe ejecutar la función onClose con param falso', () => {
    component.activeButtons = true;
    fixture.detectChanges();

    const clickEvent = new Event('click');
    jest.spyOn(component, 'onClose');

    const firstButton: Element = compiled.querySelectorAll('footer button')[0];

    expect(firstButton).toBeTruthy();

    firstButton.dispatchEvent(clickEvent);

    expect(component.onClose).toHaveBeenCalledWith(false);
  });

  it('El segundo botón del footer debe ejecutar la función onClose con param verdadero', () => {
    component.activeButtons = true;
    fixture.detectChanges();

    const clickEvent = new Event('click');
    jest.spyOn(component, 'onClose');

    const secondButton: Element = compiled.querySelectorAll('footer button')[1];

    expect(secondButton).toBeTruthy();

    secondButton.dispatchEvent(clickEvent);

    expect(component.onClose).toHaveBeenCalledWith(true);
  });
});
