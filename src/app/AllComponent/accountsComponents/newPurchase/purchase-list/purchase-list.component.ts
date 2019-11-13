import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import {PurchaseService } from '../purchase.service';
import { MatTable, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../sharedComponentModule/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material';
import { purchasemodels } from '../../../../models/purchasemodels';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['serialid','purchasedby','date','clientName','incomeType','quantity','totalPrice','buttons'];
  displayedColumnsName: string[] = ['Id','Purchased By','Date','Client','Type','Quantity','totalPrice'];
  AllElement: MatTableDataSource<purchasemodels>;
  constructor(private snackBar: MatSnackBar, private pService: PurchaseService, public dialog: MatDialog,
    public _router: Router) { }

    ngOnInit() {
    }
    public doFilter = (value: string) => {
      this.AllElement.filter = value.trim().toLocaleLowerCase();
    }

    ngAfterViewInit(): void {
      this.pService.getAll().subscribe((posts) => {
        this.AllElement = new MatTableDataSource(posts as any);
        this.AllElement.paginator = this.paginator;
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
          this.pService.delete(id).subscribe((posts) => {
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
      this._router.navigate(['/purchase/edit', id]);
    }


}
