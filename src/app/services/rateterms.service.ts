import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RatetermsService {
  URI: string = `${environment.HOST_URL}/rateTerms`;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}
  createRateTerm(body) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.post(this.URI, body, { headers: reqHeader });
  }
}
