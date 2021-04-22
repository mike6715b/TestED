import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  private isAuthenticated: boolean = false;
  private authStateListener = new Subject<boolean>();
  private userSubject: BehaviorSubject<User>;

  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  get authToken(): string {
    return this.token;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStateListener.asObservable();
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  login(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http
      .post<any>(environment.api_url + '/user/authenticate', authData, {
        withCredentials: true,
      }).subscribe(response => {
          const user = this.user = response;
          console.log("user: " + user);
          const token = user.jwtToken;
          if (token) {
            console.log(token);
            this.token = token;
            this.isAuthenticated = true;
            this.authStateListener.next(true);
            this.userSubject.next(user);
            this.startRefreshTokenTimer();

            this.router.navigate(['/dashboard']);
          }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStateListener.next(false);
    this.userSubject.next(null);
    this.stopRefreshTokenTimer();
    this.router.navigate(['/login']);
  }

  refreshToken() {
    return this.http
      .post<User>(
        environment.api_url + '/user/refresh-token',
        {},
        { withCredentials: true }
      )
      .pipe(
        map((user) => {
          const token = user.jwtToken;
          this.token = token;
          this.userSubject.next(user);
          this.isAuthenticated = true;
          this.authStateListener.next(true);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    console.log(timeout)
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
