import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDatesComponent } from './film-dates.component';

describe('FilmDatesComponent', () => {
  let component: FilmDatesComponent;
  let fixture: ComponentFixture<FilmDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
