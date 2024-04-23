import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WithoutResultsComponent} from '@appComponents/shared/without-results/without-results.component';
import {TranslateModule} from '@ngx-translate/core';

describe('WithoutResultsComponent', () => {
  let component: WithoutResultsComponent;
  let fixture: ComponentFixture<WithoutResultsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WithoutResultsComponent],
        imports: [TranslateModule.forRoot()],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
