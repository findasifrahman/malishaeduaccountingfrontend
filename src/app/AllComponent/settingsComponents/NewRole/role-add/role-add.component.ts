import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RoleService } from '../role.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { rolemodels } from '../../../../models/rolemodels';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  Forms: FormGroup;
  constructor(private rolemodels:rolemodels,private snackBar:MatSnackBar,
    private roleService:RoleService,private formBuilder: FormBuilder, private router: Router) { }


    ngOnInit() {
      this.Forms = this.rolemodels.modelForms;
      this.Forms.reset();
    }
    async FormSubmit() {
      const formValue = this.Forms.value;
      try {
        await this.roleService.Add(formValue).subscribe(
          data => {
            console.log("post req successfull");
            this.snackBar.open('Role Added Successfully', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['blue-snackbar']
            });
            this.router.navigate(["/role/list"]);
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
