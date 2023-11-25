import { Component, OnInit } from "@angular/core";
import { Payment } from "./payment.model";
import { GridService } from "../../services/grid.service";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.css"],
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  newPayment: Payment = { name: "", amount: 0, code: "", grid: [] };

  constructor(private gridService: GridService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  addPayment(): void {
    this.savePayments();
  }

  private savePayments(): void {
    if (this.newPayment.name) {
      this.gridService.savePayments(this.newPayment).subscribe(
        (response) => {
          this.loadPayments();
          this.newPayment = { name: "", amount: 0, code: "", grid: [] };
        },
        (error) => {
          // Handle error
          console.error("Failed to save payments", error);
        }
      );
    }
  }

  private loadPayments(): void {
    this.gridService.loadPayments().subscribe(
      (payments) => {
        this.payments = payments;
      },
      (error) => {
        console.error("Failed to load payments", error);
      }
    );
  }
}
