import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl:any 
  notifier: NotifierService;
  constructor(
    private source: HttpClient,
    private router:Router, 
    notifier: NotifierService,
  ) {this.notifier = notifier }


 
  login(data) {
    return this.source.post(`${environment.apiUrl}user_login`, data)
    .pipe(map((user: any) => {
      // console.log(user)
      if (user && user.token) {
        localStorage.setItem('currentUser', user.token);
        localStorage.setItem('userData', JSON.stringify(user.data));
        // this.isLoggedIn = true;
      }
    })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userData');
    this.notifier.notify('success', 'Log Out Success!');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

  getAuthorizationToken() {
    const currentUser =localStorage.getItem('currentUser');
    return currentUser;
  }

  isLogged() {
    if (localStorage.getItem('currentUser')) {
      return true
    } else {
     return false     
    }
  }
}
