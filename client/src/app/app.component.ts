import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  navLinks: any[];
  activeLinkIndex = 0;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
    this.navLinks = [
      {
        label: 'Client',
        link: './users',
        icon: 'how_to_reg',
        index: 0
      }, {
        label: 'Voitures',
        link: './voitures',
        icon: 'local_car_wash',
        index: 1
      },
    ];
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
