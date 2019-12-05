import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { SalesRecieptService } from '../sales-reciept.service';
import { MatTable, MatPaginator,MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../sharedComponentModule/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material';
import { salesrecieptmodels } from '../../../../models/salesrecieptmodels';

@Component({
  selector: 'app-sales-reciept-list',
  templateUrl: './sales-reciept-list.component.html',
  styleUrls: ['./sales-reciept-list.component.scss']
})
export class SalesRecieptListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['recieptid','studentoragentName','date','loggeduser','studentname','paidAmount','currentdues','buttons'];
  displayedColumnsName: string[] = ['Reciept Id','Student/Agent','Date','Entered By','Student Name','Paid','Dues'];
  AllElement: MatTableDataSource<salesrecieptmodels>;
  constructor(private snackBar: MatSnackBar, private srService: SalesRecieptService, public dialog: MatDialog,
    public _router: Router) { }

    ngOnInit() {
    }
    public doFilter = (value: string) => {
      this.AllElement.filter = value.trim().toLocaleLowerCase();
    }

    ngAfterViewInit(): void {
      this.srService.getAll().subscribe((posts) => {
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
          this.srService.delete(id).subscribe((posts) => {
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
      this._router.navigate(['/salesreciept/edit', id]);
    }

}
