import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  user: any
  notifier: NotifierService;
  constructor(private auth:AuthService,notifier: NotifierService,) {this.notifier = notifier }

  ngOnInit(): void {
    if (localStorage.getItem('userData')) {
      this.user = JSON.parse(localStorage.getItem('userData'))
    }
  }
  
  logOut(){
    if (localStorage.getItem('userData')!=null) {
      this.auth.logout();
    }
  }
}
