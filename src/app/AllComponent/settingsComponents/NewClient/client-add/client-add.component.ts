import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';

import { clientmodels } from '../../../../models/clientmodels';
import { ClientGroupService } from '../../NewClientGroup/client-group.service';
import { MajorService } from '../../NewMajor/major.service';
import { NationalityService } from '../../NewNationality/nationality.service';
import { UniversityService } from '../../NewUniversity/university.service'
import { DegreeService } from '../../NewDegree/degree.service'
import { EmployeeService } from '../../NewEmployee/employee.service'
@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  Forms: FormGroup;
  cglist: any;
  allclient: any;
  majorlist: any;
  nationalitylist: any;
  universitylist: any;
  degreelist: any;
  employeelist: any;
  unitlist = ["RMB", "BDT", "USD"]
  selectFormControl = new FormControl('', Validators.required);
  selectsearchval1: string;
  constructor(private clientmodels: clientmodels,private snackBar:MatSnackBar,private cgService: ClientGroupService,
    private cliService: ClientService,private formBuilder: FormBuilder, private router: Router,
    private majorService: MajorService, private  nationalityService:NationalityService, private universityService:UniversityService,
    private empService:EmployeeService,private degreeService:DegreeService ) { }
    private formatDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }
    ngOnInit() {
      this.Forms = this.clientmodels.modelForms;
      this.Forms.reset();
      this.Forms.patchValue({date: this.formatDate(new Date())})
      this.cgService.getAll().subscribe(data =>{
        this.cglist = data as any
      })
      this.majorService.getAll().subscribe(data =>{
        this.majorlist = data as any
      })
      this.nationalityService.getAll().subscribe(data =>{
        this.nationalitylist = data as any
      })
      this.universityService.getAll().subscribe(data =>{
        this.universitylist = data as any
      })
      this.degreeService.getAll().subscribe(data =>{
        this.degreelist = data as any
      })
      this.empService.getAll().subscribe(data =>{
        this.employeelist = data as any
      })
      this.cliService.getAll().subscribe(data =>{
        this.allclient= data as any
      })
    }
    async FormSubmit() {
      this.Forms.patchValue({
        clientgroupname: this.selectsearchval1
      })
      const clientgroup = this.Forms.get('clientgroupname').value
      const student = this.Forms.get('studentname').value
      const passportval = this.Forms.get('passport').value
      if(this.allclient.find(x=> (x.clientgroupname == clientgroup && x.studentname == student))){
        this.snackBar.open('Agent and student name allready exist', "Remove", {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
        return
      }
      if(this.allclient.find(x=> (x.passport == passportval))){
        this.snackBar.open('Passport value allready exist', "Remove", {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
        return
      }
      if(this.selectsearchval1 == null || this.selectsearchval1 == ""){
        this.snackBar.open('Client OR AGENT GROUP CANT BE EMPTY', "Remove", {
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
                    duration: 3000,
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


    }

    SelectvalChanged1(val){
      /*const va =this.cglist.find(x => x.clientId === val).clientname
      this.Forms.patchValue({clientName: va});*/
      this.selectsearchval1 = val;
    }
}
