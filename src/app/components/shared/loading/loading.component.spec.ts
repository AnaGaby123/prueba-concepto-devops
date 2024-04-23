import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {LoadingComponent} from '@appComponents/shared/loading/loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let compiled: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadingComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load-circle container should exist', () => {
    const container = compiled.querySelector('.load-circle');

    expect(container).toBeTruthy();
  });

  it('Initial value for @Input color should be blue', () => {
    expect(component.color).toEqual('blue');
  });

  it('Should have 3 elements with class "line"', () => {
    const elements = compiled.querySelectorAll('.line');

    expect(elements.length).toBeGreaterThan(0);
  });

  it('Should have 3 elements with a class of the initial color from @Input color', () => {
    const elements = compiled.querySelectorAll('.blue');

    expect(elements.length).toBeGreaterThan(0);
  });

  it('Should change the value of property @Input color', () => {
    const newColor = 'red';

    component.color = newColor;
    fixture.detectChanges();

    expect(component.color).toBe(newColor);
  });

  it('Should have 3 elements with a class representing the new value from @Input color', () => {
    const newColor = 'red';

    component.color = newColor;
    fixture.detectChanges();

    const elements = compiled.querySelectorAll(`.${newColor}`);

    expect(elements.length).toBeGreaterThan(0);
  });
});
