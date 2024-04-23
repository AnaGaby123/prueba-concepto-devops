import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WarehouseDetailsComponent} from './warehouse-details.component';

describe('WarehouseDetailsComponent', () => {
  let component: WarehouseDetailsComponent;
  let fixture: ComponentFixture<WarehouseDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WarehouseDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
