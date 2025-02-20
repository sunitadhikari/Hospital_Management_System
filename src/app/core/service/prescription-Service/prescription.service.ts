import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private apiUrl: string = environment.api_url;
  private postPatientApi: string = this.apiUrl + 'postPatient';
  private getPatientApi: string = this.apiUrl + 'getPatient';
  private getpresByEmailApi: string = this.apiUrl + 'prescriptions';
  private getOpdReportsApi: string = this.apiUrl + 'opdreport';
  private getOpdReportsinDoctorApi: string = this.apiUrl + 'opdreportinDoctor';

  constructor(private http: HttpClient) {}

  savePrescription(appointmentId: string, prescriptionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}prescription`, { appointmentId, ...prescriptionData });
  }

  // getPrescriptionsByAppointmentId(appointmentId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}prescriptions/${appointmentId}`);
  // }
  getPrescriptionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}prescription/${id}`);
  }
  updatePrescription(id: string, prescriptionData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}prescription/${id}`, prescriptionData);
  }

  deletePrescription(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}prescription/${id}`);
  }
  getOpdReports(): Observable<any> {
    return this.http.get<any>(this.getOpdReportsApi);
  }
  postPatient(data: any): Observable<any> {
    return this.http.post(this.postPatientApi, data);
  }

  getPatient(): Observable<any> {
    return this.http.get(this.getPatientApi);
  }
  getpresByEmail(): Observable<any> {
    return this.http.get(this.getpresByEmailApi);
  }
  getOpdReportsinDoctor(): Observable<any> {
    return this.http.get<any>(this.getOpdReportsinDoctorApi);
  }
}