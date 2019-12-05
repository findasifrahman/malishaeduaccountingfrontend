import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { SalesVoucherService } from '../sales-voucher.service';
import { MatTable, MatPaginator,MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../sharedComponentModule/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material';
import { salesVouchermodels } from '../../../../models/salesvouchermodels';

@Component({
  selector: 'app-sales-voucher-list',
  templateUrl: './sales-voucher-list.component.html',
  styleUrls: ['./sales-voucher-list.component.scss']
})
export class SalesVoucherListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['voucherid','studentoragentName','date','studentname','incomeType','servedby','packageAmount','paidAmount','currentdues','buttons'];
  displayedColumnsName: string[] = ['Voucher Id','Student/Agent','Date','Student Name','Type','servedby','Package','Paid','Dues'];
  AllElement: MatTableDataSource<salesVouchermodels>;
  constructor(private snackBar: MatSnackBar, private svService: SalesVoucherService, public dialog: MatDialog,
    public _router: Router) { }

    ngOnInit() {
    }
    public doFilter = (value: string) => {
      this.AllElement.filter = value.trim().toLocaleLowerCase();
    }

    ngAfterViewInit(): void {
      this.svService.getAll().subscribe((posts) => {
        this.AllElement = new MatTableDataSource(posts as any);
        this.AllElement.paginator = this.paginator;
        this.AllElement.sort = this.sort;
        //setTimeout(() => this.AllElement.paginator = this.paginator);
        console.log(posts);
      });
    }
    onDelete(id) {
      console.log("Inside Delete--" + id);
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '450px',
        hasBackdrop: true,
        data: "Are you sure you want to delete this data?"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.svService.delete(id).subscribe((posts) => {
            this.AllElement = new MatTableDataSource(posts as any);
            this.AllElement.paginator = this.paginator;
            console.log(posts);

            this.snackBar.open('Data Deleted Successfully', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['blue-snackbar']
            });
          },
            error => {
              this.snackBar.open('Unsuccessfull', "Remove", {
                duration: 6000,
                verticalPosition: 'top',
                panelClass: ['red-snackbar']
              });
            }
          )
        }//if end
      })//dialog ref
    }//Delete end

    onUpdate(id) {
      this._router.navigate(['/salesVoucher/edit', id]);
    }

}
