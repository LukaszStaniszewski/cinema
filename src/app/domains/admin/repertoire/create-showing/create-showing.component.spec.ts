import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateShowingComponent } from "./create-showing.component";

describe("CreateShowingComponent", () => {
  let component: CreateShowingComponent;
  let fixture: ComponentFixture<CreateShowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateShowingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
