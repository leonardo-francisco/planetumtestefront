import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListInspectionsComponent } from './components/list-inspections/list-inspections.component';
import { AddInspectionsComponent } from './components/add-inspections/add-inspections.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list-inspections', component: ListInspectionsComponent, canActivate: [AuthGuard] },
  { path: 'add-inspections', component: AddInspectionsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
