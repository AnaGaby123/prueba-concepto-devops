import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DropListContactComponent} from '@appComponents/shared/drop-list-contact/drop-list-contact.component';
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {CheckBoxComponent} from '@appComponents/shared/check-box/check-box.component';

describe('DropListContactComponent', () => {
  let component: DropListContactComponent;
  let fixture: ComponentFixture<DropListContactComponent>;
  let compiled: HTMLElement;
  const testContacts: IDropListMulti[] = [
    {
      value: 'ad6c35df-7c66-435a-96ec-f58b2b421b80',
      labels: [
        {
          label: 'Pruebas Ryndem ',
        },
        {
          label: ' ·  ',
        },
        {
          label: 'pruebasryndem@gmail.com',
          color: '#008693',
        },
      ],
      isSelected: true,
    },
    {
      value: '05b9e79f-b4b0-4866-b2b8-0741e4ea5dde',
      labels: [
        {
          label: 'Pedro De León ',
        },
        {
          label: ' ·  ',
        },
        {
          label: 'ryndempedro@gmail.com',
          color: '#008693',
        },
      ],
      isSelected: false,
    },
    {
      value: 'e3e81100-d44b-4b4e-b13f-faa50b58391e',
      labels: [
        {
          label: 'Cotizando Vinculando Contacto nuevo',
        },
        {
          label: ' ·  ',
        },
        {
          label: 'lbbmmoreno@laboratoriosbest.com.mx',
          color: '#008693',
        },
      ],
      isSelected: true,
    },
    {
      value: 'cd10f1ad-2fb0-4a03-86f8-a061944f8df7',
      labels: [
        {
          label: 'Prueba Agregar Eliminar',
        },
        {
          label: ' ·  ',
        },
        {
          label: 'pruebaaaaaaa@gmail.co',
          color: '#008693',
        },
      ],
      isSelected: false,
    },
    {
      value: '238ef65a-f193-4580-a9b9-014798b1fa16',
      labels: [
        {
          label: 'jose chavez amador',
        },
        {
          label: ' ·  ',
        },
        {
          label: 'jose.chavez@ryndem.mx',
          color: '#008693',
        },
      ],
      isSelected: false,
    },
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DropListContactComponent, CheckBoxComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DropListContactComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Al hacer click sobre la imagen de icono debe ejecutar la función openOptions', () => {
    const img = compiled.querySelector('img');
    const clickEvent = new Event('click');

    jest.spyOn(component, 'openOptions');

    expect(img).toBeTruthy();

    img.dispatchEvent(clickEvent);
    expect(component.openOptions).toHaveBeenCalled();
  });

  it('Cambia el valor de la variable isOpen para mostrar el listado al llamar openOptions()', () => {
    component.openOptions();

    expect(component.isOpen).toBeTruthy();
  });

  it('Debe iterarse los items de contactos', () => {
    component.options = testContacts;
    fixture.detectChanges();

    const uls = compiled.querySelectorAll('ul');

    expect(uls.length).toEqual(testContacts.length);
  });

  it('Al hacer click en el item de contacto debe emitir el contacto seleccionado', () => {
    const clickEvent = new Event('click');

    component.options = testContacts;
    fixture.detectChanges();

    jest.spyOn(component.emitValue, 'emit');
    jest.spyOn(component, 'selectOption');

    const firstItem: Element = compiled.querySelectorAll('ul')[0];

    expect(firstItem).toBeTruthy();

    firstItem.dispatchEvent(clickEvent);

    expect(component.selectOption).toHaveBeenCalled();
    expect(component.emitValue.emit).toHaveBeenCalled();
  });

  it('Debe obtener los elementos seleccionados, los cuales tienen la clase itemSelect', () => {
    component.options = testContacts;
    fixture.detectChanges();

    const selectedItems = compiled.querySelectorAll('.itemSelect');

    expect(selectedItems.length).toBeGreaterThan(0);
  });

  it('Todos los items de contactos tienen la clase list', () => {
    component.options = testContacts;
    fixture.detectChanges();

    const uls = compiled.querySelectorAll('ul');

    expect(uls.length).toBeGreaterThan(0);

    uls.forEach((ul: Element) => {
      expect(ul.classList).toContain('list');
    });
  });

  it('Debe existir el componente app-check-box en todos los contactos', () => {
    component.options = testContacts;
    fixture.detectChanges();

    const checkboxes = compiled.querySelectorAll('app-check-box');

    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('Debe de cambiar el src de la img de icon si se proporcionapor el @Input icon', () => {
    const newIcon = 'http://localhost/assets/Images/contacto_gris.svg';

    component.icon = newIcon;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('img');

    expect(img).toBeTruthy();

    expect(img.src).toEqual(newIcon);
  });
});
