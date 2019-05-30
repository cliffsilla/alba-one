import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { ApiService } from '../api.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employee: Employee;
  @ViewChild('agGrid') agGrid: AgGridNg2;
  title = 'Alba One';
  
  columnDefs = [
    {headerName: 'ID', field: 'id', sortable: true, filter: true, checkboxSelection: true},
    {headerName: 'Employee Name', field: 'employee_name', sortable: true, filter: true },
    {headerName: 'Employee Salary', field: 'employee_salary', sortable: true, filter: true},
    {headerName: 'Employee Age', field: 'employee_age', sortable: true, filter: true}
  ];

  rowData: any;

  constructor(private http: HttpClient, private apiService: ApiService) {

  }

  ngOnInit() {
      this.apiService.getAllEmployees().subscribe(res =>{
        this.rowData = res;
      },
      err => {
        return err.status
      })
      
  }
  
  onGridReady($event){

  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.id);
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
