import { Component, OnInit } from '@angular/core';

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss']
})
export class MenuLeftComponent implements OnInit {

  public employeeAvatar: any;
  public identity: any;

  // Icons
  public faNewspaper = faBell;
  public faCogs = faCogs;
  public faLightbulb = faLightbulb;
  public faHourglass = faHourglass;
  public faUsers = faUsers;

  constructor() { }

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
  }

}
