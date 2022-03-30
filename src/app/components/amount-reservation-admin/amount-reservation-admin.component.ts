import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CrudService } from './../../service/crud.service';
import { Van } from 'src/app/models/van.model';

@Component({
  selector: 'app-amount-reservation-admin',
  templateUrl: './amount-reservation-admin.component.html',
  styleUrls: ['./amount-reservation-admin.component.css']
})
export class AmountReservationAdminComponent implements OnInit {

  AllReservations: any = [];
  Reservations: any = [];
  vanTime = new Array;
  searchForm: FormGroup;
  allAmount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private van: Van
  ) {
    this.searchForm = this.formBuilder.group({
      vanline: [''],
      date: [''],
      time: [''],
    });

    this.crudService.getReservations().subscribe(res => {
      console.log(res);
      this.Reservations = res;
    });
    this.vanTime = this.van.van_time;
   }

  ngOnInit(): void {
    this.crudService.getReservations().subscribe(res => {
      console.log(res);
      this.Reservations = res;
    });
    this.vanTime = this.van.van_time;
  }

  onSearch(): any {
    this.allAmount = 0;
    if((document.getElementById("vanline-select") as HTMLInputElement).value != '' && (document.getElementById("date-select") as HTMLInputElement).value != ''
    && (document.getElementById("time-select") as HTMLInputElement).value != '') {
      for(var val of this.Reservations){
        let date_array = (document.getElementById("date-select") as HTMLInputElement).value.split("-");
        let date_pattern = date_array[2] + "/" + date_array[1] + "/" + date_array[0];
        if(val.vanline == (document.getElementById("vanline-select") as HTMLInputElement).value 
        && val.date == date_pattern && val.time == (document.getElementById("time-select") as HTMLInputElement).value){
          this.AllReservations.push(val);
        }
      }
    
      // Count amount
      for(var val of this.AllReservations){
        this.allAmount += val.amount;
      }

      let oneReservation: any = [];
      oneReservation.push(this.AllReservations[0]);
      this.AllReservations = [];
      this.AllReservations = oneReservation;
    } else {
      alert("กรุณาเลือกข้อมูลให้ครบ");
    }

  }

  onResetSearch(): any {
    (document.getElementById("vanline-select") as HTMLInputElement).value = '';
    (document.getElementById("date-select") as HTMLInputElement).value = '';
    (document.getElementById("time-select") as HTMLInputElement).value = '';
    this.AllReservations = [];
  }

}
