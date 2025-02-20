import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SymptomsService } from '../../../core/service/symptoms/symptoms.service';
import * as alertify from 'alertifyjs';
import { DoctorService } from '../../../core/service/admin/doctor.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from '../../confirmation/confirmation.service';

@Component({
  selector: 'app-symptoms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './symptoms.component.html',
  styleUrl: './symptoms.component.css'
})
export class SymptomsComponent implements OnInit {
  symptomsForm!: FormGroup;
  prescriptionForm!: FormGroup;
  patientTable: any[] = [];
  patientByEmailTable: any[] = [];
  doctorTable: any[] = [];
  doctorList: any[] = [];
  editSymptoms: any = null;
  userRole: string | null | undefined;
  showModal: boolean = false;
  selectedPatient: any;
  // prescription: { medicine: string, suggestion: string } = { medicine: '', suggestion: '' };
  currentPatient: any = {}; // To store the current patient data
  prescription: any = {}; // To store prescription data for the current patient
  constructor(private formBuilder: FormBuilder, private symptomsService: SymptomsService,
    private doctorService: DoctorService, private http: HttpClient,
    private confirmationService: ConfirmationService
  ) {


  }
  ngOnInit(): void {
    this.getDocList()
    this.symptomsForm = this.formBuilder.group({
      // doctor: [''],
      symptoms: ['', [Validators.required, Validators.minLength(10)]],
      patient: ['']

    });
    this.prescriptionForm = this.formBuilder.group({
      medicine: ['', Validators.required],
      suggestion: ['', Validators.required],
      patientId: ['', Validators.required]  
    });

    this.userRole = localStorage.getItem('userRole')
    this.getSymptomsPatient()
    this.getSymptomsDoctor()
    this.getSymptomsPatientbyEmail()
  }
  // launchModal(patient: any) {
  //   this.currentPatient = patient;
  //   this.prescriptionForm.patchValue({
  //     patientId: patient._id  
  //   }); 
  // debugger }
  launchModal(patient: any) {
    this.currentPatient = patient;
    console.log('Launching Modal with Patient:', patient); // Debugging line
  
    // Check if patient._id is correct
    if (patient) {
      console.log('Patient ID:', patient); // Debugging line
      this.prescriptionForm.patchValue({
        patientId: patient// Patch the patient ID into the form
      })
      debugger
    } else {
      console.error('Patient ID is undefined!'); // Debugging line
    }
    debugger
  }
  
  // submitPrescription() {
  //   if (this.prescriptionForm.valid) {
  //     console.log('Prescription submitted for patient:', this.currentPatient, 'Data:', this.prescription);
  //   } else {
  //     console.log('Form is invalid. Please check the fields.');
  //   }
  //   debugger
  // }
  // In your component
// submitPrescription() {
//   if (this.prescriptionForm.valid) {
//     const prescriptionData = this.prescriptionForm.value;
//     this.symptomsService.submitPrescription(prescriptionData).subscribe(
//       (res) => {
//         console.log('Prescription submitted successfully:', res);
//         alertify.success('Prescription submitted successfully');
//         // Optionally, reset the form or close the modal
//         this.prescriptionForm.reset();
//       },
//       (error) => {
//         console.error('Error submitting prescription:', error);
//         alertify.error('Error submitting prescription');
//       }
//     );
//   } else {
//     console.log('Form is invalid. Please check the fields.');
//     alertify.error('Form is invalid');
//   }
//   debugger
// }
submitPrescription() {
  if (this.prescriptionForm.valid) {
    const prescriptionData = this.prescriptionForm.value;
    console.log('Prescription Data:', prescriptionData);  // Debugging line

    // Check patientId specifically
    if (!prescriptionData.patientId) {
      console.error('Patient ID is missing in the form submission!');
    } else {
      console.log('Patient ID is correctly set:', prescriptionData.patientId);
    }

    this.symptomsService.submitPrescription(prescriptionData).subscribe(
      (res) => {
        console.log('Prescription submitted successfully:', res);
        alertify.success('Prescription submitted successfully');
        this.prescriptionForm.reset();
      },
      (error) => {
        console.error('Error submitting prescription:', error);
        alertify.error('Error submitting prescription');
      }
    );
  } else {
    console.log('Form is invalid. Please check the fields.');
    alertify.error('Form is invalid');
  }
  debugger
}



  getDocList() {
    this.doctorService.getDoctor().subscribe((res) => {
      console.log(res);
      this.doctorList = res
    })
  }
  onSubmit() {
    console.log('form correct');
    if (this.symptomsForm.valid) {
      this.symptomsService.postSymptoms(this.symptomsForm.value).subscribe((data) => {
        console.log('form valid');
        this.getSymptomsPatient();
        alertify.success('Success')
      })
      this.symptomsForm.reset()
    }
    else {
      alertify.error('Error to submit.')
    }
  }
  getSymptomsPatient() {
    this.symptomsService.getSymptomsPatient().subscribe((response) => {
      console.log(response);
      this.patientTable = response.Symptoms;
    })
  }

  getSymptomsPatientbyEmail() {
    this.symptomsService.getSymptomsPatientbyEmail().subscribe((response) => {
      console.log(response);
      this.patientByEmailTable = response.data;
    })
  }

  getSymptomsDoctor() {
    this.symptomsService.getSymptomsDoctor().subscribe((data) => {
      console.log(data);
      this.doctorTable = data.data
    })
  }
  async delete(symptomId: string) {
    const confirmed = await this.confirmationService.showConfirmationPopup();
    if (confirmed) {
      this.http.delete(`http://localhost:3000/deletesymptom/${symptomId}`).subscribe(
        (response) => {
          this.confirmationService.showSuccessMessage('Delete Successfully ');
          this.getSymptomsPatient(); // Refresh the list
        },
        (error) => {
          this.confirmationService.showErrorMessage('Sorry, Cannot be Deleted');
        }
      );
    }
    else {
      this.confirmationService.showErrorMessage('Delete operation cancelled');
    }
  }
  updateSymptoms() {
    this.symptomsService.updateSymptoms(this.editSymptoms._id, this.symptomsForm.value).subscribe((data) => {
      alertify.success('Symptoms updated successfully');
      this.editSymptoms = null;
      this.symptomsForm.reset();
      this.getSymptomsPatientbyEmail();
    },
      (error) => {
        console.error('Error updating Symptoms', error);
        alertify.error('Failed to update symptoms');
      });
  }

  edit(symptomsId: any): void {
    this.editSymptoms = symptomsId;
    this.symptomsForm.patchValue({
      symptoms: symptomsId.symptoms
    });
  }
}