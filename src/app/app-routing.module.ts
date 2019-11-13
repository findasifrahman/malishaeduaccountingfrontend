import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
//import { allComponentModule } from './AllComponent/allComponent.module'
//import { AdminlayoutComponent } from './commonLayout/adminlayout/adminlayout.component';
import { LoginComponent } from './AllComponent/login/login.component';
import { LogoutComponent } from './AllComponent/logout/logout.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent, pathMatch: 'full'
  },
  {
    path: 'logout', component: LogoutComponent
  },
  { path: '',     //component: AdminlayoutComponent,
    children: [
      { path:'', loadChildren: './AllComponent/allComponent.module#allComponentModule' }
    ]
  },

];
export function mytokenGetter() {
  //return this.logservice.getUserLogStatus();
  return localStorage.getItem('jwt');
}
@NgModule({
  imports: [RouterModule.forRoot(routes),
    JwtModule.forRoot({/* automatically assign bearer token with every http request service*/
      config: {
        tokenGetter: mytokenGetter,
        whitelistedDomains: ['localhost:8086'],
        blacklistedRoutes: []
      }
    }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
