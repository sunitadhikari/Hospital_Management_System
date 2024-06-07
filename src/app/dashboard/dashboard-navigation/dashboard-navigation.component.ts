import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardOverviewComponent } from "../dashboard-overview/dashboard-overview.component";
import { ProfilComponent } from "../profil/profil.component";
import { DashboardFeedbackComponent } from "../dashboard-feedback/dashboard-feedback.component";
import { DashboardReportComponent } from "../dashboard-report/dashboard-report.component";
import { DashboardNotificationComponent } from "../dashboard-notification/dashboard-notification.component";
import { DashboardAppointmentComponent } from "../dashboard-appointment/dashboard-appointment.component";
import { DashboardDoctorComponent } from "../dashboard-doctor/dashboard-doctor.component";
import { SettingComponent } from "../setting/setting.component";
import { PatientComponent } from "../../pages/patient/patient.component";

@Component({
    selector: 'app-dashboard-navigation',
    standalone: true,
    templateUrl: './dashboard-navigation.component.html',
    styleUrl: './dashboard-navigation.component.css',
    imports: [CommonModule, DashboardOverviewComponent, ProfilComponent, DashboardFeedbackComponent, DashboardReportComponent, DashboardNotificationComponent, DashboardAppointmentComponent, DashboardDoctorComponent, SettingComponent, PatientComponent]
})
export class DashboardNavigationComponent {
  currentSection: string = 'overview';

  constructor(private router: Router) {
    this.currentSection = 'dashAppointment'
  }
  showSection(section: string): void {
    this.currentSection = section;
  }
  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }
}
