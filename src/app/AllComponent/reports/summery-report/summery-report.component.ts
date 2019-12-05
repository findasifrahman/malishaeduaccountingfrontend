import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../settingsComponents/NewCompany/company.service'
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { ClientGroupService } from '../../settingsComponents/NewClientGroup/client-group.service';
import { ClientService } from '../../settingsComponents/NewClient/client.service';
import { routeurls } from '../../routeurls/routeurls'
import { EmployeeService } from '../../settingsComponents/NewEmployee/employee.service'
import { SalesVoucherService } from '../../accountsComponents/newSalesVoucher/sales-voucher.service'
import { SalesRecieptService } from '../../accountsComponents/newSalesReciept/sales-reciept.service'
import { LoginService } from '../../login/login.service'
import { typeWithParameters } from '@angular/compiler/src/render3/util';
@Component({
  selector: 'app-summery-report',
  templateUrl: './summery-report.component.html',
  styleUrls: ['./summery-report.component.scss']
})

export class SummeryReportComponent implements OnInit {
  myFilter
  companyName: string = "comapny"
  address: string = "address"
  phone: string = "phone"
  imageSrc;
  ffromDate;
  ttoDate;
  fromDate;
  counselorfromDate;
  counselortoDate;
  toDate;
  clientgrouplist: any[];
  allstudentlist: any[];
  studentgrouplist: any[];
  selectsearchval1: string;
  selectsearchval3: string;
  selectsearchval4: string;// employee list
  agent: any;
  student: any;
  employeelist: any;
  employee;
  //inventoryListobj: any;
  totalsales:any;
  totalpaidam;
  totaldues;
  salestabhid;
  saleslist;
  salesRecieptlist;
  ViewEmployeeRep = true;
  ViewEmployeeRepChoice = false;
  reportvisible = false;
  employeerepdropdown = false;
  constructor(private cService: CompanyService, private http: HttpClient,
    private clientgroupService: ClientGroupService, private clientService: ClientService,
    private employeeService:EmployeeService, private salesVoucherService:SalesVoucherService,
    private salesRecieptService:SalesRecieptService, private logService: LoginService   ){}
  async ngOnInit() {
    this.clientgroupService.getAll().subscribe((posts) =>{
      //console.log(this.clientgrouplist)
      this.clientgrouplist = posts as any;
      this.studentgrouplist = posts as any;
    })
    this.clientService.getAll().subscribe((posts) =>{
      this.allstudentlist = posts as any;
    })
    this.employeeService.getAll().subscribe((posts) =>{
      this.employeelist = posts as any;
    })
    //this.imageSrc = "http://localhost:8086/picture/getpic?picid=5db02a91-63a2-4549-bb30-31cee8ea848e.jpg"
    this.cService.getAll().subscribe((data)=>{
      this.imageSrc = routeurls.BASE_API_URL + routeurls.PICTURE_VIEW_URL + data[0]["logo"]
    })
    console.log("role is-- ",this.logService.getrole())
    if(this.logService.getrole() !== "admin"){
      this.reportvisible = true;
      this.ViewEmployeeRep = false
      this.ViewEmployeeRepChoice =
      this.employeerepdropdown = false
    }
    if(this.logService.getrole() == "counselor"){
      this.reportvisible = true;
      this.ViewEmployeeRep = true
      this.ViewEmployeeRepChoice = false
      this.employeerepdropdown = true
      this.selectsearchval4 = this.logService.getUser()
    }
    /*this.salesVoucherService.getAll().subscribe((data)=>{
      this.saleslist = data as any
    })
    this.salesRecieptService.getAll().subscribe((data)=>{
      this.salesRecieptlist = data as any
    })*/
 }

  public onSubmit(): void {
    this.ffromDate = this.fromDate
    this.ttoDate = this.toDate
    this.agent = this.selectsearchval1
    this.student = this.selectsearchval3
    console.log(this.ffromDate)
    this.ViewEmployeeRep = true
  }
  onEmployeeSubmit(): void{
    if(!this.counselorfromDate || !this.counselortoDate){
      return
    }
    this.ViewEmployeeRep = false

    //this.ffromDate = this.fromDate
    //this.ttoDate = this.toDate
    this.employee = this.selectsearchval4

    this.salesVoucherService.getbydateemployee(this.counselorfromDate,this.counselortoDate,this.employee).subscribe((voucherposts) =>{
      this.salesRecieptService.getbydateemployee(this.counselorfromDate,this.counselortoDate,this.employee).subscribe(recpos=>{
        this.saleslist = voucherposts;
        this.totalsales = voucherposts.reduce((a, b) => a + (b["packageAmount"] || 0), 0);
        this.totalpaidam = voucherposts.reduce((a, b) => a + (b["paidAmount"] || 0), 0) +
          recpos.reduce((a, b) => a + (b["paidAmount"] || 0), 0);
        this.totaldues = this.totalsales - this.totalpaidam;
        let firindex = 0;
        this.saleslist.forEach(val=>{
          this.saleslist[firindex]["recieptPay"] = recpos.filter(rv =>rv.studentname == val.studentname).reduce((a, b) => a + (b["paidAmount"] || 0), 0);
          this.saleslist[firindex]["total"] = val.paidAmount + recpos.filter(rv =>rv.studentname == val.studentname).reduce((a, b) => a + (b["paidAmount"] || 0), 0);
          firindex++;
          console.log(recpos.filter(rv =>rv.studentname == val.studentname))
        })
        //console.log(this.saleslist)
      })
    })
  }
  SelectvalChanged1(val){
    // client group changed
    this.selectsearchval1 = val;
    console.log(val)
    this.studentgrouplist =this.allstudentlist.filter(x => x.clientgroupname === val)
    console.log(this.studentgrouplist)
  }
  SelectvalChanged3(val){
    // client group changed
    this.selectsearchval3 = val;
  }
  SelectvalChanged4(val){
    // client group changed
    this.selectsearchval4 = val;
  }

  salesDetailSubmit(){

  }
}


