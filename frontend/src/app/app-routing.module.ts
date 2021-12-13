import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainDeskComponent } from './main-desk/main-desk.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path:'', redirectTo:'main', pathMatch:'full'  },
  {
    path:'main', component: MainDeskComponent, children:
    [
      {path:'', redirectTo:'login', pathMatch:'full'},
      {path:'login', component:LoginComponent},
      {path:'register', component:RegisterComponent}
    ]
  }, 
  {path:'dash', component: UserDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
