import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { OfficeCostService } from '../office-cost.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { officecostmodels } from '../../../models/officecostmodels';
import { OfficialExpenditureService } from '../../settingsComponents/NewOfficialExpenditure/official-expenditure.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-office-cost-add',
  templateUrl: './office-cost-add.component.html',
  styleUrls: ['./office-cost-add.component.scss']
})
export class OfficeCostAddComponent implements OnInit {
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  itemname: any[];
  constructor(private octemservice: OfficeCostService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private oesServices: OfficialExpenditureService, private router: Router,
    private oModels:officecostmodels) { }
  onChanges(): void {
    this.Forms.get('cost').valueChanges.subscribe(val => {
      this.Forms.patchValue({
        totalCost: (this.Forms.controls['cost'].value + this.Forms.controls['additionalCost'].value) - this.Forms.controls['deduction'].value,
      });
    });
    this.Forms.get('additionalCost').valueChanges.subscribe(val => {
      this.Forms.patchValue({
        totalCost: (this.Forms.controls['cost'].value + this.Forms.controls['additionalCost'].value) - this.Forms.controls['deduction'].value,
      });
    });
    this.Forms.get('deduction').valueChanges.subscribe(val => {
      this.Forms.patchValue({
        totalCost: (this.Forms.controls['cost'].value + this.Forms.controls['additionalCost'].value) - this.Forms.controls['deduction'].value,
      });
    });
  }
    ngOnInit() {
      this.Forms = this.oModels.modelForms;
      this.Forms.reset();
      this.oesServices.getAll().subscribe((posts) => {
        this.itemname = posts as any;
        console.log(posts);
      });
      this.onChanges();
    }

    async FormSubmit() {
       const formValue = this.Forms.value;
       try {
         await this.octemservice.Add(formValue).subscribe(
           data => {
             console.log("post req successfull");
             this.snackBar.open('Data Added Successfully', "Remove", {
               duration: 6000,
               verticalPosition: 'top',
               panelClass: ['blue-snackbar']
             });
             this.router.navigate(["/officecost/list"]);
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
