import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(private _activeRoute:ActivatedRoute,private _CS:CommonService) { }

  ngOnInit(): void {
    this._activeRoute.params.subscribe(id=>{
     if(id.Id){
      this._CS.getUaerDetails(id.Id).subscribe((user:any)=>{
        this.user=user.data[0]
      })
     }
    })
  }
  
}
