import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientGroupService } from '../client-group.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { clientgroupmodels } from '../../../../models/clientgroupmodels';

@Component({
  selector: 'app-client-group-add',
  templateUrl: './client-group-add.component.html',
  styleUrls: ['./client-group-add.component.scss']
})
export class ClientGroupAddComponent implements OnInit {
  Forms: FormGroup;
  constructor(private cgmodels: clientgroupmodels,private snackBar:MatSnackBar,
    private cgService: ClientGroupService,private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit() {
      this.Forms = this.cgmodels.modelForms;
      this.Forms.reset();
    }
    async FormSubmit() {
      this.Forms.patchValue({
        clientgroupname:  this.Forms.get('clientgroupname').value + ". Comp-" + this.Forms.get('companyname').value
      })
      const formValue = this.Forms.value;

      try {
        await this.cgService.Add(formValue).subscribe(
          data => {
            console.log("post req successfull");
            this.snackBar.open('Income Source Added Successfully', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['blue-snackbar']
            });
            this.router.navigate(["/clientgroup/list"]);
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
