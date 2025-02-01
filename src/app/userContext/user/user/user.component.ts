import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { AuthService } from '../../../service/authentication/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(private userService: UserService, private authService: AuthService) {
    if(this.isAuthenticated == true) {
      this.getUser()
    }
  }

  email: string = this.authService.getEmailFromParsedPayload();
  isAuthenticated: boolean | null = this.authService.isLoggedIn()
  connectedUser: any;

  
  
  getUser() {
    this.userService.fetchUser(this.email).subscribe({
      next: (data) => {
        console.log(data)
        this.connectedUser = data
      },
      error: (err) => {
        console.log(err)
        console.log('Erreur rencontrée')
      }
    })
  }

}
