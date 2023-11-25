import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { GridService } from "../../services/grid.service";

@Component({
  selector: "app-code-display",
  templateUrl: "./code-display.component.html",
  styleUrls: ["./code-display.component.css"],
})
export class CodeDisplayComponent implements OnInit {
  code: string = "";
  private codeSubscription: Subscription = new Subscription();

  constructor(private gridService: GridService) {}

  ngOnInit(): void {
    // Subscribe to code changes
    this.codeSubscription = this.gridService
      .getCodeObservable()
      .subscribe((code) => {
        this.code = code;
      });
  }

  ngOnDestroy(): void {
    this.codeSubscription.unsubscribe();
  }
}
