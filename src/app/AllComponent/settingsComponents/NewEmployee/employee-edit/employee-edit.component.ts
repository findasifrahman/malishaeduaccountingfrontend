import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { employeemodelsform,employeemodels } from '../../../../models/employeemodels';
import { RoleService } from '../../NewRole/role.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  filenameinput1: string = "Image 1";
  _file1id: string = null;

  id: any;
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  roles: any = [];

  constructor(private empservice: EmployeeService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private roleServices: RoleService, private router: Router,private empModels:employeemodelsform,private route: ActivatedRoute) { }
  compareThem(o1, o2): boolean{
      console.log('compare with');
      return o1.name === o2.name;
  }
  defval:any;
  ngOnInit() {
    this.Forms = this.empModels.modelForms;
    this.roleServices.getAll().subscribe((posts) => {
      this.roles = posts as any;
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("update id--" + params['id']);
      this.empservice.getbyid(this.id).subscribe((data) => {
        this._file1id = data["image1"];
        this.Forms.patchValue(data);
        //this.selectFormControl = new FormControl(data["productgroup"], Validators.required);
       // this.defval = data["productgroup"];
        console.log(this.Forms);
      });
    })
  }

  async FormSubmit() {
    this.Forms.patchValue({
      image1: this._file1id
    })
    const formValue = this.Forms.value;
    console.log(formValue);
    await this.empservice.update(this.id, formValue).subscribe(() => {
      console.log("Update req successfull");
      this.snackBar.open('Data Updated Successfully', "Remove", {
        duration: 5000, verticalPosition: 'top', panelClass: ['blue-snackbar']
      });
      this.router.navigate(['/employee/list']);
    },
      error => {
        console.log("error Update", error);
        this.snackBar.open('Update Unsuccessfull', "Remove", {
          duration: 6000, verticalPosition: 'top', panelClass: ['red-snackbar']
        });
      }
    );
  }

  file1id($event) {
    this._file1id = $event; console.log("pic id arrived--" + $event);
  }

}
