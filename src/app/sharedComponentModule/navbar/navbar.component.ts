import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../AllComponent/settingsComponents/NewCompany/company.service'
import { routeurls } from '../../AllComponent/routeurls/routeurls'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isExpanded = false;
  imageSrc;
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  constructor(private cService: CompanyService) { }

  ngOnInit() {
    this.cService.getAll().subscribe((data)=>{
      this.imageSrc = routeurls.BASE_API_URL + routeurls.PICTURE_VIEW_URL + data[0]["logo"]
    })
  }

}
