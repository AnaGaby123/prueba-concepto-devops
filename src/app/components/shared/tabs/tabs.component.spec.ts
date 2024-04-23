import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TabsComponent} from '@appComponents/shared/tabs/tabs.component';
import {ITabOption} from '@appModels/botonera/botonera-option';

describe('BotoneraComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let compiled: HTMLElement;
  const tabsTest: ITabOption[] = [
    {
      id: '1',
      label: 'Todas',
      activeSubtitle: true,
      labelSubtitle: 'Cotizaciones',
      totalSubtitle: 6,
      indicators: [
        {
          color: 'ovalRed',
          name: 'ovalRed',
        },
        {
          color: 'ovalBlue',
          name: 'ovalBlue',
        },
      ],
    },
    {
      id: '2',
      label: 'Confirmadas',
      activeSubtitle: true,
      labelSubtitle: 'Cotizaciones',
      totalSubtitle: 4,
      disable: true,
    },
    {
      id: '3',
      label: 'Pendientes',
      activeSubtitle: true,
      labelSubtitle: 'Cotizaciones',
      totalSubtitle: 2,
    },
    {
      id: '4',
      label: 'Error en envio',
      activeSubtitle: true,
      labelSubtitle: 'Cotizaciones',
      totalSubtitle: 0,
    },
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TabsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('El componente debe ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('Debe iterar las tabs dependiendo los datos obtenidos por @Input options', () => {
    component.options = tabsTest;
    fixture.detectChanges();

    const tabs = compiled.querySelectorAll('.tab');

    expect(tabs.length).toEqual(tabsTest.length);
  });

  it('No debe llamarse handleSelectOption() si se da click en la tab y su propiedad disable es verdadero', () => {
    const event = new Event('click');
    component.options = tabsTest;
    fixture.detectChanges();

    // DOCS: SE OBTIENE LA REFERENCIA DE LA SEGUNDA TAB Y SE SIMULA EL EVENTO CLICK
    const tab = compiled.querySelectorAll('.tab')[1];
    tab.dispatchEvent(event);

    jest.spyOn(component, 'handleSelectOption');

    expect(component.handleSelectOption).not.toHaveBeenCalled();
  });

  it('Debe llamarse mouseenter() con el evento mouseenter', () => {
    const event = new Event('mouseenter');
    component.options = tabsTest;
    fixture.detectChanges();

    jest.spyOn(component, 'onMouseEnter');

    const tab = compiled.querySelectorAll('.tab')[0];

    expect(tab).toBeTruthy();

    tab.dispatchEvent(event);

    expect(component.onMouseEnter).toHaveBeenCalled();
  });

  it('Debe llamarse onMouseLeave() con el evento mouseleave', () => {
    const event = new Event('mouseleave');
    component.options = tabsTest;
    fixture.detectChanges();

    jest.spyOn(component, 'onMouseLeave');

    const tab = compiled.querySelectorAll('.tab')[0];

    expect(tab).toBeTruthy();

    tab.dispatchEvent(event);

    expect(component.onMouseLeave).toHaveBeenCalled();
  });

  it('Deben iterarse las img de los colores indicadores', () => {
    component.options = tabsTest;
    fixture.detectChanges();

    const indicators = compiled.querySelectorAll('.indicators');

    expect(indicators.length).toEqual(tabsTest[0].indicators.length);
  });
});
