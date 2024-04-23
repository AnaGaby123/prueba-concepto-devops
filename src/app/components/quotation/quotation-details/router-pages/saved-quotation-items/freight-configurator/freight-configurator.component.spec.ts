import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FreightConfiguratorComponent} from './freight-configurator.component';

describe('FreightConfiguratorComponent', () => {
  let component: FreightConfiguratorComponent;
  let fixture: ComponentFixture<FreightConfiguratorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FreightConfiguratorComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
