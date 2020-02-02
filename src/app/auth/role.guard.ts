import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../AllComponent/login/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public lService: LoginService, public router: Router,private snackBar:MatSnackBar) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    var pageRole = route.data["expectedRole"] as Array<string>
    var rolename = this.lService.getrole();
    var loginstatus = this.lService.getUserLogStatus();
    if(!loginstatus){
      this.router.navigate(['']);
      return false;
    }
    var findr = pageRole.find(x=> x == rolename)
    if(findr){
      return true;
    }
    this.snackBar.open('You are Not authorized to view this page', "Remove", {
      duration: 5000, verticalPosition: 'top', panelClass: ['red-snackbar']
    });
    //this.router.navigate(['']);
    return false;
  }
}
