import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { UniversityService } from '../university.service';
import { MatTable, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../sharedComponentModule/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material';
import {universitymodels } from '../../../../models/universitymodels';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.scss']
})
export class UniversityListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['university','buttons'];
  displayedColumnsName: string[] = ['University'];
  AllElement: MatTableDataSource<universitymodels>;

  constructor(private snackBar: MatSnackBar, private isService:UniversityService, public dialog: MatDialog,
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
