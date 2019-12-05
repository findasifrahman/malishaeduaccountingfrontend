import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MajorService } from '../major.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { majormodels } from '../../../../models/majormodels';

@Component({
  selector: 'app-major-add',
  templateUrl: './major-add.component.html',
  styleUrls: ['./major-add.component.scss']
})
export class MajorAddComponent implements OnInit {
  Forms: FormGroup;
  constructor(private mmodels: majormodels,private snackBar:MatSnackBar,
    private mService:MajorService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.Forms = this.mmodels.modelForms;
    this.Forms.reset();
  }
  async FormSubmit() {
    const formValue = this.Forms.value;
    try {
      await this.mService.Add(formValue).subscribe(
        data => {
          console.log("post req successfull");
          this.snackBar.open('Major Added Successfully', "Remove", {
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(["/major/list"]);
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
