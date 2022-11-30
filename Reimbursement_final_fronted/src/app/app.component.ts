import { Component } from '@angular/core';
import { UserComponent } from './user/user.component';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { FormControl,FormGroup } from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
    UserLogged :boolean=false;
    AdminLogged:boolean=false;
    showregister:boolean=true;

     form1 = new FormGroup({
      name:new FormControl('')
     });


     name(){
alert("name entered"+ this.form1.value.name)
     }
    

     hideRegister(){
      this.showregister=false;
     }
     showRegister(){
      this.showregister=true;
     }

   ngOnInit():void {

   
    if(localStorage.getItem('user') &&
    localStorage.getItem('isApprover')=='false'){
    
     this.route.navigate(['EmployeeDashboard']);
    }
    else if(localStorage.getItem('user')){
     
      this.route.navigate(['admin']);
     
    }
    
 
   }
 ngDoCheck(){

  
   if(localStorage.getItem('user') &&
     localStorage.getItem('isApprover')=='false'){
      this.UserLogged=true;
      this.AdminLogged=false;
    
     }
     else if(localStorage.getItem('user')){
      this.AdminLogged=true;
      this.UserLogged=false; 
        
      
     }
    
 }

  title = 'FinalProject1';
  showDisplay:boolean=false;
  constructor(private appService:AppService ,private route:Router ){}
  

  Logout(){
  
    localStorage.removeItem('user');
    localStorage.removeItem('isApprover');
    this.appService.reloadHomr();
    this.UserLogged=false;
    this.AdminLogged=false;
   this.showregister=true;
  }
 
  noDisplay(){
    this.showDisplay=true;
  }

  goToRegister(){
    this.route.navigate(['register']);
   
  }

  goToResult(){
    this.route.navigate(['result']);

  }


}
