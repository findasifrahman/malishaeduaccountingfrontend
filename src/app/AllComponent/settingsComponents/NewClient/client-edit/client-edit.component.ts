import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { ClientService } from '../client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { clientmodels } from '../../../../models/clientmodels';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  id: any;
  selectFormControl = new FormControl('', Validators.required);
  groups: any[];
  Forms = this.climodels.modelForms;
  constructor(private climodels: clientmodels,private snackBar:MatSnackBar,
    private cliService: ClientService,private formBuilder: FormBuilder,private route:ActivatedRoute, private router: Router) { }
    compareThem(o1, o2): boolean{
      console.log('compare with');
      return o1.name === o2.name;
  }
  defval:any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("update id--" + params['id']);
      this.cliService.getbyid(this.id).subscribe((data) => {
        this.Forms.patchValue(data);
      });
    })
  }

  async FormSubmit() {
    const formValue = this.Forms.value;
    console.log(formValue);
    await this.cliService.update(this.id, formValue).subscribe(() => {
      console.log("Update req successfull");
      this.snackBar.open('Data Updated Successfully', "Remove", {
        duration: 5000, verticalPosition: 'top', panelClass: ['blue-snackbar']
      });
      this.router.navigate(['/client/list']);
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
