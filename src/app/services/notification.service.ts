import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _matSnackbar: MatSnackBar) {}

  OpenSnackbar(message) {
    this._matSnackbar.open(message, 'Aceptar', {
      duration: 2000,
    });
  }
}
