import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AssociateItemsComponent} from './associate-items.component';

describe('SecureShipmentAssociateItemsComponent', () => {
  let component: AssociateItemsComponent;
  let fixture: ComponentFixture<AssociateItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociateItemsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
