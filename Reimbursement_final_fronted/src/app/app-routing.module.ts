import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { UpdateRComponent } from './update-r/update-r.component';
import { UserComponent } from './user/user.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UpdateAComponent } from './update-a/update-a.component';
import { DeclineAComponent } from './decline-a/decline-a.component';
import { AppComponent } from './app.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { EmployeeAuthGuard } from './employee-auth.guard';
import { ImageComponent } from './image/image.component';
const routes: Routes = [
  {path:'image',component:ImageComponent},
  {path:'UserPage',component:UserComponent},
  {path:'EmployeeDashboard',
  component:EmployeeDashboardComponent
  ,
  canActivate:[EmployeeAuthGuard]

},
  {path:'update/:id',component:UpdateRComponent, 
  canActivate:[EmployeeAuthGuard]},

  {path:'admin',
  component:AdminDashboardComponent,
  canActivate:[AdminAuthGuard]
}
  ,

  {path:'updateAdminApprove/:id',
  component:UpdateAComponent,
  canActivate:[AdminAuthGuard]
},


  {path:'updateAdminDecline/:id',
  component:DeclineAComponent,
  canActivate:[AdminAuthGuard]
},

  {path:'home',component:AppComponent},
  {path:'',component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
