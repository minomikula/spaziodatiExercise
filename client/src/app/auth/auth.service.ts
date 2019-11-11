import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { map, tap } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';

/** 
 * We are using JWT tokens pattern, so token is generated on
 * every login request and using that token for every server request.
 * 
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api';
  private localStorageUserKey = 'user';

  // TODO: check if Local Storage wes not changed in another tab
  private currUser$ = new BehaviorSubject<User>(this.readUserFromLocalStorage());

  constructor(private http: HttpClient) { }

  login(formUser: User) {
    return this.http.post(this.apiUrl + '/login', formUser, {
      responseType: 'text',
      observe: 'body'
    })
      .pipe(
        map(token => {
          const loggedUser = new User(formUser);
          loggedUser.token = token;
          return loggedUser;
        }),
        tap(loggedUser => {
          localStorage.setItem(this.localStorageUserKey, JSON.stringify(loggedUser));
          this.currUser$.next(loggedUser);
        }))

  }

  logout() {
    localStorage.removeItem(this.localStorageUserKey);
    this.currUser$.next(null);
    return of(true);
  }

  getLoggedUser(): Observable<User> {
    return this.currUser$.asObservable();
  }
  isLogged(): Observable<boolean> {
    return this.currUser$.pipe(map(Boolean));
  }

  private readUserFromLocalStorage(): User {
    const userString = localStorage.getItem(this.localStorageUserKey);
    if (!userString) {
      return null;
    }
    return JSON.parse(userString);
  }
}
