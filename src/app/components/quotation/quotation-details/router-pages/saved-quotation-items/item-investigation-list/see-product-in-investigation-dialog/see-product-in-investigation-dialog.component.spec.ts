import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeeProductInInvestigationDialogComponent} from './see-product-in-investigation-dialog.component';

describe('SeeProductDialogComponent', () => {
  let component: SeeProductInInvestigationDialogComponent;
  let fixture: ComponentFixture<SeeProductInInvestigationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeeProductInInvestigationDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeProductInInvestigationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
