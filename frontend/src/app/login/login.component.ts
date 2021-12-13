import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm:FormGroup
  successMessage = '' 
  constructor(private route:Router ,private activeRoute: ActivatedRoute, private service: MyServiceService) { 
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required),

    });
  }

  ngOnInit(): void { 
  }
  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched
  }
  login() {
    if (this.myForm.valid) { 
      this.service.login(this.myForm.value).subscribe((data) => {
        localStorage.setItem('token', data.toString())
        this.successMessage = 'logged successfully';
        this.route.navigate(['dash'])
      })
    }
  } 

  movetoLogin() {
    this.route.navigate(['../register'], {relativeTo: this.activeRoute}) ;
  }
}
