import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AddCampaingComponent} from './add-campaing.component';

describe('AddCampaingComponent', () => {
  let component: AddCampaingComponent;
  let fixture: ComponentFixture<AddCampaingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddCampaingComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampaingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
