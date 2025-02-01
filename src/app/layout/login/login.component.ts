
import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/authentication/auth.service';
import { loginRequest } from '../../model/login-and-register.model';
import { ToastService } from '../../service/toast/toast.service';
import { ToastsContainerComponent } from "../toasts-container/toasts-container.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgTemplateOutlet, NgbToastModule, ToastsContainerComponent],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  submitted = false;
  loginForm!: FormGroup

  toastService = inject(ToastService)

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  setUserLogin(): loginRequest {
    const loginRequest: loginRequest = {
      email: this.email?.value,
      password: this.password?.value
    }
    return loginRequest;
  }

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.setUserLogin()).subscribe({
      next: (response) => {
        this.router.navigate(['/layout']);
        console.log(response)
      },
      error: (err: any) => {
        console.log(err)
        this.submitted = false
      }
    })
  }


  // Toast config ///////////////////////////////////////////////////////////

  showInfo(template1: TemplateRef<any>, template2: TemplateRef<any>) {

    if(this.submitted) {
      return this.showSuccess(template1)
    } else {
      return this.showDanger(template2)
    }
  }
    
  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-success text-light', delay: 5000 });
  }
    
  showDanger(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-danger text-light', delay: 7000 });
  }

}
