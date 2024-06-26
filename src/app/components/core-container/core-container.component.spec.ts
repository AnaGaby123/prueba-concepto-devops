import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CoreContainerComponent} from './core-container.component';

describe('CoreContainerComponent', () => {
  let component: CoreContainerComponent;
  let fixture: ComponentFixture<CoreContainerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CoreContainerComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
