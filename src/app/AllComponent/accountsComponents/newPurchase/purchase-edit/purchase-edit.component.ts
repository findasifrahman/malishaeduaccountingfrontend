import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import {  PurchaseService  } from '../purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { purchasemodels } from '../../../../models/purchasemodels';
import { ClientService } from '../../../settingsComponents/NewClient/client.service'
import { IncoomeSourceService } from '../../../settingsComponents/NewIncomeSource/incoome-source.service'

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.scss']
})
export class PurchaseEditComponent implements OnInit {
  id: any;
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  incomeTypelist: any[];
  clientlist: any[];
  //selectsearchval1: string;
  selectsearchval2: string;
  //selectsearchval3: string;
  constructor(private PURCHASEservice: PurchaseService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private isourceService: IncoomeSourceService, private cliService: ClientService, private router: Router,
    private PModels:purchasemodels,private route: ActivatedRoute) { }

  ngOnInit() {
      this.Forms = this.PModels.modelForms;
      this.Forms.reset();
      this.isourceService.getAll().subscribe((posts) => {
        this.incomeTypelist = posts as any;
        console.log(posts);
      });
      this.cliService.getAll().subscribe((posts) => {
        this.clientlist= posts as any;
      });
      this.onChanges();
      this.route.params.subscribe(params => {
        this.id = params['id'];
        console.log("update id--" + params['id']);
        this.PURCHASEservice.getbyid(this.id).subscribe((data) => {
          //this.selectsearchval1 = data["clientid"];
          this.selectsearchval2 = data["incomeType"];
          //this.selectsearchval3 = data["clientName"];
          this.Forms.patchValue(data);
        });
      })
    }

  changedval(){
    const pr = this.Forms.get('price').value
    const qa = this.Forms.get('quantity').value
    const ap = this.Forms.get('additionalPrice').value
    const di = this.Forms.get('discount').value
    this.Forms.patchValue({
      totalPrice: ((pr*qa) + ap) -di
    });
  }
  onChanges(): void {
    this.Forms.get('price').valueChanges.subscribe(val => {
      this.changedval()
    })
    this.Forms.get('quantity').valueChanges.subscribe(val => {
      this.changedval()
    })
    this.Forms.get('additionalPrice').valueChanges.subscribe(val => {
      this.changedval()
    })
    this.Forms.get('discount').valueChanges.subscribe(val => {
      this.changedval()
    })
  }

  /*SelectvalChanged1(val){
    const va =this.clientlist.find(x => x.clientId === val).clientname
    this.Forms.patchValue({clientName: va});
    this.selectsearchval1 = val;
    this.selectsearchval3 = va;
  }
  SelectvalChanged3(val){
    console.log("in sel val 3 -- ", val)
    const va =this.clientlist.find(x => x.clientname === val).clientId
    this.Forms.patchValue({clientid: va});
    this.selectsearchval1 = va;
    this.selectsearchval3 = val;
  }*/
  SelectvalChanged2(val){
    this.selectsearchval2 = val;
  }


  async FormSubmit() {
    this.Forms.patchValue({
      clientid: "",//this.selectsearchval1,
      incomeType: this.selectsearchval2,
      clientName: "",//this.selectsearchval3,
    })
    const formValue = this.Forms.value;
    //console.log(formValue);
    await this.PURCHASEservice.update(this.id, formValue).subscribe(() => {
      console.log("Update req successfull");
      this.snackBar.open('Data Updated Successfully', "Remove", {
        duration: 5000, verticalPosition: 'top', panelClass: ['blue-snackbar']
      });
      this.router.navigate(['/purchase/list']);
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
