import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:any = FormGroup;
  users:any = [];
  isLoggedIn = false;
  constructor(private fb:FormBuilder, private router:Router, private commServ:AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.login = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
    this.commServ.getUsers().subscribe((data:any)=>{
      console.log(data);
      this.users = data;
    });
  }
  loginForm(data:any){
    console.log(data)
    if(data.username){
      this.users.forEach((item:any) => {

        if(item.username === data.username && item.password === data.password){
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoggedIn = true;
          this.reloadPage();
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
}
