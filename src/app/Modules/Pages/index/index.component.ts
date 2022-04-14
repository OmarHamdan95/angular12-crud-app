import { EmployeeService } from 'src/app/_services/employee.service';
import { Employee } from './../../../Models/Employee';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  posts: Employee[] = [];
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [5, 10, 20];

  constructor(public service: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
   }

  getData() {
    this.service.getAll().subscribe(
      data => {
          this.posts = data;
        }
    )
  }

  filterForm = new FormGroup({
    min_salary: new FormControl('', [Validators.required]),
    max_salary: new FormControl('', [Validators.required]),

  });

  get min_salary() {
    return this.filterForm.get('min_salary').value;
  }
  get max_salary() {
    return this.filterForm.get('max_salary').value;
  }

  onClick(){
    const min = this.min_salary;
    const max = this.max_salary;
    if(min >= max){
      alert("Min Salary tidak boleh lebih besar di bandingkan dengan Max Salary");
    }else{
      this.service.getDataBySalary(min, max).subscribe(
        data => {
          this.posts = data;
          this.router.navigate(['/employee'], { queryParams: { min: min, max: max } });
        }
      )
    }
  }

  sortData(sort: Sort) {
    const data = this.posts.slice();
    if (!sort.active || sort.direction === '') {
      this.posts = data;
      return;
    }
    this.posts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'username':
          return compare(a.username, b.username, isAsc);
        case 'firstname':
          return compare(a.firstname, b.firstname, isAsc);
        case 'lastname':
          return compare(a.lastname, b.lastname, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'birthdate':
          return compare(a.birthdate, b.birthdate, isAsc);
        case 'basic_salary':
          return compare(a.basic_salary, b.basic_salary, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'groups':
          return compare(a.groups, b.groups, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        default:
          return 0;
      }
    });
  }

  deletePost(id:number){
    this.service.delete(id).subscribe(res => {
         this.posts = this.posts.filter(item => item.id !== id);
         console.log('Employee deleted successfully!');
    })
  }

  onTableDataChange(event: number) {
    this.page = event;
  }
  onTableSizeChange(event: { target: { value: number; }; }): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
