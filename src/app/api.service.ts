import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Employee } from  './models/employee.model';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  
  constructor(private httpClient: HttpClient) { }

  getAllEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`/api/v1/employees`,this.setHttpHeader());
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`/api/v1/employee/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`/api/v1/create`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee>{
    return this.httpClient.put<Employee>(`/api/v1/update/${employee.id}`, employee);
  }

  deleteEmployee(employee: Employee): Observable<Employee[]>{
    return this.httpClient.delete<Employee[]>(`/api/v1/delete/${employee.id}`);
  } 

  setHttpHeader() {
    const headers = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json');
    let options = { headers: headers};
    return options;
  }
}
