import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  able:boolean= true;
  showLogin:boolean=true;
  isError='';
  alert:boolean=true;
  users:any=[];
  rePassword='';
  

  constructor(
   private userService:AppService,
  private router:Router
    ) {
      this.userService.getUsers().subscribe((res)=>{
        this.users=res;
        // console.log("users",this.users);
      })
     }
 

 register = new FormGroup({
   fullName: new  FormControl(''),
   email: new FormControl(''),
   password :new FormControl(''),
   panNumber:new FormControl(''),
   bankName: new FormControl(''),
   bankAccount :  new FormControl(''),
 })


 
 Solve(data:any){
this.rePassword=data;
 }

 login = new FormGroup({
   email:new FormControl(''),
   password: new FormControl('')
 })
 

 ngOnInit(): void {
  this.userService.getUsers().subscribe((res)=>{
    this.users=res;
    // console.log("users",this.users);
  })
 }


 registerUser(){
  
  let x = this.register.value;
 
  let expEmail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const email1 : any =this.register.value.email;
  const validEmail:boolean = expEmail.test(email1);
    
   let validPass : boolean =true;
   let expPass1 : RegExp = /[A-Za-z]/;
   let expPass2 : RegExp =/[0-9]/;
   let expPass3 : RegExp=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    let hasAlphabet = expPass1.test(String(x.password));
    let hasNumber =  expPass2.test(String(x.password));
    let hasSpecial = expPass3.test(String(x.password));
   
    validPass = hasAlphabet && hasNumber && hasSpecial;
 
    let validPan : boolean = false;
    const expPan = /^[a-zA-Z\d]*$/;
    validPan = expPan.test(String(x.panNumber));
   // console.log(" Valid pan ", validPan);

    let validAccount  : boolean =false;
    let expAccount : RegExp = /^[0-9]*$/;
    validAccount = expAccount.test(String(x.bankAccount));
    
    // console.log(" Valid account ", validAccount);

    let findUser= this.users.filter((obj:any)=>{
     
      return obj.email==x.email;
    })

// console.log("founduser",findUser);
// console.log("password",x.password,this.rePassword);
 if(!x.email)alert('Email Field cannot be Empty!');
 else if(!validEmail) alert('invalid email id');
 else if(findUser.length>=1)alert('Email Already in use , Please register with a new one!')
 
 else if(!x.password)alert('Password field cannot be empty!');
 else if(!validPass)alert('Password must have atleast (1 special character , 1 number and 1 alphabet)');
 else if(String(this.register.value.password).length<=7)alert('Password minimum length must  be 8 ');
 else if(x.password!=this.rePassword)alert("Both Password didn't matched , the password you Re-enter should be same as the password you entered above!");

 else if(!x.fullName)alert('Full name field cannot be empty!');

 else if(!x.panNumber)alert('Pan Number field cannot be empty!');

 else if(!validPan)alert("Pan should contain  alphanumeric only");

 else if(this.register.value.panNumber?.length!=10)alert('Pan length must  be 10 ');

 else if(!x.bankName)alert('Bank name  field cannot be  empty!');
 
 else if(!x.bankAccount)alert('Bank Account Field cannot be  empty!');


else if(!validAccount)alert('Bank Account Number should consist of numeric only');
else if(this.register.value.bankAccount?.length!=12)alert('Bank Account Length should be 12');
 
else  {
  location.reload();
  this.userService.registerUser(this.register.value);
  this.able=false;
  this.showLogin=true;
  this.ngOnInit();
  this.router.navigate(['UserPage']);
       } 

}


closeAlert(){
  this.alert=false;
}
openLogin(){
  this.showLogin=true;
}
closeLogin(){
  this.showLogin=false;
}

loginUser(){
  
this.router.navigate(['UserPage']);
  this.ngOnInit();
  this.isError='';

  let x1 = this.login.value.email;
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const email1 : any =x1;
  const result:boolean = expression.test(email1);

  let x = this.login.value;

  if(!result){
    alert('invalid email id');
  }
 else if(!x.email || !x.password){
    alert('email and password cannot be empty');
  }
 
else{
   
  let x = this.users.find((res:any)=>{
   return  res.email==this.login.value.email && res.password==this.login.value.password;
  })
 console.log("login de",this.login.value.email,this.login.value.password,"X",x);
  if(x==undefined){
    alert('No user Exist with entered email and password!');
  }
  else{
  this.userService.userLogin(this.login.value);
  }
}
  
}
}




    //  }
   



