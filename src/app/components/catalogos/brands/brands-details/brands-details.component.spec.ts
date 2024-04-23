import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BrandsDetailsComponent} from './brands-details.component';

describe('BrandsDetailsComponent', () => {
  let component: BrandsDetailsComponent;
  let fixture: ComponentFixture<BrandsDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BrandsDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
