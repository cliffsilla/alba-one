import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ApiService } from '../api.service';
import { Employee } from '../models/employee.model';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[];
  

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    
    this.apiService.getAllEmployees().subscribe((employees: Employee[]) =>{
      this.employees = employees;
    },
    err => {
      return err.status
    })
  }

  deleteEmployee(employee: Employee): void{
    this.apiService.deleteEmployee(employee).subscribe(
      res => {
        this.employees = this.employees.filter(e => e !== employee);
      }
    )
  }

  editEmployee(employee: Employee): void{
    localStorage.removeItem("editEmployeeId");
    localStorage.setItem("editEmployeeId",(employee.id).toString());
    this.router.navigate(['edit-employee']);
  }

  addEmployee(): void{
    this.router.navigate(['add-employee']);
  }
  
}
