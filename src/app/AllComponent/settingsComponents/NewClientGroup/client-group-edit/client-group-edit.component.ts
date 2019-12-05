import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { ClientGroupService } from '../client-group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { clientgroupmodels } from '../../../../models/clientgroupmodels';


@Component({
  selector: 'app-client-group-edit',
  templateUrl: './client-group-edit.component.html',
  styleUrls: ['./client-group-edit.component.scss']
})
export class ClientGroupEditComponent implements OnInit {

  id: any;
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);

  constructor(private cgservice: ClientGroupService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private router: Router,private cgModels:clientgroupmodels,private route: ActivatedRoute) { }
  compareThem(o1, o2): boolean{
      console.log('compare with');
      return o1.name === o2.name;
  }
  defval:any;

  ngOnInit() {
    this.Forms = this.cgModels.modelForms;

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("update id--" + params['id']);
      this.cgservice.getbyid(this.id).subscribe((data) => {
        this.Forms.patchValue(data);
        const index = data["clientgroupname"].indexOf(". Comp-");
        var val = data["clientgroupname"].substring(0, index);
        this.Forms.patchValue({
          clientgroupname : val
        })
      });
    })
  }

  async FormSubmit() {
    this.Forms.patchValue({
      clientgroupname:  this.Forms.get('clientgroupname').value + ". Comp-" + this.Forms.get('companyname').value
    })
    const formValue = this.Forms.value;
    //console.log(formValue);
    await this.cgservice.update(this.id, formValue).subscribe(() => {
      console.log("Update req successfull");
      this.snackBar.open('Data Updated Successfully', "Remove", {
        duration: 5000, verticalPosition: 'top', panelClass: ['blue-snackbar']
      });
      this.router.navigate(['/clientgroup/list']);
    },
      error => {
        console.log("error Update", error);
        this.snackBar.open('Update Unsuccessfull', "Remove", {
          duration: 6000, verticalPosition: 'top', panelClass: ['red-snackbar']
        });
      }
    );
  }

}
