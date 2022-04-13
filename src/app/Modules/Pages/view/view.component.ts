import { Employee } from './../../../Models/Employee';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  post!: Employee;

  constructor(
    public service: EmployeeService,
    private route: ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.service.find(this.id).subscribe((data: Employee)=>{
      this.post = data;
    });
  }

}
