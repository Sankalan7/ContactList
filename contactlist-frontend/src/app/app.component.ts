import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './employee.service';
import Employee from './model/Employee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('editModal') editModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('addModal') addModal: any;

  public employees!: Employee[];
  editEmployee: Employee = {} as Employee;
  deleteEmployee: Employee = {} as Employee;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  searchEmployees(key: string): void {
    console.log(key);

    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phoneNo.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.imageUrl.toLowerCase().indexOf(key.toLowerCase()) !== -1
      )
        results.push(employee);
    }
    this.employees = results;
    if (results.length == 0 || !key) this.getEmployees();
  }

  onAddEmployee(addForm: NgForm): void {
    document.getElementById('close-add-employee')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (res: Employee) => {
        console.log(res);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onUpdateEmployee(employee: Employee): void {
    console.log('done2');

    this.employeeService.updateEmployee(employee).subscribe(
      (res: Employee) => {
        console.log(res);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteEmployee(employeeId: number): void {
    document.getElementById('delete-cancel-button')?.click();
    console.log('done2');

    this.employeeService.deleteEmployee(employeeId).subscribe(
      (res: void) => {
        console.log(res);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (res: Employee[]) => {
        this.employees = res;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openAddModal() {
    this.modalService.open(this.addModal, { ariaLabelledBy: 'add-modal' });
  }

  closeAddModal() {
    this.modalService.dismissAll();
  }

  openEditModal(employee: Employee) {
    this.editEmployee = employee;
    // console.log(employee);
    this.modalService.open(this.editModal, { ariaLabelledBy: 'edit-modal' });
  }

  closeEditModal() {
    this.modalService.dismissAll();
  }

  openDeleteModal(employee: Employee) {
    this.deleteEmployee = employee;
    this.modalService.open(this.deleteModal, {
      ariaLabelledBy: 'delete-modal',
    });
  }

  closeDeleteModal() {
    this.modalService.dismissAll();
  }
}
