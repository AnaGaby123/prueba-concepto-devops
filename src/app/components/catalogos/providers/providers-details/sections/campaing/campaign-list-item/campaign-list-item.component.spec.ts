import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CampaignListItemComponent} from './campaign-list-item.component';

describe('CampaignListItemComponent', () => {
  let component: CampaignListItemComponent;
  let fixture: ComponentFixture<CampaignListItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CampaignListItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
