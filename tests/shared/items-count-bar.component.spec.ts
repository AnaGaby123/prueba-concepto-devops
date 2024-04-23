import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ItemsCountBarComponent} from '@appComponents/shared/items-count-bar/items-count-bar.component';
import {TranslateModule} from '@ngx-translate/core';

describe('ItemsCountBarComponent', () => {
  let component: ItemsCountBarComponent;
  let fixture: ComponentFixture<ItemsCountBarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ItemsCountBarComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsCountBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
