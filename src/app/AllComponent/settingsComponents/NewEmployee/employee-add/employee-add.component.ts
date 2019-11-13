import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { employeemodelsform,employeemodels } from '../../../../models/employeemodels';
import { RoleService } from '../../NewRole/role.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  filenameinput1: string = "Image 1";
  _file1id: string = null;

  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  roles: any[];
  public Editor = ClassicEditor;
  constructor(private empservice: EmployeeService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private roleServices: RoleService, private router: Router,private empModels:employeemodelsform) { }

  ngOnInit() {
    this.Forms = this.empModels.modelForms;
    this.Forms.reset();
    this.roleServices.getAll().subscribe((posts) => {
      this.roles = posts as any;
      console.log(posts);
    });
  }

  async FormSubmit() {
     //console.log(this.Forms.controls['description'].value);
     this.Forms.patchValue({
       image1: this._file1id
     })
     const formValue = this.Forms.value;
     try {
       await this.empservice.Add(formValue).subscribe(
         data => {
           console.log("post req successfull");
           this.snackBar.open('Employee Added Successfully', "Remove", {
             duration: 6000,
             verticalPosition: 'top',
             panelClass: ['blue-snackbar']
           });
           this.router.navigate(["/employee/list"]);
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
