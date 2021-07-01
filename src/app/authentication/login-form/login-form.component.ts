import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  @Output() registrarse = new EventEmitter();
  isLoading = false;
  loginForm: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  activeRegister() {
    this.registrarse.emit();
  }
  logIn() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      var body = {
        username: this.loginForm.get('user').value,
        password: this.loginForm.get('password').value,
      };
      this.authenticationService.logIn(body).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
            this.notificationService.OpenSnackbar(
              'Se ha logeado correctamente'
            );
          });
        },
        (error) => {
          this.notificationService.OpenSnackbar(
            'Ha ocurrido un error al iniciar sesión'
          );

          this.isLoading = false;
        }
      );
    } else {
      this.notificationService.OpenSnackbar(
        'Por favor ingrese sus credenciales'
      );
    }
  }
}
