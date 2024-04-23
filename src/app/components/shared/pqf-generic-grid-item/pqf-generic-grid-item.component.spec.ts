import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfGenericGridItemComponent} from './pqf-generic-grid-item.component';

describe('PqfGenericGridItemComponent', () => {
  let component: PqfGenericGridItemComponent;
  let fixture: ComponentFixture<PqfGenericGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfGenericGridItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfGenericGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
