import { EmployeeService } from 'src/app/_services/employee.service';
import { Employee } from './../../../Models/Employee';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  searchValue: string = '';

  constructor(public service: EmployeeService) { }

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

  search() {
    this.posts = this.posts.filter(res => {
        return res.username.toLowerCase().match(this.searchValue.toLowerCase());
      }),
      this.service.getAll().subscribe(
        data => {
          console.log(data);
          this.posts = data;
        }
      )
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
