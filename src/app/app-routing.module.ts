import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'edit-employee', component: EditEmployeeComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
