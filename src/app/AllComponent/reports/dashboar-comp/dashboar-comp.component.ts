import { Component, OnInit, Input } from '@angular/core';
import { SalesVoucherService } from '../../accountsComponents/newSalesVoucher/sales-voucher.service'
import { PurchaseService } from '../../accountsComponents/newPurchase/purchase.service'
import { PayrollService } from '../../hrComponents/newPayroll/payroll.service'
import { InventoryService } from '../../inventoryComponents/newInventory/inventory.service'
import  { OfficeCostService } from '../../officecostComponent/office-cost.service'
import {  reduce } from 'rxjs/operators';
import { payrollinterface } from 'src/app/models/payrollmodels';

@Component({
  selector: 'app-dashboar-comp',
  templateUrl: './dashboar-comp.component.html',
  styleUrls: ['./dashboar-comp.component.scss']
})
export class DashboarCompComponent implements OnInit {
  @Input() fromDate: Date;
  @Input() toDate : Date;
  @Input() tableDataShow;

  ViewData: string = "View Details Data"
  companyName: string = "comapny"
  address: string = "address"
  phone: string = "phone"
  imageSrc: string = ""

  saleslist;
  purchaselist;
  payrolllist;
  inventorylist;
  officialcostlist;

  totalsales = 0;
  totalpaidam = 0;
  totaldues = 0;
  totalPurchase = 0;
  totalpayroll = 0;
  totalinventory = 0;
  totalofficialcost = 0;

  inventtabhid: boolean = true;
  paytabhid: boolean = true;
  purtabhid: boolean = true;
  salestabhid: boolean = true;
  officecosthid: boolean = true;
  constructor(private svService: SalesVoucherService, private pService: PurchaseService,
    private payService: PayrollService, private iservice: InventoryService, private ofiicecostService:OfficeCostService){}
  async ngOnInit() {
    //this.onSubmit()
  }
  ngOnChanges(changes){
    if(this.tableDataShow == "false"){
      this.ViewData = ""
    }
    console.log(this.fromDate)
    if(this.fromDate != undefined){
      this.onSubmit()
    }
  }
  public onSubmit(): void {
    this.svService.getbydate(this.fromDate,this.toDate).subscribe((posts) =>{
      this.saleslist = posts;
      this.totalsales = posts.reduce((a, b) => a + (b["totalAmount"] || 0), 0);
      this.totalpaidam = posts.reduce((a, b) => a + (b["paidAmount"] || 0), 0);
      this.totaldues = this.totalsales - this.totalpaidam;
      //console.log(posts)
    })
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

  officialSpendDetailSubmit(){
    if(this.tableDataShow !== "false"){
      this.inventtabhid = false;
      this.paytabhid= true;
      this.purtabhid = true;
      this.salestabhid= true;
      this.officecosthid = true;
    }
  }
  salesDetailSubmit(){
    if(this.tableDataShow !== "false"){
      this.inventtabhid = true;
      this.paytabhid= true;
      this.purtabhid = true;
      this.salestabhid= false;
      this.officecosthid = true;
    }
  }
  purDetailSubmit(){
    if(this.tableDataShow !== "false"){
      this.inventtabhid = true;
      this.paytabhid= true;
      this.purtabhid = false;
      this.salestabhid= true;
      this.officecosthid = true;
    }
  }
  hrDetailSubmit(){
    if(this.tableDataShow !== "false"){
        this.inventtabhid = true;
        this.paytabhid= false;
        this.purtabhid = true;
        this.salestabhid= true;
        this.officecosthid = true;
    }
  }
  officalCostDetailSubmit(){
    if(this.tableDataShow !== "false"){
      this.inventtabhid = true;
      this.paytabhid= true;
      this.purtabhid = true;
      this.salestabhid= true;
      this.officecosthid = false;
    }
  }

}
