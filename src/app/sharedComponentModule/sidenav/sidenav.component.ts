import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../AllComponent/login/login.service'
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isExpanded = true;

  isShowSettings = true;
  loggedUserName ="U"
  Administrator = "Welcome"
  isShowInventory = true;
  isShowClient = true;
  isShowOffice = true;
  isShowPayroll = true;
  isShowAccounting = true;
  toggleDisplaySettings() {
    this.isShowSettings = !this.isShowSettings;
  }
  toggleDisplayInventory(){
    this.isShowInventory = !this.isShowInventory;
  }
  toggleDisplayClient(){
      this.isShowClient = !this.isShowClient ;
  }
  toggleDisplayOffice(){
    this.isShowOffice = !this.isShowOffice;
  }
  toggleDisplayPayroll(){
    this.isShowPayroll = !this.isShowPayroll;
  }
  toggleDisplayAccounting(){
    this.isShowAccounting= !this.isShowAccounting;
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  constructor(private lService: LoginService) { }

  ngOnInit() {
    if(this.lService.getUserLogStatus()){

      this.loggedUserName = this.lService.getUser().charAt(0).toUpperCase();
      this.Administrator =  "Welcome " + this.lService.getUser()
      console.log("user is", this.Administrator)
    }
  }

}
