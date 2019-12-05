import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { ClientService } from '../client.service';
import { MatTable, MatPaginator,MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../sharedComponentModule/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material';
import { clientmodels, clientinterface } from '../../../../models/clientmodels';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { Observable, of } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ClientListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['clientgroupname','studentname','nationality','passport','degree','major','buttons'];
  displayedColumnsName: string[] = ['Agent/Student','Student','Nationality','Passport','Degree','major'];
  AllElement: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  expandedElement: any;

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');


  constructor(private snackBar: MatSnackBar, private cliService: ClientService, public dialog: MatDialog, public _router: Router) { }

  ngOnInit() {
  }
  public doFilter = (value: string) => {
    this.AllElement.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.cliService.getAll().subscribe((posts) => {
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
        this.cliService.delete(id).subscribe((posts) => {
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
    this._router.navigate(['/client/edit', id]);
  }

}




