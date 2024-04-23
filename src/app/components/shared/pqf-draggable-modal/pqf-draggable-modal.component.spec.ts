import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfDraggableModalComponent} from './pqf-draggable-modal.component';

describe('PqfDraggableModalComponent', () => {
  let component: PqfDraggableModalComponent;
  let fixture: ComponentFixture<PqfDraggableModalComponent>;
  let mockMouseEvent: MouseEvent;
  let compiled: HTMLElement;
  enum Events {
    default = 0,
    resize = 1,
    move = 2,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfDraggableModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PqfDraggableModalComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
    mockMouseEvent = ({
      stopPropagation: jest.fn(),
      clientX: 100,
      clientY: 200,
    } as unknown) as MouseEvent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe llamar la función loadCenter con el evento window:resize', () => {
    jest.spyOn(component, 'loadCenter');

    execEvent('resize');

    fixture.detectChanges();

    expect(component.loadCenter).toHaveBeenCalled();
  });

  it('La función loadCenter debe obtener el elemento del draggable y del padre', () => {
    jest.spyOn(component, 'getParent');
    jest.spyOn(component, 'getDraggable');

    component.loadCenter();

    expect(component.getParent).toHaveBeenCalled();
    expect(component.getDraggable).toHaveBeenCalled();
  });

  it('Debe obtener las cordenadas de left y top para centrar el draggable acorde a las dimenciones del div padre', () => {
    // DOCS: OBTIENE Y VALIDA EL DIV PADRE DEL DRAGGABLE
    const parent: HTMLElement = component.getParent();
    expect(parent).toBeDefined();

    // DOCS: OBTIENE Y VALIDA EL DIV DEL DRAGGABLE
    const draggable: HTMLElement = component.getParent();
    expect(draggable).toBeDefined();

    // DOCS: OBTIENE LAS DIMENCIONES DE LA SIMULACIÓN DEL DIV PADRE
    const left = (parent?.offsetWidth - draggable?.offsetWidth) / 2;
    const top = (parent?.offsetHeight - draggable?.offsetHeight) / 2;

    component.loadCenter();

    expect(component.left).toEqual(left);
    expect(component.top).toEqual(top);
  });

  it('Debe llamarse el método onMouseMove al hacer el evento MouseEvent', () => {
    jest.spyOn(component, 'onMouseMove');

    execEvent('mousemove');

    expect(component.onMouseMove).toHaveBeenCalled();
  });

  it('Debe llamarse el método resize con MouseEvent si status es igual a  Events.resize', () => {
    jest.spyOn(component, 'resize');

    component.status = Events.resize;

    fixture.detectChanges();

    execEvent('mousemove');

    expect(component.resize).toHaveBeenCalled();
  });

  it('Debe llamarse el método move con MouseEvent si status es igual a  Events.move', () => {
    jest.spyOn(component, 'move');

    component.status = Events.move;

    fixture.detectChanges();

    execEvent('mousemove');

    expect(component.move).toHaveBeenCalled();
  });

  it('La función setEvent debe cambiar el status al ser llamado y acorde a los parámetros', () => {
    const status = Events.resize;

    component.setEvent(mockMouseEvent, status);

    expect(component.status).toEqual(status);
  });

  it('Se da click a la esquina inferior derecha para cambiar el tamaño', () => {
    const clickEvent = new Event('mousedown');
    const corner = compiled.querySelector('.resize-handle-se');

    jest.spyOn(component, 'setEvent');

    expect(corner).toBeTruthy();

    corner.dispatchEvent(clickEvent);

    expect(component.setEvent).toHaveBeenCalled();
  });

  it('El método onClose emite si se ha cerrado el dreaggable', () => {
    const closeSpy = jest.spyOn(component.closeModal, 'emit');

    component.onclose();

    expect(closeSpy).toHaveBeenCalledWith(false);
  });

  it('Las funciones getWidthMarginPixels y getHeightMarginPixels deben ser llamadas al intentar mover el draggable', () => {
    const mouseDown = new Event('mousedown');
    const draggableHeader = compiled.querySelector('.ui-modal-header');

    expect(draggableHeader).toBeTruthy();

    jest.spyOn(component, 'setEvent');
    jest.spyOn(component, 'move');
    jest.spyOn(component, 'getWidthMarginPixels');
    jest.spyOn(component, 'getHeightMarginPixels');

    expect(draggableHeader).toBeTruthy();

    component.mouse = {x: 200, y: 300};
    fixture.detectChanges();
    // DOCS: DEBE PRIMER HACER CLIC EN EL HEADER DEL DRAGGABLE
    draggableHeader.dispatchEvent(mouseDown);
    component.move();

    expect(component.setEvent).toHaveBeenCalled();
    expect(component.move).toHaveBeenCalled();
    expect(component.getWidthMarginPixels).toHaveBeenCalled();
    expect(component.getHeightMarginPixels).toHaveBeenCalled();
  });
});

const execEvent = (type: string): void => {
  const event = new Event(type);
  window.dispatchEvent(event);
};
