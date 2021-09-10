import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  notifier: NotifierService;
  userForm!:FormGroup
  constructor(
    private rt: Router,
    notifier: NotifierService,
    private _fb:FormBuilder,
    private _CS:CommonService
  ) {this.notifier = notifier}

  ngOnInit(): void {
    this.userForm=this._fb.group({
      fullName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      contact:['',Validators.required],
      password:['',Validators.required]
    });
  }

  createAccounts(){
    if(this.userForm.valid){
       this._CS.createAccount(this.userForm.value).subscribe((data:any)=>{
         if(data.success==true){
          this.notifier.notify( 'success', `${data.message}`);
          setTimeout(() => {
            this.rt.navigate(['/login'])
          }, 2000);
         }else{
          this.notifier.notify( 'error', `${data.message}`);
         }
       })
    }else{
      this.notifier.notify( 'error', 'Fields are required!');
    }
  }
  gotoLogin() {
    this.rt.navigate(['/login'])
  }
}
