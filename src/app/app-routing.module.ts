import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ConfirmPageComponent } from './components/confirm-page/confirm-page.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homepage' },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'confirm-page', component: ConfirmPageComponent },
  { path: 'signup-page', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
