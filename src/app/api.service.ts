import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from  './models/employee.model';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://dummy.restapiexample.com/api/v1";
  private ALL_EMPLOYEES_URL = `${this.BASE_URL}/employees`;
  private EMPLOYEE_URL = `${this.BASE_URL}/employee/`
  private CREATE_EMPLOYEE_URL = `${this.BASE_URL}/create`;
  private UPDATE_EMPLOYEE_URL = `${this.BASE_URL}/update/`
  private DELETE_EMPLOYEE_URL = `${this.BASE_URL}/delete/`;

  constructor(private httpClient: HttpClient) { }

  getAllEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this.ALL_EMPLOYEES_URL);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(this.EMPLOYEE_URL + id);
  }

  createEmployee(employee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(this.CREATE_EMPLOYEE_URL, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee>{
    return this.httpClient.put<Employee>(this.UPDATE_EMPLOYEE_URL + employee.id, employee);
  }

  deleteEmployee(employee: Employee): Observable<Employee[]>{
    return this.httpClient.delete<Employee[]>(this.DELETE_EMPLOYEE_URL + employee.id);
  } 
}
