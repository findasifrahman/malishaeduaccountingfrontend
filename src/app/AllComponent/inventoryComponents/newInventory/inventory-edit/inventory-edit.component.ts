import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { inventorymodels, inventoryinterface } from '../../../../models/inventorymodels';
import { InventoryItemService } from '../../../settingsComponents/NewInventoryItem/inventory-item.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.scss']
})
export class InventoryEditComponent implements OnInit {
  id: any;
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  itemname: any[];

  constructor(private iitemservice: InventoryService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private iiServices: InventoryItemService, private router: Router,
    private iModels:inventorymodels, private route: ActivatedRoute) { }
  compareThem(o1, o2): boolean{
      console.log('compare with');
      return o1.name === o2.name;
  }
  defval:any;
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
    this.iiServices.getAll().subscribe((posts) => {
      this.itemname = posts as any;
      console.log(posts);
    });
    this.onChanges();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("update id--" + params['id']);
      this.iitemservice.getbyid(this.id).subscribe((data) => {
        this.Forms.patchValue(data);
        console.log(this.Forms);
      });
    })
  }

  async FormSubmit() {

    const formValue = this.Forms.value;
    console.log(formValue);
    await this.iitemservice.update(this.id, formValue).subscribe(() => {
      console.log("Update req successfull");
      this.snackBar.open('Data Updated Successfully', "Remove", {
        duration: 5000, verticalPosition: 'top', panelClass: ['blue-snackbar']
      });
      this.router.navigate(['/inventory/list']);
    },
      error => {
        console.log("error Update", error);
        this.snackBar.open('Update Unsuccessfull', "Remove", {
          duration: 6000, verticalPosition: 'top', panelClass: ['red-snackbar']
        });
      }
    );
  }
}
