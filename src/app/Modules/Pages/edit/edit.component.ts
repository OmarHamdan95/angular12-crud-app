import { Employee } from './../../../Models/Employee';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  post!: Employee;
  form!: FormGroup;
  currentDate : Date =new Date();
  public data = ['volvo', 'saab', 'mercedes', 'audi', 'toyota', 'honda', 'volks', 'jaguar', 'hyundai', 'isuzu'];
  public placeholder: string = 'Enter the Car Brand';

  constructor(
    public service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.find(this.id).subscribe((data: Employee)=>{
      this.post = data;
    });

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
    this.service.update(this.id, this.form.value).subscribe(res => {
         console.log('Employee updated successfully!');
         this.router.navigateByUrl('employee');
    })
  }

}
