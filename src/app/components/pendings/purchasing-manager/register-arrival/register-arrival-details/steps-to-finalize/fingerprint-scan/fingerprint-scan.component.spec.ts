import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FingerprintScanComponent} from './fingerprint-scan.component';

describe('FingerprintScanComponent', () => {
  let component: FingerprintScanComponent;
  let fixture: ComponentFixture<FingerprintScanComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FingerprintScanComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FingerprintScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
