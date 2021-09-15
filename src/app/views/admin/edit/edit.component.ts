import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  notifier: NotifierService;
  userForm: FormGroup
  userId: any;
  constructor(
    private rt: Router,
    notifier: NotifierService,
    private _fb: FormBuilder,
    private _CS: CommonService,
    private _activeRoute: ActivatedRoute
  ) { this.notifier = notifier }

  ngOnInit(): void {
    this.userForm = this._fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required]
    });
    this._activeRoute.params.subscribe(id => {
      if (id.Id) {
        this.userId=id.Id
        this._CS.getUaerDetails(id.Id).subscribe((user: any) => {
          this.userForm.patchValue(user.data[0])
        })
      }
    })
  }
  update() {
    if(this.userForm.valid){
      this._CS.update(this.userId,this.userForm.value).subscribe((data:any)=>{
          if(data.success==true){
            this.notifier.notify('success',data.message);
            setTimeout(() => {
              this.rt.navigate(['dashboard/details',this.userId])
            }, 3000);
          }else{
            this.notifier.notify('error',data.message)
          }
      })
    }
   }
}
