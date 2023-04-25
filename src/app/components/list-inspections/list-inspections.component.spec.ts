import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInspectionsComponent } from './list-inspections.component';

describe('ListInspectionsComponent', () => {
  let component: ListInspectionsComponent;
  let fixture: ComponentFixture<ListInspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInspectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
