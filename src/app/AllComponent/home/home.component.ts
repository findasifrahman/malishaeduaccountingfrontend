import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ffromDate;
  ttoDate;
  fromDate;
  toDate;
  dontshow = false;
  constructor(private logService: LoginService) { }

  ngOnInit() {
    if(this.logService.getrole() !== "admin"){
      this.dontshow = true
    }
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.ffromDate = firstDay;
    this.ttoDate = lastDay;
  }

}
