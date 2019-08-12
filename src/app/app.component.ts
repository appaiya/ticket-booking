import { Component, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'Booking Application !';
  public userName = '';
  public currentName = '';
  public listOfUsers = [];
  public seatMap = [];
  public seatSelectedList = [];
  public validationObj: boolean = false;
  configObj: any = {};

  public array = [10,20,30,40];
  public var = 0;

  constructor(){}

  ngOnInit(){
    this.userName = '';

    this.configObj = {
      'noOfRows' : 20,
      'noOfCols': 20
    }

    for(let i=0; i < this.configObj.noOfRows; i++){ // Setting/Initializing the Seat Mapping as 20*20 [Two dimensional array]
      this.seatMap[i] = [i +1];
      for(let j = 0; j < this.configObj.noOfCols; j ++){        
        this.seatMap[i][j] =  { 'field':'Row-'+(i + 1)+'-Col-'+ (j + 1) };
      }
    }

    console.log('recursion', this.recursion(this.array))

    console.log(this.seatMap)
  }


  recursion(valueArray){
    console.log('valueArry', valueArray)
    if(this.array.length == 0){
      return 1;
    } else{
      return this.var + this.recursion(this.array.length - 1);
    }


  }

  ngAfterViewChecked(){ // whlie reloading, this function do the checking process  
    let local = localStorage.getItem('ticket');
    if(local){
      console.log('insede local', local)
      this.reloadFunction(JSON.parse(local));
    }

  }

  addUserName(){
    let userValid;
    if(this.listOfUsers.length){
      this.listOfUsers.forEach(user=>{
        if(user == this.userName){
          userValid = true;
        }else userValid = false;
      });
    }

    if(userValid){
      this.validationObj = true;
      this.userName = '';
    }else {
      this.validationObj = false;
      this.currentName = this.userName;
      this.listOfUsers.push(this.userName);
      this.userName = '';
      localStorage.setItem('userlist', JSON.stringify(this.listOfUsers));
    }
  }

  checkboxClicked(seat:string,value:HTMLInputElement){
    

    if(value.checked && this.seatSelectedList.length > 4){ // Validation for MAX 5 Tickets per User
      alert('Max 5 Tickets per person');
      value.checked = false;  
    } else{
      if(value.checked){
        this.seatSelectedList.push(seat);
      }else {      
        this.seatSelectedList.splice(this.seatSelectedList.indexOf(seat),1); // Removing the item while unchecking 
      }
    }
    console.log('checked', this.seatSelectedList)
  }

  submitFunction(){

      if(this.seatSelectedList.length){  // Validation for Submit
        let localObj:any = {
          'iUser': this.currentName,
          'seatList': this.seatSelectedList
        };
        
        localStorage.setItem('ticket', JSON.stringify(localObj)); // Setting into local storage
        alert('Submitted Successfully !!');
      } else {
        alert('Please select the Tickets !');
      }
  }

  reloadFunction(list){
    this.currentName = list.iUser;
    
    // setTimeout(()=>{
      for(let seat of list.seatList){
        console.log(seat);
        let u  = <HTMLInputElement> document.getElementById(seat);
        console.log('u', u)
        u.checked = true;
        u.disabled = true;
      }
    // }, 0);
  }

}
