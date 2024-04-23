import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListRightSidebarComponent} from './list-right-sidebar.component';

describe('RightSidebarComponent', () => {
  let component: ListRightSidebarComponent;
  let fixture: ComponentFixture<ListRightSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListRightSidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
