import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class SigninComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  authToken: Token;
  private subscription: Subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    //If the token is already present refresh the token if it succeeds sign in the user
    this.refreshTokenIfItExists();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  ngOnDestroy() {
    //Removing all the subscriptions
    this.subscription.unsubscribe();
  }

  getFormData() {
    return this.loginForm.controls;
  }

  handleSubmit(): void {
    const username: string = this.getFormData().username.value;
    const password: string = this.getFormData().password.value;

    this.subscription.add(
      this.loginService
        .login({ username, password })
        .subscribe(this.signInUser())
    );
  }

  /**************************Private Methods  ***********************************/

  //Refresh the token if the token is already exists in the `localStorage` and sigin the user
  private refreshTokenIfItExists(): void {
    if (localStorage.getItem('authToken')) {
      this.subscription.add(
        this.loginService.refreshToken().subscribe(this.signInUser())
      );
    }
  }

  /**
   * Sign in the user, if the jwt is  success
   * @param {boolean} sucess - `true` if jwt is success else  `false`
   */
  private signInUser(): (sucess: boolean) => void {
    return sucess => {
      if (sucess) {
        this.loginService.changeLoginStatus(true);
        this.router.navigate(['/home']);
      }
    };
  }
}
