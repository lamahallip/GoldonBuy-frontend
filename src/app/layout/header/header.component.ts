import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  location = inject(Location)

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  email: string = this.authService.getEmailFromParsedPayload();
  isAuthenticated: boolean | null = this.authService.isLoggedIn();


  goBackward() {
    this.location.back()
  }
  goForward() {
    this.location.forward()
  }

  logout() {
    this.router.navigate(['/login'])
    this.authService.logout()
  }

}
