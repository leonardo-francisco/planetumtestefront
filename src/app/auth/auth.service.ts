import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  readonly apiUrl = 'https://localhost:7014/gateway/auth';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: any;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin' : '*'})
  }


  login(user: User): Observable<any>{
    return this.http.post<User>(this.apiUrl,user)
     .pipe(
      catchError((error) => {
      return throwError(error);
    }),tap(res => {
      if(res ){
         localStorage.setItem('currentUser', JSON.stringify({ user, token: this.token }))
         this.loggedIn.next(true);
      }
     }));
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getToken(): string {
    return this.token;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
