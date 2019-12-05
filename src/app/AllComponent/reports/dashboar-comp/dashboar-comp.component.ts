import { Component, OnInit, Input } from '@angular/core';
import { SalesVoucherService } from '../../accountsComponents/newSalesVoucher/sales-voucher.service'
import { SalesRecieptService } from '../../accountsComponents/newSalesReciept/sales-reciept.service'
import { PurchaseService } from '../../accountsComponents/newPurchase/purchase.service'
import { PayrollService } from '../../hrComponents/newPayroll/payroll.service'
import { InventoryService } from '../../inventoryComponents/newInventory/inventory.service'
import { InventoryItemService } from '../../settingsComponents/NewInventoryItem/inventory-item.service'
import  { OfficeCostService } from '../../officecostComponent/office-cost.service'
import {  reduce } from 'rxjs/operators';
import { LoginService } from '../../login/login.service'

@Component({
  selector: 'app-dashboar-comp',
  templateUrl: './dashboar-comp.component.html',
  styleUrls: ['./dashboar-comp.component.scss']
})
export class DashboarCompComponent implements OnInit {
  @Input() fromDate: Date;
  @Input() toDate : Date;
  @Input() agent: any;
  @Input() student: any;
  @Input() tableDataShow;

  ViewData: string = "Details"
  ViewDataInventory:  string = "Item List"

  companyName: string = "comapny"
  address: string = "address"
  phone: string = "phone"
  imageSrc: string = ""

  saleslist;
  purchaselist;
  payrolllist;
  inventorylist;
  officialcostlist;

  servedbylist;

  totalsales = 0;
  totalpaidam = 0;
  totaldues = 0;
  totalPurchase = 0;
  totalpayroll = 0;
  totalinventory = 0;
  totalofficialcost = 0;

  totalCounselorsales = 0;
  totalCounselorpaidam = 0;
  totalCounselordues = 0;

  inventtabhid: boolean = true;
  paytabhid: boolean = true;
  purtabhid: boolean = true;
  salestabhid: boolean = true;
  officecosthid: boolean = true;
  inventorylisttableshow: boolean = true;

