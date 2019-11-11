import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // TODO: distinctUntilChanged
  private currUser$ = new BehaviorSubject<User>(this.readUserFromLocalStorage());

  constructor(private http: HttpClient) {

    // TODO run out of the zone...
    setInterval(() => {
      this.currUser$.next(this.readUserFromLocalStorage());
    }, 1000);
  }


  login(formUser: User) {
    return this.http.post<AuthResponse>(this.apiUrl + '/login', formUser)
      .pipe(
        map(authResponse => {
          const loggedUser = new User(formUser);
          loggedUser.token = authResponse.token;
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

  getToken() {
    return this.currUser$.pipe(map(user => user ? user.token : null))
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
interface AuthResponse {
  status: boolean;
  errorMessage?: string;
  token?: string
}