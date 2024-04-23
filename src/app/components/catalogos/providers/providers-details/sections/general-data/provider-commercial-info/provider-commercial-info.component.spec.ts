import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProviderCommercialInfoComponent} from './provider-commercial-info.component';

describe('ProviderCommercialInfoComponent', () => {
  let component: ProviderCommercialInfoComponent;
  let fixture: ComponentFixture<ProviderCommercialInfoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProviderCommercialInfoComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderCommercialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
