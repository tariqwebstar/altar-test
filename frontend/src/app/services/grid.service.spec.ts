import { TestBed } from "@angular/core/testing";

import { GridService } from "./grid.service";

describe("ApiService", () => {
  let service: GridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});