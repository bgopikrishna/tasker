import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  authToken: Token;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    if (localStorage.getItem('authToken')) {
      this.loginService.changeLoginStatus(true);
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  getFormData() {
    return this.loginForm.controls;
  }

  handleSubmit(): void {
    const username: string = this.getFormData().username.value;
    const password: string = this.getFormData().password.value;

    this.loginService.login({ username, password }).subscribe(
      sucess => {
        console.log(sucess);

        if (sucess) {
          this.router.navigate(['/home']);
        }
      },
      response => {
        if (response.token) {
          this.router.navigate(['/home']);
        }
      }
    );
  }
}
