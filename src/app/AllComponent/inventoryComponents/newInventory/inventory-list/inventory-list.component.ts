import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { MatTable, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../sharedComponentModule/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material';
import { inventorymodels, inventoryinterface } from '../../../../models/inventorymodels';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['itemname','itemid','date','unitPrice','quantity','totalPrice','buttons'];
  displayedColumnsName: string[] = ['Item Name','Id','Date','Unit Price','Quantity','Total Price'];
  AllElement: MatTableDataSource<inventorymodels>;
  constructor(private snackBar: MatSnackBar, private iService: InventoryService, public dialog: MatDialog,
    public _router: Router) { }

  ngOnInit() {
  }
  public doFilter = (value: string) => {
    this.AllElement.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.iService.getAll().subscribe((posts) => {
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
        this.iService.delete(id).subscribe((posts) => {
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
    this._router.navigate(['/inventory/edit', id]);
  }

}
