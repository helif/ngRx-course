import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { UserState } from './state/user.state';
import * as fromUser from './state/user.reducer';
import { MaskUserName, LoginUser } from './state/user.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;
  maskUserName: boolean;

  constructor(private authService: AuthService,
              private store: Store<UserState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store.pipe(select(fromUser.getMaskUserName)).subscribe(
      maskUserName => {
        this.maskUserName = maskUserName        
      })
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new MaskUserName(value));
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      this.store.dispatch(new LoginUser({
        userName:loginForm.form.value.userName,
        password:loginForm.form.value.password
      }));

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
