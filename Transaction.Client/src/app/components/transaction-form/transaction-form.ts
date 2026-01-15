import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from '../../services/transaction';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionFormComponent implements OnInit {
  // Component logic goes here
  transactionForm: FormGroup;
  incomeCategories: string[] = ['Salary', 'Business', 'Investments', 'Gifts', 'Other'];
  expenseCategories: string[] = ['Food', 'Rent', 'Utilities', 'Entertainment', 'Travel', 'Other'];
  availableCategories: string[] = [];

  // Edit transaction logic can be added here
  editMode: boolean = false;
  transactionId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private transactionService: TransactionsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.transactionForm = this.fb.group({
      transactionType: ['Expenses', Validators.required],
      category: ['', Validators.required],
      transactionDate: [new Date(), Validators.required],
      amount: [1, [Validators.required, Validators.min(1)]],
      description: [''],
    });
  }

  ngOnInit(): void {
    const transactionType = this.transactionForm.get('transactionType')?.value;
    this.updateCategoryOptions(transactionType);
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.transactionId = id;
    }
    this.loadTransactionIfEditMode(id);
  }

  loadTransactionIfEditMode(id: string | null): void {
    if (this.editMode && id) {
      this.transactionService.getTransactionById(id).subscribe({
        next: (transaction) => {
          const rawDate = new Date(transaction.transactionDate);
          const mm = String(rawDate.getMonth() + 1).padStart(2, '0');
          const dd = String(rawDate.getDate()).padStart(2, '0');
          const yyyy = rawDate.getFullYear();
          const formattedDate = `${yyyy}-${mm}-${dd}`;
           this.updateCategoryOptions(transaction.transactionType);
          this.transactionForm.patchValue({
            transactionType: transaction.transactionType,
            category: transaction.category,
            transactionDate: formattedDate,
            amount: transaction.amount,
            description: transaction.description,
          });
         
        },
        error: (error) => {
          console.error('Error loading transaction:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      //console.log('Form Submitted', this.transactionForm.value);
      // Handle form submission logic here
      if (this.editMode && this.transactionId) {
       this.transactionService.updateTransaction(this.transactionId, this.transactionForm.value).subscribe({
          next: () => {
            console.log('Form Submitted', this.transactionForm.value);
            this.router.navigate(['/transactions']);
          },
          error: (error) => {
            console.error('Error updating transaction:', error);
          }
       });
      } else {
        this.transactionService.createTransaction(this.transactionForm.value).subscribe({
          next: () => {
            this.router.navigate(['/transactions']);
          },
          error: (error) => {
            console.error('Error creating transaction:', error);
          }
        });
      }
    }
  }

  onCancel(): void {
    // this.transactionForm.reset({
    //   transactionType: 'Expenses',
    //   category: '',
    //   transactionDate: new Date(),
    //   amount: 1,
    // });
    // this.availableCategories = this.expenseCategories;
    this.router.navigate(['/transactions']);
  }

  onTransactionTypeChange(): void {
    const transactionType = this.transactionForm.get('transactionType')?.value;
    this.updateCategoryOptions(transactionType);
  }

  updateCategoryOptions(transactionType: string): void {
    this.availableCategories = transactionType === 'Expenses' ? this.expenseCategories : this.incomeCategories;
    this.transactionForm.patchValue({ category: '' });
  }

}
