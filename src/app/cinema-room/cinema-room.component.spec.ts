import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaRoomComponent } from './cinema-room.component';

describe('CinemaRoomComponent', () => {
  let component: CinemaRoomComponent;
  let fixture: ComponentFixture<CinemaRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
