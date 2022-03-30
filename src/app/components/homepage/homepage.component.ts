import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Van } from 'src/app/models/van.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  reservationForm: FormGroup;
  vanlineList: any;
  vanPickup: any;
  vanDestination: any;
  vanTime = new Array;
  vanSitAmount: any;
  price = 0;
  imageVanPath = "http://localhost:9999/pictures/van.jpg";

  date = new Date();
  currentYear = this.date.getFullYear();
  currentMont = this.date.getMonth() + 1;
  currentDay = this.date.getDate();
  finalMont: any;
  finalDay: any;
  minDate: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appComponent: AppComponent,
    private van: Van
  ) { 
    this.reservationForm = this.formBuilder.group({
      member_id: [''],
      passenger: [''],
      date: [''],
      time: [''],
      vanline: [''],
      pickup: [''],
      destination: [''],
      status: ['รอยืนยันการชำระเงิน'],
      amount: [1]
    })
  }

  ngOnInit(): void {
    this.vanlineList = this.van.vanline_list;
    this.setDate();
    (document.getElementById("dateId") as HTMLInputElement).min = this.minDate;
  }

  getPickup(): any {
    if(this.reservationForm.value.vanline == "พฤกษา 3 - เดอะมอลล์งามวงศ์วาน") {
      this.vanPickup = this.van.van_pickup1;
    }
    else if(this.reservationForm.value.vanline == "พฤกษา 3 - พาต้า") {
      this.vanPickup = this.van.van_pickup2;
    }
  }

  getDestination(): any {
    if(this.reservationForm.value.vanline == "พฤกษา 3 - เดอะมอลล์งามวงศ์วาน" && this.reservationForm.value.pickup == "หมู่บ้านพฤกษา 3" ) {
      this.vanDestination = this.van.van_dest1_1;
    }
    else if(this.reservationForm.value.vanline == "พฤกษา 3 - เดอะมอลล์งามวงศ์วาน" && this.reservationForm.value.pickup == "เดอะมอลล์งามวงศ์วาน") {
      this.vanDestination = this.van.van_dest1_2;
    }
    else if(this.reservationForm.value.vanline == "พฤกษา 3 - พาต้า" && this.reservationForm.value.pickup == "หมู่บ้านพฤกษา 3") {
      this.vanDestination = this.van.van_dest2_1;
    }
    else if(this.reservationForm.value.vanline == "พฤกษา 3 - พาต้า" && this.reservationForm.value.pickup == "พาต้าปิ่นเกล้า") {
      this.vanDestination = this.van.van_dest2_2;
    }
  }

  getPrice(): any {
    if(this.reservationForm.value.vanline == "พฤกษา 3 - เดอะมอลล์งามวงศ์วาน" && this.reservationForm.value.pickup == "หมู่บ้านพฤกษา 3") {
      if(this.reservationForm.value.destination == "พันธุ์ทิพย์งามวงศ์วาน" || this.reservationForm.value.destination == "เดอะมอลล์งามวงศ์วาน") {
        this.price = 25;
      } else {
        this.price = 15;
      }
    }
    if(this.reservationForm.value.vanline == "พฤกษา 3 - เดอะมอลล์งามวงศ์วาน" && this.reservationForm.value.pickup == "เดอะมอลล์งามวงศ์วาน") {
      if(this.reservationForm.value.destination == "บ้านกล้วย" || this.reservationForm.value.destination == "หมู่บ้านพฤกษา 3") {
        this.price = 25;
      } else {
        this.price = 15;
      }
    }
    if(this.reservationForm.value.vanline == "พฤกษา 3 - พาต้า" && this.reservationForm.value.pickup == "หมู่บ้านพฤกษา 3") {
      if(this.reservationForm.value.destination == "เมเจอร์ปิ่นเกล้า" || this.reservationForm.value.destination == "โลตัสปิ่นเกล้า" || this.reservationForm.value.destination == "พาต้าปิ่นเกล้า") {
        this.price = 25;
      } else {
        this.price = 15;
      }
    }
    if(this.reservationForm.value.vanline == "พฤกษา 3 - พาต้า" && this.reservationForm.value.pickup == "พาต้าปิ่นเกล้า") {
      if(this.reservationForm.value.destination == "หมู่บ้านบัวทอง" || this.reservationForm.value.destination == "บ้านกล้วย" || this.reservationForm.value.destination == "หมู่บ้านพฤกษา 3") {
        this.price = 25;
      } else {
        this.price = 15;
      }
    }
  }

  getForTime(): any {

  }

  getVanTime(): any {
    let hours = String(this.date.getHours());
    let minutes = "";
    if(this.date.getMinutes() < 30) {
      minutes = "00";
    }
    else{
      minutes = "30";
    }
    let timeNow = hours + ":" + minutes;
    let index = this.van.van_time.indexOf(timeNow);
    
    let str1 = this.minDate.split("-");
    let current_year = str1[0];
    let current_mount = str1[1];
    let current_day = str1[2];
    
    let str2 = this.reservationForm.value.date.split("-");
    let selected_year = str2[0];
    let selected_mount = str2[1];
    let selected_day = str2[2];

    if(current_year == selected_year && current_mount == selected_mount && current_day == selected_day){
      this.vanTime = [];
      for(let i = index + 1; i < 39; i++) {
        this.vanTime.push(this.van.van_time[i]);
      }
    }
    if(current_year == selected_year && current_mount == selected_mount && current_day != selected_day){
      this.vanTime = this.van.van_time;
    }
    else if(current_year == selected_year && current_mount != selected_mount){
      this.vanTime = this.van.van_time;
    }
    else if(current_year != selected_year && (document.getElementById("dateId") as HTMLInputElement).value != ''){
      this.vanTime = this.van.van_time;
    }
  }

  setDate(): any {
    if(this.currentMont < 10) {
      this.finalMont = "0" + this.currentMont;
    }
    else {
      this.finalMont = this.currentMont;
    }

    if(this.currentDay < 10) {
      this.finalDay = "0" + this.currentDay;
    }
    else {
      this.finalDay = this.currentDay;
    }

    this.minDate = this.currentYear + "-" + this.finalMont + "-" + this.finalDay
  }

  checkYear(): any {
    let str = this.reservationForm.value.date;
    let splitted = str.split("-");
    let year = splitted[0];
    if(Number(year) > 2030) {
      return 0;
    }
    else {
      return 1;
    }
  }

  onSubmit(): any {
    if(this.appComponent.UserNowLogin.member_username != null) {
      if(this.reservationForm.value.vanline == "" || this.reservationForm.value.pickup == "" || this.reservationForm.value.destination == "" || this.reservationForm.value.date == "" || this.reservationForm.value.time == "") {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      }
      else if(this.checkYear() == 0) {
        alert("วันที่จองไม่ถูกต้อง");
      }
      else if(this.reservationForm.value.amount > 13) {
        alert("จำนวนคนไม่ถูกต้อง");
      }
      else {
        this.getPrice()
        localStorage.setItem("member_id", String(localStorage.getItem("userCurrentlyLogin")));
        localStorage.setItem("passenger", this.appComponent.UserNowLogin.member_firstname + " " + this.appComponent.UserNowLogin.member_lastname);
        let date_array = this.reservationForm.value.date.split("-");
        let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
        localStorage.setItem("date", date_pattern);
        localStorage.setItem("time", this.reservationForm.value.time);
        localStorage.setItem("vanline", this.reservationForm.value.vanline);
        localStorage.setItem("pickup", this.reservationForm.value.pickup);
        localStorage.setItem("destination", this.reservationForm.value.destination);
        localStorage.setItem("status", this.reservationForm.value.status);
        localStorage.setItem("amount", this.reservationForm.value.amount);
        localStorage.setItem("price", String(this.price * this.reservationForm.value.amount));
        this.ngZone.run(() => this.router.navigateByUrl('/confirm-page'));
      }
    } else {
      alert("กรุณาเข้าสู่ระบบ ก่อนทำรายการ");
    }
  }

  onResetForm(): any {
    this.reservationForm = this.formBuilder.group({
      date: [''],
      time: [''],
      vanline: [''],
      pickup: [''],
      destination: [''],
      amount: [1]
    })
  }

}
