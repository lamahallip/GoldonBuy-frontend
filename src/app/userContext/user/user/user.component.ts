import { Component, effect, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { AuthService } from '../../../service/authentication/auth.service';
import { Data } from '@angular/router';
import { User } from '../../../model/entities.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(private userService: UserService, private authService: AuthService) {
    this.getUser()
  }

  

  email: string = this.authService.getEmailFromParsedPayload();
  isAuthenticated: boolean | null = this.authService.isLoggedIn()
  connectedUser!: User;

  
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
