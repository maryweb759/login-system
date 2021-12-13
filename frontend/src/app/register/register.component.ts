import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ControlContainer } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  successMessage = ''
  constructor(private route: Router, private activeRoute: ActivatedRoute, private service: MyServiceService) { 
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator),

    });
    this.myForm.controls.password.valueChanges.subscribe(
      x => this.myForm.controls.cnfpass.updateValueAndValidity()
    )
   
  }

  ngOnInit(): void { 
  
  }

 isValid(controlName) {
   return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched
 }

 passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined))  {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if(passControl) {
        const passValue = passControl.value;
        if(passValue !== cnfpassValue && passValue === '') {
          return {
            isError: true
          }
        }
      } 
    } 
    return null
  }

  register() {
    if (this.myForm.valid) { 
   this.service.register(this.myForm.value).subscribe(
   
     data => this.successMessage = "register success",
    error => { console.log(error)
    if(error.status == 409) {
        console.log('conflict');
        this.successMessage = "email already exists"
    }
    

    }
   ) 
  }
  } 

  movetoRegister() {
    this.route.navigate(['../login'], {relativeTo: this.activeRoute}) ;
  }
}
