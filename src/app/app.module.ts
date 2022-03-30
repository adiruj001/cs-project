import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ConfirmPageComponent } from './components/confirm-page/confirm-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReservationAdminComponent } from './components/reservation-admin/reservation-admin.component';
import { PaidPageComponent } from './components/paid-page/paid-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { HelpPageComponent } from './components/help-page/help-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ReservationMemberComponent } from './components/reservation-member/reservation-member.component';
import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import { AmountReservationAdminComponent } from './components/amount-reservation-admin/amount-reservation-admin.component';
import { MemberPageComponent } from './components/member-page/member-page.component';
import { ContactListPageComponent } from './components/contact-list-page/contact-list-page.component';
import { ContactDetailPageComponent } from './components/contact-detail-page/contact-detail-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginPageComponent,
    ConfirmPageComponent,
    SignupComponent,
    ReservationAdminComponent,
    PaidPageComponent,
    HelpPageComponent,
    ContactPageComponent,
    ReservationMemberComponent,
    ReservationDetailComponent,
    AmountReservationAdminComponent,
    MemberPageComponent,
    ContactListPageComponent,
    ContactDetailPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MaterialFileInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