  loggeduser = ""
  inve: inventoryListobj[] = <any>[];
  constructor(private svService: SalesVoucherService, private pService: PurchaseService,
    private payService: PayrollService, private iservice: InventoryService,private inventoryItemservice: InventoryItemService,
    private ofiicecostService:OfficeCostService,private salesRecieptService: SalesRecieptService,private logService: LoginService){}
  async ngOnInit() {
    //this.onSubmit()

    this.loggeduser= this.logService.getUser()

    this.inventoryItemservice.getAll().subscribe(item =>{
      item.forEach(itemval =>{
        console.log("---------------------------")
        console.log(itemval["inventoryitemname"])
        this.iservice.getbyitemname(itemval["inventoryitemname"]).subscribe(val =>{
          let tq = 0;
          val.forEach(ll =>{
              tq = tq +  ll["quantity"]
          })
          this.inve.push({
            itemname: itemval["inventoryitemname"],
            quantity: tq
          })
      })
      })
    })
    //console.log("---------------------------")
    //console.log(this.inve)
  }
  ngOnChanges(changes){
    if(this.tableDataShow == "false"){
      this.ViewData = ""
      this.ViewDataInventory = ""
    }
    console.log(this.fromDate)
    if(this.fromDate){
      if(this.agent){
        if(!this.student){
          this.submitbyclient()
        }
        else{
          this.submitbyclientstudent()
        }
      }
      else{
        this.onSubmit()
      }
    }


  }
  commonRep(){
    this.pService.getbydate(this.fromDate,this.toDate).subscribe((posts) =>{
      this.purchaselist = posts;
      this.totalPurchase = posts.reduce((a, b) => a + (b["totalPrice"] || 0), 0);
    })
    this.payService.getbydate(this.fromDate,this.toDate).subscribe((posts) =>{
      this.payrolllist = posts;
      this.totalpayroll = posts.reduce((a, b) => a + (b["SalaryPayable"] || 0), 0);
      //console.log(posts)
    })
    this.iservice.getbydate(this.fromDate,this.toDate).subscribe((posts) =>{
      this.inventorylist = posts;
      this.totalinventory = posts.reduce((a, b) => a + (b["totalPrice"] || 0), 0);
      //console.log(posts)
    })
    this.ofiicecostService.getbydate(this.fromDate,this.toDate).subscribe((posts) =>{
      this.officialcostlist = posts;
      this.totalofficialcost = posts.reduce((a, b) => a + (b["totalCost"] || 0), 0);
      //console.log(posts)
    })
  }
  public submitbyclientstudent(): void{
    this.svService. getbydateclientstudent(this.fromDate,this.toDate,this.agent,this.student).subscribe((voucherposts) =>{
      this.salesRecieptService. getbydateclientstudent(this.fromDate,this.toDate,this.agent,this.student).subscribe(recpos=>{
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


    this.commonRep()
  }
  public submitbyclient(): void{
    this.svService.getbydateclient(this.fromDate,this.toDate,this.agent).subscribe((voucherposts) =>{
      this.salesRecieptService.getbydateclient(this.fromDate,this.toDate,this.agent).subscribe(recpos=>{
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


    this.commonRep()
  }
  public onSubmit(): void {
    this.svService.getbydate(this.fromDate,this.toDate).subscribe((voucherposts) =>{
      this.salesRecieptService.getbydate(this.fromDate,this.toDate).subscribe(recpos=>{
        this.saleslist = voucherposts;
        this.totalsales = voucherposts.reduce((a, b) => a + (b["packageAmount"] || 0), 0);
        this.totalpaidam = voucherposts.reduce((a, b) => a + (b["paidAmount"] || 0), 0) +
          recpos.reduce((a, b) => a + (b["paidAmount"] || 0), 0);
        this.totaldues = this.totalsales - this.totalpaidam;

        let firindex = 0;
        this.saleslist.forEach(val=>{
          this.saleslist[firindex]["recieptPay"] = recpos.filter(rv => (rv.studentname == val.studentname && rv.studentoragentName == val.studentoragentName)).reduce((a, b) => a + (b["paidAmount"] || 0), 0);
          this.saleslist[firindex]["total"] = val.paidAmount + recpos.filter(rv =>(rv.studentname == val.studentname && rv.studentoragentName == val.studentoragentName)).reduce((a, b) => a + (b["paidAmount"] || 0), 0);
          firindex++;
          console.log(recpos.filter(rv =>rv.studentname == val.studentname))
        })
      })
    })
    this.commonRep()
  }

  officialSpendDetailSubmit(){
    if(this.tableDataShow !== "false"){
      this.inventtabhid = false;
      this.paytabhid= true;
      this.purtabhid = true;
      this.salestabhid= true;
      this.officecosthid = true;
      this.inventorylisttableshow = true;
    }
  }
  salesDetailSubmit(){
    if(this.tableDataShow !== "false"){
      this.inventtabhid = true;
      this.paytabhid= true;
      this.purtabhid = true;
      this.salestabhid= false;
      this.officecosthid = true;
      this.inventorylisttableshow = true;
    }
  }
  purDetailSubmit(){
    if(this.tableDataShow !== "false"){
      this.inventtabhid = true;
      this.paytabhid= true;
      this.purtabhid = false;
      this.salestabhid= true;
      this.officecosthid = true;
      this.inventorylisttableshow = true;
    }
  }
  hrDetailSubmit(){
    if(this.tableDataShow !== "false"){
        this.inventtabhid = true;
        this.paytabhid= false;
        this.purtabhid = true;
        this.salestabhid= true;
        this.officecosthid = true;
        this.inventorylisttableshow = true;
    }
  }
  officalCostDetailSubmit(){
    if(this.tableDataShow !== "false"){
      this.inventtabhid = true;
      this.paytabhid= true;
      this.purtabhid = true;
      this.salestabhid= true;
      this.officecosthid = false;
      this.inventorylisttableshow = true;
    }
  }
  inventoryListView(){
    if(this.tableDataShow !== "false"){
      this.inventorylisttableshow = false;
      this.inventtabhid = true;
      this.paytabhid= true;
      this.purtabhid = true;
      this.salestabhid= true;
      this.officecosthid = true;
    }
  }

}

interface inventoryListobj{
  itemname: string,
  quantity: number
}
