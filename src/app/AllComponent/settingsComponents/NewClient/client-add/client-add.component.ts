import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { clientmodels } from '../../../../models/clientmodels';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  Forms: FormGroup;
  constructor(private clientmodels: clientmodels,private snackBar:MatSnackBar,
    private cliService: ClientService,private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit() {
      this.Forms = this.clientmodels.modelForms;
      this.Forms.reset();
    }
    async FormSubmit() {
      const clienti = this.Forms.get('clientId').value
      this.cliService.getbyclient(clienti).subscribe(
        async data => {
          console.log(data)
          if(data == "true"){
            this.snackBar.open('This Client Id already exixts', "Remove", {
              duration: 4000,
              verticalPosition: 'top',
              panelClass: ['red-snackbar']
            });
            return
          }
          else{
            const formValue = this.Forms.value;
            try {
              await this.cliService.Add(formValue).subscribe(
                data => {
                  console.log("post req successfull");
                  this.snackBar.open('Data Added Successfully', "Remove", {
                    duration: 6000,
                    verticalPosition: 'top',
                    panelClass: ['blue-snackbar']
                  });
                  this.router.navigate(["/client/list"]);
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
        },
        error => {
          console.log("error post", error);
          this.snackBar.open('Unsuccessfull', "Remove", {
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['red-snackbar']
          });
        }
      )


    }

}
