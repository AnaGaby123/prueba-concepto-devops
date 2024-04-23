import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemDevicesComponent} from './item-devices.component';

describe('ItemPublicationsComponent', () => {
  let component: ItemDevicesComponent;
  let fixture: ComponentFixture<ItemDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDevicesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
