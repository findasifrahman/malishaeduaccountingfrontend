import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UniversityService } from '../university.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { universitymodels } from '../../../../models/universitymodels';

@Component({
  selector: 'app-university-add',
  templateUrl: './university-add.component.html',
  styleUrls: ['./university-add.component.scss']
})
export class UniversityAddComponent implements OnInit {
  Forms: FormGroup;
  constructor(private umodels:universitymodels,private snackBar:MatSnackBar,
    private uService:UniversityService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.Forms = this.umodels.modelForms;
    this.Forms.reset();
  }
  async FormSubmit() {
    const formValue = this.Forms.value;
    try {
      await this.uService.Add(formValue).subscribe(
        data => {
          console.log("post req successfull");
          this.snackBar.open('Data Added Successfully', "Remove", {
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(["/university/list"]);
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
