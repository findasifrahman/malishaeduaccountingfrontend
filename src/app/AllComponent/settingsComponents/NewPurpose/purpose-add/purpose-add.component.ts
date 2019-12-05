import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PurposeService } from '../purpose.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { purposemodels } from '../../../../models/purposemodels';

@Component({
  selector: 'app-purpose-add',
  templateUrl: './purpose-add.component.html',
  styleUrls: ['./purpose-add.component.scss']
})
export class PurposeAddComponent implements OnInit {
  Forms: FormGroup;
  constructor(private Pmodels:purposemodels,private snackBar:MatSnackBar,
    private PService:PurposeService,private formBuilder: FormBuilder, private router: Router) { }


    ngOnInit() {
      this.Forms = this.Pmodels.modelForms;
      this.Forms.reset();
    }
    async FormSubmit() {
      const formValue = this.Forms.value;
      try {
        await this.PService.Add(formValue).subscribe(
          data => {
            console.log("post req successfull");
            this.snackBar.open('Data Added Successfully', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['blue-snackbar']
            });
            this.router.navigate(["/purpose/list"]);
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
