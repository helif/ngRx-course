import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../user/auth.service';
import { Store } from '@ngrx/store';
import { UserState } from '../user/state/user.state';
import { getCurrentUser, getCurrentUserName } from '../user/state/user.reducer';
import { LogoutUser } from '../user/state/user.actions';

@Component({
  selector: 'pm-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  pageTitle = 'Acme Product Management';

  public isLoggedIn: boolean = false;
  // get isLoggedIn(): boolean {
    // return this.authService.isLoggedIn();
  // }

  public userName:string = '';
  // get userName(): string {
    // if (this.authService.currentUser) {
    //   return this.authService.currentUser.userName;
    // }
    // return '';
  // }

  constructor(private router: Router,
              private authService: AuthService,
              private store:Store<UserState>) { }

  ngOnInit() {
    this.store.select(getCurrentUserName).subscribe(
      userName => this.userName = userName
    );

    this.store.select(getCurrentUser).subscribe(
      currentUser => this.isLoggedIn = currentUser != null
    )
  }

  logOut(): void {
    this.store.dispatch(new LogoutUser());
    this.router.navigate(['/welcome']);
  }
}
