import { Component, OnInit } from "@angular/core";
import { GridService } from "../../services/grid.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"],
})
export class GridComponent implements OnInit {
  grid: string[][] = [];
  bias: string = "";
  lastBiasInputTime: number = 0;
  timer: number = 2;
  biasButtonDisabled: boolean = false;
  timerInterval: any;

  private gridSubscription: Subscription = new Subscription();

  constructor(private gridService: GridService) {}

  ngOnInit(): void {
    // Subscribe to grid changes
    this.gridSubscription = this.gridService
      .getGridObservable()
      .subscribe((grid) => {
        this.grid = grid;
      });
  }

  ngOnDestroy(): void {
    this.gridSubscription.unsubscribe();
  }

  generateGrid(): void {
    this.gridService.generateGridAndCode().subscribe(({ grid, code }) => {
      // Set the grid
      this.gridService.setGrid(grid);

      // Set the code
      this.gridService.setCode(code);

      // Stop the current timer
      this.stopTimer();

      // Start the countdown timer
      this.startTimer();

      // Start automatic generation only if not already started
      this.gridService.startAutomaticGridAndCodeGeneration();
    });
  }

  sendBias(bias: string): void {
    const currentTime = new Date().getTime();

    // Check if it's been at least 4 seconds since the last bias input
    if (currentTime - this.lastBiasInputTime >= 4000) {
      this.lastBiasInputTime = currentTime;

      this.biasButtonDisabled = true;

      this.gridService.sendBias(bias).subscribe((response) => {
        if (response.success) {
          setTimeout(() => {
            this.biasButtonDisabled = false;
          }, 4000);
        } else {
          console.error("Failed to send bias");
          this.biasButtonDisabled = false;
        }
      });
    } else {
      console.warn("You can only enter a character once every 4 seconds.");
      this.biasButtonDisabled = false;
    }
  }

  private startTimer(): void {
    this.resetTimer();

    this.timerInterval = setInterval(() => {
      this.timer--;

      if (this.timer === 0) {
        this.resetTimer();
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private resetTimer(): void {
    this.timer = 2;
  }
}
