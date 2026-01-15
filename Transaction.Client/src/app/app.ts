import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header";
import { FooterComponent } from './components/footer/footer';
import { TransactionListComponent } from './components/transaction-list/transaction-list';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, Header],
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Transaction.Client');
}
