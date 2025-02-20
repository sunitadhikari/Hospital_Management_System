import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import * as alertify from 'alertifyjs';
import { DepartmentService } from '../../../core/service/admin/department.service';
import { UserService } from '../../../core/service/user/user.service';
import { ReceptionService } from '../reception.service';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from '../../../shared/confirmation/confirmation.service';

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css'
})
export class ReceptionComponent implements OnInit{



  receptionForm!: FormGroup;
  receptionList : any[] =[];
  departmentList : any[] =[];
  editingreception: any = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private receptionService:ReceptionService,private departmentService:DepartmentService, private userService : UserService, private confirmationService:ConfirmationService) {

   }

  ngOnInit(): void {
    this.receptionForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      image: [''],
      dob: [''],
      sex: ['', Validators.required],
      bloodGroup: [''],
      // specialist: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: [''],
      mobileNo: ['', Validators.required],
      // careerTitle: ['', Validators.required],
      // biography: [''],
      status: ['active', Validators.required],
      role:['reception']
    });
    this.fetchVerifiedReceptionUsers();

  }
  fetchVerifiedReceptionUsers(){
    this.userService.getReception().subscribe((res)=>{
      this.receptionList=res

    })
  }
  createReceptionr(): void {
    this.userService.postRegister(this.receptionForm.value).subscribe(
      (data) => {
        alertify.success('Reception Added Successfully');
        this.receptionForm.reset();
        this.fetchVerifiedReceptionUsers();
      },
      (error) => {
        console.error('Error creating reception:', error);
        alertify.error('Failed to create reception');
      }
    );
  }
  // onSubmit() {
   
  //   if(this.receptionForm.valid){
  //     this.userService.postRegister(this.receptionForm.value).subscribe((data)=>{
      
  //      console.log(data);
  //      alertify.success('reception Added Successfully')
     
  //      this.receptionForm.reset()
  //     })
  //   }
  //   else{
  //     alertify.error('Invalid Form')
  //   }

    
  // }
  onSubmit(): void {
    if (this.receptionForm.valid) {
      if (this.editingreception) {
        this.updateReception();
      } else {
        this.createReceptionr();
      }
    } else {
      alertify.error('Invalid Form');
    }
  }
  updateReception(): void {
    this.userService.updateUser(this.editingreception._id, this.receptionForm.value).subscribe(
      (data) => {
        alertify.success('reception updated successfully');
        this.editingreception = null;
        this.receptionForm.reset();
        this.fetchVerifiedReceptionUsers();
      },
      (error) => {
        console.error('Error updating reception:', error);
        alertify.error('Failed to update reception');
      }
    );
  }

  edit(reception:any){ 
    this.editingreception = reception;
    this.receptionForm.patchValue({
      firstName: reception.firstName,
      lastName: reception.lastName,
      email: reception.email,
      // password: reception.password,
      // confirmPassword: reception.confirmPassword,
      department: reception.department,
      image: reception.image,
      dob: reception.dob,
      sex: reception.sex,
      bloodGroup: reception.bloodGroup,
      specialist: reception.specialist,
      address: reception.address,
      phoneNo: reception.phoneNo,
      mobileNo: reception.mobileNo,
      careerTitle: reception.careerTitle,
      biography: reception.biography,
      status: reception.status
    });
  }
  async delete(id: string): Promise<void> {
    const confirm =await this.confirmationService.showConfirmationPopup();
    if( confirm){
      this.userService.deleteUser(id).subscribe((res)=>{
this.confirmationService.showSuccessMessage('Delete Successfully')
this.fetchVerifiedReceptionUsers()
      },
    (error)=>{
this.confirmationService.showErrorMessage('Sorry, cannot bed deleted')
this.fetchVerifiedReceptionUsers()

    }
    )
    }
  else{
    this.confirmationService.showErrorMessage('Delete operation cancelled')
  }
  }
}