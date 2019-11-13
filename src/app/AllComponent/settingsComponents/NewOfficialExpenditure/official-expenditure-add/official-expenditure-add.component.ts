import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OfficialExpenditureService } from '../official-expenditure.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { officialexpendituremodels } from '../../../../models/officialexpendituremodels';

@Component({
  selector: 'app-official-expenditure-add',
  templateUrl: './official-expenditure-add.component.html',
  styleUrls: ['./official-expenditure-add.component.scss']
})
export class OfficialExpenditureAddComponent implements OnInit {
  Forms: FormGroup;
  constructor(private oemodels:officialexpendituremodels,private snackBar:MatSnackBar,
    private oeService:OfficialExpenditureService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.Forms = this.oemodels.modelForms;
    this.Forms.reset();
  }
  async FormSubmit() {
    const formValue = this.Forms.value;
    try {
      await this.oeService.Add(formValue).subscribe(
        data => {
          console.log("post req successfull");
          this.snackBar.open('Data Added Successfully', "Remove", {
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(["/officialexpenditure/list"]);
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
