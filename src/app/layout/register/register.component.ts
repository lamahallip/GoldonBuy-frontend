import { CommonModule } from '@angular/common';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/authentication/auth.service';
import { loginRequest, registerRequest } from '../../model/login-and-register.model';
import { ToastService } from '../../service/toast/toast.service';
import { ToastComponent } from "../toast/toast.component";
import { ToastsContainerComponent } from "../toasts-container/toasts-container.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgbToastModule, NgTemplateOutlet, ToastsContainerComponent],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  registerForm!: FormGroup;
  submitted = false

  toastService = inject(ToastService)

  ngOnDestroy(): void {
      this.toastService.clear();
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
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

  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  register() : registerRequest | undefined {
    
    const registerRequest: registerRequest = {
      firstName: this.firstname?.value,
      lastName: this.lastname?.value,
      email: this.email?.value,
      password: this.password?.value
    }

    return registerRequest;
  }

  onSubmit() {
    this.submitted = true
    this.authService.register(this.register()).subscribe({
      next: (response) => {
        this.router.navigate(['/login'])
        console.log(response)},
      error: (err) => {
        console.error(err)
        this.submitted = false
      }
    })
  }

  // Toast config ///////////////////////////////////////////////////////////
  
  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-success text-light', delay: 7000 });
  }
  
  showDanger(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-danger text-light', delay: 7000 });
  }

}
