import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import { Employee } from "../models/employee.model";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  addForm: FormGroup;

  ngOnInit() {
      this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.addForm.value);
    this.apiService.createEmployee(this.addForm.value)
      .pipe(first())
      .subscribe( (employee: Employee) => {
        this.router.navigate(['employee']);
      },
      err => {
        console.log(err);
      });
  }

}
