import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ConfirmPageComponent } from './components/confirm-page/confirm-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReservationAdminComponent } from './components/reservation-admin/reservation-admin.component';
import { PaidPageComponent } from './components/paid-page/paid-page.component';
import { HelpPageComponent } from './components/help-page/help-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ReservationMemberComponent } from './components/reservation-member/reservation-member.component';
import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import { AmountReservationAdminComponent } from './components/amount-reservation-admin/amount-reservation-admin.component';
import { MemberPageComponent } from './components/member-page/member-page.component';
import { ContactListPageComponent } from './components/contact-list-page/contact-list-page.component';
import { ContactDetailPageComponent } from './components/contact-detail-page/contact-detail-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homepage' },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'confirm-page', component: ConfirmPageComponent },
  { path: 'signup-page', component: SignupComponent },
  { path: 'reservation-admin-page', component: ReservationAdminComponent },
  { path: 'paid-page', component: PaidPageComponent},
  { path: 'help-page', component: HelpPageComponent},
  { path: 'contact-page', component: ContactPageComponent},
  { path: 'reservation-member-page', component: ReservationMemberComponent},
  { path: 'reservation-detail-page/:id', component: ReservationDetailComponent},
  { path: 'reservation-amount-page', component: AmountReservationAdminComponent},
  { path: 'member-page', component: MemberPageComponent},
  { path: 'contact-list-page', component: ContactListPageComponent},
  { path: 'contact-detail-page/:id', component: ContactDetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
