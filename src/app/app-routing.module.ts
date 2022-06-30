import { LoginComponent } from './Modules/Pages/login/login.component';
import { IndexComponent } from './Modules/Pages/index/index.component';
import { EditComponent } from './Modules/Pages/edit/edit.component';
import { CreateComponent } from './Modules/Pages/create/create.component';
import { ViewComponent } from './Modules/Pages/view/view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import {CommandComponent} from "./Modules/Pages/command/command.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {
    path:'',
    canActivate:[AuthGuard],
    children: [
      { path: 'employee', component: IndexComponent },
      { path: 'employee/:id/view', component: ViewComponent },
      { path: 'employee/create', component: CreateComponent },
      { path: 'employee/:id/edit', component: EditComponent },
      { path: 'command', component: CommandComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
