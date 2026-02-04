import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private apiUrl = 'https://localhost:7185/api'; 
  constructor(private http: HttpClient) {}

  getTransactions() : Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }

  getTransactionById(id: string) : Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/transactions/${id}`);
  }
  
  createTransaction(transaction: Transaction) : Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
  }

  updateTransaction(id: string, transaction: Transaction) : Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/transactions/${id}`, transaction);
  }

  deleteTransaction(id: string) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/transactions/${id}`);
  }
}
