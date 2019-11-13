import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IncoomeSourceService } from '../incoome-source.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { incomesourcemodels } from '../../../../models/incomesourcemodels';

@Component({
  selector: 'app-incoome-source-add',
  templateUrl: './incoome-source-add.component.html',
  styleUrls: ['./incoome-source-add.component.scss']
})
export class IncoomeSourceAddComponent implements OnInit {
  Forms: FormGroup;
  constructor(private ismodels:incomesourcemodels,private snackBar:MatSnackBar,
    private isService:IncoomeSourceService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.Forms = this.ismodels.modelForms;
    this.Forms.reset();
  }
  async FormSubmit() {
    const formValue = this.Forms.value;
    try {
      await this.isService.Add(formValue).subscribe(
        data => {
          console.log("post req successfull");
          this.snackBar.open('Income Source Added Successfully', "Remove", {
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(["/incomesource/list"]);
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
