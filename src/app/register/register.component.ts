import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/service/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
  }
  signupForm !: FormGroup
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['',Validators.required],
      termCondition: false,

    })

  }
  submit() {
    if(this.signupForm.valid){
     const passwordCheck= this.signupForm.value.password === this.signupForm.value.confirmPassword
    if(passwordCheck){
       this.userService.postRegister(this.signupForm.value).subscribe((data)=>{
        console.log(data);
       })
       alertify.success("User data registered.")
       this.router.navigate([['/login']])
    }
    else{
      alertify.error('password doesnot match')
    }
    }
    else{
      alertify.error('Invalid form')
    }
    
  console.log(this.signupForm.value);
  }
}
