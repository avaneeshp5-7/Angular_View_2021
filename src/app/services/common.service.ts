import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private source:HttpClient
  ) { }

  createAccount(data:any){
    return this.source.post(`${environment.apiUrl}user_registraion`,data);
  }
  
  userLogin(data){
    return this.source.post(`${environment.apiUrl}user_login`,data);
  }
}
