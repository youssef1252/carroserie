import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListedComponent } from './data-listed.component';

describe('DataListedComponent', () => {
  let component: DataListedComponent;
  let fixture: ComponentFixture<DataListedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataListedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
