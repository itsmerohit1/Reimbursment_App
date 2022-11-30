import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';          
import {ReactiveFormsModule}from '@angular/forms';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { UpdateRComponent } from './update-r/update-r.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
 import { FormsModule } from '@angular/forms';
import { UpdateAComponent } from './update-a/update-a.component';
import { DeclineAComponent } from './decline-a/decline-a.component';
import { ImageComponent } from './image/image.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    EmployeeDashboardComponent,
    UpdateRComponent,
    AdminDashboardComponent,
    // UpdareAComponent,
    UpdateAComponent,
    DeclineAComponent,
    ImageComponent,
    // UserRegisterComponent,
    // UserLoginComponent
  ],
  imports: [
    BrowserModule,FormsModule,NgSelectModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule,DropDownListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
