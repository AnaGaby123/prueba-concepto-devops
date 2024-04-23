import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProviderGeneralDataComponent} from './provider-general-data.component';

describe('ProviderGeneralDataComponent', () => {
  let component: ProviderGeneralDataComponent;
  let fixture: ComponentFixture<ProviderGeneralDataComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProviderGeneralDataComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderGeneralDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
