import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-r',
  templateUrl: './update-r.component.html',
  styleUrls: ['./update-r.component.css']
})
export class UpdateRComponent implements OnInit {

  constructor(private router:ActivatedRoute, private appservice:AppService 
    , private goTo:Router) { }
    
      editResult = new FormGroup({
      Date : new FormControl(''),
      reim_Type:new FormControl(''),
      requested_Value:new FormControl(''),
      currency:new FormControl(''),
      email: new FormControl(''),
      CurrDateTime:new FormControl(''),
      id: new FormControl(''),
      approved_Value:new FormControl(''),
      requestPhase:new FormControl(''),
      RecieptAttached: new FormControl('')
    
    })

    url  ="./assets/butterfly.jpeg";

    
  onSelectFile(e:any){
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
        this.editResult.value.RecieptAttached=this.url;
        console.log(this.editResult.value.RecieptAttached);
      }
    }
  }
  ngOnInit(): void {
    
    console.warn(this.router.snapshot.params['id']);
    this.appservice.getCurrentDashboard(this.router.snapshot.params['id']).
    subscribe((res:any)=>{
     
        this.editResult = new FormGroup({
          Date : new FormControl(res['date']),
          reim_Type:new FormControl(res['reim_Type']),
          requested_Value:new FormControl(res['requested_Value']),
          currency:new FormControl(res['currency']),
          email: new FormControl(res['email']),
          CurrDateTime:new FormControl(res['currDateTime']),
          id: new FormControl(res['id']),
          approved_Value: new FormControl(res['approved_Value']),
          requestPhase:new FormControl(res['requestPhase']),
          RecieptAttached: new FormControl(res['recieptAttached'])
        })
      })
     
  }


  updateReimbursements(){
     
   this.appservice.updateDashboard(this.router.snapshot.params['id'],this.editResult.value)
   .subscribe((res)=>{
   alert('result updated succcessfully');
   location.reload();
   })
   this.ngOnInit();
   this.appservice.reloadDashBoard();
   this.goTo.navigate(['EmployeeDashboard']);
   
  }

  GoToList(){
    this.goTo.navigate(['EmployeeDashboard']);
  }

}
