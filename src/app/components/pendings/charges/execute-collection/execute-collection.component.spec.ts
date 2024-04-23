import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ExecuteCollectionComponent} from './execute-collection.component';

describe('ExecuteCollectionComponent', () => {
  let component: ExecuteCollectionComponent;
  let fixture: ComponentFixture<ExecuteCollectionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExecuteCollectionComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
