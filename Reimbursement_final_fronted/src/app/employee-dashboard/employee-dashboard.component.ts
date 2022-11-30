import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AppService } from '../app.service';
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})


export class EmployeeDashboardComponent implements OnInit {

  constructor( private appService:AppService , private http : HttpClient, private router:Router) { }

  closeDashboard:boolean=false;
  board:any=[];
  board1:any=[];
  
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigate([currentUrl]);
    location.reload();
}

  ngOnInit(): void {
    // this.reloadCurrentRoute();
    // location.reload();
    this.appService.getDashboard().subscribe((res)=>{
      this.board=res;
      let x  = this.board.filter((res:any)=>{
        return res.email==localStorage.getItem('user');
      })
      this.board1=x;
      // this.appService.reloadDashBoard();
    
       this.closeDashboard=false;
      //  this.getEmployeeDashboard();
      
    //  console.log("board",this.board);
  })
  
}

ngOnchanges(changes:SimpleChanges){

}




  addRecords = new FormGroup({

    Date : new FormControl(''),
    reim_Type:new FormControl(''),
    requested_Value:new FormControl(''),
    currency:new FormControl(''),
    email: new FormControl(''),
    CurrDateTime:new FormControl(''),
    id: new FormControl(''),
    RecieptAttached: new FormControl(''),
    requestPhase:new FormControl('')
  
  })

  url  ="";

  onSelectFile(e:any){
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
        this.addRecords.value.RecieptAttached=this.url;
        console.log(this.addRecords.value.RecieptAttached);
      }
    }
  }

  attached ="No";

  addReimbursement(){
    
   let seconds :any= (new Date().getTime() / 1000).toString();
   let email :any= localStorage.getItem('user');
   
   let formInput = this.addRecords.value;

   if(email==null){
    alert('Login first');
   }
   
   else if(!formInput.reim_Type || !formInput.Date || !formInput.requested_Value || !formInput.currency
    ){
alert('some fields are empty');
   }
   else{
   this.addRecords.value.email=`${email}`;
   this.addRecords.value.CurrDateTime=seconds;
    const x = localStorage.getItem('user');
    this.addRecords.value.id=`${email}${seconds}`;
    this.addRecords.value.requestPhase="To be Processed";
    // console.warn("form data ", this.addRecords.value);
    this.appService.AddRecords(this.addRecords.value).subscribe((res)=>{
      if(res){
        this.closeDashboard=false;
        this.router.navigate(['EmployeeDashboard']);
        // this.ngOnInit();
      }
      else{
        alert('invalid input')
      }
    })
    this.addRecords.reset();
  }
  location.reload();
}
 
  deleteRecord(id:any){
    this.appService.DeleteRecord(id).subscribe((res:any)=>{
      if(res){
        this.ngOnInit();
      }}  )
    this.appService.reloadDashBoard();
    this.ngOnInit();
  }

  getEmployeeDashboard(){
    this.appService.getDashboard().subscribe((res)=>{
    this.board=res;
    this.closeDashboard=false;
  //  console.log("board",this.board);
this.appService.reloadDashBoard();
location.reload();
  }) 

}

  AddNewReimbursements(){
    this.closeDashboard=true;
    this.router.navigate(['EmployeeDashboard']);
  }

}
