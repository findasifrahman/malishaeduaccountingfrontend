import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { companymodels } from '../../../../models/companymodels';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  filenameinput1: string = "Logo";
  _file1id: string = null;

  id: any;
  selectFormControl = new FormControl('', Validators.required);
  groups: any[];
  Forms = this.companymodels.modelForms;
  constructor(private companymodels:companymodels,private snackBar:MatSnackBar,
    private comService:CompanyService,private formBuilder: FormBuilder,private route:ActivatedRoute, private router: Router) { }
  compareThem(o1, o2): boolean{
      console.log('compare with');
      return o1.name === o2.name;
  }
  defval:any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("update id--" + params['id']);
      this.comService.getbyid(this.id).subscribe((data) => {
        this._file1id = data["logo"];
        this.Forms.patchValue(data);
        //console.log(this.Forms.value);
      });
    })
  }

  async FormSubmit() {
    this.Forms.patchValue({
      logo: this._file1id
    })
    const formValue = this.Forms.value;
    console.log(formValue);
    await this.comService.update(this.id, formValue).subscribe(() => {
      console.log("Update req successfull");
      this.snackBar.open('Data Updated Successfully', "Remove", {
        duration: 5000, verticalPosition: 'top', panelClass: ['blue-snackbar']
      });
      this.router.navigate(['/company/list']);
    },
      error => {
        console.log("error Update", error);
        this.snackBar.open('Update Unsuccessfull', "Remove", {
          duration: 6000, verticalPosition: 'top', panelClass: ['red-snackbar']
        });
      }
    );
  }
  file1id($event) {
    this._file1id = $event; console.log("pic id arrived--" + $event);
  }
}
