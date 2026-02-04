import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  constructor(public authService: AuthService) { }
}