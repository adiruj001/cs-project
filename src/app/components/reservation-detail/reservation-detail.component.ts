import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {

  getId: any;
  imageSlipPath = "";
  price = "";
  detailResForm: FormGroup;
  checkStatus = "";

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.getReservation(this.getId).subscribe(res => {
      this.detailResForm.setValue({
        passenger: res['passenger'],
        vanline: res['vanline'],
        pickup: res['pickup'],
        destination: res['destination'],
        date: res['date'],
        time: res['time'],
        amount: res['amount'],
        price: res['price'],
        status: res['status'],
      });
      let price_pattern = "ราคา " + res['price'] + " บาท";
      this.price = price_pattern;
      this.imageSlipPath = res['imagePath'];
      this.checkStatus = res['status']
      console.log(this.checkStatus);
    });

    this.detailResForm = this.formBuilder.group({
      passenger: [''],
      vanline: [''],
      pickup: [''],
      destination: [''],
      date: [''],
      time: [''],
      amount: [''],
      price: [''],
      status: ['']
    });
   }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.detailResForm.value.status = "ยืนยันการชำระเงินแล้ว"
    this.crudService.updateReservation(this.getId, this.detailResForm.value).subscribe(() => {
      alert("ยืนยันการชำระเงินเสร็จเรียบร้อย");
      console.log("Data updated successfully");
      this.ngZone.run(() => this.router.navigateByUrl('/reservation-admin-page'));
    }, (err) => {
      console.log(err);
    })
  }

  onCancel(): any {
    this.detailResForm.value.status = "การชำระเงินถูกยกเลิก"
    this.crudService.updateReservation(this.getId, this.detailResForm.value).subscribe(() => {
      alert("การชำระเงินถูกยกเลิกเสร็จเรียบร้อย");
      console.log("Data updated successfully");
      this.ngZone.run(() => this.router.navigateByUrl('/reservation-admin-page'));
    }, (err) => {
      console.log(err);
    })
  }

}
