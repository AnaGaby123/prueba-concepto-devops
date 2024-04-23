import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClientsListFiltersComponent} from './clients-list-filters.component';

describe('ClientsListFiltersComponent', () => {
  let component: ClientsListFiltersComponent;
  let fixture: ComponentFixture<ClientsListFiltersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientsListFiltersComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
