import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OfflineProductComponent} from './offline-product.component';

describe('OfflineProductComponent', () => {
  let component: OfflineProductComponent;
  let fixture: ComponentFixture<OfflineProductComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OfflineProductComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
