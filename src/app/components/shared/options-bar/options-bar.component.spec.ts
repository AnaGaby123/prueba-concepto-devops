import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OptionsBarComponent} from '@appComponents/shared/options-bar/options-bar.component';
import {OptionBar} from '@appModels/options-bar/options-bar';

describe('OptionsBarComponent', () => {
  let component: OptionsBarComponent;
  let fixture: ComponentFixture<OptionsBarComponent>;
  let compiled: HTMLElement;

  const optionsTest: OptionBar[] = [
    {
      id: 1,
      label: 'I am  the first label',
      isEnable: true,
      isSelected: false,
    },
    {
      id: 2,
      label: 'I am  the second label',
      isEnable: true,
      isSelected: false,
    },
    {
      id: 3,
      label: 'I am  the third label',
      isEnable: true,
      isSelected: false,
    },
  ];

  const imgDirectory = 'http://localhost/assets/Images';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OptionsBarComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsBarComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have left row container if property "showArrows" is true', () => {
    component.showArrows = true;
    fixture.detectChanges();
    const container = compiled.querySelector('#left-row-container');
    expect(container).toBeTruthy();
  });

  it('Should hide left row container if property "showArrows" is false', () => {
    component.showArrows = false;
    fixture.detectChanges();
    const image: HTMLImageElement = compiled.querySelector('#left-row-container');

    expect(image).toBeFalsy();
  });

  it('Should have left row image if property "showArrows" is true', () => {
    component.showArrows = true;
    fixture.detectChanges();
    const image: HTMLImageElement = compiled.querySelector('#left-row-image');

    expect(image).toBeTruthy();
  });

  it('Left row image should be FlechaIzqVerde.svg if property "enableLeftArrow" is true and index is greater than 0', () => {
    component.showArrows = true;
    component.enableLeftArrow = true;
    component.index = 1;
    fixture.detectChanges();
    const image: HTMLImageElement = compiled.querySelector('#left-row-image');

    expect(image.src).toEqual(`${imgDirectory}/FlechaIzqVerde.svg`);
  });

  it('Left row image should be flechaIzquierdaCatProNormal.svg if property "enableLeftArrow" is false and index is  0', () => {
    component.showArrows = true;
    component.enableLeftArrow = true;
    component.index = 0;
    fixture.detectChanges();
    const image: HTMLImageElement = compiled.querySelector('#left-row-image');

    expect(image.src).toEqual(`${imgDirectory}/flechaIzquierdaCatProNormal.svg`);
  });

  it('@Input options should change value', () => {
    component.options = optionsTest;
    fixture.detectChanges();

    expect(component.options.length).toBe(optionsTest.length);
  });

  it('Should iterate options data in template', () => {
    component.options = optionsTest;
    fixture.detectChanges();

    const elements = compiled.querySelectorAll('.element');

    expect(elements.length).toEqual(optionsTest.length);
  });

  it('Element selected should call the function "selectOption"', () => {
    component.options = optionsTest;
    fixture.detectChanges();

    const element = compiled.querySelectorAll('.element')[0];

    expect(element).toBeTruthy();

    jest.spyOn(component, 'selectOption');

    element.dispatchEvent(new Event('click'));

    expect(component.selectOption).toHaveBeenCalled();
  });

  it('The function "selectOption()" should emit the property "handleOptionSelected"', () => {
    component.options = optionsTest;
    fixture.detectChanges();

    const element = compiled.querySelectorAll('.element')[0];

    jest.spyOn(component.handleOptionSelected, 'emit');

    element.dispatchEvent(new Event('click'));

    expect(component.handleOptionSelected.emit).toHaveBeenCalledWith(optionsTest[0]);
  });

  it('Should have right container if property "showArrows" is true', () => {
    component.showArrows = true;
    fixture.detectChanges();
    const container = compiled.querySelector('#right-row-container');
    expect(container).toBeTruthy();
  });

  it('Should hide right container if property "showArrows" is false', () => {
    component.showArrows = false;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#right-row-container');

    expect(img).toBeFalsy();
  });

  it('Should have right row image', () => {
    component.showArrows = true;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#right-row-img');

    expect(img).toBeTruthy();
  });

  it('The right arrow image should be "FlechaDerVerde.svg" if the "enableRightArrow" property is true and the index is lower than "options.length - 1"', () => {
    component.options = optionsTest;
    component.showArrows = true;
    component.enableRightArrow = true;
    component.index = 0;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#right-row-img');

    expect(img.src).toEqual(`${imgDirectory}/FlechaDerVerde.svg`);
  });

  it('The right arrow image should be "flechaDerechaCatProNormal.svg" if the "enableRightArrow" property is false and the index is greater than "options.length - 1"', () => {
    component.options = optionsTest;
    component.showArrows = true;
    component.enableRightArrow = false;
    component.index = 43434;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#right-row-img');

    expect(img.src).toEqual(`${imgDirectory}/flechaDerechaCatProNormal.svg`);
  });
});
