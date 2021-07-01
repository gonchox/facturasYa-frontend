import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  constructor() {}
  @Output() cancelarRegistro = new EventEmitter();

  registerForm: FormGroup;
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      user: new FormControl(''),
      password: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
    });
  }
  cancelRegistro() {
    this.cancelarRegistro.emit();
  }
}
