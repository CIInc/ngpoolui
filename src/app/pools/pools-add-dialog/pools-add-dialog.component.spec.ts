import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolsAddDialogComponent } from './pools-add-dialog.component';

describe('PoolsAddDialogComponent', () => {
  let component: PoolsAddDialogComponent;
  let fixture: ComponentFixture<PoolsAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolsAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolsAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
