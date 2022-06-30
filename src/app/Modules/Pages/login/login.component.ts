import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/_services/auth.service';
import { MapperService } from 'src/app/_services/mapper.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:any = FormGroup;
  users:any = [{username : "mahbob" , password :"mahbob001"}];
  dest : User;
  isLoggedIn = false;
  constructor(private fb:FormBuilder, private router:Router, private commServ:AuthService, private tokenStorage: TokenStorageService,
    private mapperService : MapperService) { }

  ngOnInit(): void {
    this.mapper();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.login = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })

  }
  loginForm(data:any){
    console.log(data)
    if(data.username){
      this.users.forEach((item:any) => {

        if(item.username === data.username && item.password === data.password){
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoggedIn = true;
          this.mapper();
        }
        else{
          localStorage.clear();
        }

      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  mapper(){
    this.dest = this.mapperService.adapt<User>(this.users,User, [{sourceFiledName : "password" , destiniationFiledName :"passwords"}])
  }
}
