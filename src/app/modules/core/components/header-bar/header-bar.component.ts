import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  isLoggedIn = false;

  constructor() { }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('auth-token') ? true : false;
  }

}
