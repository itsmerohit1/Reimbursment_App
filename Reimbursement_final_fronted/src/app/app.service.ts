import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, retry } from 'rxjs';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient  , private router:Router) { }
   
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isAdminLoggdIn  = new BehaviorSubject<boolean>(false);

  isLoginError =new EventEmitter<boolean>(false);

  employeeDashboard :any = [];

UserUrl="https://localhost:44379/api/UserModels";
EmployeeUrl="https://localhost:44379/api/EmployeeDashBoards";


registerUser(data:any){
  return this.http.post(this.UserUrl,data,{observe:'response'})
  .subscribe((res:any)=>{
    if(res){
      alert('user registered');
    }
    else{
    alert('invalid credentials');
    }
  })
}


DeleteRecord(id:any){
  console.log("delete api" , this.EmployeeUrl+'/'+id);
 return  this.http.delete(this.EmployeeUrl+'/'+id);
 
 
}

AddRecords(data:any){
  return this.http.post(this.EmployeeUrl,data);

}

reloadUser(){
  if(localStorage.getItem('user')){
    this.router.navigate(['']);
  }
}

reloadHomr(){
  this.router.navigate(['']);
}
userLogin(data:any){

   

this.http.get(`${this.UserUrl}/${data.email}`,{observe:'response'})
.subscribe((res:any)=>{
  
  // console.warn("result body pass ",res.body.password , data.password);
  if(res.body &&  res.body.password==data.password ){
    
    localStorage.setItem('user',res.body.email);
    
    localStorage.setItem('isApprover',JSON.stringify(res.body.isApprover));

    if(res.body.isApprover==true){
      this.isAdminLoggdIn.next(true);
      alert('SuccessFully Logged as Admin.');
      this.router.navigate(['']);
      this.router.navigate(['admin'])

    }

    else if(res.body.isApprover==false){
    this.isUserLoggedIn.next(true);
    alert('SuceessFully Logged in as Employee. ');
    this.router.navigate(['']);
    this.router.navigate(['EmployeeDashboard']);
    }
  }
    else {
      
    this.isLoginError.emit(true);
    }
  })
}

 
  

getCurrentDashboard(id:any){
 return this.http.get(this.EmployeeUrl+'/'+id );
}

getDashboard(){
  return (this.http.get<any[]>(this.EmployeeUrl));
}

getUsers(){
  return (this.http.get<any[]>(this.UserUrl));
}
 
updateDashboard(id:any , data:any){
  console.warn("id data ", id , data);
return this.http.put(this.EmployeeUrl+'/'+id,data);
 
}

reloadDashBoard(){
  this.router.navigate(['EmployeeDashboard']);
}

}
