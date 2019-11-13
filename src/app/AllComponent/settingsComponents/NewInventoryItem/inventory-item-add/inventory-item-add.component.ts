import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InventoryItemService } from '../inventory-item.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { inventoryitemmodels } from '../../../../models/inventoryitemmodels';

@Component({
  selector: 'app-inventory-item-add',
  templateUrl: './inventory-item-add.component.html',
  styleUrls: ['./inventory-item-add.component.scss']
})
export class InventoryItemAddComponent implements OnInit {
  Forms: FormGroup;
  constructor(private iimodels:inventoryitemmodels,private snackBar:MatSnackBar,
    private iiService: InventoryItemService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.Forms = this.iimodels.modelForms;
    this.Forms.reset();
  }
  async FormSubmit() {
    const formValue = this.Forms.value;
    try {
      await this.iiService.Add(formValue).subscribe(
        data => {
          console.log("post req successfull");
          this.snackBar.open('Data Added Successfully', "Remove", {
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(["/inventoryitem/list"]);
        },
        error => {
          console.log("error post", error);
          this.snackBar.open('Unsuccessfull', "Remove", {
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['red-snackbar']
          });
        }
      );

    }
    catch (err) {
    }
  }

}
