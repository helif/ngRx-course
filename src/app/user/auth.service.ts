import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    redirectUrl: string;

    login(userName: string, password: string): Observable<User> {
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
        return of({
            id: 1,
            userName: userName,
            password: password,
            isAdmin: false
        });
    }
}
