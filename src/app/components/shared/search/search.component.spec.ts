import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SearchComponent} from '@appComponents/shared/search/search.component';
import {FormsModule} from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let compiled: HTMLElement;

  const imgDirectory = 'http://localhost/assets/Images';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchComponent],
        imports: [FormsModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Container search should exist', () => {
    const container = compiled.querySelector('#search-container');

    expect(container).toBeTruthy();
  });

  it('Should call the function closeCombo(); with blur event on search-container', () => {
    const blur = new Event('blur');
    const container: HTMLDivElement = compiled.querySelector('#search-container');

    jest.spyOn(component, 'closeCombo');

    container.dispatchEvent(blur);

    expect(component.closeCombo).toHaveBeenCalled();
  });

  it('The function closeCombo(); should change the value of the property "openType" from true to false', () => {
    component.openType = true;
    fixture.detectChanges();

    component.closeCombo(new Event('blur'));
    fixture.detectChanges();

    expect(component.openType).toEqual(false);
  });

  it('The magnifying glass image should be exist', () => {
    component.isSearchByType = false;
    fixture.detectChanges();

    const img = compiled.querySelector('#magnifying-glass-img');

    expect(img).toBeTruthy();
  });

  it('The magnifying glass img should be "lupa_blanca.svg"', () => {
    component.isSearchByType = false;
    component.imageFill = 'no transparent';
    component.resultsIsOpen = false;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#magnifying-glass-img');

    expect(img.src).toEqual(`${imgDirectory}/lupa_blanca.svg`);
  });

  it('The magnifying glass img should be "lupa.svg"', () => {
    component.isSearchByType = false;
    component.imageFill = 'transparent';
    component.resultsIsOpen = true;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#magnifying-glass-img');

    expect(img.src).toEqual(`${imgDirectory}/lupa.svg`);
  });

  it('Input for search should exist', () => {
    const input: HTMLInputElement = compiled.querySelector('#search-input');

    expect(input).toBeTruthy();
  });

  it('The event "ngModelChange" of input search should call the function "handleSearch"', () => {
    const event = new Event('ngModelChange');
    const input: HTMLInputElement = compiled.querySelector('#search-input');

    jest.spyOn(component, 'handleSearch');

    input.dispatchEvent(event);

    expect(component.handleSearch).toHaveBeenCalled();
  });

  it('The function handleSearch() should emit the value of property "textSearch"', () => {
    const value = 'I am a text';

    jest.spyOn(component.textSearch, 'emit');

    component.handleSearch(value);

    expect(component.textSearch.emit).toHaveBeenCalled();
  });

  it('The event "keyup.enter" should call the function "onSelectSearchTerm"', () => {
    const event = new KeyboardEvent('keyup', {key: 'Enter'});
    const input: HTMLInputElement = compiled.querySelector('#search-input');

    jest.spyOn(component, 'onSelectSearchTerm');

    input.dispatchEvent(event);

    expect(component.onSelectSearchTerm).toHaveBeenCalled();
  });

  it('The event "paste" should call the function "handlePasteEvent"', () => {
    const event = new Event('paste');
    const input: HTMLInputElement = compiled.querySelector('#search-input');

    jest.spyOn(component, 'handlePasteEvent');

    input.dispatchEvent(event);

    expect(component.handlePasteEvent).toHaveBeenCalled();
  });

  it('The event "keydown" should call the function "handleKeyDownEvent"', () => {
    const event = new Event('keydown');
    const input: HTMLInputElement = compiled.querySelector('#search-input');

    jest.spyOn(component, 'handleKeyDownEvent');

    input.dispatchEvent(event);

    expect(component.handleKeyDownEvent).toHaveBeenCalled();
  });

  it('The event "focus" should call the function "onFocus"', () => {
    const event = new Event('focus');
    const input: HTMLInputElement = compiled.querySelector('#search-input');

    jest.spyOn(component, 'onFocus');

    input.dispatchEvent(event);

    expect(component.onFocus).toHaveBeenCalled();
  });

  it('The event "blur" should call the function "onBlur"', () => {
    const event = new Event('blur');
    const input: HTMLInputElement = compiled.querySelector('#search-input');

    jest.spyOn(component, 'onBlur');

    input.dispatchEvent(event);

    expect(component.onBlur).toHaveBeenCalled();
  });

  it('Close image should exist', () => {
    component.searchTerm = 'I am a text';
    component.isExpandable = true;
    fixture.detectChanges();

    const img: HTMLImageElement = compiled.querySelector('#close-img');

    expect(img).toBeTruthy();
  });

  it('Close image should call function "onClearSearchTerm"', () => {
    component.searchTerm = 'I am a text';
    component.isExpandable = true;
    fixture.detectChanges();

    const event = new Event('click');
    const img: HTMLImageElement = compiled.querySelector('#close-img');

    jest.spyOn(component, 'onClearSearchTerm');

    img.dispatchEvent(event);

    expect(component.onClearSearchTerm).toHaveBeenCalled();
  });

  it('Function "onClearSearchTerm" should emit the properties "textSearch" and "handleClearSearchTerm"', () => {
    jest.spyOn(component.textSearch, 'emit');
    jest.spyOn(component.handleClearSearchTerm, 'emit');

    component.onClearSearchTerm();

    expect(component.textSearch.emit).toHaveBeenCalled();
    expect(component.handleClearSearchTerm.emit).toHaveBeenCalled();
  });

  it('Functon "onClearSearchTerm" should emit the property "textSearch" with empty value', () => {
    jest.spyOn(component.textSearch, 'emit');

    component.onClearSearchTerm();
    expect(component.textSearch.emit).toHaveBeenCalledWith('');
  });
});
