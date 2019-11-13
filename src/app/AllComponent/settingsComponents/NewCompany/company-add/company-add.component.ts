import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { companymodels } from '../../../../models/companymodels';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss']
})
export class CompanyAddComponent implements OnInit {
  filenameinput1: string = "Logo";
  _file1id: string = null;
  Forms: FormGroup;
  constructor(private companymodels:companymodels,private snackBar:MatSnackBar,
    private comService:CompanyService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.Forms = this.companymodels.modelForms;
    this.Forms.reset();
  }
  async FormSubmit() {
    this.Forms.patchValue({
      logo: this._file1id
    })
    const formValue = this.Forms.value;
    try {
      await this.comService.Add(formValue).subscribe(
        data => {
          console.log("post req successfull");
          this.snackBar.open('Comapny Added Successfully', "Remove", {
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(["/company/list"]);
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
  file1id($event) {
    this._file1id = $event; console.log("pic id arrived--" + $event);
  }

}
