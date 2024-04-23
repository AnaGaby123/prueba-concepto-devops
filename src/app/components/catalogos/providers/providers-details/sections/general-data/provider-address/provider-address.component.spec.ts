import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProviderAddressComponent} from './provider-address.component';

describe('ProviderAddressComponent', () => {
  let component: ProviderAddressComponent;
  let fixture: ComponentFixture<ProviderAddressComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProviderAddressComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
