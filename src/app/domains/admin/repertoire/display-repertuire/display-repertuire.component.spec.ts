import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DisplaywRepertuireComponent } from "./display-repertuire.component";

describe("DisplaywRepertuireComponent", () => {
  let component: DisplaywRepertuireComponent;
  let fixture: ComponentFixture<DisplaywRepertuireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplaywRepertuireComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplaywRepertuireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
