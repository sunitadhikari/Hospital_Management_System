import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  apiUrl: string = environment.api_url

  private registerApi = environment.api_url + "signupUser"
  private getPatientsApi = environment.api_url + "getPatients"
  private getUserRegister = environment.api_url + "getUserSignup"
  private postLogin = environment.api_url + "signin"
  private loginProfileApi = environment.api_url + "profile"
  private getDoctorsApi = environment.api_url + "getDoctors"
  private getReceptionApi = environment.api_url + "getReception"
   private updateUserApi = environment.api_url + "users/"
  private deleteUserApi = environment.api_url + "delUsers/"

  postRegister(data: any): Observable<any> {
    return this.http.post(this.registerApi, data);
  }

  getRegister(): Observable<any> {
    return this.http.get(this.getUserRegister)
  }
  getPatients(): Observable<any> {
    return this.http.get(this.getPatientsApi)
  }
  getDoctors(): Observable<any> {
    return this.http.get(this.getDoctorsApi)
  }
  getReception(): Observable<any> {
    return this.http.get(this.getReceptionApi)
  }
 
  getProfile(): Observable<any> {
    return this.http.get(this.loginProfileApi)
  }
  postUserLogin(data: any): Observable<any> {
    return this.http.post(this.postLogin, data)
  }
  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.updateUserApi}${userId}`, userData);
  }
  
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.deleteUserApi}${userId}`);
  }
  }

