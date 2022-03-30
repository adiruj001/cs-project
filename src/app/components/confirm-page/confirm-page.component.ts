import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})
export class ConfirmPageComponent implements OnInit {

  reservationForm: FormGroup;
  imagePayPath = "http://localhost:9999/pictures/pay.png";
  price = "";

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appComponent: AppComponent
  ) { 
    this.reservationForm = this.formBuilder.group({
      date: localStorage.getItem("date"),
      time: localStorage.getItem("time"),
      vanline: localStorage.getItem("vanline"),
      pickup: localStorage.getItem("pickup"),
      destination: localStorage.getItem("destination"),
      amount: localStorage.getItem("amount")
    })
  }

  ngOnInit(): void {
    this.price = "ราคา " + localStorage.getItem("price") + " บาท" 
  }

  onSubmit(): any {
    if(this.appComponent.UserNowLogin.member_username != null) {
      this.ngZone.run(() => this.router.navigateByUrl('/paid-page'));
    } else {
      alert("กรุณาเข้าสู่ระบบ ก่อนทำรายการ");
    }
  }

  onBack(): any {
    if(window.confirm("ต้องการทำรายการใหม่?")) {
      localStorage.removeItem("member_id");
      localStorage.removeItem("date");
      localStorage.removeItem("time");
      localStorage.removeItem("vanline");
      localStorage.removeItem("pickup");
      localStorage.removeItem("destination");
      localStorage.removeItem("status");
      localStorage.removeItem("amount");
      localStorage.removeItem("price");
      this.ngZone.run(() => this.router.navigateByUrl('/homepage'));
    }
  }

}
