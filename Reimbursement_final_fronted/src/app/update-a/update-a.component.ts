import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-a',
  templateUrl: './update-a.component.html',
  styleUrls: ['./update-a.component.css']
})


export class UpdateAComponent implements OnInit {

  constructor(private appService:AppService,private activatedRoute:ActivatedRoute, private router:Router) { }
    
  board:any={};
  
  board1=new FormGroup({
    approved_Value :new FormControl('')

  })

  ngOnInit(): void { 
    console.warn(this.activatedRoute.snapshot.params['id']);
    this.appService.getCurrentDashboard(this.activatedRoute.snapshot.params['id']).
    subscribe((res:any)=>{
           this.board= res;
      })
if(this.board2!=null){
  this.router.navigate(['EmployeeDashboard']);
}
  }
   
  PopUp:boolean=true;
 

   popUp(){
    this.PopUp=true;
   }

   board2:object={};

x1:string="Processed";

Approve(){

this.PopUp=true;

this.board["requestPhase"]=this.x1;
this.board["approved_Value"]=this.board1.value.approved_Value;
this.board2=this.board;


// console.warn("id type ",this.activatedRoute.snapshot.params['id'], typeof(this.activatedRoute.snapshot.params['id']));
// console.warn("inserted value type" , this.board.value,typeof(this.board.value))
this.appService.updateDashboard(this.activatedRoute.snapshot.params['id'],this.board2).

subscribe((res=>{

  if(res){
    alert('processed');
    this.router.navigate(['']);
  }
}))

this.PopUp=false;
this.router.navigate(['admin']);
}

ApproveBy(){

}


}


