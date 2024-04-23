import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ExecuteCollectionDetailsComponent} from './execute-collection-details.component';

describe('ExecuteCollectionDetailsComponent', () => {
  let component: ExecuteCollectionDetailsComponent;
  let fixture: ComponentFixture<ExecuteCollectionDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExecuteCollectionDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteCollectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
