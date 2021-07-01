import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss'],
})
export class AppbarComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {}
  visibility = true;

  ngOnInit(): void {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof ActivationStart) {
        if (event.snapshot.data.appbar != null) {
          this.visibility = event.snapshot.data.appbar;
        }
      }
    });
  }
  cerrarSesion() {
    this.authenticationService.logOut();
  }
}
