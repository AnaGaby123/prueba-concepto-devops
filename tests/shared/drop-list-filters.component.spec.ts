import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DropListFiltersComponent} from '@appComponents/shared/drop-list-filters/drop-list-filters.component';

describe('DropListFiltersComponent', () => {
  let component: DropListFiltersComponent;
  let fixture: ComponentFixture<DropListFiltersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DropListFiltersComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DropListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
