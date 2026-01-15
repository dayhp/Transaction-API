import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { TransactionListComponent } from './components/transaction-list/transaction-list';
import { TransactionFormComponent } from './components/transaction-form/transaction-form';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'transactions',
        component: TransactionListComponent,
        pathMatch: 'full',
    },
    {
        path: 'transactions/new',
        component: TransactionFormComponent
    },
    {
        path: 'transactions/edit/:id',
        component: TransactionFormComponent
    },
    {
        path: '**',
        redirectTo: 'transactions',
    }
];
