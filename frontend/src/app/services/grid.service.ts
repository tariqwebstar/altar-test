import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, Subscription, interval } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";
import { Payment } from "../pages/payments/payment.model";

@Injectable({
  providedIn: "root",
})
export class GridService {
  private baseUrl = "http://localhost:3000/api";
  private grid: string[][] = [];
  private code: string = "";
  private automaticGenerationStarted = false;

  private gridSubject = new Subject<string[][]>();
  private codeSubject = new Subject<string>();
  private automaticGenerationSubscription: Subscription = new Subscription();

  constructor(private http: HttpClient) {}

  getGrid(): string[][] {
    return this.grid;
  }

  setGrid(grid: string[][]): void {
    this.grid = grid;
    this.gridSubject.next(grid);
  }

  getGridObservable(): Observable<string[][]> {
    return this.gridSubject.asObservable();
  }

  getCode(): string {
    return this.code;
  }

  setCode(code: string): void {
    this.code = code;
    this.codeSubject.next(code);
  }

  getCodeObservable(): Observable<string> {
    return this.codeSubject.asObservable();
  }

  generateGridAndCode(): Observable<{ grid: string[][]; code: string }> {
    return this.http.get<string[][]>(`${this.baseUrl}/grid`).pipe(
      switchMap((gridData) => {
        return this.http
          .get<{ code: string }>(`${this.baseUrl}/code`)
          .pipe(map((codeData) => ({ grid: gridData, code: codeData.code })));
      })
    );
  }

  startAutomaticGridAndCodeGeneration(): void {
    if (!this.automaticGenerationStarted) {
      this.automaticGenerationStarted = true;
      this.automaticGenerationSubscription = interval(2000)
        .pipe(
          startWith(0),
          switchMap(() => this.generateGridAndCode())
        )
        .subscribe(({ grid, code }) => {
          // Set the grid
          this.setGrid(grid);

          // Set the code
          this.setCode(code);
        });
    }
  }

  resetAutomaticGeneration(): void {
    this.automaticGenerationStarted = false;
    if (this.automaticGenerationSubscription) {
      this.automaticGenerationSubscription.unsubscribe();
    }
  }

  sendBias(bias: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.baseUrl}/bias`, {
      bias,
    });
  }

  savePayments(payment: Payment): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(
      `${this.baseUrl}/payments`,
      payment
    );
  }

  loadPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/payments`);
  }
}
