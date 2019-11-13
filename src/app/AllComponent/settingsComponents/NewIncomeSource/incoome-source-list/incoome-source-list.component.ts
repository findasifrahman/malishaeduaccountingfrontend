import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { IncoomeSourceService } from '../incoome-source.service';
import { MatTable, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../sharedComponentModule/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material';
import { incomesourcemodels,incomesourceinterface } from '../../../../models/incomesourcemodels';

@Component({
  selector: 'app-incoome-source-list',
  templateUrl: './incoome-source-list.component.html',
  styleUrls: ['./incoome-source-list.component.scss']
})
export class IncoomeSourceListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['incomesourcename','buttons'];
  displayedColumnsName: string[] = ['Income Source'];
  AllElement: MatTableDataSource<incomesourceinterface>;

  constructor(private snackBar: MatSnackBar, private isService: IncoomeSourceService, public dialog: MatDialog,
    public _router: Router) { }

  ngOnInit() {
  }
  public doFilter = (value: string) => {
    this.AllElement.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.isService.getAll().subscribe((posts) => {
      this.AllElement = new MatTableDataSource(posts as any);
      this.AllElement.paginator = this.paginator;
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
        this.isService.delete(id).subscribe((posts) => {
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
}
