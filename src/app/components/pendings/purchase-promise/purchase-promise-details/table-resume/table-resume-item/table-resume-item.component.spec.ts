import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableResumeItemComponent} from './table-resume-item.component';

describe('TableResumeItemComponent', () => {
  let component: TableResumeItemComponent;
  let fixture: ComponentFixture<TableResumeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableResumeItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableResumeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
