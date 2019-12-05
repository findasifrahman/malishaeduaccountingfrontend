import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DegreeService } from '../degree.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { degreemodels } from '../../../../models/degreemodels';

@Component({
  selector: 'app-degree-add',
  templateUrl: './degree-add.component.html',
  styleUrls: ['./degree-add.component.scss']
})
export class DegreeAddComponent implements OnInit {
  Forms: FormGroup;
  constructor(private deodels: degreemodels,private snackBar:MatSnackBar,
    private mService:DegreeService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.Forms = this.deodels.modelForms;
    this.Forms.reset();
  }
  async FormSubmit() {
    const formValue = this.Forms.value;
    try {
      await this.mService.Add(formValue).subscribe(
        data => {
          console.log("post req successfull");
          this.snackBar.open('Data Added Successfully', "Remove", {
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(["/degree/list"]);
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
