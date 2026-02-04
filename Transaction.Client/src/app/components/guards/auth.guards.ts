import { inject } from "@angular/core";
import { AuthService } from "../../services/auth/auth";
import { Router } from "@angular/router";

export const authGuards = () => {
  {
    // Implementation of authentication guards
    const authService = inject(AuthService);
    const router = inject(Router);
    if (!authService.isAuthenticated()) {
      // Redirect to login or handle unauthorized access
      router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
};