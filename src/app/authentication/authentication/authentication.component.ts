import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor(private router: Router) {}
  activeComponent = [true, false];
  background = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))';
  image = '';
  ngOnInit(): void {
    console.log(this.image);
  }
  myStyle(): object {
    return { 'background-image': `${this.background + ',url(' + this.image}` };
  }

  redirectTo(url) {
    window.open(url);
  }
  activateLogin() {
    this.activeComponent.fill(false);
    this.activeComponent[0] = true;
  }
  activateRegister() {
    this.activeComponent.fill(false);
    this.activeComponent[1] = true;
  }
}
