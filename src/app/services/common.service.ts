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
  
  getUaers(pageNumber:Number,ItemPerPage:Number){
    return this.source.get(`${environment.apiUrl}all_user?pageNumber=${pageNumber}&itemPerPage=${ItemPerPage}`);
  }

  getUaerDetails(userId:any){
    return this.source.get(`${environment.apiUrl}single_user?userId=${userId}`);
  }

  update(userId:any,data:any){
    return this.source.post(`${environment.apiUrl}update_user?userId=${userId}`,data);
  }

  delete(userId:any){
    return this.source.post(`${environment.apiUrl}delete_user?userId=${userId}`,'');
  }
}
