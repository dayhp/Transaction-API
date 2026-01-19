import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { CommonModule } from '@angular/common';
import { TransactionsService } from '../../services/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  constructor(private transactionService: TransactionsService,
    private cdr: ChangeDetectorRef, private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTransactions();

  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions = data;
      this.cdr.detectChanges();
    });
  }

  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.transactionType === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactions
      .filter(t => t.transactionType === 'Expenses')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalBalance(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  editTransaction(transaction: Transaction): void {
    // Implement navigation to edit form
    this.router.navigate(['/transactions/edit', transaction.id]);
  }

  deleteTransaction(transaction: Transaction): void {
    if (confirm(`Are you sure you want to delete this transaction?`)) {
      this.transactionService.deleteTransaction(transaction.id).subscribe({
        next: () => {
          this.loadTransactions();
        },
        error: (error) => {
          console.error('Error deleting transaction:', error);
        }
      });
    }
  }
}
