import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { inventorymodels, inventoryinterface } from '../../../../models/inventorymodels';
import { InventoryItemService } from '../../../settingsComponents/NewInventoryItem/inventory-item.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.scss']
})
export class InventoryAddComponent implements OnInit {
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  itemname: any[];
  constructor(private iitemservice: InventoryService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private iiServices: InventoryItemService, private router: Router,
    private iModels:inventorymodels) { }
  onChanges(): void {
      this.Forms.get('quantity').valueChanges.subscribe(val => {
        this.Forms.patchValue({
          totalPrice: (this.Forms.controls['quantity'].value * this.Forms.controls['unitPrice'].value) + this.Forms.controls['additionalPrice'].value,
        });
      });
      this.Forms.get('unitPrice').valueChanges.subscribe(val => {
        this.Forms.patchValue({
          totalPrice: (this.Forms.controls['quantity'].value * this.Forms.controls['unitPrice'].value) + this.Forms.controls['additionalPrice'].value,
        });
      });
    }
    ngOnInit() {
      this.Forms = this.iModels.modelForms;
      this.Forms.reset();
      this.iiServices.getAll().subscribe((posts) => {
        this.itemname = posts as any;
        console.log(posts);
      });
      this.onChanges();
    }

    async FormSubmit() {
       const formValue = this.Forms.value;
       try {
         await this.iitemservice.Add(formValue).subscribe(
           data => {
             console.log("post req successfull");
             this.snackBar.open('Data Added Successfully', "Remove", {
               duration: 6000,
               verticalPosition: 'top',
               panelClass: ['blue-snackbar']
             });
             this.router.navigate(["/inventory/list"]);
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
