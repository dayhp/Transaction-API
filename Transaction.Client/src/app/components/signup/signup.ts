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
import { routes } from '../../app.routes';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {

  signupForm: FormGroup;
  errorMessage: string | null = null;
  constructor(private fb: FormBuilder,
    private autService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef) {

    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
      {
        validators: this.passwordMatchValidator
      });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control: AbstractControl | null = this.signupForm.get(controlName);
    return control ? control.hasError(errorName) && (control.touched || control.dirty) : false;
  }

  passwordMatchValidator(fb: FormGroup): ValidationErrors | null {
    const password = fb.get('password')?.value;
    const confirmPassword = fb.get('confirmPassword')?.value;
    var isValid = password === confirmPassword ? null : { passwordMismatch: true };
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      this.autService.register(user).subscribe({
        next: (response) => {
          console.log('Response from register:', response);
          this.errorMessage = null;
          this.router.navigate(['/transactions']);
          console.log('Registration successful', response);
        },
        error: (error) => {
          console.error('Registration failed', error?.error?.message);
          this.errorMessage = 'Registration failed. Please try again.';
           this.cdr.detectChanges();
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
