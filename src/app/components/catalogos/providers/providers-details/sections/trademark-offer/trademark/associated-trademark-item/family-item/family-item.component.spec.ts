import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FamilyItemComponent} from './family-item.component';

describe('FamilyItemComponent', () => {
  let component: FamilyItemComponent;
  let fixture: ComponentFixture<FamilyItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FamilyItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
