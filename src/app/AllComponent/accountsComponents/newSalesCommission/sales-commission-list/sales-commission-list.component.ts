import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { SalesCommissionService } from '../sales-commission.service';
import { MatTable, MatPaginator,MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../sharedComponentModule/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material';
import { salescommissionmodels } from '../../../../models/salescommissionmodels';

@Component({
  selector: 'app-sales-commission-list',
  templateUrl: './sales-commission-list.component.html',
  styleUrls: ['./sales-commission-list.component.scss']
})
export class SalesCommissionListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['agentname','enteredby','fromdate','todate','totalamount','dueamount','commission','buttons'];
  displayedColumnsName: string[] = ['Agent','User Name','From','To','Total','Due','Commission'];
  AllElement: MatTableDataSource<salescommissionmodels>;
  constructor(private snackBar: MatSnackBar, private scService: SalesCommissionService, public dialog: MatDialog,
    public _router: Router) { }

    ngOnInit() {
    }
    public doFilter = (value: string) => {
      this.AllElement.filter = value.trim().toLocaleLowerCase();
    }

    ngAfterViewInit(): void {
      this.scService.getAll().subscribe((posts) => {
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
          this.scService.delete(id).subscribe((posts) => {
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
      this._router.navigate(['/salescommission/edit', id]);
    }


}
