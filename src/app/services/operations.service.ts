import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  URI1: string = `${environment.HOST_URL}/users`;
  URI2: string = `${environment.HOST_URL}/operations`;
  UriInvoices: string = `${environment.HOST_URL}/invoices`;
  UriRateTerm: string = `${environment.HOST_URL}/rateTerms`;
  constructor(private http: HttpClient) {}

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  getOperationsByUserId(id) {
    return this.http.get(`${this.URI1}/${id}/operations`, {
      headers: this.reqHeader,
    });
  }
  getOperationById(id) {
    return this.http.get(`${this.URI2}/${id}`, {
      headers: this.reqHeader,
    });
  }
  createOperation(id, body) {
    return this.http.post(`${this.URI1}/5/rateTerms/${id}/operations`, body, {
      headers: this.reqHeader,
    });
  }
  createInvoiceByOperationId(operationId, body) {
    return this.http.post(`${this.URI2}/${operationId}/invoices`, body, {
      headers: this.reqHeader,
    });
  }
  createFinalCostByOperationId(operationId, body) {
    return this.http.post(`${this.URI2}/${operationId}/finalCosts`, body, {
      headers: this.reqHeader,
    });
  }
  createInitialCostByOperationId(operationId, body) {
    return this.http.post(`${this.URI2}/${operationId}/initialCosts`, body, {
      headers: this.reqHeader,
    });
  }
  getIvoices() {
    return this.http.get(this.UriInvoices, { headers: this.reqHeader });
  }
  getOperations() {
    return this.http.get(this.URI2, { headers: this.reqHeader });
  }
  getInitialCosts() {
    return this.http.get(`${this.URI2}/initialCosts`, {
      headers: this.reqHeader,
    });
  }
  getFinalCosts() {
    return this.http.get(`${this.URI2}/finalCosts`, {
      headers: this.reqHeader,
    });
  }
  getRateTermById(id) {
    return this.http.get(`${this.UriRateTerm}/${id}`, {
      headers: this.reqHeader,
    });
  }
  editOperation(operationId, userId, rateTermId, body) {
    return this.http.put(
      `${this.URI1}/${userId}/rateTerms/${rateTermId}/operations/${operationId}`,
      body,
      { headers: this.reqHeader }
    );
  }
}
