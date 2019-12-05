import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NationalityService } from '../nationality.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { nationalitymodels } from '../../../../models/nationalitymodels';

@Component({
  selector: 'app-nationality-add',
  templateUrl: './nationality-add.component.html',
  styleUrls: ['./nationality-add.component.scss']
})
export class NationalityAddComponent implements OnInit {
  Forms: FormGroup;
  constructor(private nmodels:nationalitymodels,private snackBar:MatSnackBar,
    private nService:NationalityService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.Forms = this.nmodels.modelForms;
    this.Forms.reset();
  }
  async FormSubmit() {
    const formValue = this.Forms.value;
    try {
      await this.nService.Add(formValue).subscribe(
        data => {
          console.log("post req successfull");
          this.snackBar.open('Data Added Successfully', "Remove", {
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(["/nationality/list"]);
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
