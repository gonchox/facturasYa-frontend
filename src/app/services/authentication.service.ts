import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  URI: string = `${environment.HOST_URL}/auth/sign-in`;
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  logIn(body) {
    return this.http.post(this.URI, body).pipe(
      map((response: any) => {
        localStorage.setItem('username', response.username);
        const tokenSTR = response.token;
        localStorage.setItem('token', tokenSTR);
        return response;
      })
    );
  }
  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
      this.notificationService.OpenSnackbar(
        'Gracias por usar nuestra aplicación'
      );
    });
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
