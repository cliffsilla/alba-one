import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {Employee} from "../models/employee.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee;
  editForm: FormGroup;
  employeeData:any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let employeeId = localStorage.getItem("editEmployeeId");
    if(!employeeId) {
      alert("Invalid action.")
      this.router.navigate(['employee']);
      return;
    }
    this.editForm = this.formBuilder.group({
      employee_name: ['', Validators.required],
      employee_salary: ['', Validators.required],
      employee_age: ['', Validators.required]
    });
    
    console.log(employeeId);
    this.employeeData = this.http.get('http://dummy.restapiexample.com/api/v1/employee/13330');
    console.log(this.employeeData);
    //console.log(this.http.get("http://dummy.restapiexample.com/api/v1/employee/13329"));
    //this.editForm.setValue(this.http.get("http://dummy.restapiexample.com/api/v1/employee/13329"));
    // this.apiService.getEmployeeById(+ employeeId)
    //   .subscribe( data => {
    //     this.editForm.setValue(data);
    //   });
  }

  onSubmit() {
    this.apiService.updateEmployee(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['employee']);
        },
        error => {
          alert(error);
        });
  }

}
