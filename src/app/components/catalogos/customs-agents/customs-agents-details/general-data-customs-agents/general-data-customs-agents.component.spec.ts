import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GeneralDataCustomsAgentsComponent} from './general-data-customs-agents.component';

describe('GeneralDataCustomsAgentsComponent', () => {
  let component: GeneralDataCustomsAgentsComponent;
  let fixture: ComponentFixture<GeneralDataCustomsAgentsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GeneralDataCustomsAgentsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDataCustomsAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
