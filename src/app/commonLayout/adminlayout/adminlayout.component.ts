import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../AllComponent/login/login.service';
@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent implements OnInit {
   hide:boolean;
  constructor(private lService: LoginService) { }

  ngOnInit() {
    this.hide = !this.lService.getUserLogStatus();

  }

}
