import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CatalogosHomeComponent} from './catalogos-home.component';

describe('CatalogosHomeComponent', () => {
  let component: CatalogosHomeComponent;
  let fixture: ComponentFixture<CatalogosHomeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CatalogosHomeComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
