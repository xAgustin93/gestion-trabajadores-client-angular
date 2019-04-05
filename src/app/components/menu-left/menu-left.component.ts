import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss']
})
export class MenuLeftComponent implements OnInit {

  public employeeAvatar: any;
  public identity: any;

  constructor(  ) { }

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
  }

}
