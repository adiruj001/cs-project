import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-paid-page',
  templateUrl: './paid-page.component.html',
  styleUrls: ['./paid-page.component.css']
})
export class PaidPageComponent implements OnInit {

  reservationForm: FormGroup;
  imagePayPath = "http://localhost:9999/pictures/pay.png";
  priceShow = "จำนวนเงินที่ต้องชำระ: " + localStorage.getItem("price") + " บาท";
  date = new Date();
  currentYear = this.date.getFullYear();
  currentMont = this.date.getMonth() + 1;
  currentDay = this.date.getDate();
  imageData!: String;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private appComponent: AppComponent
  ) { 
    this.reservationForm = new FormGroup({
      member_id: new FormControl(localStorage.getItem("member_id")),
      passenger: new FormControl(localStorage.getItem("passenger")),
      date: new FormControl(localStorage.getItem("date")),
      time: new FormControl(localStorage.getItem("time")),
      vanline: new FormControl(localStorage.getItem("vanline")),
      pickup: new FormControl(localStorage.getItem("pickup")),
      destination: new FormControl(localStorage.getItem("destination")),
      status: new FormControl(localStorage.getItem("status")),
      amount: new FormControl(localStorage.getItem("amount")),
      imageFile: new FormControl(null),
      price: new FormControl(localStorage.getItem("price")) 
    });
  }

  ngOnInit(): void {
    // Show file name that seleced
    let inputFile = document.getElementById('imageFile');
    inputFile?.addEventListener('change', function(event){
      let uploadedFileName = (event.target as HTMLInputElement).files?.item(0)?.name;
      (document.getElementById("file-name") as HTMLInputElement).textContent = String(uploadedFileName);
    })
  }

  onFileSelect(event: Event) {
    // Show file data that selected
    let file = (event.target as HTMLInputElement).files?.item(0);
    this.reservationForm.patchValue({ imageFile: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if(file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as String;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): any {
    if(this.appComponent.UserNowLogin.member_username != null) {
      this.crudService.addReservation(this.reservationForm.value, this.reservationForm.value.imageFile);
      this.reservationForm.reset();
      this.imageData = '';
      console.log("Data add successfully!")
      localStorage.removeItem("member_id");
      localStorage.removeItem("date");
      localStorage.removeItem("time");
      localStorage.removeItem("vanline");
      localStorage.removeItem("pickup");
      localStorage.removeItem("destination");
      localStorage.removeItem("status");
      localStorage.removeItem("amount");
      localStorage.removeItem("price");
      alert("ทำรายการเสร็จเรียบร้อย!");
      this.ngZone.run(() => this.router.navigateByUrl('/homepage'));
    } else {
      alert("กรุณาเข้าสู่ระบบ ก่อนทำรายการ");
    }
  }

  onCancel(): any {
    if(window.confirm("ต้องการทำรายการใหม่?")) {
      localStorage.removeItem("member_id");
      localStorage.removeItem("passenger")
      localStorage.removeItem("date")
      localStorage.removeItem("time")
      localStorage.removeItem("vanline")
      localStorage.removeItem("pickup")
      localStorage.removeItem("destination")
      localStorage.removeItem("status")
      localStorage.removeItem("amount")
      localStorage.removeItem("price")
      this.ngZone.run(() => this.router.navigateByUrl('/homepage'));
    }
  }

}