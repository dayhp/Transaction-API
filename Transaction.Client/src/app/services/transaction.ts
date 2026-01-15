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
    return this.http.get<Transaction[]>(`${this.apiUrl}/Transactions`);
  }

  getTransactionById(id: string) : Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/Transactions/${id}`);
  }
  
  createTransaction(transaction: Transaction) : Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/Transactions`, transaction);
  }

  updateTransaction(id: string, transaction: Transaction) : Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Transactions/${id}`, transaction);
  }

  deleteTransaction(id: string) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Transactions/${id}`);
  }
}
