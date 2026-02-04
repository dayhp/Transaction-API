import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  constructor(private fb: FormBuilder,
    private autService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control: AbstractControl | null = this.loginForm.get(controlName);
    return control ? control.hasError(errorName) && (control.touched || control.dirty) : false;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.autService.login(user).subscribe({
        next: (response) => {
          console.log('Response from login:', response);
          this.errorMessage = null;
          this.router.navigate(['/transactions']);
          console.log('Login successful', response);
        },
        error: (error) => {
          console.log('Login failed', error?.error);
          this.errorMessage = error ? error.error : 'Login failed. Please try again.';
          this.cdr.detectChanges();
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
