import {EmployeeService} from 'src/app/_services/employee.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Describer, Entity} from "../../../Models/Employee";

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})

export class CommandComponent implements OnInit {
  entity: Entity;
  desc: Describer = new Describer();
  dict = new Map<string, string>();
  prop :any[] =[];

  ngOnInit(): void {
    if (!this.entity)
      this.entity = new Entity();

    this.createInstance();

    let array = Object.getOwnPropertyNames(this.entity);
    this.prop =[...array];
    let arrayType: any[] = [];
    array.forEach(x => {
      //arrayType.push(Object.getPrototypeOf(x))
      this.dict.set(x,Object.getPrototypeOf(x))
    });
    console.log(this.dict);
    //console.log(arrayType);
  }


  createInstance() {
    this.entity.id = 0;
    this.entity.birthdate = new Date();
    this.entity.email = "";
    this.entity.groups = "";
    this.entity.status = "";
    this.entity.basic_salary = "";
    this.entity.description = "";
    this.entity.firstname = "";
    this.entity.lastname = "";
    this.entity.password = "";
    this.entity.username = "";
  }

}
