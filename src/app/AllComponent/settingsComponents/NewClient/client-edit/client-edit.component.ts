import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { ClientService } from '../client.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  id: any;
  selectFormControl = new FormControl('', Validators.required);
  cglist: any[];
  allclient: any;
  majorlist: any;
  nationalitylist: any;
  universitylist: any;
  degreelist: any;
  employeelist: any;
  Forms = this.climodels.modelForms;
  selectsearchval1: string;
  constructor(private climodels: clientmodels,private snackBar:MatSnackBar,private cgService: ClientGroupService,
    private cliService: ClientService,private formBuilder: FormBuilder,private route:ActivatedRoute, private router: Router,
    private majorService: MajorService, private  nationalityService:NationalityService, private universityService:UniversityService,
    private empService:EmployeeService,private degreeService:DegreeService) { }
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
        this.selectsearchval1 = data["clientgroupname"];
        this.Forms.patchValue(data);
      });
    })
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
    /*const clientgroup = this.Forms.get('clientgroupname').value
    const student = this.Forms.get('studentname').value
    if(this.allclient.find(x=> (x.clientgroupname == clientgroup && x.studentname == student))){
      this.snackBar.open('Agent and student name allready exist', "Remove", {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar']
      });
      return
    }*/


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
  SelectvalChanged1(val){
    /*const va =this.cglist.find(x => x.clientId === val).clientname
    this.Forms.patchValue({clientName: va});*/
    this.selectsearchval1 = val;
  }

}
