import { AdminGuard } from './auth/admin.guard';
import { UsersComponent } from './dashboard/users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersComponent, canActivate: [ AuthGuard, AdminGuard ]},
  { path: '', component: DashboardComponent, canActivate: [ AuthGuard ] },
  { path: 'dashboard', redirectTo: '', pathMatch: 'full', canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
