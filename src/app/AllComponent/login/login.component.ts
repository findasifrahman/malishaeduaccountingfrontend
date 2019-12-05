import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  simpleSnackBarRef: any;
  Forms: any;
  constructor(private snackBar: MatSnackBar, private logservice: LoginService,
    private formBuilder: FormBuilder,private router:Router) { }

    ngOnInit() {
      this.Forms = this.formBuilder.group({
        username: ["", Validators.required],
        password: ["", Validators.required],
      });
    }

    async FormSubmit() {
      const formValue = this.Forms.value;
      await this.logservice.submit(formValue).subscribe(response => {
        //console.log(<any>response)
        let token = (<any>response).token;
        localStorage.setItem("jwt", token);
        //console.log(token);
        console.log(this.logservice.getrole());
        this.snackBar.open('Congradulations. Logged In Succesdfully', "Remove", {
          duration: 6000,
          verticalPosition: 'top',
          panelClass: ['blue-snackbar']
        });
        this.router.navigate(["/home"]);
      }, err => {
        console.log(err.error.error)
        console.log(err.error)
        this.snackBar.open('Wrong -- ' + err.error.error,"Undo",{
          duration: 6000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
      });
    }

}
