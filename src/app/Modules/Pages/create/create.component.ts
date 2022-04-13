import { EmployeeService } from 'src/app/_services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  currentDate : Date =new Date();

  constructor(
    public service: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('',  Validators.email),
      birthdate: new FormControl('', Validators.required),
      basic_salary: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      groups: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.service.create(this.form.value).subscribe(res => {
         console.log('Employee created successfully!');
         this.router.navigateByUrl('employee');
    })
  }
}
