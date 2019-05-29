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
      id:[],
      employee_name: ['', Validators.required],
      employee_salary: ['', Validators.required],
      employee_age: ['', Validators.required],
      profile_image:[]
    });
    
    this.apiService.getEmployeeById(parseInt(employeeId)).subscribe(
      res => {
        this.editForm.setValue(res);
      },
      err => {
        alert(`An error has occurred ${err}`);
      }
    );
  }

  onSubmit() {
    this.apiService.updateEmployee(this.editForm.value)
      .pipe(first())
      .subscribe(
        res => {
          this.router.navigate(['employee']);
        },
        err => {
          alert(`An error has occurred ${err}`);
        });
  }

}
