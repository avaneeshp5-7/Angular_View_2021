import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;

  constructor(private _CU:CommonService) { }

  ngOnInit(): void {
    this.allUser();
  }

  allUser(){
    this._CU.getUaers(environment.pageNumber,environment.itemPerPage).subscribe((user:any)=>{
   this.users=user.data
    });
  }



}
