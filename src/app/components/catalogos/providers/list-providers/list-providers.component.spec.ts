import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ListProvidersComponent} from './list-providers.component';

describe('ListProvidersComponent', () => {
  let component: ListProvidersComponent;
  let fixture: ComponentFixture<ListProvidersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ListProvidersComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
