import { Component, effect, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/authentication/auth.service';
import { updateUserRequest, User } from '../../model/entities.model';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ModalComponent } from "../modal/modal.component";
import { CardPremiumComponent } from "./widgets/card-premium/card-premium.component";

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CardPremiumComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {

  emailFromPayload: string = this.authService.getEmailFromParsedPayload();
  isAuthenticated: boolean | null = this.authService.isLoggedIn()
  connectedUser!: User;
  submitted = false
  updateProfile = false
  updateForm!: FormGroup
 

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService) {
    this.updateForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.validateSamePassword]]
    })
  }

  //Method to confirm password
  private validateSamePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('confirmPassword');
    return password?.value == confirmPassword?.value ? null : { 'notSame': true };
  }

  
  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.userService.fetchUser(this.emailFromPayload).subscribe({
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

  onUpdateUser() {
    this.updateProfile = true
  }

  onDeleteUpdateUser() {
    this.updateProfile = false
  }

  // Update user configuration start //////////////////////////////////////////////////////////

  get firstname() {
    return this.updateForm.get('firstname');
  }

  get lastname() {
    return this.updateForm.get('lastname');
  }

  get email() {
    return this.updateForm.get('email');
  }

  get password() {
    return this.updateForm.get('password');
  }

  updateInfo(): updateUserRequest | undefined {

    const updateRequest: updateUserRequest = {
      firstName: this.firstname?.value,
      lastName: this.lastname?.value,
      email: this.email?.value,
      password: this.password?.value
    }

    return updateRequest;
  }

  onSubmit() {
    this.submitted = true
    this.userService.updateUser(this.updateInfo() , this.connectedUser.id).subscribe({
      next: (respone) => { 
        location.reload()
        console.log(respone) },
      error: (err) => { console.log(err) }
    })
  }

  // Update user configuration end //////////////////////////////////////////////////////////

  // Delete user configuration start //////////////////////////////////////////////////////////

  deleteUser() {
    this.userService.deleteUser(this.connectedUser.id)
  }

  // Delete user configuration end //////////////////////////////////////////////////////////

  

}
