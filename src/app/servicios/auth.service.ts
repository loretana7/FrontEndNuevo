import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { config } from 'src/assets/data/config/Config';
import { LoginDto } from '../data/LoginDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  public login(credentials: LoginDto): Observable<Boolean>{
    return this.http.post<Boolean>(config.baseUrl + "login",credentials).pipe( 
      tap((response: Boolean) => {
        if (response) 
        sessionStorage.setItem("user","tanita");
      })
    );
  }
  public logout(){
    sessionStorage.removeItem("user");
  }
  public isUserLogged(): boolean{
    return sessionStorage.getItem("user") !== null;

  }
}
