import { Component, OnInit,Input,Output } from '@angular/core';
import { SalesVoucherService } from '../../../accountsComponents/newSalesVoucher/sales-voucher.service'
import { SalesRecieptService } from '../../../accountsComponents/newSalesReciept/sales-reciept.service'
@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.scss']
})
export class SalesTableComponent implements OnInit {
  @Input() saleslist
  @Input() tableDataShow;
  @Input() salestabhid;
  constructor(private svService: SalesVoucherService,private salesRecieptService: SalesRecieptService) { }

  ngOnInit() {
  }
  ngOnChanges(changes){

  }

}
