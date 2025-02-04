import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/authentication/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  isAuthenticated: boolean | null = this.authService.isLoggedIn()

  constructor(private authService: AuthService, private router: Router ) {}

  loadProfilComponent() {
    this.router.navigate(['layout', { outlets: { aux: ['profile'] } }])
  }



}
