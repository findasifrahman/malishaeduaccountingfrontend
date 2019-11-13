import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { OfficeCostService } from '../office-cost.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { officecostmodels } from '../../../models/officecostmodels';
import { OfficialExpenditureService } from '../../settingsComponents/NewOfficialExpenditure/official-expenditure.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-office-cost-edit',
  templateUrl: './office-cost-edit.component.html',
  styleUrls: ['./office-cost-edit.component.scss']
})
export class OfficeCostEditComponent implements OnInit {
  id: any;
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  itemname: any[];

  constructor(private octemservice: OfficeCostService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,  private oesServices: OfficialExpenditureService, private router: Router,
    private oModels:officecostmodels, private route: ActivatedRoute) { }
  compareThem(o1, o2): boolean{
      console.log('compare with');
      return o1.name === o2.name;
  }
  defval:any;

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
      this.route.params.subscribe(params => {
        this.id = params['id'];
        console.log("update id--" + params['id']);
        this.octemservice.getbyid(this.id).subscribe((data) => {
          this.Forms.patchValue(data);
          //console.log(this.Forms);
        });
      })
    }

    async FormSubmit() {

      const formValue = this.Forms.value;
      console.log(formValue);
      await this.octemservice.update(this.id, formValue).subscribe(() => {
        console.log("Update req successfull");
        this.snackBar.open('Data Updated Successfully', "Remove", {
          duration: 5000, verticalPosition: 'top', panelClass: ['blue-snackbar']
        });
        this.router.navigate(['/officecost/list']);
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
