import { Component, OnInit, Input, OnChanges, AfterViewChecked } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnChanges, AfterViewChecked {

  constructor() { }

  @Input('list') usersList;
  
  public listOfUser = [];

  ngOnInit() {
    console.log('list of users', this.usersList );
  }

  ngOnChanges(){
    this.listOfUser =  this.usersList;
  }

  ngAfterViewChecked(){
    let local = localStorage.getItem('userlist');
    if(local){
      this.listOfUser = JSON.parse(local);       
    }
  }

}
