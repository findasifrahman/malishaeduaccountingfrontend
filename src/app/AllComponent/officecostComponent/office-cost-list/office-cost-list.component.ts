import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { OfficeCostService } from '../office-cost.service';
import { MatTable, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../sharedComponentModule/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material';
import { officecostmodels } from '../../../models/officecostmodels';

@Component({
  selector: 'app-office-cost-list',
  templateUrl: './office-cost-list.component.html',
  styleUrls: ['./office-cost-list.component.scss']
})
export class OfficeCostListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['itemname','itemid','date','cost','totalCost','buttons'];
  displayedColumnsName: string[] = ['Item Name','Id','Date','cost','Total'];
  AllElement: MatTableDataSource<officecostmodels>;
  constructor(private snackBar: MatSnackBar, private oService: OfficeCostService, public dialog: MatDialog,
    public _router: Router) { }

  ngOnInit() {
  }
  public doFilter = (value: string) => {
    this.AllElement.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.oService.getAll().subscribe((posts) => {
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
        this.oService.delete(id).subscribe((posts) => {
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
    this._router.navigate(['/officecost/edit', id]);
  }

}
