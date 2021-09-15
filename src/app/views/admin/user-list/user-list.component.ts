import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  notifier: NotifierService;
  constructor(private _CU: CommonService, notifier: NotifierService) { this.notifier = notifier }

  ngOnInit(): void {
    this.allUser();
  }

  allUser() {
    this._CU.getUaers(environment.pageNumber, environment.itemPerPage).subscribe((user: any) => {
      this.users = user.data
    });
  }

  delete(id) {
    this._CU.delete(id).subscribe((data: any) => {
      if (data.success == true) {
        this.notifier.notify('success', data.message)
      } else {
        this.notifier.notify('error', data.message)
      }
    })
  }

}
