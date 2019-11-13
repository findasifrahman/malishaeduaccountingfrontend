import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../settingsComponents/NewCompany/company.service'
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { map,catchError,retry } from 'rxjs/operators';
@Component({
  selector: 'app-summery-report',
  templateUrl: './summery-report.component.html',
  styleUrls: ['./summery-report.component.scss']
})
export class SummeryReportComponent implements OnInit {
  companyName: string = "comapny"
  address: string = "address"
  phone: string = "phone"
  imageSrc;
  ffromDate;
  ttoDate;
  fromDate;
  toDate;

  constructor(private cService: CompanyService, private http: HttpClient){}
  async ngOnInit() {
    this.cService.getAll().subscribe((data)=>{
      this.http.get( "http://localhost:8086/picture/getpic" + "?picid=" + data[0]["logo"]).subscribe(
        dat => {
          console.log(dat)
          this.imageSrc = dat

        }
      )
    })
 }

  public onSubmit(event): void {
    this.ffromDate = this.fromDate
    this.ttoDate = this.toDate
    console.log(this.ffromDate)
  }


}
