import { Component, OnInit, SimpleChange } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {

  constructor(private router:Router , private appService:AppService , private activatedRoute:ActivatedRoute) { }

    PopUp:boolean=false;
    board1:any=[];
    board :any={};
    board2:object={};
    temp:any={};
    boardApproved:any={};
    boardPending:any={};
    boardDeclined:any={};
    dropDownList:any=[];
    boardSearch:any=[];
    selectedData:any=[];
    temp1:any=[];

  ngOnInit(): void {
    
    // this.router.navigate(['']);
    // location.reload();
    
    
    this.appService.getDashboard().subscribe((res)=>{
      this.board1=res;
    }) 
    
    // console.warn("selected data",this.selectedData,typeof(this.selectedData));
    
}
  
dropDown = new FormGroup({
searchKey:new FormControl('')
}
)


filter1(data:any){

  
  
 if(this.searchForm.value.searchReim!=null){

  if(this.isDeclined){
    const x = this.board1.filter((obj:any)=>{
      return obj.requestPhase=="Processed" && obj.approved_Value==0 && obj.reim_Type==data;
    })
    this.boardDeclined=x;
 }

 if(this.isApproved){
  const x = this.board1.filter((obj:any)=>{
    return ( obj.requestPhase=='Processed' && obj.approved_Value!=0 && obj.reim_Type==data);
  })

  this.boardApproved=x;
}

if(this.isPending){
  const x = this.board1.filter((obj:any)=>{
    return ( obj.requestPhase!='Processed' && obj.approved_Value==0 && obj.reim_Type==data);
  })
  this.boardPending=x;
}
 }



}
//showpic 
url  ="./assets/butterfly.jpeg";
 
showpic:boolean=false;

showPic(data:string){
  console.log("data",data);
  this.showpic=true;
  this.url=data;
  
}

closePic(){
  this.showpic=false;
}
//form

// ngOnChanges(changes:SimpleChange){
//   alert('change');
// }

searchForm=new FormGroup({
  searchEmail : new FormControl(''),
  searchReim:new FormControl('')
});
 

searchData(){
 
  let filterData  = this.board1.filter((data:any)=>{
    data.reim_Type==this.selectedData;
  })
  this.board1=filterData;
  this.ngOnInit();
}

searchByEmail(){

  // console.warn("searchemail",this.searchForm.value.searchEmail);
  if(this.isApproved){
    const x = this.boardApproved.filter((obj:any)=>{

      return obj.email==this.searchForm.value.searchEmail;
    })
    this.boardApproved=x;
    this.isDeclined=false;
    this.isPending=false;
  }

  if(this.isPending){
    const x = this.boardPending.filter((obj:any)=>{

      return obj.email==this.searchForm.value.searchEmail;
    })
    this.boardPending=x;
    this.isDeclined=false;
    this.isPending=true;
    this.isApproved=false;
  }
  
  if(this.isDeclined){
    const x = this.boardDeclined.filter((obj:any)=>{

      return obj.email==this.searchForm.value.searchEmail;
    })
    this.boardDeclined=x;
    this.isDeclined=true;
    this.isPending=false;
    this.isApproved=false;
  }
 
}

isPending:boolean=false;
isApproved:boolean=false;
isDeclined:boolean=false;

Pending(){
  this.isPending=true;
  this.isApproved=false;
  this.isDeclined=false;
   
  const x = this.board1.filter((obj:any)=>{
    return obj.requestPhase!="Processed";
  })
  this.boardPending=x;
  this.boardApproved=null;
  this.boardDeclined=null;
  this.selectedData=[];
  for( let x1 of this.boardPending){
    this.selectedData.push(x1.reim_Type);
  }
   this.ngOnInit();
   
}


Declined(){
  this.isPending=false;
  this.isApproved=false;
  this.isDeclined=true;
   
  const x = this.board1.filter((obj:any)=>{
    return ( obj.requestPhase=='Processed' && obj.approved_Value==0);
  })
  this.boardPending=null;
  this.boardApproved=null;
  this.boardDeclined=x;
  this.selectedData=[];
  for( let x1 of this.boardDeclined){
    this.selectedData.push(x1.reim_Type);
  }
  this.ngOnInit();
  
}


Approved(){
  this.isPending=false;
  this.isApproved=true;
  this.isDeclined=false;
  this.appService.reloadDashBoard();
  const x = this.board1.filter((obj:any)=>{
    return ( obj.requestPhase!=null && obj.approved_Value!=0);
  })
  this.boardPending=null;
  this.boardApproved=x;
  this.boardDeclined=null;
  this.selectedData=[];
  for( let x1 of this.boardApproved){
    this.selectedData.push(x1.reim_Type);
  }
  this.ngOnInit();
  
}

popUp(){this.PopUp=true;}

 x1:string="Processed";

Decline(id:any){

   
  this.appService.getCurrentDashboard(id).
  subscribe((res:any)=>{
    this.board=  res;
    this.board["requestPhase"]  = this.x1;
    this.board2=this.board;
   
    })
   
 
  this.appService.updateDashboard(id,this.board2).subscribe((res)=>{
    if(res){
      
      this.router.navigate(['Admin']);
     
    }
  })
  
  this.PopUp=false;
}
}
  
  