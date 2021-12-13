import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
 username = ''
  constructor(private service: MyServiceService, private route: Router) { 
    this.service.getusername().subscribe(
      data => this.username = data.toString()
      ,
      err => this.route.navigate(['/main/login'])
      
    )
  }


  ngOnInit(): void { 
   
  }
  logout() {
   localStorage.removeItem('token');
   this.route.navigate(['/main/login'])
 }
}
